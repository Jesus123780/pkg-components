import React from 'react'
import { useBarcode } from 'next-barcode'
import { getGlobalStyle } from '../../../helpers'
import { validateBarcode } from './helper'

interface BarCodesProps {
  value: string
  format?: 'EAN13'
}

export const BarCodes: React.FC<BarCodesProps> = ({ value = '', format = 'EAN13' }) => {
  const empty = !value
  const { inputRef } = useBarcode({
    value: empty ? '0000000000000' : value,
    options: {
      background: getGlobalStyle('--color-background-gray-light'),
      format,
      displayValue: true
    }
  })
  const isValid = validateBarcode(value, format)

  if (isValid) {
    return (
      <div style={{ width: '100%', overflowX: 'auto', padding: '0.5rem' }}>
        <div style={{ width: 'max-content' }}>
          <svg ref={inputRef} style={{ display: 'block', height: 'auto' }} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: getGlobalStyle('--spacing-md'), backgroundColor: getGlobalStyle('--color-status-error-light'), borderRadius: getGlobalStyle('--border-radius-sm') }}>
      Código de barras inválido
    </div>
  )
}

BarCodes.displayName = 'BarCodes'
