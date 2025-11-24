// helpers/validateBarcode.ts
export const validateBarcode = (value: string, format: 'EAN13' = 'EAN13'): boolean => {
  switch (format) {
    case 'EAN13':
      return isValidEAN13(value)
    default:
      return false
  }
}

const isValidEAN13 = (value: string): boolean => {
  if (!/^\d{13}$/.test(value)) return false

  const digits = value.split('').map(Number)
  const checkDigit = digits[12]

  const sum =
    digits
      .slice(0, 12)
      .reduce((acc, digit, index) => acc + digit * (index % 2 === 0 ? 1 : 3), 0)

  const calculatedCheckDigit = (10 - (sum % 10)) % 10

  return calculatedCheckDigit === checkDigit
}
