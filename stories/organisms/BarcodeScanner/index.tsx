
'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import Quagga from 'quagga'

import { AlertInfo, type AlertInfoProps } from '../../molecules'

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

type ScannerStatus =
  | 'initializing'
  | 'ready'
  | 'error'

export interface BarcodeScannerProps {
  /**
   * Called whenever a valid barcode is accepted.
   * The raw EAN-13 value is provided as a string.
   */
  onScan?: (code: string) => void

  /**
   * When enabled, the same barcode can be emitted again
   * after its individual cooldown period.
   */
  continuous?: boolean
}

const SCAN_COOLDOWN_MS = 1200
const DUPLICATE_NOTICE_COOLDOWN_MS = 2500
const INVALID_NOTICE_COOLDOWN_MS = 2500
const TOAST_DURATION_MS = 3500
const MAX_HISTORY_ITEMS = 12

/**
 * Validates the EAN-13 structure and check digit.
 */
const isValidEAN13 = (code: string): boolean => {
  if (!/^\d{13}$/.test(code)) {
    return false
  }

  const digits = code.slice(0, 12)

  const sum = [...digits].reduce(
    (total, digit, index) => {
      const weight = index % 2 === 0 ? 1 : 3

      return total + Number(digit) * weight
    },
    0
  )

  const expectedCheckDigit = (10 - (sum % 10)) % 10

  return expectedCheckDigit === Number(code[12])
}

/**
 * Provides a user-friendly camera error message.
 */
const getCameraErrorMessage = (error: unknown): string => {
  const errorName =
    typeof error === 'object' &&
    error !== null &&
    'name' in error
      ? String(error.name)
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

const formatBarcodeType = (format: string): string => {
  return format
    .replace(/_/g, '-')
    .toUpperCase()
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  continuous = false
}) => {
  const scannerRef = useRef<HTMLDivElement>(null)

  // Latest props without restarting the camera.
  const onScanRef = useRef(onScan)
  const continuousRef = useRef(continuous)

  onScanRef.current = onScan
  continuousRef.current = continuous

  // Scan deduplication.
  const seenCodesRef = useRef<Set<string>>(new Set())

  const lastEmittedAtRef = useRef<Map<string, number>>(
    new Map()
  )

  const duplicateNoticeAtRef = useRef<Map<string, number>>(
    new Map()
  )

  const invalidNoticeAtRef = useRef(0)

  const [scannerStatus, setScannerStatus] =
    useState<ScannerStatus>('initializing')

  const [scannerError, setScannerError] = useState('')

  const [retryAttempt, setRetryAttempt] = useState(0)

  const [scanned, setScanned] = useState<IScannedCode[]>([])

  const [toast, setToast] = useState<IToast | null>(null)

  /**
   * Displays a temporary notification.
   */
  const showToast = useCallback(
    (
      type: AlertInfoProps['type'],
      message: string
    ): void => {
      setToast({ type, message })
    },
    []
  )

  /**
   * Automatically dismisses notifications.
   */
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
   * Processes a valid EAN-13 detection.
   */
  const registerScan = useCallback(
    (
      code: string,
      format: string
    ): void => {
      const now = Date.now()
      const isContinuous = continuousRef.current

      if (isContinuous) {
        const lastEmittedAt =
          lastEmittedAtRef.current.get(code) ?? 0

        if (now - lastEmittedAt < SCAN_COOLDOWN_MS) {
          return
        }

        lastEmittedAtRef.current.set(code, now)
      } else {
        const alreadyScanned =
          seenCodesRef.current.has(code)

        if (alreadyScanned) {
          const lastNoticeAt =
            duplicateNoticeAtRef.current.get(code) ?? 0

          if (
            now - lastNoticeAt >=
            DUPLICATE_NOTICE_COOLDOWN_MS
          ) {
            duplicateNoticeAtRef.current.set(code, now)

            showToast(
              'warning',
              `El producto ${code} ya fue leído durante esta sesión.`
            )
          }

          return
        }

        seenCodesRef.current.add(code)
      }

      // Update the grouped scan history.
      setScanned((previous) => {
        const existing = previous.find(
          (item) => item.code === code
        )

        const updatedCode: IScannedCode = {
          code,
          format,
          count: (existing?.count ?? 0) + 1,
          lastScannedAt: now
        }

        return [
          updatedCode,
          ...previous.filter(
            (item) => item.code !== code
          )
        ].slice(0, MAX_HISTORY_ITEMS)
      })

      // Notify the parent component.
      try {
        onScanRef.current?.(code)
      } catch (error) {
        console.error('Barcode onScan callback error:', error)

        showToast(
          'error',
          'El código fue leído, pero no se pudo procesar.'
        )

        return
      }

      showToast(
        'info',
        `Código ${code} leído correctamente.`
      )
    },
    [showToast]
  )

  /**
   * Initializes and controls the Quagga camera lifecycle.
   */
  useEffect(() => {
    const target = scannerRef.current

    if (target === null) {
      return
    }

    let isActive = true
    let listenerAttached = false

    setScannerStatus('initializing')
    setScannerError('')

    // Avoid requesting the camera twice.
    // Quagga handles the actual getUserMedia request.
    if (
      !navigator.mediaDevices?.getUserMedia
    ) {
      setScannerStatus('error')

      setScannerError(
        window.isSecureContext
          ? 'Este navegador no permite acceder a la cámara.'
          : 'Para utilizar la cámara debes acceder mediante HTTPS o localhost.'
      )

      return
    }

    /**
     * Quagga detection listener.
     */
    const handleDetected = (result: unknown): void => {
      if (!isActive) {
        return
      }

      const detection =
        result as IQuaggaDetection | null

      const code = detection?.codeResult?.code?.trim()

      if (!code) {
        return
      }

      const now = Date.now()

      // Validate the EAN-13 checksum.
      if (!isValidEAN13(code)) {
        if (
          now - invalidNoticeAtRef.current >=
          INVALID_NOTICE_COOLDOWN_MS
        ) {
          invalidNoticeAtRef.current = now

          showToast(
            'warning',
            'Se detectó un código, pero no es un EAN-13 válido.'
          )
        }

        return
      }

      const format =
        detection?.codeResult?.format ?? 'ean_13'

      registerScan(code, format)
    }

    /**
     * Handles camera initialization errors.
     */
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
              facingMode: {
                ideal: 'environment'
              },
              width: {
                ideal: 1280
              },
              height: {
                ideal: 720
              }
            }
          },

          locator: {
            patchSize: 'medium',
            halfSample: true
          },

          decoder: {
            readers: ['ean_reader'],
            multiple: false
          },

          locate: true
        },
        (error) => {
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

      // Remove the exact listener registered above.
      if (listenerAttached) {
        Quagga.offDetected(handleDetected)
      }

      try {
        Quagga.stop()
      } catch {
        // The scanner might not have started yet.
      }
    }
  }, [retryAttempt, registerScan, showToast])

  /**
   * Clears the visual history and resets deduplication.
   */
  const handleClearHistory = (): void => {
    setScanned([])

    seenCodesRef.current.clear()
    lastEmittedAtRef.current.clear()
    duplicateNoticeAtRef.current.clear()

    setToast(null)
  }

  const statusLabels: Record<ScannerStatus, string> = {
    initializing: 'Conectando cámara',
    ready: 'Cámara activa',
    error: 'Cámara no disponible'
  }

  const totalUniqueCodes = scanned.length

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}

      <header className={styles.header}>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            Escáner de productos
          </h2>

          <p className={styles.subtitle}>
            Lectura de códigos de barras EAN-13
          </p>
        </div>

        <div
          className={`${styles.status} ${styles[`status--${scannerStatus}`]}`}
          role='status'
          aria-live='polite'
        >
          <span className={styles.statusDot} />

          <span>
            {statusLabels[scannerStatus]}
          </span>
        </div>
      </header>

      {/* SCANNER */}

      <div
        className={styles.scanner}
        ref={scannerRef}
      >
        {/* Visual scanning guide */}

        <div
          className={styles.scanGuide}
          aria-hidden='true'
        >
          <div className={styles.scanFrame}>
            <span className={styles.scanLine} />
          </div>

          <p className={styles.guideText}>
            Centra el código de barras dentro del recuadro
          </p>
        </div>

        {/* Camera states */}

        {scannerStatus !== 'ready' && (
          <div className={styles.cameraState}>
            {scannerStatus === 'initializing'
              ? (
                  <div className={styles.cameraMessage}>
                    <span className={styles.loader} />

                    <strong>
                      Activando cámara...
                    </strong>

                    <p>
                      Esperando acceso al dispositivo.
                    </p>
                  </div>
                )
              : (
                  <div className={styles.cameraMessage}>
                    <span className={styles.errorIcon}>
                      !
                    </span>

                    <strong>
                      No pudimos iniciar el escáner
                    </strong>

                    <p>
                      {scannerError}
                    </p>

                    <button
                      type='button'
                      className={styles.retryButton}
                      onClick={() => {
                        setRetryAttempt((previous) => previous + 1)
                      }}
                    >
                      Reintentar
                    </button>
                  </div>
                )}
          </div>
        )}
      </div>

      {/* SCAN INSTRUCTIONS */}

      <div className={styles.instructions}>
        <span className={styles.instructionsIcon}>
          i
        </span>

        <p>
          Mantén el código de barras horizontal y evita
          reflejos o movimientos bruscos para mejorar
          la lectura.
        </p>
      </div>

      {/* HISTORY */}

      <section className={styles.results}>
        <div className={styles.resultsHeader}>
          <div>
            <h3 className={styles.resultsTitle}>
              Historial de lecturas
            </h3>

            <p className={styles.resultsSubtitle}>
              Productos detectados durante esta sesión
            </p>
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
                <span className={styles.emptyIcon}>
                  ▥
                </span>

                <strong>
                  Todavía no hay lecturas
                </strong>

                <p>
                  Los productos escaneados aparecerán aquí.
                </p>
              </div>
            )
          : (
              <>
                <div className={styles.historyCounter}>
                  {totalUniqueCodes}
                  {' '}
                  {totalUniqueCodes === 1
                    ? 'producto detectado'
                    : 'productos detectados'}
                </div>

                <ul className={styles.codeList}>
                  {scanned.map((item) => (
                    <li
                      key={item.code}
                      className={styles.codeItem}
                    >
                      <div className={styles.codeInformation}>
                        <span className={styles.barcodeIcon}>
                          ▥
                        </span>

                        <div className={styles.codeDetails}>
                          <strong className={styles.codeValue}>
                            {item.code}
                          </strong>

                          <span className={styles.codeFormat}>
                            {formatBarcodeType(item.format)}
                          </span>
                        </div>
                      </div>

                      <span
                        className={styles.quantityBadge}
                        aria-label={`${item.count} lecturas`}
                      >
                        × {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
      </section>

      {/* NOTIFICATIONS */}

      {toast !== null && (
        <div className={styles.toast}>
          <AlertInfo
            message={toast.message}
            type={toast.type}
          />
        </div>
      )}
    </div>
  )
}
