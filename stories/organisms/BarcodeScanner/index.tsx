'use client'

import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState
} from 'react'

import Quagga from 'quagga'

import { AlertInfo, type AlertInfoProps } from '../../molecules'
import {
  detectBarcodeFormat,
  isValidAnyBarcode
} from '../../molecules/Barcodes/helper'
import { decodeBarcodeFromImage } from './helpers/decodeBarcodeFromImage'
import { useQrLiveScanner } from './helpers/useQrLiveScanner'

import styles from './styles.module.css'

interface IScannedCode {
  code: string
  format: string
  count: number
  lastScannedAt: number
}

interface IToast {
  message: string
  type: AlertInfoProps['type']
}

interface IQuaggaDetection {
  codeResult?: {
    code?: string | null
    format?: string
  }
}

/**
 * Estado del visor de cámara. `scanning` representa un procesamiento puntual de
 * una lectura (feedback breve) sin bloquear el stream.
 */
type ScannerStatus =
  | 'initializing'
  | 'ready'
  | 'error'

export interface BarcodeScannerProps {
  /**
   * Se invoca con cada código aceptado (barra lineal o texto de QR). Puede
   * devolver una promesa: el componente la espera y captura su rechazo para no
   * dejar promesas sin controlar. El resultado NO cambia el feedback visual del
   * escáner (que solo informa "código detectado"); el consumidor es quien
   * decide la UX de carrito/notificación.
   */
  onScan?: (code: string) => void | Promise<void>

  /**
   * Cuando está activo, el mismo código puede volver a emitirse pasado su
   * periodo de enfriamiento individual (uso típico en POS para sumar unidades).
   */
  continuous?: boolean

  /**
   * Modo del escáner:
   * - 'barcode' (por defecto): barras lineales con cámara en vivo (Quagga) +
   *   imagen + entrada manual.
   * - 'qr': QR con cámara en vivo (ZXing `decodeFromConstraints`, ya que Quagga
   *   no decodifica QR) + imagen (ZXing) + entrada manual.
   */
  mode?: 'barcode' | 'qr'
}

const SCAN_COOLDOWN_MS = 1200
const DUPLICATE_NOTICE_COOLDOWN_MS = 2500
const INVALID_NOTICE_COOLDOWN_MS = 2500
const TOAST_DURATION_MS = 3200
const MAX_HISTORY_ITEMS = 12

/**
 * Lectores de Quagga alineados con los formatos realmente anunciados por la UI
 * y validados por `detectBarcodeFormat`. Quagga 0.12.x soporta estos readers;
 * no se incluyen formatos que el validador no reconoce para mantener coherencia
 * entre lo detectado y lo mostrado en el historial.
 */
const QUAGGA_READERS = [
  'ean_reader',
  'ean_8_reader',
  'upc_reader',
  'upc_e_reader',
  'code_128_reader',
  'code_39_reader'
]

/**
 * Tiempo (ms) sin una lectura válida de la CÁMARA tras el cual se resalta la
 * alternativa de subir una imagen. Configurable y centralizado. El botón de
 * imagen está disponible desde el inicio; pasado este tiempo se muestra una
 * sugerencia discreta más visible.
 */
export const SCAN_FALLBACK_DELAY_MS = 12_000

/**
 * Mensaje de cámara legible según el tipo de error de getUserMedia/Quagga.
 *
 * @param error - Error capturado.
 * @returns Mensaje para el usuario.
 */
const getCameraErrorMessage = (error: unknown): string => {
  const errorName =
    typeof error === 'object' &&
    error !== null &&
    'name' in error
      ? String((error as { name: unknown }).name)
      : ''

  switch (errorName) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
      return 'No se permitió el acceso a la cámara. Habilita los permisos desde la configuración del navegador.'
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return 'No encontramos una cámara disponible en este dispositivo.'
    case 'NotReadableError':
    case 'TrackStartError':
      return 'La cámara está siendo utilizada por otra aplicación. Ciérrala e intenta nuevamente.'
    case 'OverconstrainedError':
      return 'La cámara no cumple con los requisitos necesarios para realizar el escaneo.'
    case 'SecurityError':
      return 'El navegador bloqueó el acceso a la cámara. Comprueba que estás utilizando HTTPS.'
    default:
      return 'No pudimos iniciar la cámara. Verifica los permisos y vuelve a intentarlo.'
  }
}

/** Normaliza el nombre del formato para mostrarlo (EAN_13 -> EAN-13). */
const formatBarcodeType = (format: string): string => {
  return format.replace(/_/g, '-').toUpperCase()
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  continuous = false,
  mode = 'barcode'
}) => {
  const isQrMode = mode === 'qr'

  // IDs únicos por instancia (evita colisiones si hay varios escáneres).
  const reactId = useId()
  const manualInputId = `barcode-manual-${reactId}`

  // Contenedor donde Quagga inyecta <video>/<canvas> (solo barras).
  const scannerRef = useRef<HTMLDivElement>(null)
  // <video> donde ZXing pinta el stream en vivo para QR.
  const videoRef = useRef<HTMLVideoElement>(null)

  // Props frescas sin reiniciar la cámara.
  const onScanRef = useRef(onScan)
  const continuousRef = useRef(continuous)
  onScanRef.current = onScan
  continuousRef.current = continuous

  // Deduplicación de lecturas.
  const seenCodesRef = useRef<Set<string>>(new Set())
  const lastEmittedAtRef = useRef<Map<string, number>>(new Map())
  const duplicateNoticeAtRef = useRef<Map<string, number>>(new Map())
  const invalidNoticeAtRef = useRef(0)

  const [scannerStatus, setScannerStatus] =
    useState<ScannerStatus>('initializing')
  const [scannerError, setScannerError] = useState('')
  const [retryAttempt, setRetryAttempt] = useState(0)

  const [scanned, setScanned] = useState<IScannedCode[]>([])
  const [toast, setToast] = useState<IToast | null>(null)

  // Entrada manual.
  const [manualCode, setManualCode] = useState('')
  const [manualError, setManualError] = useState('')

  // Lectura por imagen.
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageProcessing, setImageProcessing] = useState(false)
  const [imageError, setImageError] = useState('')
  const imageInputRef = useRef<HTMLInputElement>(null)
  // Ref espejo de la URL de la vista previa: permite revocar la anterior y
  // liberar en el desmontaje sin cerrar sobre un valor de estado obsoleto.
  const imagePreviewUrlRef = useRef<string | null>(null)

  // Sugerencia de fallback a imagen tras SCAN_FALLBACK_DELAY_MS sin lectura.
  const [showImageHint, setShowImageHint] = useState(false)
  const hadValidScanRef = useRef(false)

  /**
   * Muestra una notificación temporal. Reemplaza cualquier toast anterior para
   * no apilar mensajes de la misma lectura.
   */
  const showToast = useCallback(
    (type: AlertInfoProps['type'], message: string): void => {
      setToast({ type, message })
    },
    []
  )

  /** Auto-descarta las notificaciones. */
  useEffect(() => {
    if (toast === null) {
      return
    }
    const timeout = window.setTimeout(() => {
      setToast(null)
    }, TOAST_DURATION_MS)
    return () => {
      window.clearTimeout(timeout)
    }
  }, [toast])

  /**
   * Procesa una lectura válida: dedup, historial y notificación al padre. El
   * mensaje de UI es NEUTRO ("código detectado"): el escáner no sabe ni afirma
   * si el producto se agregó al carrito (eso lo decide el consumidor).
   */
  const registerScan = useCallback(
    (code: string, format: string): void => {
      const now = Date.now()
      const isContinuous = continuousRef.current

      if (isContinuous) {
        const lastEmittedAt = lastEmittedAtRef.current.get(code) ?? 0
        if (now - lastEmittedAt < SCAN_COOLDOWN_MS) {
          return
        }
        lastEmittedAtRef.current.set(code, now)
      } else {
        const alreadyScanned = seenCodesRef.current.has(code)
        if (alreadyScanned) {
          const lastNoticeAt = duplicateNoticeAtRef.current.get(code) ?? 0
          if (now - lastNoticeAt >= DUPLICATE_NOTICE_COOLDOWN_MS) {
            duplicateNoticeAtRef.current.set(code, now)
            showToast(
              'warning',
              `El código ${code} ya fue leído en esta sesión.`
            )
          }
          return
        }
        seenCodesRef.current.add(code)
      }

      // Historial agrupado por código.
      setScanned((previous) => {
        const existing = previous.find((item) => item.code === code)
        const updatedCode: IScannedCode = {
          code,
          format,
          count: (existing?.count ?? 0) + 1,
          lastScannedAt: now
        }
        return [
          updatedCode,
          ...previous.filter((item) => item.code !== code)
        ].slice(0, MAX_HISTORY_ITEMS)
      })

      // Notifica al padre. Soporta callbacks async: esperamos y capturamos el
      // rechazo para no dejar promesas sin controlar.
      try {
        const maybePromise = onScanRef.current?.(code)
        if (
          maybePromise !== null &&
          maybePromise !== undefined &&
          typeof maybePromise.then === 'function'
        ) {
          maybePromise.catch((error: unknown) => {
            console.error('Barcode onScan async error:', error)
          })
        }
      } catch (error) {
        console.error('Barcode onScan callback error:', error)
        showToast('error', 'El código fue leído, pero no se pudo procesar.')
        return
      }

      showToast('info', `Código ${code} detectado.`)
    },
    [showToast]
  )

  /**
   * Procesa un código que NO viene de la cámara (entrada manual o imagen).
   * Valida el formato y lo entrega por el mismo canal (`registerScan`) para que
   * dedup, historial y `onScan` sean idénticos en todas las fuentes.
   *
   * @param rawCode - Código crudo.
   * @returns true si se aceptó y procesó; false si se rechazó.
   */
  const processExternalCode = useCallback(
    (rawCode: string): boolean => {
      const code = `${rawCode ?? ''}`.trim()
      if (code === '') {
        return false
      }
      // En QR el contenido es texto libre (URL/payload): ZXing ya validó que es
      // un QR. En barras exigimos un formato lineal válido.
      if (!isQrMode && !isValidAnyBarcode(code)) {
        return false
      }
      hadValidScanRef.current = true
      const format = isQrMode
        ? 'qr_code'
        : detectBarcodeFormat(code) ?? 'unknown'
      registerScan(code, format)
      return true
    },
    [registerScan, isQrMode]
  )

  /**
   * Ciclo de vida de la cámara de BARRAS (Quagga). En modo QR no se usa: la
   * cámara en vivo la maneja ZXing vía `useQrLiveScanner`.
   */
  useEffect(() => {
    if (isQrMode) {
      return
    }

    const target = scannerRef.current
    if (target === null) {
      return
    }

    let isActive = true
    let listenerAttached = false

    setScannerStatus('initializing')
    setScannerError('')

    if (typeof navigator.mediaDevices?.getUserMedia !== 'function') {
      setScannerStatus('error')
      setScannerError(
        window.isSecureContext
          ? 'Este navegador no permite acceder a la cámara.'
          : 'Para utilizar la cámara debes acceder mediante HTTPS o localhost.'
      )
      return
    }

    const handleDetected = (result: unknown): void => {
      if (!isActive) {
        return
      }
      const detection = result as IQuaggaDetection | null
      const code = detection?.codeResult?.code?.trim()
      if (code === undefined || code === '') {
        return
      }
      const now = Date.now()
      if (!isValidAnyBarcode(code)) {
        if (now - invalidNoticeAtRef.current >= INVALID_NOTICE_COOLDOWN_MS) {
          invalidNoticeAtRef.current = now
          showToast(
            'warning',
            'Se detectó un código, pero su formato no es válido.'
          )
        }
        return
      }
      hadValidScanRef.current = true
      const format =
        detection?.codeResult?.format ??
        (detectBarcodeFormat(code) ?? 'unknown')
      registerScan(code, format)
    }

    const handleCameraError = (error: unknown): void => {
      if (!isActive) {
        return
      }
      console.error('Quagga camera error:', error)
      setScannerStatus('error')
      setScannerError(getCameraErrorMessage(error))
    }

    try {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target,
            constraints: {
              facingMode: { ideal: 'environment' },
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          },
          locator: {
            patchSize: 'medium',
            halfSample: true
          },
          decoder: {
            readers: QUAGGA_READERS
          },
          locate: true
        },
        (error: unknown) => {
          if (!isActive) {
            return
          }
          if (error != null) {
            handleCameraError(error)
            return
          }
          try {
            Quagga.onDetected(handleDetected)
            listenerAttached = true
            Quagga.start()
            setScannerStatus('ready')
          } catch (startError) {
            if (listenerAttached) {
              Quagga.offDetected(handleDetected)
              listenerAttached = false
            }
            handleCameraError(startError)
          }
        }
      )
    } catch (error) {
      handleCameraError(error)
    }

    return () => {
      isActive = false
      if (listenerAttached) {
        Quagga.offDetected(handleDetected)
      }
      try {
        Quagga.stop()
      } catch {
        // El escáner podría no haber arrancado aún.
      }
    }
  }, [retryAttempt, registerScan, showToast, isQrMode])

  // Cámara QR EN VIVO (ZXing). Solo activa en modo QR. Entrega cada lectura por
  // el mismo flujo central (`processExternalCode`): dedup, historial y onScan.
  const { status: qrLiveStatus, error: qrLiveError } = useQrLiveScanner({
    enabled: isQrMode,
    videoRef,
    onResult: (text) => {
      processExternalCode(text)
    },
    retryKey: retryAttempt
  })

  /**
   * En modo QR el estado de la cámara lo determina el lector en vivo de ZXing.
   * Sincronizamos su estado con el estado general del escáner para reutilizar la
   * cabecera, el overlay y el botón "Reintentar" sin duplicar UI.
   */
  useEffect(() => {
    if (!isQrMode) {
      return
    }
    if (qrLiveStatus === 'ready') {
      setScannerStatus('ready')
      setScannerError('')
    } else if (qrLiveStatus === 'error') {
      setScannerStatus('error')
      setScannerError(qrLiveError)
    } else {
      setScannerStatus('initializing')
      setScannerError('')
    }
  }, [isQrMode, qrLiveStatus, qrLiveError])

  /**
   * Temporizador de fallback a imagen. Arranca cuando la cámara está activa y se
   * reinicia al reintentar. Si llega una lectura válida antes del plazo, no se
   * muestra la sugerencia. Un único timer por ciclo (sin duplicados ni fugas).
   */
  useEffect(() => {
    if (scannerStatus !== 'ready') {
      setShowImageHint(false)
      return
    }
    hadValidScanRef.current = false
    setShowImageHint(false)
    const timer = window.setTimeout(() => {
      if (!hadValidScanRef.current) {
        setShowImageHint(true)
      }
    }, SCAN_FALLBACK_DELAY_MS)
    return () => {
      window.clearTimeout(timer)
    }
  }, [scannerStatus, retryAttempt])

  /** Limpia el historial visual y reinicia la deduplicación. */
  const handleClearHistory = (): void => {
    setScanned([])
    seenCodesRef.current.clear()
    lastEmittedAtRef.current.clear()
    duplicateNoticeAtRef.current.clear()
    setToast(null)
  }

  /** Envía el código tecleado manualmente por el flujo central. */
  const handleManualSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    const value = manualCode.trim()
    if (value === '') {
      setManualError(isQrMode ? 'Ingresa un código QR.' : 'Ingresa un código.')
      return
    }
    const ok = processExternalCode(value)
    if (ok) {
      setManualCode('')
      setManualError('')
    } else {
      setManualError(
        isQrMode
          ? 'No se pudo procesar el código.'
          : 'El código no tiene un formato válido.'
      )
    }
  }

  /**
   * Asigna la vista previa de la imagen liberando SIEMPRE la URL anterior.
   * Toda la gestión de object URLs vive aquí y en el desmontaje (vía ref), nunca
   * dentro de un actualizador de estado.
   *
   * @param url - Nueva object URL o null para limpiar.
   */
  const setPreview = useCallback((url: string | null): void => {
    const previous = imagePreviewUrlRef.current
    if (previous !== null && previous !== url) {
      URL.revokeObjectURL(previous)
    }
    imagePreviewUrlRef.current = url
    setImagePreview(url)
  }, [])

  /** Lee un código desde la imagen seleccionada (decodificación local ZXing). */
  const handleImageSelected = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0]
    // Permite volver a elegir el mismo archivo más tarde.
    event.target.value = ''
    if (file === undefined) {
      return
    }

    setPreview(URL.createObjectURL(file))
    setImageError('')
    setImageProcessing(true)
    try {
      const result = await decodeBarcodeFromImage(
        file,
        isQrMode ? 'qr' : 'linear'
      )
      if (result.success && result.code !== null && result.code !== '') {
        const ok = processExternalCode(result.code)
        if (!ok) {
          setImageError('El código de la imagen no tiene un formato válido.')
        }
      } else {
        setImageError(result.message)
      }
    } catch (error) {
      // decodeBarcodeFromImage ya captura internamente, pero blindamos la UI.
      console.error('decodeBarcodeFromImage error:', error)
      setImageError(
        'No pudimos procesar la imagen. Intenta con otra foto más nítida.'
      )
    } finally {
      setImageProcessing(false)
    }
  }

  /** Limpia la vista previa de imagen y libera su URL. */
  const handleClearImage = useCallback((): void => {
    setPreview(null)
    setImageError('')
  }, [setPreview])

  // Libera la URL de la vista previa al desmontar (sin cerrar sobre estado).
  useEffect(() => {
    return () => {
      if (imagePreviewUrlRef.current !== null) {
        URL.revokeObjectURL(imagePreviewUrlRef.current)
        imagePreviewUrlRef.current = null
      }
    }
  }, [])

  const statusLabels: Record<ScannerStatus, string> = {
    initializing: 'Conectando cámara',
    ready: 'Cámara activa',
    error: 'Cámara no disponible'
  }

  const modeLabel = isQrMode ? 'QR' : 'Barras'
  const totalUniqueCodes = scanned.length

  return (
    <div
      className={`${styles.wrapper} ${isQrMode ? styles['wrapper--qr'] : ''}`}
    >
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.heading}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>
              {isQrMode ? 'Escáner QR' : 'Escáner de productos'}
            </h2>
            <span className={styles.modeBadge}>{modeLabel}</span>
          </div>
          <p className={styles.subtitle}>
            {isQrMode
              ? 'Apunta la cámara al QR, sube una imagen o ingrésalo manualmente'
              : 'Apunta al código, sube una imagen o ingrésalo manualmente'}
          </p>
        </div>

        <div
          className={`${styles.status} ${styles[`status--${scannerStatus}`]}`}
          role='status'
          aria-live='polite'
        >
          <span className={styles.statusDot} />
          <span className={styles.statusLabel}>
            {statusLabels[scannerStatus]}
          </span>
        </div>
      </header>

      {/* BODY: cámara (protagonista) + panel de herramientas */}
      <div className={styles.body}>
        {/* VISOR DE CÁMARA */}
        <section
          className={`${styles.cameraPane} ${isQrMode ? styles['cameraPane--qr'] : ''}`}
          aria-label='Visor de cámara'
        >
          <div className={styles.scanner} ref={isQrMode ? undefined : scannerRef}>
            {isQrMode && (
              <video
                ref={videoRef}
                className={styles.qrVideo}
                muted
                playsInline
                autoPlay
              />
            )}

            {/* Guía visual: solo cuando la cámara está activa */}
            {scannerStatus === 'ready' && (
              <div className={styles.scanGuide} aria-hidden='true'>
                <div
                  className={`${styles.scanFrame} ${isQrMode ? styles['scanFrame--qr'] : ''}`}
                >
                  <span className={styles.scanCorner} data-corner='tl' />
                  <span className={styles.scanCorner} data-corner='tr' />
                  <span className={styles.scanCorner} data-corner='bl' />
                  <span className={styles.scanCorner} data-corner='br' />
                  <span className={styles.scanLine} />
                </div>
                <p className={styles.guideText}>
                  {isQrMode
                    ? 'Centra el código QR'
                    : 'Centra el código de barras'}
                </p>
              </div>
            )}

            {/* Estados de cámara */}
            {scannerStatus !== 'ready' && (
              <div className={styles.cameraState}>
                {scannerStatus === 'initializing'
                  ? (
                      <div className={styles.cameraMessage}>
                        <span className={styles.loader} />
                        <strong>Activando cámara…</strong>
                        <p>Esperando acceso al dispositivo.</p>
                      </div>
                    )
                  : (
                      <div className={styles.cameraMessage}>
                        <span className={styles.errorIcon}>!</span>
                        <strong>No pudimos iniciar la cámara</strong>
                        <p>{scannerError}</p>
                        <button
                          type='button'
                          className={styles.retryButton}
                          onClick={() => {
                            setRetryAttempt((previous) => previous + 1)
                          }}
                        >
                          Reintentar
                        </button>
                        <span className={styles.cameraStateNote}>
                          También puedes subir una imagen o ingresar el código.
                        </span>
                      </div>
                    )}
              </div>
            )}
          </div>
        </section>

        {/* PANEL DE HERRAMIENTAS ALTERNATIVAS */}
        <aside className={styles.tools} aria-label='Herramientas alternativas'>
          <span className={styles.toolsTitle}>Otros métodos</span>

          {/* Lectura por imagen */}
          <div
            className={`${styles.tool} ${showImageHint ? styles['tool--hint'] : ''}`}
          >
            <div className={styles.toolHead}>
              <span className={styles.toolIcon} aria-hidden='true'>
                ⬒
              </span>
              <div className={styles.toolHeadText}>
                <strong className={styles.toolName}>Subir imagen</strong>
                <span className={styles.toolDesc}>
                  Lee el código desde una foto
                </span>
              </div>
            </div>

            {showImageHint && (
              <p className={styles.imageHint} aria-live='polite'>
                ¿La cámara no lee el código? Prueba con una foto nítida de la
                etiqueta.
              </p>
            )}

            <input
              ref={imageInputRef}
              className={styles.visuallyHidden}
              type='file'
              accept='image/jpeg,image/jpg,image/png,image/webp'
              capture='environment'
              onChange={(e) => {
                void handleImageSelected(e)
              }}
              aria-hidden='true'
              tabIndex={-1}
            />

            <div className={styles.toolActions}>
              <button
                type='button'
                className={styles.primaryButton}
                onClick={() => imageInputRef.current?.click()}
                disabled={imageProcessing}
              >
                {imageProcessing
                  ? 'Procesando…'
                  : imagePreview !== null
                    ? 'Reemplazar imagen'
                    : 'Seleccionar foto'}
              </button>

              {imagePreview !== null && (
                <button
                  type='button'
                  className={styles.ghostButton}
                  onClick={handleClearImage}
                  disabled={imageProcessing}
                >
                  Quitar
                </button>
              )}
            </div>

            {imagePreview !== null && (
              <div className={styles.imagePreviewWrap}>
                <img
                  className={styles.imagePreview}
                  src={imagePreview}
                  alt='Vista previa de la imagen seleccionada'
                />
              </div>
            )}

            {imageError !== '' && (
              <p className={styles.toolError} role='alert'>
                {imageError}
              </p>
            )}
          </div>

          {/* Entrada manual */}
          <form className={styles.tool} onSubmit={handleManualSubmit}>
            <div className={styles.toolHead}>
              <span className={styles.toolIcon} aria-hidden='true'>
                ⌨
              </span>
              <div className={styles.toolHeadText}>
                <label className={styles.toolName} htmlFor={manualInputId}>
                  Código manual
                </label>
                <span className={styles.toolDesc}>
                  {isQrMode ? 'Texto o URL del QR' : 'Escribe o pega el código'}
                </span>
              </div>
            </div>

            <div className={styles.manualRow}>
              <input
                id={manualInputId}
                className={styles.manualInput}
                type='text'
                inputMode='text'
                autoComplete='off'
                placeholder={isQrMode ? 'Contenido del QR' : 'Ej. 7701234567897'}
                value={manualCode}
                onChange={(e) => {
                  setManualCode(e.target.value)
                  if (manualError !== '') {
                    setManualError('')
                  }
                }}
                aria-label={isQrMode ? 'Código QR manual' : 'Código de barras manual'}
                aria-invalid={Boolean(manualError)}
              />
              <button
                type='submit'
                className={styles.primaryButton}
                disabled={manualCode.trim().length === 0}
              >
                Buscar
              </button>
            </div>

            {manualError !== '' && (
              <p className={styles.toolError} role='alert'>
                {manualError}
              </p>
            )}
          </form>
        </aside>
      </div>

      {/* HISTORIAL */}
      <section className={styles.results} aria-label='Historial de lecturas'>
        <div className={styles.resultsHeader}>
          <div className={styles.resultsHeadText}>
            <h3 className={styles.resultsTitle}>Historial</h3>
            <span className={styles.resultsCount}>
              {totalUniqueCodes === 0
                ? 'Sin lecturas'
                : `${totalUniqueCodes} ${totalUniqueCodes === 1 ? 'código' : 'códigos'}`}
            </span>
          </div>

          {totalUniqueCodes > 0 && (
            <button
              type='button'
              className={styles.clearButton}
              onClick={handleClearHistory}
            >
              Limpiar
            </button>
          )}
        </div>

        {scanned.length === 0
          ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon} aria-hidden='true'>
                  ▥
                </span>
                <p className={styles.emptyText}>
                  Las lecturas aparecerán aquí.
                </p>
              </div>
            )
          : (
              <ul className={styles.codeList}>
                {scanned.map((item) => (
                  <li key={item.code} className={styles.codeItem}>
                    <span className={styles.codeValue} title={item.code}>
                      {item.code}
                    </span>
                    <span className={styles.codeFormat}>
                      {formatBarcodeType(item.format)}
                    </span>
                    <span
                      className={styles.quantityBadge}
                      aria-label={`${item.count} lecturas`}
                    >
                      ×{item.count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
      </section>

      {/* NOTIFICACIONES */}
      {toast !== null && (
        <div className={styles.toast} role='status' aria-live='polite'>
          <AlertInfo message={toast.message} type={toast.type} />
        </div>
      )}
    </div>
  )
}
