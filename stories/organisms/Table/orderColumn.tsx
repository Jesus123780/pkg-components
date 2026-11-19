/** Comparador estable: ASC=0, DESC=1, valores inválidos siempre al final. */
export type SortDirection = 0 | 1
export interface OrderColumnInput { key: string; [key: string]: unknown }

const collator = new Intl.Collator('es', { numeric: true, sensitivity: 'base' })

export const resolvePath = (obj: unknown, path?: string): unknown => {
  if (!obj || !path) return undefined
  let current: any = obj
  for (const part of path.split('.').filter(Boolean)) {
    if (current == null) return undefined
    current = current[part]
  }
  return current
}

const normalize = (value: unknown): unknown => {
  if (value instanceof Date) return value.getTime()
  if (value && typeof value === 'object' && 'valueOf' in value && typeof value.valueOf === 'function') {
    const primitive = value.valueOf()
    if (primitive !== value) return primitive
  }
  return value
}

const invalid = (value: unknown) => value == null ||
  (typeof value === 'number' && Number.isNaN(value))

export const compareValues = (a: unknown, b: unknown, direction: SortDirection = 0): number => {
  const first = normalize(a)
  const second = normalize(b)
  if (invalid(first) && invalid(second)) return 0
  if (invalid(first)) return 1
  if (invalid(second)) return -1

  let diff: number
  if (typeof first === 'number' && typeof second === 'number') {
    diff = first < second ? -1 : first > second ? 1 : 0
  } else if (typeof first === 'boolean' && typeof second === 'boolean') {
    diff = Number(first) - Number(second)
  } else {
    diff = collator.compare(String(first), String(second))
  }
  return direction === 1 ? -diff : diff
}

export const orderColumn = (
  prev: Record<string, unknown>, post: Record<string, unknown>,
  currentColumn: OrderColumnInput = { key: '' }
): number => {
  if (!currentColumn.key) return 0
  return compareValues(resolvePath(prev, currentColumn.key), resolvePath(post, currentColumn.key),
    currentColumn[currentColumn.key] === 1 ? 1 : 0)
}

export const stableSort = <T,>(items: T[], compare: (a: T, b: T) => number): T[] =>
  items.map((value, index) => ({ value, index }))
    .sort((a, b) => compare(a.value, b.value) || a.index - b.index)
    .map(item => item.value)
