import { useState } from 'react'
import { calculateHue } from '../helpers/huePosition'
import { handleHueKeyboard } from '../helpers/keyboardHandlers'

export const useHue = () => {
  const [hue, setHue] = useState(0);

  const update = (clientX: number, rect: DOMRect) => {
    setHue(calculateHue(clientX, rect));
  };

  const onKey = (key: string, shiftKey: boolean) => {
    setHue(prev => handleHueKeyboard(key, shiftKey, prev));
  };

  return { hue, update, onKey };
};
