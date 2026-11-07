import React from 'react'
import styles from './FloatingScanButtons.module.css'
import { Button, Icon } from '../../atoms'

export interface FloatingScanButtonsProps {
  /** Abre el escáner de códigos QR. */
  onOpenQRModal?: () => void
  /** Abre el escáner de códigos de barras. */
  onOpenBarcodeModal?: () => void
  /** Oculta el botón de QR si la pantalla no usa QR. Por defecto se muestra. */
  showQR?: boolean
  /** Oculta el botón de barras. Por defecto se muestra. */
  showBarcode?: boolean
}

/**
 * FloatingScanButtons
 *
 * Botones flotantes (FAB) para abrir los escáneres. Diferencia claramente:
 *  - QR      → icono IconQrCode   → `onOpenQRModal`
 *  - Barras  → icono IconBarcode  → `onOpenBarcodeModal`
 *
 * Cada botón expone `aria-label` y `title` (tooltip nativo) para accesibilidad.
 * Los callbacks son independientes: un botón nunca abre el flujo del otro.
 */
export const FloatingScanButtons: React.FC<FloatingScanButtonsProps> = ({
  onOpenQRModal,
  onOpenBarcodeModal,
  showQR = true,
  showBarcode = true
}) => {
  return (
    <div className={styles.container} role="group" aria-label="Escáneres">
      {showQR && (
        <Button
          className={styles.fab}
          border="none"
          borderRadius="50%"
          onClick={onOpenQRModal}
          aria-label="Escanear código QR"
          title="Escanear código QR"
        >
          <Icon icon="IconQrCode" size={24} />
        </Button>
      )}

      {showBarcode && (
        <Button
          border="none"
          borderRadius="50%"
          className={styles.fab}
          onClick={onOpenBarcodeModal}
          aria-label="Escanear código de barras"
          title="Escanear código de barras"
        >
          <Icon icon="IconBarcode" size={24} />
        </Button>
      )}
    </div>
  )
}

FloatingScanButtons.displayName = 'FloatingScanButtons'
