import React from 'react'
import { useBarcode } from 'next-barcode'
import { getGlobalStyle } from '../../../helpers'

interface BarCodesProps {
  value: string
  format?: 'EAN13' | 'CODE128' // Permitir elección entre EAN-13 o Code 128
}

export const BarCodes: React.FC<BarCodesProps> = ({ value = '', format = 'CODE128' }) => {
  const empty = value === null || value === ''
  const { inputRef } = useBarcode({
    value: empty ? 'null' : value,
    options: {
      background: getGlobalStyle('--color-background-gray-light'),
      format, // Define el formato del código de barras
      displayValue: true // Muestra el valor debajo del código de barras
    }
  })

  return <svg ref={inputRef} />
}
