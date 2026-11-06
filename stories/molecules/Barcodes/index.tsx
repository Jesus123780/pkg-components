import React from 'react'
import { useBarcode } from 'next-barcode'
import { getGlobalStyle } from '../../../helpers'
import {
  detectBarcodeFormat,
  validateBarcode,
  type BarcodeFormat
} from './helper'

interface BarCodesProps {
  value: string
  /**
   * Formato forzado. Si no se provee, se detecta automáticamente a partir del
   * valor (EAN13, EAN8, UPC, CODE39 o CODE128).
   */
  format?: BarcodeFormat
}

// Par consistente usado como placeholder cuando el valor no es válido: evita
// que JsBarcode (vía next-barcode) lance "Not supported type to render on".
const PLACEHOLDER_VALUE = '0000000000000'
const PLACEHOLDER_FORMAT: BarcodeFormat = 'EAN13'

export const BarCodes: React.FC<BarCodesProps> = ({ value = '', format }) => {
  // Formato efectivo: el forzado por prop, o el detectado automáticamente.
  const detectedFormat = format ?? detectBarcodeFormat(value) ?? PLACEHOLDER_FORMAT
  const isValid = validateBarcode(value, detectedFormat)

  // JsBarcode lanza "InvalidElementException" en dos casos que debemos evitar:
  //   1. Recibe un valor que no cumple el formato (p. ej. un EAN-13 a medias
  //      mientras el usuario escribe) -> siempre le pasamos un par
  //      valor/formato consistente, cayendo a un placeholder válido.
  //   2. Su ref destino no está montado -> el <svg ref> SIEMPRE está en el DOM;
  //      solo alternamos su visibilidad.
  const { inputRef } = useBarcode({
    value: isValid ? value : PLACEHOLDER_VALUE,
    options: {
      background: getGlobalStyle('--color-background-gray-light'),
      format: isValid ? detectedFormat : PLACEHOLDER_FORMAT,
      displayValue: true
    }
  })

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          padding: '0.5rem',
          display: isValid ? 'block' : 'none'
        }}
      >
        <div style={{ width: 'max-content' }}>
          <svg ref={inputRef} style={{ display: 'block', height: 'auto' }} />
        </div>
      </div>
      {!isValid && (
        <div
          style={{
            padding: getGlobalStyle('--spacing-md'),
            backgroundColor: getGlobalStyle('--color-status-error-light'),
            borderRadius: getGlobalStyle('--border-radius-sm')
          }}
        >
          Código de barras inválido
        </div>
      )}
    </div>
  )
}

BarCodes.displayName = 'BarCodes'
