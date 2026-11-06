// helpers/validateBarcode.ts
//
// Soporte multi-formato para códigos de barras lineales. La idea es NO pedirle
// el formato al usuario: lo detectamos a partir del valor (longitud + charset +
// dígito de control cuando aplica). JsBarcode (vía next-barcode) usa estos mismos
// nombres de formato.

export type BarcodeFormat =
  | 'EAN13'
  | 'EAN8'
  | 'UPC'
  | 'CODE128'
  | 'CODE39'

/** Lista de formatos soportados, en orden de preferencia para la detección. */
export const SUPPORTED_BARCODE_FORMATS: BarcodeFormat[] = [
  'EAN13',
  'UPC',
  'EAN8',
  'CODE39',
  'CODE128'
]

/**
 * Calcula el dígito de control tipo EAN/UPC (módulo 10 con pesos 3/1 desde la
 * derecha) sobre todos los dígitos excepto el último, y lo compara con el
 * último dígito del código.
 */
const hasValidEanUpcChecksum = (value: string): boolean => {
  const digits = value.split('').map(Number)
  const checkDigit = digits[digits.length - 1]
  const body = digits.slice(0, -1).reverse()

  const sum = body.reduce(
    (acc, digit, index) => acc + digit * (index % 2 === 0 ? 3 : 1),
    0
  )
  const calculated = (10 - (sum % 10)) % 10
  return calculated === checkDigit
}

const isValidEAN13 = (value: string): boolean => {
  if (!/^\d{13}$/.test(value)) return false
  return hasValidEanUpcChecksum(value)
}

const isValidEAN8 = (value: string): boolean => {
  if (!/^\d{8}$/.test(value)) return false
  return hasValidEanUpcChecksum(value)
}

/** UPC-A: 12 dígitos con checksum. (UPC-E de 8 se trata aparte si se requiere.) */
const isValidUPC = (value: string): boolean => {
  if (!/^\d{12}$/.test(value)) return false
  return hasValidEanUpcChecksum(value)
}

/**
 * CODE39: dígitos, mayúsculas A-Z y el set de símbolos permitidos (- . $ / + %
 * y espacio). No tiene checksum obligatorio.
 */
const isValidCODE39 = (value: string): boolean => {
  return /^[0-9A-Z\-.$/+%\s]+$/.test(value)
}

/**
 * CODE128: acepta prácticamente cualquier ASCII imprimible. Es el formato
 * "comodín" para códigos alfanuméricos que no calzan con los demás.
 */
const isValidCODE128 = (value: string): boolean => {
  return /^[\x20-\x7E]+$/.test(value) && value.length > 0
}

/**
 * Valida un valor contra un formato específico.
 */
export const validateBarcode = (
  value: string,
  format: BarcodeFormat = 'EAN13'
): boolean => {
  if (!value) return false
  switch (format) {
    case 'EAN13':
      return isValidEAN13(value)
    case 'EAN8':
      return isValidEAN8(value)
    case 'UPC':
      return isValidUPC(value)
    case 'CODE39':
      return isValidCODE39(value)
    case 'CODE128':
      return isValidCODE128(value)
    default:
      return false
  }
}

/**
 * Detecta automáticamente el formato de código de barras lineal a partir del
 * valor. Prioriza los formatos con checksum (EAN/UPC) y cae a CODE39/CODE128
 * para alfanuméricos. Devuelve `null` si no corresponde a ningún formato
 * soportado (p. ej. cadena vacía).
 */
export const detectBarcodeFormat = (value: string): BarcodeFormat | null => {
  const clean = (value ?? '').trim()
  if (!clean) return null

  // Numéricos con checksum: ordenar por longitud exacta.
  if (/^\d+$/.test(clean)) {
    if (clean.length === 13 && isValidEAN13(clean)) return 'EAN13'
    if (clean.length === 12 && isValidUPC(clean)) return 'UPC'
    if (clean.length === 8 && isValidEAN8(clean)) return 'EAN8'
    // Numérico pero sin checksum válido o longitud atípica -> CODE128 (soporta
    // cualquier cantidad de dígitos) para que al menos sea representable.
    return 'CODE128'
  }

  // Alfanumérico en MAYÚSCULAS y símbolos CODE39 -> CODE39.
  if (isValidCODE39(clean)) return 'CODE39'

  // Cualquier otro ASCII imprimible -> CODE128.
  if (isValidCODE128(clean)) return 'CODE128'

  return null
}

/**
 * Indica si un valor es un código de barras lineal válido en CUALQUIERA de los
 * formatos soportados.
 */
export const isValidAnyBarcode = (value: string): boolean => {
  return detectBarcodeFormat(value) !== null
}
