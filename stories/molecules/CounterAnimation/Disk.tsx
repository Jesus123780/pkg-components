'use client'

import { memo, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FC, TransitionEvent } from 'react'
import styles from './CounterAnimation.module.css'
import { getDiskNumbers } from './utils'

/** API original de Disk conservada; las nuevas opciones son opcionales. */
export interface DiskProps {
  delay: number
  number: string
  prevNumber: string
  isIncreasing: boolean
  level: boolean
  size: string
  initialValue: number
  unit?: 'px' | 'em' | 'rem'
  duration?: number
  staggerDelay?: number
  easing?: CSSProperties['transitionTimingFunction']
  animated?: boolean
  digitClassName?: string
  lineHeight?: number
  digitWidth?: number
}

const sanitize = (value: string): number => {
  const number = Number(value)
  return Number.isFinite(number) ? Math.max(0, Math.min(9, Math.trunc(number))) : 0
}

const getFontSize = (size: string, unit?: 'px' | 'em' | 'rem'): string =>
  unit && /^\d+(?:\.\d+)?$/.test(size.trim()) ? `${size}${unit}` : size

/**
 * Una sola transición CSS de transform por cambio. La ruta tiene <=10 celdas,
 * sin re-render por frame, sin Math.random y con rAF cancelable.
 */
const DiskImpl: FC<DiskProps> = ({
  delay,
  number,
  prevNumber,
  isIncreasing,
  level,
  size,
  unit,
  duration,
  staggerDelay = 0,
  easing = 'cubic-bezier(.22,1,.36,1)',
  animated = true,
  digitClassName,
  lineHeight = 1.12,
  digitWidth = 0.64
}) => {
  const from = sanitize(prevNumber)
  const to = sanitize(number)
  // Disk antiguo desactivaba el giro cuando level=true; se conserva.
  const steps = useMemo(() => level ? [to] : getDiskNumbers(from, to, isIncreasing), [from, to, isIncreasing, level])
  const [playing, setPlaying] = useState(!animated || steps.length <= 1)
  const [settled, setSettled] = useState(!animated || steps.length <= 1)
  const rafs = useRef<number[]>([])
  const shouldAnimate = animated && steps.length > 1 && (duration ?? delay) > 0

  useLayoutEffect(() => {
    rafs.current.forEach(id => cancelAnimationFrame(id))
    rafs.current = []
    if (!shouldAnimate) {
      setPlaying(true)
      setSettled(true)
      return
    }
    setPlaying(false)
    setSettled(false)
    // Dos frames fuerzan la aplicación del transform inicial antes de transicionar.
    const first = requestAnimationFrame(() => {
      const second = requestAnimationFrame(() => setPlaying(true))
      rafs.current.push(second)
    })
    rafs.current.push(first)
    return () => {
      rafs.current.forEach(id => cancelAnimationFrame(id))
      rafs.current = []
    }
  }, [from, to, isIncreasing, level, shouldAnimate, duration, delay, staggerDelay, easing])

  const actualDigits = settled ? [to] : steps
  const shift = settled ? 0 : playing ? Math.max(0, steps.length - 1) : 0
  const fontSize = getFontSize(size, unit)
  const reelStyle: CSSProperties = {
    transform: `translate3d(0, ${(-shift * lineHeight).toFixed(4)}em, 0)`,
    transitionDuration: shouldAnimate && !settled ? `${Math.max(0, duration ?? delay)}ms` : '0ms',
    transitionDelay: shouldAnimate && !settled ? `${Math.max(0, staggerDelay)}ms` : '0ms',
    transitionTimingFunction: easing
  }

  const windowStyle: CSSProperties = {
    fontSize,
    height: `${lineHeight}em`,
    minWidth: `${digitWidth}em`,
    width: `${digitWidth}em`
  }

  return (
    <span className={[styles.digitWindow, digitClassName].filter(Boolean).join(' ')}
      style={windowStyle} data-testid="counter-digit" data-digit={to} aria-hidden="true">
      <span
        className={styles.reel}
        style={reelStyle}
        onTransitionEnd={(event: TransitionEvent<HTMLSpanElement>) => {
          if (playing && event.target === event.currentTarget && event.propertyName === 'transform') {
            setSettled(true)
          }
        }}
      >
        {actualDigits.map((digit, index) => (
          <span className={styles.cell} style={{ height: `${lineHeight}em` }}
            key={`${index}-${digit}`}>{digit}</span>
        ))}
      </span>
    </span>
  )
}

DiskImpl.displayName = 'Disk'
export const Disk = memo(DiskImpl)
