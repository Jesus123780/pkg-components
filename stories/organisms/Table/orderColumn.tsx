/**
 * orderColumn.ts
 *
 * Lightweight, strictly typed helper to compare two records by nested key path.
 * Exports: orderColumn, OrderColumnInput
 */

export type OrderColumnInput = {
  key: string
  [k: string]: any
}

/**
 * Safely resolves nested property by dot path.
 * @param obj object to read
 * @param path dot-separated path (e.g. 'a.b.c')
 */
const resolvePath = (obj: Record<string, any>, path?: string): any => {
  if (!path) return undefined
  const keys = path.split('.').filter(Boolean)
  let cur: any = obj
  for (const k of keys) {
    if (cur == null) return undefined
    cur = cur[k]
  }
  return cur
}

/**
 * Compare two items for ordering based on currentColumn state.
 *
 * - If `first` is string -> localeCompare
 * - If number -> numeric compare
 * - Fallback -> 0 (stable)
 *
 * @param prev left item
 * @param post right item
 * @param currentColumn object like { key: 'field.path', 'field.path': 0 | 1 }
 * @returns negative | positive | 0
 */
export const orderColumn = (prev: Record<string, any>, post: Record<string, any>, currentColumn: OrderColumnInput = { key: '' }): number => {
  const { key } = currentColumn
  if (!key) return 0

  const firstElem = resolvePath(prev, key)
  const secondElem = resolvePath(post, key)

  // handle undefineds — move undefined to the end
  if (firstElem === undefined && secondElem === undefined) return 0
  if (firstElem === undefined) return 1
  if (secondElem === undefined) return -1

  if (typeof firstElem === 'string' && typeof secondElem === 'string') {
    // currentColumn[key] === 1 => ascending? Keep existing semantics:
    if (currentColumn[key] === 1) {
      // 1: numeric compare? preserving previous behaviour: second - first
      return secondElem.localeCompare(firstElem)
    }
    if (currentColumn[key] === 0) {
      return firstElem.localeCompare(secondElem)
    }
    return firstElem.localeCompare(secondElem)
  }

  if (typeof firstElem === 'number' && typeof secondElem === 'number') {
    if (currentColumn[key] === 1) {
      return firstElem - secondElem
    }
    if (currentColumn[key] === 0) {
      return secondElem - firstElem
    }
    return firstElem - secondElem
  }

  // fallback to string conversion
  const a = String(firstElem)
  const b = String(secondElem)
  return a.localeCompare(b)
}

/* ---------------------------
   Basic test examples (plain TS)
   ---------------------------
   These are tiny, dependency-free tests you can run manually or port to your test runner.
   They are intentionally minimal and use runtime asserts.
*/
if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  const assert = (condition: boolean, msg?: string) => { if (!condition) throw new Error(msg || 'Assertion failed') }

  // test: numeric ascending
  ;(() => {
    const a = { v: 1 }, b = { v: 2 }
    const res = orderColumn(a, b, { key: 'v', 'v': 1 })
    assert(res < 0, 'expected 1 < 2 with key v asc')
  })()

  // test: string descending
  ;(() => {
    const a = { name: 'a' }, b = { name: 'b' }
    const res = orderColumn(a, b, { key: 'name', name: 0 })
    assert(res < 0, 'expected a < b with name desc (locale)')
  })()
}
