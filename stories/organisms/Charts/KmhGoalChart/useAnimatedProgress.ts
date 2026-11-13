'use client'

import { useEffect, useRef, useState } from 'react'
import { applyEasing, clamp } from './geometry'
import type { KmhGoalChartEasing } from './types'

interface AnimationOptions {
  animated: boolean
  animateOnMount: boolean
  duration: number
  delay: number
  easing: KmhGoalChartEasing
  onComplete?: () => void
}

/**
 * Animation is interruptible and continues from the current visual value.
 * Uses RAF for numerical easing (including custom functions); SVG path stays fixed.
 * Cancels RAF/listeners on prop changes or unmount. No timers / layout reads.
 */
export const useAnimatedProgress = (target: number, options: AnimationOptions): number => {
  const { animated, animateOnMount, duration, delay, easing, onComplete } = options
  const [visualValue, setVisualValue] = useState(() => animated && animateOnMount ? 0 : target)
  const currentRef = useRef(visualValue)
  const callbackRef = useRef(onComplete)
  callbackRef.current = onComplete

  useEffect(() => {
    const media = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null
    const finishInstantly = (): void => {
      currentRef.current = target
      setVisualValue(target)
    }

    if (!animated || !Number.isFinite(duration) || duration <= 0 || media?.matches) {
      finishInstantly()
      return
    }

    const from = currentRef.current
    if (Math.abs(from - target) < 0.00001) {
      finishInstantly()
      return
    }

    let frameId = 0
    let startTime: number | null = null
    let finished = false
    const safeDuration = clamp(duration, 1, 60000)
    const safeDelay = clamp(delay, 0, 60000)

    const frame = (time: number): void => {
      if (startTime === null) startTime = time + safeDelay
      if (time < startTime) {
        frameId = window.requestAnimationFrame(frame)
        return
      }
      const t = clamp((time - startTime) / safeDuration, 0, 1)
      const next = from + (target - from) * applyEasing(t, easing)
      currentRef.current = next
      setVisualValue(next)
      if (t < 1) {
        frameId = window.requestAnimationFrame(frame)
      } else {
        finished = true
        currentRef.current = target
        setVisualValue(target)
        callbackRef.current?.()
      }
    }

    const onMotionChange = (event: MediaQueryListEvent): void => {
      if (event.matches && !finished) {
        window.cancelAnimationFrame(frameId)
        finished = true
        finishInstantly()
      }
    }

    media?.addEventListener?.('change', onMotionChange)
    frameId = window.requestAnimationFrame(frame)
    return () => {
      window.cancelAnimationFrame(frameId)
      media?.removeEventListener?.('change', onMotionChange)
    }
  }, [target, animated, duration, delay, easing])

  return visualValue
}
