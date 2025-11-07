import { useState } from 'react'
import { calculateSV } from '../helpers/svPosition'
import { handleSVKeyboard } from '../helpers/keyboardHandlers'

export const useSaturationValue = () => {
  const [sv, setSv] = useState({ s: 100, v: 100 })

  const update = (clientX: number, clientY: number, rect: DOMRect) => {
    setSv(calculateSV(clientX, clientY, rect))
  }

  const onKey = (key: string, shiftKey: boolean) => {
    setSv(prev => handleSVKeyboard(key, shiftKey, prev))
  }

  return { sv, update, onKey }
}
