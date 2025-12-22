/**
 * Toggle a numeric dropdown index
 * @param current Current index or false
 * @param next Next index
 */
export const toggleIndex = (
  current: number | false,
  next: number
): number | false => (current === next ? false : next)
