import { clamp } from '../utils/clamp'

export const calculateHue = (clientX: number, rect: DOMRect) => {
  return clamp(((clientX - rect.left) / rect.width) * 360, 0, 360);
};
