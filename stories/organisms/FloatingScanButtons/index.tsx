
'use client'

import React, {
  useEffect,
  useId,
  useRef,
  useState
} from 'react'

import { Icon } from '../../atoms'
import styles from './FloatingScanButtons.module.css'

export interface FloatingScanButtonsProps {
  onOpenQRModal?: () => void
  onOpenBarcodeModal?: () => void
  showQR?: boolean
  showBarcode?: boolean
}

export const FloatingScanButtons: React.FC<
  FloatingScanButtonsProps
> = ({
  onOpenQRModal,
  onOpenBarcodeModal,
  showQR = true,
  showBarcode = true
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  // Cerrar cuando no hay opciones disponibles.
  useEffect(() => {
    if (!showQR && !showBarcode) {
      setIsOpen(false)
    }
  }, [showQR, showBarcode])

  // Cierre externo y accesibilidad por teclado.
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (
        target instanceof Node &&
        !containerRef.current?.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      event.preventDefault()
      event.stopPropagation()

      setIsOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener(
      'pointerdown',
      handlePointerDown
    )

    document.addEventListener(
      'keydown',
      handleKeyDown,
      true
    )

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDown
      )

      document.removeEventListener(
        'keydown',
        handleKeyDown,
        true
      )
    }
  }, [isOpen])

  const handleAction = (callback?: () => void) => {
    if (!callback) return

    setIsOpen(false)
    callback()
  }

  if (!showQR && !showBarcode) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={styles.container}
      data-open={isOpen}
      role="group"
      aria-label="Herramientas de escaneo"
    >
      {/* Botón compacto anclado al borde derecho */}
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={
          isOpen
            ? 'Cerrar opciones de escaneo'
            : 'Abrir opciones de escaneo'
        }
        aria-controls={panelId}
        aria-expanded={isOpen}
        title={
          isOpen
            ? 'Cerrar escáneres'
            : 'Escanear productos'
        }
        onClick={() => setIsOpen(previous => !previous)}
      >
        <span
          className={styles.triggerScanner}
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 9V6a2 2 0 0 1 2-2h3" />
            <path d="M15 4h3a2 2 0 0 1 2 2v3" />
            <path d="M20 15v3a2 2 0 0 1-2 2h-3" />
            <path d="M9 20H6a2 2 0 0 1-2-2v-3" />
            <path d="M7 12h10" />
          </svg>
        </span>

        <span
          className={styles.triggerClose}
          aria-hidden="true"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </span>
      </button>

      {/* Panel que se despliega hacia la izquierda */}
      <div
        id={panelId}
        className={styles.panel}
        data-open={isOpen}
        aria-hidden={!isOpen}
      >
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>
            Escaneo rápido
          </span>

          <span className={styles.panelSubtitle}>
            Selecciona el tipo de código
          </span>
        </div>

        <div className={styles.actions}>
          {showQR && (
            <button
              type="button"
              className={styles.action}
              disabled={!onOpenQRModal}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => handleAction(onOpenQRModal)}
              aria-label="Escanear código QR"
              title="Escanear código QR"
            >
              <span
                className={`${styles.actionIcon} ${styles.qrIcon}`}
              >
                <Icon icon="IconQrCode" size={24} />
              </span>

              <span className={styles.actionContent}>
                <span className={styles.actionTitle}>
                  Código QR
                </span>
                <span className={styles.actionDescription}>
                  Cámara o imagen
                </span>
              </span>

              <span className={styles.actionArrow} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </button>
          )}

          {showBarcode && (
            <button
              type="button"
              className={styles.action}
              disabled={!onOpenBarcodeModal}
              tabIndex={isOpen ? 0 : -1}
              onClick={() =>
                handleAction(onOpenBarcodeModal)
              }
              aria-label="Escanear código de barras"
              title="Escanear código de barras"
            >
              <span
                className={`${styles.actionIcon} ${styles.barcodeIcon}`}
              >
                <Icon icon="IconBarcode" size={24} />
              </span>

              <span className={styles.actionContent}>
                <span className={styles.actionTitle}>
                  Código de barras
                </span>
                <span className={styles.actionDescription}>
                  Escanear producto
                </span>
              </span>

              <span className={styles.actionArrow} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

FloatingScanButtons.displayName = 'FloatingScanButtons'
