/** Binary search on prefix sums */
export const findIndexByScroll = (prefix: number[], value: number) => {
  let low = 0;
  let high = prefix.length - 1
  while (low < high) {
    const mid = (low + high) >> 1
    if (prefix[mid] <= value) low = mid + 1
    else high = mid
  }
  return Math.max(0, low - 1)
}