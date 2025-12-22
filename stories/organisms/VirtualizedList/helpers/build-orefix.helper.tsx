/** Build prefix-sum array for heights. O(n). */
export const buildPrefix = (heights: number[]) => {
  const prefix: number[] = new Array(heights.length + 1);
  prefix[0] = 0;
  for (let i = 0; i < heights.length; i++) {
    prefix[i + 1] = prefix[i] + heights[i];
  }
  return prefix;
};
