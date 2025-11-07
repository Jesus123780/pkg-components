import { clamp } from '../utils/clamp'

export const handleSVKeyboard = (
  key: string,
  shiftKey: boolean,
  prev: { s: number; v: number }
) => {
  const step = shiftKey ? 10 : 3;
  let { s, v } = prev;

  if (key === 'ArrowUp') v = clamp(v + step, 0, 100);
  else if (key === 'ArrowDown') v = clamp(v - step, 0, 100);
  else if (key === 'ArrowLeft') s = clamp(s - step, 0, 100);
  else if (key === 'ArrowRight') s = clamp(s + step, 0, 100);
  else return prev;

  return { s, v };
};

export const handleHueKeyboard = (key: string, shiftKey: boolean, prev: number) => {
  const step = shiftKey ? 10 : 2;

  if (key === 'ArrowLeft') return clamp(prev - step, 0, 360);
  if (key === 'ArrowRight') return clamp(prev + step, 0, 360);
  if (key === 'Home') return 0;
  if (key === 'End') return 360;

  return prev;
};
