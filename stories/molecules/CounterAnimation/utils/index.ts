import type { CounterAnimationProps, CounterToken, DiskDirection } from '../types'

export interface IGetArrayOfNumber {
  number: number | string
  numberformat: boolean
}

const digitRegex = /^[0-9]$/
const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value))

/** Compatibilidad con utils anterior. Se mantiene la respuesta {isNegative,numbers}. */
export function getArrayOfNumber ({ number, numberformat }: IGetArrayOfNumber): {
  isNegative: boolean
  numbers: string[]
} {
  const value = Number(number)
  const formatted = numberformat
    ? formatCounterValue({
      number: value, size: '1em', numberformat: true,
      locale: undefined,
      formatStyle: undefined,
      currency: undefined,
      minimumFractionDigits: undefined,
      maximumFractionDigits: undefined,
      minimumIntegerDigits: undefined,
      useGrouping: undefined,
      formatter: undefined,
      invalidValue: undefined
    })
    : String(number)
  // En modo simple, el helper legado separaba el signo del arreglo.
  const numbers = !numberformat && formatted.startsWith('-')
    ? Array.from(formatted.slice(1))
    : Array.from(formatted)
  return { isNegative: value < 0, numbers }
}

export function formatCounterValue (options: Pick<CounterAnimationProps,
'number' | 'size' | 'numberformat' | 'locale' | 'formatStyle' | 'currency' |
'minimumFractionDigits' | 'maximumFractionDigits' | 'minimumIntegerDigits' |
'useGrouping' | 'formatter' | 'invalidValue'>): string {
  const {
    number, numberformat = true, locale = 'de-DE', formatStyle = 'decimal',
    currency = 'COP', minimumFractionDigits, maximumFractionDigits,
    minimumIntegerDigits, useGrouping = true, formatter, invalidValue = '—'
  } = options

  if (!Number.isFinite(number)) return invalidValue
  if (formatter) return String(formatter(number))
  if (!numberformat) return String(number)

  // Se respetan los dos decimales del componente anterior salvo configuración explícita.
  const minRequested = Number.isFinite(minimumFractionDigits) ? minimumFractionDigits! : 2
  const maxRequested = Number.isFinite(maximumFractionDigits) ? maximumFractionDigits! : Math.max(2, minRequested)
  const minFraction = clamp(Math.trunc(minRequested), 0, 20)
  const maxFraction = clamp(Math.trunc(maxRequested), minFraction, 20)
  const opts: Intl.NumberFormatOptions = {
    style: formatStyle,
    currency: formatStyle === 'currency' ? currency : undefined,
    minimumFractionDigits: minFraction,
    maximumFractionDigits: maxFraction,
    minimumIntegerDigits: clamp(Math.trunc(Number.isFinite(minimumIntegerDigits) ? minimumIntegerDigits! : 1), 1, 21),
    useGrouping,
    numberingSystem: 'latn' // Garantiza numerales 0-9 para los cilindros.
  }
  try {
    return new Intl.NumberFormat(locale, opts).format(number)
  } catch {
    return String(number)
  }
}

/** Resuelve el separador decimal real del locale; para formatos custom, úsese a voluntad. */
export function getDecimalSeparator (locale: string, numberformat: boolean): string {
  if (!numberformat) return '.'
  try {
    return new Intl.NumberFormat(locale, { numberingSystem: 'latn' })
      .formatToParts(1.1).find(item => item.type === 'decimal')?.value ?? '.'
  } catch {
    return '.'
  }
}

/**
 * Claves estables por valor posicional (unidades=int-0, decenas=int-1, etc.),
 * incluso al insertar separadores de miles o añadir dígitos a la izquierda.
 */
export function tokenizeCounterValue (formatted: string, decimalSeparator: string): CounterToken[] {
  const chars = Array.from(formatted)
  const decimalIndex = chars.lastIndexOf(decimalSeparator)
  const hasDecimal = decimalIndex >= 0 && chars.slice(decimalIndex + 1).some(c => digitRegex.test(c))
  const split = hasDecimal ? decimalIndex : chars.length
  const integerIndices = chars.map((c, i) => digitRegex.test(c) && i < split ? i : -1).filter(i => i >= 0)
  const fractionIndices = chars.map((c, i) => digitRegex.test(c) && i > split ? i : -1).filter(i => i >= 0)
  const positions = new Map<number, string>()
  integerIndices.forEach((index, i) => positions.set(index, `int-${integerIndices.length - i - 1}`))
  fractionIndices.forEach((index, i) => positions.set(index, `fraction-${i}`))
  return chars.map((char, i) => ({
    char,
    type: digitRegex.test(char) ? 'digit' : 'literal',
    key: positions.get(i) ?? `literal-${i}-${char}`
  }))
}

/** Ruta de odómetro; hasta 10 celdas normalmente, o 20 en una vuelta adicional explícita. */
export function getDiskNumbers (
  prevValue: number,
  value: number,
  isIncreasing: boolean,
  isLevelChanging = false
): number[] {
  const from = ((Math.trunc(prevValue) % 10) + 10) % 10
  const to = ((Math.trunc(value) % 10) + 10) % 10
  if (from === to && !isLevelChanging) return [to]
  const baseSteps = isIncreasing ? (to - from + 10) % 10 : (from - to + 10) % 10
  const naturallyWraps = isIncreasing ? to < from : to > from
  const steps = baseSteps + (isLevelChanging && !naturallyWraps ? 10 : 0)
  return Array.from({ length: steps + 1 }, (_, index) =>
    ((from + (isIncreasing ? index : -index)) % 10 + 10) % 10)
}

export function resolveDiskDirection (
  direction: DiskDirection,
  from: number,
  to: number
): boolean {
  if (direction === 'increase') return true
  if (direction === 'decrease') return false
  const forward = (to - from + 10) % 10
  const backward = (from - to + 10) % 10
  return forward <= backward
}

const utils = { getArrayOfNumber, getDiskNumbers }
export default utils
