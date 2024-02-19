import React from 'react'
import { useBarcode } from 'next-barcode'
import { getGlobalStyle } from '../../../helpers'

interface BarcodesProps {
  value: string
}
export const Barcodes: React.FC<BarcodesProps> = ({ value = '' }) => {
  const empty = value === null || value === ''
  const { inputRef } = useBarcode({
    value: empty ? '123456789012' : value,
    options: {
      background: getGlobalStyle('--color-background-gray-light')
    }
  })

  return <svg ref={inputRef} />
}
