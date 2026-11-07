'use client'

import { useEffect, useRef, useState } from 'react'

import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType
} from '@zxing/library'

/** Estado del ciclo de vida de la cámara QR en vivo. */
export type QrLiveStatus = 'idle' | 'initializing' | 'ready' | 'error'

export interface UseQrLiveScannerOptions {
  /**
   * Activa el lector en vivo. Cuando pasa a false, se detiene la cámara y se
   * liberan los streams. Útil para arrancar solo en modo QR y con el modal
   * abierto.
   */
  enabled: boolean
  /** Elemento <video> donde se pinta el stream de la cámara. */
  videoRef: React.RefObject<HTMLVideoElement | null>
  /** Se invoca con el texto del QR cada vez que se decodifica uno. */
  onResult: (text: string) => void
  /**
   * Fuerza un reinicio del lector (p. ej. botón "Reintentar"). Cambiar este
   * número re-ejecuta el efecto de arranque.
   */
  retryKey?: number
}

export interface UseQrLiveScannerResult {
  status: QrLiveStatus
  /** Mensaje de error legible para la UI (vacío si no hay error). */
  error: string
}

/**
 * Mensaje de error amigable para fallos de cámara, consistente con el resto
 * del escáner.
 *
 * @param error - Error lanzado por getUserMedia/ZXing.
 * @returns Mensaje para mostrar al usuario.
 */
const getCameraErrorMessage = (error: unknown): string => {
  const errorName =
    typeof error === 'object' && error !== null && 'name' in error
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

/**
 * Lee códigos QR EN VIVO desde la cámara trasera usando ZXing
 * (`BrowserMultiFormatReader.decodeFromConstraints`). A diferencia de Quagga
 * (que NO decodifica QR), ZXing decodifica el stream de video cuadro a cuadro.
 *
 * Gestiona todo el ciclo de vida: arranque, estados (initializing/ready/error),
 * permisos, decodificación continua y liberación de la cámara al desmontar o
 * al deshabilitarse. El callback `onResult` se mantiene fresco vía ref para no
 * reiniciar la cámara cuando cambian las props del padre.
 *
 * @param options - Configuración del lector en vivo.
 * @returns Estado y mensaje de error del lector.
 */
export const useQrLiveScanner = ({
  enabled,
  videoRef,
  onResult,
  retryKey = 0
}: UseQrLiveScannerOptions): UseQrLiveScannerResult => {
  const [status, setStatus] = useState<QrLiveStatus>('idle')
  const [error, setError] = useState('')

  // Mantiene el callback fresco sin reiniciar la cámara.
  const onResultRef = useRef(onResult)
  onResultRef.current = onResult

  useEffect(() => {
    if (!enabled) {
      setStatus('idle')
      setError('')
      return
    }

    const video = videoRef.current
    if (video === null) {
      return
    }

    if (typeof navigator.mediaDevices?.getUserMedia !== 'function') {
      setStatus('error')
      setError(
        typeof window !== 'undefined' && window.isSecureContext
          ? 'Este navegador no permite acceder a la cámara.'
          : 'Para utilizar la cámara debes acceder mediante HTTPS o localhost.'
      )
      return
    }

    let isActive = true

    const hints = new Map()
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE])
    hints.set(DecodeHintType.TRY_HARDER, true)
    const reader = new BrowserMultiFormatReader(hints)

    setStatus('initializing')
    setError('')

    reader
      .decodeFromConstraints(
        {
          audio: false,
          video: { facingMode: { ideal: 'environment' } }
        },
        video,
        (result) => {
          if (!isActive) {
            return
          }
          // El stream ya está corriendo: la cámara está activa de verdad. Un
          // error NotFoundException por cuadro sin QR es normal; ZXing mantiene
          // el stream e intenta en el siguiente cuadro, así que solo reaccionamos
          // ante una lectura exitosa.
          setStatus((prev) => (prev === 'ready' ? prev : 'ready'))

          if (result !== null && result !== undefined) {
            const text = result.getText?.() ?? ''
            if (text !== '') {
              onResultRef.current(`${text}`)
            }
          }
        }
      )
      .catch((startError) => {
        if (!isActive) {
          return
        }
        setStatus('error')
        setError(getCameraErrorMessage(startError))
      })

    return () => {
      isActive = false
      try {
        reader.reset()
      } catch {
        // El lector puede no haber arrancado aún.
      }
    }
    // videoRef es estable; onResult se gestiona por ref.
  }, [enabled, retryKey])

  return { status, error }
}
