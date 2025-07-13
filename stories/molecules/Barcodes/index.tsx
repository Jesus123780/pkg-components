import React from 'react'
import { useBarcode } from 'next-barcode'
import { getGlobalStyle } from '../../../helpers'

interface BarCodesProps {
  value: string
  format?: 'EAN13' | 'CODE128'
}

export const BarCodes: React.FC<BarCodesProps> = ({ value = '', format = 'CODE128' }) => {
  const empty = value === null || value === ''
  const { inputRef } = useBarcode({
    value: empty ? 'VACÍO' : value,
    options: {
      background: getGlobalStyle('--color-background-gray-light'),
      format,
      displayValue: true
    }
  })

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: '0.5rem'
      }}
    >
      <div style={{ width: 'max-content' }}>
        <svg
          ref={inputRef}
          style={{
            display: 'block',
            height: 'auto'
          }}
        />
      </div>
    </div>
  )
}
BarCodes.displayName = 'BarCodes'
