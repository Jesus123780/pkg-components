import React from 'react'
import { useBarcode } from 'next-barcode'
import { getGlobalStyle } from '../../../helpers'

interface BarCodesProps {
  value: string
}

export const BarCodes: React.FC<BarCodesProps> = ({ value = '' }) => {
  const empty = value === null || value === ''
  const { inputRef } = useBarcode({
    value: empty ? 'null' : value,
    options: {
      background: getGlobalStyle('--color-background-gray-light')
    }
  })

  return <svg ref={inputRef} />
}
