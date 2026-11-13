import type { CSSProperties, ReactNode } from 'react'

/** Mantiene los nombres originales (number, size, numberformat). */
export interface CounterAnimationProps {
  /** Valor numérico. Infinity/NaN se representan con invalidValue. */
  number: number
  /** Tamaño CSS válido (32px, 2rem, clamp(1.5rem, 3vw, 3rem), etc.). */
  size: string
  /** Activa el formato legado de-DE de dos decimales (true por defecto). */
  numberformat?: boolean
  /** Intl.NumberFormat locale. Valor legado: de-DE. */
  locale?: string
  /** Estilo de formato; percent multiplica por 100 según Intl. */
  formatStyle?: 'decimal' | 'currency' | 'percent'
  currency?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  minimumIntegerDigits?: number
  useGrouping?: boolean
  /** Formatter personalizado; tiene precedencia sobre Intl y numberformat. */
  formatter?: (value: number) => string
  /** Ayuda a identificar las columnas decimales con formatters personalizados. */
  decimalSeparator?: string
  invalidValue?: string

  /** Estilos de animación: reel (odómetro), compact (recorrido corto), none. */
  animation?: 'reel' | 'compact' | 'none'
  animated?: boolean
  animateOnMount?: boolean
  /** En milisegundos. */
  duration?: number
  delay?: number
  stagger?: number
  easing?: CSSProperties['transitionTimingFunction']
  /** auto usa el cambio del valor global; shortest usa el salto menor por dígito. */
  direction?: 'auto' | 'increase' | 'decrease' | 'shortest'
  onAnimationStart?: (value: number) => void
  onAnimationComplete?: (value: number) => void
  onValueChange?: (value: number, previous: number) => void

  variant?: 'plain' | 'soft' | 'card' | 'outline' | 'glass' | 'minimal'
  tone?: 'inherit' | 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
  weight?: CSSProperties['fontWeight']
  fontFamily?: CSSProperties['fontFamily']
  letterSpacing?: CSSProperties['letterSpacing']
  lineHeight?: number
  /** Ancho proporcional de cada dígito en em. */
  digitWidth?: number
  gap?: number | string
  align?: 'start' | 'center' | 'end'
  color?: string
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string | number
  padding?: string | number

  prefix?: ReactNode
  suffix?: ReactNode
  label?: ReactNode
  description?: ReactNode
  showTrend?: boolean
  trendFormatter?: (delta: number) => ReactNode
  /** Si true, los cambios se anuncian. Se recomienda false en contadores de alta frecuencia. */
  announceChanges?: boolean
  ariaLabel?: string
  ariaValueText?: string
  title?: string
  id?: string
  className?: string
  digitClassName?: string
  separatorClassName?: string
  valueClassName?: string
  style?: CSSProperties
  valueStyle?: CSSProperties
  'data-testid'?: string
}

export interface CounterToken {
  key: string
  char: string
  type: 'digit' | 'literal'
}

export type DiskDirection = 'increase' | 'decrease' | 'shortest'
