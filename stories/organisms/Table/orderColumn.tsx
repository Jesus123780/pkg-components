/**
 * orderColumn.ts
 *
 * Comparator robusto para tablas:
 * - 0 = ASC
 * - 1 = DESC
 * - null/undefined/NaN al final
 * - strings con Intl.Collator (numérico + case-insensitive)
 * - números, booleanos, Date y objetos convertibles
 * - soporta paths anidados: "user.profile.name"
 */

export type SortDirection = 0 | 1

export interface OrderColumnInput {
  key: string
  [k: string]: any
}

const collator = new Intl.Collator('es', {
  numeric: true,
  sensitivity: 'base'
})

export const resolvePath = (
  obj: Record<string, any> | null | undefined,
  path?: string
): any => {
  if (!obj || !path) return undefined

  const keys = path.split('.').filter(Boolean)
  let current: any = obj

  for (const key of keys) {
    if (current == null) return undefined
    current = current[key]
  }

  return current
}

const isNullish = (value: any): boolean => {
  return value === null || value === undefined
}

const isInvalidNumber = (value: any): boolean => {
  return typeof value === 'number' && Number.isNaN(value)
}

const normalizeComparable = (value: any): any => {
  if (value instanceof Date) return value.getTime()

  if (
    typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'boolean'
  ) {
    return value
  }

  if (value != null && typeof value.valueOf === 'function') {
    const primitive = value.valueOf()

    if (primitive !== value) {
      return primitive
    }
  }

  return value
}

export const compareValues = (
  firstValue: any,
  secondValue: any,
  direction: SortDirection = 0
): number => {
  const firstNullish =
    isNullish(firstValue) || isInvalidNumber(firstValue)

  const secondNullish =
    isNullish(secondValue) || isInvalidNumber(secondValue)

  // Nulls/undefined siempre al final. Esto evita "saltos" entre páginas.
  if (firstNullish && secondNullish) return 0
  if (firstNullish) return 1
  if (secondNullish) return -1

  const first = normalizeComparable(firstValue)
  const second = normalizeComparable(secondValue)

  let result = 0

  if (typeof first === 'number' && typeof second === 'number') {
    if (first < second) result = -1
    else if (first > second) result = 1
    else result = 0
  } else if (typeof first === 'boolean' && typeof second === 'boolean') {
    result = Number(first) - Number(second)
  } else {
    result = collator.compare(String(first), String(second))
  }

  return direction === 1 ? -result : result
}

export const orderColumn = (
  prev: Record<string, any>,
  post: Record<string, any>,
  currentColumn: OrderColumnInput = { key: '' }
): number => {
  const { key } = currentColumn

  if (!key) return 0

  const firstElem = resolvePath(prev, key)
  const secondElem = resolvePath(post, key)

  const rawDirection = currentColumn[key]
  const direction: SortDirection =
    rawDirection === 1 ? 1 : 0

  return compareValues(firstElem, secondElem, direction)
}

/**
 * Stable sort.
 *
 * Los elementos con el mismo valor conservan el orden original.
 * Esto evita el "flicker" cuando una tabla tiene muchos valores repetidos.
 */
export const stableSort = <T,>(
  data: T[],
  comparator: (a: T, b: T) => number
): T[] => {
  return data
    .map((value, index) => ({ value, index }))
    .sort((a, b) => {
      const result = comparator(a.value, b.value)
      return result !== 0 ? result : a.index - b.index
    })
    .map(item => item.value)
}
