import { useState, useEffect } from 'react'
import { hsvToHex } from '../utils/hsvToHex'

export const useHex = (
  hue: number,
  sv: { s: number; v: number },
  onChange?: (hex: string) => void,
  initial: string = '#ff0000'
) => {
  const [hex, setHex] = useState(initial);

  useEffect(() => {
    const next = hsvToHex(hue, sv.s, sv.v);
    setHex(next);
    onChange?.(next);
  }, [hue, sv]);

  return { hex };
};
