import type { CSSProperties, ReactNode } from 'react'

/** Diseño ampliado sin romper las propiedades publicadas de KmhGoalChart. */
export type KmhGoalChartType = 'gauge' | 'semicircle' | 'quarter' | 'three-quarter' | 'radial' | 'donut' | 'custom'
export type KmhGoalChartVariant = 'plain' | 'soft' | 'card' | 'outline' | 'glass' | 'minimal'
export type KmhGoalChartTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
export type KmhGoalChartDensity = 'compact' | 'comfortable'

/** Zona opcional del arco, entre 0 y 100; ej. 0–40 peligro / 40–80 aviso. */
export interface KmhGoalChartZone {
  id?: string
  from: number
  to: number
  color: string
  label?: string
}

export interface KmhGoalChartRenderContext {
  current: number
  goal: number
  percentage: number
  rawPercentage: number
  isOverGoal: boolean
  isGoalReached: boolean
}

export interface KmhGoalChartPosition {
  x: number | string
  y: number | string
}

export type KmhGoalChartEasing =
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | ((progress: number) => number)

export interface KmhGoalChartColorStop {
  /**
   * Porcentaje mínimo a partir del cual se aplica el color.
   * Ejemplo: { minPercentage: 70, color: '#E6A23C' }
   */
  minPercentage: number
  color: string
}

export interface KmhGoalChartGradient {
  startColor: string
  endColor: string
}

export interface KmhGoalChartLegendItem {
  id?: string
  label: string
  color: string
  value?: ReactNode
  description?: string
}

export interface KmhGoalChartProps {
  /* =========================
     DATA
  ========================= */

  current: number
  goal: number

  /* =========================
     DIMENSIONS
  ========================= */

  size?: number | string
  width?: number | string
  height?: number | string

  viewBoxSize?: number
  centerX?: number
  centerY?: number
  radius?: number

  /* =========================
     FORMATTING
  ========================= */

  moneyFormat?: boolean
  numberFormat?: (value: number) => string
  valueFormatter?: (current: number, goal: number) => string | number
  valueText?: string | number

  formatPercentage?: (percentage: number) => string | number

  showPercentage?: boolean
  showValue?: boolean

  fontSize?: number | string
  percentageFontSize?: number | string

  textColor?: string
  valueColor?: string

  textWeight?: CSSProperties['fontWeight']
  valueFontWeight?: CSSProperties['fontWeight']

  textPosition?: KmhGoalChartPosition
  percentagePosition?: KmhGoalChartPosition
  percentageTextOffsetY?: number

  rotateText?: boolean

  /* =========================
     COLORS
  ========================= */

  bgColor?: string
  fgColor?: string
  trackColor?: string
  progressColor?: string

  trackOpacity?: number
  progressOpacity?: number

  colorStops?: KmhGoalChartColorStop[]
  progressGradient?: KmhGoalChartGradient

  themeColorVariable?: string
  fallbackProgressColor?: string

  /* =========================
     STROKES
  ========================= */

  strokeWidth?: number
  trackStrokeWidth?: number
  progressStrokeWidth?: number

  strokeLinecap?: 'butt' | 'round' | 'square'
  trackLinecap?: 'butt' | 'round' | 'square'
  progressLinecap?: 'butt' | 'round' | 'square'

  /**
   * Conserva la propiedad original.
   * Si se utiliza, se aplica a ambos trazos como patrón SVG.
   */
  strokeDasharray?: string

  trackDasharray?: string
  progressDasharray?: string

  showTrack?: boolean
  showProgress?: boolean

  /* =========================
     ARC CONFIGURATION
  ========================= */

  orientation?: 'horizontal' | 'full'
  startAngle?: number
  reverseDirection?: boolean

  /**
   * Dirección real del recorrido.
   * reverseDirection conserva el comportamiento anterior
   * de desplazar el gráfico al lado opuesto.
   */
  sweepDirection?: 'clockwise' | 'counterclockwise'

  /**
   * Permite crear arcos personalizados.
   * Por ejemplo: 90, 180, 240 o 360 grados.
   */
  sweepAngle?: number

  /* =========================
     ANIMATION
  ========================= */

  animated?: boolean
  animateOnMount?: boolean
  animationDuration?: number
  animationDelay?: number
  animationEasing?: KmhGoalChartEasing
  onAnimationComplete?: () => void

  /* =========================
     TICKS / MARKERS
  ========================= */

  showTicks?: boolean
  tickCount?: number
  tickLength?: number
  tickGap?: number
  tickColor?: string
  tickStrokeWidth?: number

  showGoalMarker?: boolean
  goalMarkerColor?: string
  goalMarkerLength?: number

  startLabel?: string
  endLabel?: string
  endpointLabelColor?: string
  endpointLabelFontSize?: number | string

  /* =========================
     EFFECTS
  ========================= */

  showGlow?: boolean
  glowColor?: string
  glowBlur?: number

  /* =========================
     ADDITIONAL CONTENT
  ========================= */

  centerContent?: ReactNode
  children?: ReactNode

  caption?: ReactNode
  description?: ReactNode
  statusLabel?: ReactNode

  showOverflowLabel?: boolean
  overflowLabel?: ReactNode
  overflowColor?: string

  showGoalReachedLabel?: boolean
  goalReachedLabel?: ReactNode

  /* =========================
     ACCESSIBILITY
  ========================= */

  ariaLabel?: string
  ariaValueText?: string
  title?: string

  /* =========================
     STYLING
  ========================= */

  id?: string
  className?: string
  chartClassName?: string
  centerClassName?: string
  containerStyle?: CSSProperties
  chartStyle?: CSSProperties

  /* EXTENSIONES - todas optativas para compatibilidad */
  chartType?: KmhGoalChartType
  variant?: KmhGoalChartVariant
  tone?: KmhGoalChartTone
  density?: KmhGoalChartDensity
  responsive?: boolean
  /** Etiquetas y zonas no modifican los cálculos del porcentaje. */
  zones?: readonly KmhGoalChartZone[]
  zoneOpacity?: number
  /** Muestra el indicador al final del progreso. */
  showProgressIndicator?: boolean
  indicatorRadius?: number
  indicatorColor?: string
  /** Formateo local: solo se usa cuando no se establece numberFormat. */
  locale?: string
  currency?: string
  /** Render prop alternativa a centerContent/children. */
  renderCenter?: (context: KmhGoalChartRenderContext) => ReactNode
  /** Incluye la leyenda dentro del componente, sin perder KmhGoalChartLegend. */
  legendItems?: readonly KmhGoalChartLegendItem[]
  legendLayout?: 'horizontal' | 'vertical'
  /** Se aplica al nodo principal para tests de integración. */
  testId?: string
}

export interface KmhGoalChartLegendProps {
  items: readonly KmhGoalChartLegendItem[]
  layout?: 'horizontal' | 'vertical'
  gap?: number | string
  dotSize?: number
  className?: string
}
