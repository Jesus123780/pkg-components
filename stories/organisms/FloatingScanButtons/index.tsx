import React from 'react'
import styles from './FloatingScanButtons.module.css'
import { Button, Icon } from '../../atoms'

/**
 * FloatingScanButtons
 *
 * Renders two floating action buttons (FABs) for triggering modals:
 * - One for barcode scanning
 * - One for QR code scanning
 *
 * @component
 * @param {Object} props
 * @param {() => void} props.onOpenQRModal - Callback to open the QR scan modal
 * @param {() => void} props.onOpenBarcodeModal - Callback to open the barcode scan modal
 * @returns {JSX.Element}
 */
export const FloatingScanButtons = ({ onOpenQRModal, onOpenBarcodeModal }: {
  onOpenQRModal: () => void
  onOpenBarcodeModal: () => void
}): JSX.Element => {
  return (
        <div className={styles.container}>
            <Button
                className={styles.fab}
                border='none'
                borderRadius='50%'
                onClick={onOpenQRModal}
                aria-label="Open QR Scanner"
            >
                <Icon icon='IconQrCode' size={24} />
            </Button>

            <Button
                border='none'
                borderRadius='50%'
                className={styles.fab}
                onClick={onOpenBarcodeModal}
                aria-label="Open Barcode Scanner"
            >
                <Icon icon='IconQrCode' size={24} />
            </Button>
        </div>
  )
}
