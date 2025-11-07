import { clamp } from '../utils/clamp'

export const calculateSV = (clientX: number, clientY: number, rect: DOMRect) => {
  const s = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
  const v = clamp((1 - (clientY - rect.top) / rect.height) * 100, 0, 100);

  return { s, v };
};
