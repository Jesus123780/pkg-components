'use client'

import React, {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from 'react'

import type {
  CSSProperties,
  ReactNode
} from 'react'

import styles from './KmhGoalChart.module.css'

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
}

/* =========================================================
   HELPERS
========================================================= */

const clamp = (
  value: number,
  min: number,
  max: number
): number => {
  return Math.min(Math.max(value, min), max)
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians =
    ((angleInDegrees - 90) * Math.PI) / 180

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

/**
 * Construye un arco SVG a partir de:
 * - ángulo inicial
 * - ángulo recorrido
 * - dirección
 *
 * También soporta círculos completos, que SVG no dibuja
 * correctamente utilizando un único comando A de 360 grados.
 */
const describeArcSweep = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  sweep: number
): string => {
  const absoluteSweep = Math.abs(sweep)

  if (absoluteSweep < 0.001) {
    return ''
  }

  const sweepFlag = sweep >= 0 ? 1 : 0

  const start = polarToCartesian(
    centerX,
    centerY,
    radius,
    startAngle
  )

  const end = polarToCartesian(
    centerX,
    centerY,
    radius,
    startAngle + sweep
  )

  // Un círculo completo necesita dos arcos.
  if (absoluteSweep >= 359.999) {
    const middle = polarToCartesian(
      centerX,
      centerY,
      radius,
      startAngle + sweep / 2
    )

    return [
      `M ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 1 ${sweepFlag} ${middle.x} ${middle.y}`,
      `A ${radius} ${radius} 0 1 ${sweepFlag} ${end.x} ${end.y}`
    ].join(' ')
  }

  const largeArcFlag = absoluteSweep > 180 ? 1 : 0

  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`
  ].join(' ')
}

const getSvgCoordinate = (
  value: number | string,
  viewBoxSize: number,
  fallback: number
): number => {
  if (typeof value === 'number') {
    return value
  }

  const normalized = value.trim()

  if (normalized.endsWith('%')) {
    const percentage = Number.parseFloat(normalized)

    return Number.isFinite(percentage)
      ? (percentage / 100) * viewBoxSize
      : fallback
  }

  const parsed = Number.parseFloat(normalized)

  return Number.isFinite(parsed) ? parsed : fallback
}

const applyEasing = (
  progress: number,
  easing: KmhGoalChartEasing
): number => {
  const t = clamp(progress, 0, 1)

  if (typeof easing === 'function') {
    const result = easing(t)

    return Number.isFinite(result)
      ? clamp(result, 0, 1)
      : t
  }

  switch (easing) {
    case 'linear':
      return t

    case 'ease-in':
      return t * t * t

    case 'ease-in-out':
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2

    case 'ease-out':
    default:
      return 1 - Math.pow(1 - t, 3)
  }
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export const KmhGoalChart = forwardRef<
HTMLDivElement,
KmhGoalChartProps
>(function KmhGoalChart (
  {
    current,
    goal,

    size = 250,
    width,
    height,

    viewBoxSize = 240,
    centerX = viewBoxSize / 2,
    centerY = viewBoxSize / 2,
    radius = 100,

    moneyFormat = false,
    numberFormat = (value: number) => value.toString(),
    valueFormatter,
    valueText,

    formatPercentage,

    showPercentage = true,
    showValue = true,

    fontSize = 'calc(10px + 1vw)',
    percentageFontSize = 'calc(10px + 1vw)',

    textColor = '#333',
    valueColor = '#666',

    textWeight = 'bold',
    valueFontWeight = 'normal',

    textPosition = {
      x: '50%',
      y: '58%'
    },

    percentagePosition = {
      x: '50%',
      y: '58%'
    },

    percentageTextOffsetY = -20,

    rotateText = false,

    bgColor = '#eee',
    fgColor,
    trackColor,
    progressColor,

    trackOpacity = 1,
    progressOpacity = 1,

    colorStops = [],
    progressGradient,

    themeColorVariable = '--color-primary-red',
    fallbackProgressColor = '#ff0000',

    strokeWidth = 15,
    trackStrokeWidth,
    progressStrokeWidth,

    strokeLinecap = 'round',
    trackLinecap,
    progressLinecap,

    strokeDasharray = '',
    trackDasharray,
    progressDasharray,

    showTrack = true,
    showProgress = true,

    orientation = 'horizontal',
    startAngle = 180,
    reverseDirection = false,
    sweepDirection = 'clockwise',
    sweepAngle,

    animated = true,
    animateOnMount = true,
    animationDuration = 900,
    animationDelay = 80,
    animationEasing = 'ease-out',
    onAnimationComplete,

    showTicks = false,
    tickCount = 4,
    tickLength = 5,
    tickGap = 3,
    tickColor,
    tickStrokeWidth = 2,

    showGoalMarker = false,
    goalMarkerColor,
    goalMarkerLength = 12,

    startLabel,
    endLabel,
    endpointLabelColor = '#777',
    endpointLabelFontSize = 11,

    showGlow = false,
    glowColor,
    glowBlur = 5,

    centerContent,
    children,

    caption,
    description,
    statusLabel,

    showOverflowLabel = false,
    overflowLabel,
    overflowColor = '#E67E22',

    showGoalReachedLabel = false,
    goalReachedLabel = 'Meta alcanzada',

    ariaLabel,
    ariaValueText,
    title,

    id,
    className,
    chartClassName,
    centerClassName,
    containerStyle,
    chartStyle
  },
  forwardedRef
) {
  /* =====================================================
     IDS
  ===================================================== */

  const reactId = useId()

  const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, '')

  const gradientId = `kmh-gradient-${safeId}`
  const glowId = `kmh-glow-${safeId}`

  /* =====================================================
     SAFE VALUES
  ===================================================== */

  const safeCurrent = Number.isFinite(current) ? current : 0
  const safeGoal = Number.isFinite(goal) ? goal : 0

  const rawPercentage = safeGoal > 0
    ? (safeCurrent / safeGoal) * 100
    : safeCurrent > 0
      ? 100
      : 0

  const percentage = clamp(rawPercentage, 0, 100)

  const isOverGoal = rawPercentage > 100
  const isGoalReached = rawPercentage >= 100 && safeGoal > 0

  /* =====================================================
     THEME COLOR
  ===================================================== */

  const [themeColor, setThemeColor] = useState(
    fallbackProgressColor
  )

  useEffect(() => {
    if (fgColor || progressColor) {
      return
    }

    const cssColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(themeColorVariable)
      .trim()

    if (cssColor) {
      setThemeColor(cssColor)
    }
  }, [
    fgColor,
    progressColor,
    themeColorVariable
  ])

  const baseProgressColor =
    progressColor ??
    fgColor ??
    themeColor

  const resolvedProgressColor = useMemo(() => {
    const sortedStops = [...colorStops].sort(
      (a, b) => a.minPercentage - b.minPercentage
    )

    let selectedColor = baseProgressColor

    sortedStops.forEach((stop) => {
      if (percentage >= stop.minPercentage) {
        selectedColor = stop.color
      }
    })

    return selectedColor
  }, [
    colorStops,
    percentage,
    baseProgressColor
  ])

  /* =====================================================
     ANIMATION
  ===================================================== */

  const initialPercentage =
    animated && animateOnMount
      ? 0
      : percentage

  const [visualPercentage, setVisualPercentage] = useState(
    initialPercentage
  )

  const visualPercentageRef = useRef(initialPercentage)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

    if (
      !animated ||
      prefersReducedMotion ||
      animationDuration <= 0
    ) {
      visualPercentageRef.current = percentage
      setVisualPercentage(percentage)
      return
    }

    const from = visualPercentageRef.current
    const duration = Math.max(1, animationDuration)
    const delay = Math.max(0, animationDelay)

    let startTime: number | null = null
    let animationFrame = 0

    const animateFrame = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp + delay
      }

      if (timestamp < startTime) {
        animationFrame = window.requestAnimationFrame(
          animateFrame
        )

        return
      }

      const elapsed = timestamp - startTime

      const linearProgress = clamp(
        elapsed / duration,
        0,
        1
      )

      const easedProgress = applyEasing(
        linearProgress,
        animationEasing
      )

      const nextPercentage =
        from +
        (percentage - from) * easedProgress

      visualPercentageRef.current = nextPercentage
      setVisualPercentage(nextPercentage)

      if (linearProgress < 1) {
        animationFrame = window.requestAnimationFrame(
          animateFrame
        )
      } else {
        visualPercentageRef.current = percentage
        setVisualPercentage(percentage)
        onAnimationComplete?.()
      }
    }

    animationFrame = window.requestAnimationFrame(
      animateFrame
    )

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [
    percentage,
    animated,
    animationDuration,
    animationDelay,
    animationEasing,
    onAnimationComplete
  ])

  /* =====================================================
     ARC GEOMETRY
  ===================================================== */

  const resolvedTrackWidth =
    trackStrokeWidth ?? strokeWidth

  const resolvedProgressWidth =
    progressStrokeWidth ?? strokeWidth

  const maxStrokeWidth = Math.max(
    resolvedTrackWidth,
    resolvedProgressWidth
  )

  const maxRadius = Math.max(
    1,
    viewBoxSize / 2 - maxStrokeWidth / 2 - 1
  )

  const resolvedRadius = clamp(
    radius,
    1,
    maxRadius
  )

  const resolvedSweepAngle = clamp(
    sweepAngle ?? (
      orientation === 'full'
        ? 360
        : 180
    ),
    1,
    360
  )

  // Se conserva el comportamiento anterior:
  // reverseDirection desplaza el gráfico 180 grados.
  const adjustedStartAngle =
    startAngle + (reverseDirection ? 180 : 0)

  const directionMultiplier =
    sweepDirection === 'counterclockwise'
      ? -1
      : 1

  const arcStartAngle =
    directionMultiplier === 1
      ? adjustedStartAngle - resolvedSweepAngle
      : adjustedStartAngle

  const trackPath = useMemo(() => {
    return describeArcSweep(
      centerX,
      centerY,
      resolvedRadius,
      arcStartAngle,
      directionMultiplier * resolvedSweepAngle
    )
  }, [
    centerX,
    centerY,
    resolvedRadius,
    arcStartAngle,
    directionMultiplier,
    resolvedSweepAngle
  ])

  const progressPath = useMemo(() => {
    const progressSweep =
      directionMultiplier *
      resolvedSweepAngle *
      (visualPercentage / 100)

    return describeArcSweep(
      centerX,
      centerY,
      resolvedRadius,
      arcStartAngle,
      progressSweep
    )
  }, [
    centerX,
    centerY,
    resolvedRadius,
    arcStartAngle,
    directionMultiplier,
    resolvedSweepAngle,
    visualPercentage
  ])

  /* =====================================================
     TICKS
  ===================================================== */

  const ticks = useMemo(() => {
    if (!showTicks) {
      return []
    }

    const safeTickCount = Math.max(
      1,
      Math.floor(tickCount)
    )

    const outerOffset =
      maxStrokeWidth / 2 + tickGap

    return Array.from(
      { length: safeTickCount + 1 },
      (_, index) => {
        const tickProgress = index / safeTickCount

        const angle =
          arcStartAngle +
          directionMultiplier *
          resolvedSweepAngle *
          tickProgress

        const innerPoint = polarToCartesian(
          centerX,
          centerY,
          resolvedRadius + outerOffset,
          angle
        )

        const outerPoint = polarToCartesian(
          centerX,
          centerY,
          resolvedRadius + outerOffset + tickLength,
          angle
        )

        return {
          id: index,
          x1: innerPoint.x,
          y1: innerPoint.y,
          x2: outerPoint.x,
          y2: outerPoint.y
        }
      }
    )
  }, [
    showTicks,
    tickCount,
    tickGap,
    tickLength,
    maxStrokeWidth,
    arcStartAngle,
    directionMultiplier,
    resolvedSweepAngle,
    centerX,
    centerY,
    resolvedRadius
  ])

  /* =====================================================
     GOAL MARKER
  ===================================================== */

  const goalMarker = useMemo(() => {
    const endAngle =
      arcStartAngle +
      directionMultiplier * resolvedSweepAngle

    const markerRadius =
      resolvedRadius + maxStrokeWidth / 2

    const innerPoint = polarToCartesian(
      centerX,
      centerY,
      markerRadius - goalMarkerLength / 2,
      endAngle
    )

    const outerPoint = polarToCartesian(
      centerX,
      centerY,
      markerRadius + goalMarkerLength / 2,
      endAngle
    )

    return {
      x1: innerPoint.x,
      y1: innerPoint.y,
      x2: outerPoint.x,
      y2: outerPoint.y
    }
  }, [
    arcStartAngle,
    directionMultiplier,
    resolvedSweepAngle,
    resolvedRadius,
    maxStrokeWidth,
    goalMarkerLength,
    centerX,
    centerY
  ])

  /* =====================================================
     TEXT / FORMATTING
  ===================================================== */

  const percentageX = getSvgCoordinate(
    percentagePosition.x,
    viewBoxSize,
    centerX
  )

  const percentageY = getSvgCoordinate(
    percentagePosition.y,
    viewBoxSize,
    centerY
  )

  const valueX = getSvgCoordinate(
    textPosition.x,
    viewBoxSize,
    centerX
  )

  const valueY = getSvgCoordinate(
    textPosition.y,
    viewBoxSize,
    centerY
  )

  const percentageTransform = rotateText
    ? `rotate(270 ${percentageX} ${percentageY + percentageTextOffsetY})`
    : undefined

  const valueTransform = rotateText
    ? `rotate(270 ${valueX} ${valueY})`
    : undefined

  const percentageContent = formatPercentage
    ? formatPercentage(percentage)
    : `${Math.round(percentage)}%`

  const formattedValue = valueText ??
    valueFormatter?.(safeCurrent, safeGoal) ??
    (
      moneyFormat
        ? `${numberFormat(safeCurrent)} de ${numberFormat(safeGoal)}`
        : `${safeCurrent} de ${safeGoal}`
    )

  /* =====================================================
     CENTER CONTENT
  ===================================================== */

  const customCenterContent =
    centerContent ?? children

  const hasCustomCenter =
    customCenterContent !== undefined &&
    customCenterContent !== null

  /* =====================================================
     STYLES
  ===================================================== */

  const resolvedChartStyle: CSSProperties = {
    width: width ?? size,
    height: height ?? size,
    ...chartStyle
  }

  const rootClassName = [
    styles.root,
    className
  ].filter(Boolean).join(' ')

  const resolvedTrackColor =
    trackColor ?? bgColor

  const resolvedTrackDasharray =
    trackDasharray || strokeDasharray || undefined

  const resolvedProgressDasharray =
    progressDasharray || strokeDasharray || undefined

  const progressStroke = progressGradient
    ? `url(#${gradientId})`
    : resolvedProgressColor

  const resolvedGlowColor =
    glowColor ?? resolvedProgressColor

  const defaultOverflowLabel =
    `+${Math.round(rawPercentage - 100)}% sobre la meta`

  const showMeta =
    caption ||
    description ||
    statusLabel ||
    (showOverflowLabel && isOverGoal) ||
    (showGoalReachedLabel && isGoalReached)

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      ref={forwardedRef}
      id={id}
      className={rootClassName}
      style={containerStyle}
      role="progressbar"
      aria-label={
        ariaLabel ??
        title ??
        'Progreso de objetivo'
      }
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Number(percentage.toFixed(2))}
      aria-valuetext={
        ariaValueText ??
        `${Math.round(percentage)}% del objetivo`
      }
      title={title}
    >
      <div
        className={[
          styles.chart,
          chartClassName
        ].filter(Boolean).join(' ')}
        style={resolvedChartStyle}
      >
        <svg
          className={styles.svg}
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {progressGradient && (
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={progressGradient.startColor}
                />

                <stop
                  offset="100%"
                  stopColor={progressGradient.endColor}
                />
              </linearGradient>
            )}

            {showGlow && (
              <filter
                id={glowId}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation={glowBlur}
                  result="blur"
                />

                <feFlood
                  floodColor={resolvedGlowColor}
                  result="glowColor"
                />

                <feComposite
                  in="glowColor"
                  in2="blur"
                  operator="in"
                  result="coloredGlow"
                />

                <feMerge>
                  <feMergeNode in="coloredGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>

          {/* Marcas del gráfico */}
          {ticks.map((tick) => (
            <line
              key={tick.id}
              className={styles.tick}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={tickColor ?? resolvedTrackColor}
              strokeWidth={tickStrokeWidth}
              strokeLinecap="round"
            />
          ))}

          {/* Arco de fondo */}
          {showTrack && (
            <path
              className={styles.track}
              d={trackPath}
              stroke={resolvedTrackColor}
              strokeWidth={resolvedTrackWidth}
              strokeOpacity={trackOpacity}
              strokeDasharray={resolvedTrackDasharray}
              strokeLinecap={
                trackLinecap ?? strokeLinecap
              }
            />
          )}

          {/* Arco de progreso */}
          {showProgress && progressPath && (
            <path
              className={styles.progress}
              d={progressPath}
              stroke={progressStroke}
              strokeWidth={resolvedProgressWidth}
              strokeOpacity={progressOpacity}
              strokeDasharray={resolvedProgressDasharray}
              strokeLinecap={
                progressLinecap ?? strokeLinecap
              }
              filter={
                showGlow
                  ? `url(#${glowId})`
                  : undefined
              }
            />
          )}

          {/* Indicador del objetivo */}
          {showGoalMarker && (
            <line
              className={styles.goalMarker}
              x1={goalMarker.x1}
              y1={goalMarker.y1}
              x2={goalMarker.x2}
              y2={goalMarker.y2}
              stroke={goalMarkerColor ?? resolvedProgressColor}
              strokeWidth={2}
              strokeLinecap="round"
            />
          )}

          {/* Etiquetas inicial y final */}
          {startLabel && (
            <text
              className={styles.endpointLabel}
              x={
                polarToCartesian(
                  centerX,
                  centerY,
                  resolvedRadius + maxStrokeWidth / 2 + 15,
                  arcStartAngle
                ).x
              }
              y={
                polarToCartesian(
                  centerX,
                  centerY,
                  resolvedRadius + maxStrokeWidth / 2 + 15,
                  arcStartAngle
                ).y
              }
              textAnchor="middle"
              fill={endpointLabelColor}
              fontSize={endpointLabelFontSize}
            >
              {startLabel}
            </text>
          )}

          {endLabel && (
            <text
              className={styles.endpointLabel}
              x={
                polarToCartesian(
                  centerX,
                  centerY,
                  resolvedRadius + maxStrokeWidth / 2 + 15,
                  arcStartAngle +
                    directionMultiplier * resolvedSweepAngle
                ).x
              }
              y={
                polarToCartesian(
                  centerX,
                  centerY,
                  resolvedRadius + maxStrokeWidth / 2 + 15,
                  arcStartAngle +
                    directionMultiplier * resolvedSweepAngle
                ).y
              }
              textAnchor="middle"
              fill={endpointLabelColor}
              fontSize={endpointLabelFontSize}
            >
              {endLabel}
            </text>
          )}

          {/* Porcentaje */}
          {!hasCustomCenter && showPercentage && (
            <text
              className={styles.percentageText}
              x={percentagePosition.x}
              y={percentagePosition.y}
              dy={percentageTextOffsetY}
              textAnchor="middle"
              fontSize={percentageFontSize}
              fill={textColor}
              fontWeight={textWeight}
              transform={percentageTransform}
            >
              {percentageContent}
            </text>
          )}

          {/* Valor actual frente a meta */}
          {!hasCustomCenter && showValue && (
            <text
              className={styles.valueText}
              x={textPosition.x}
              y={textPosition.y}
              textAnchor="middle"
              fontSize={fontSize}
              fill={valueColor}
              fontWeight={valueFontWeight}
              transform={valueTransform}
            >
              {formattedValue}
            </text>
          )}

          {title && (
            <title>{title}</title>
          )}
        </svg>

        {/* Contenido central personalizado */}
        {hasCustomCenter && (
          <div
            className={[
              styles.centerContent,
              centerClassName
            ].filter(Boolean).join(' ')}
          >
            {customCenterContent}
          </div>
        )}
      </div>

      {/* Información adicional */}
      {showMeta && (
        <div className={styles.meta}>
          {caption && (
            <div className={styles.caption}>
              {caption}
            </div>
          )}

          {description && (
            <div className={styles.description}>
              {description}
            </div>
          )}

          {statusLabel && (
            <div className={styles.statusLabel}>
              {statusLabel}
            </div>
          )}

          {showOverflowLabel && isOverGoal && (
            <div
              className={styles.overflowLabel}
              style={{ color: overflowColor }}
            >
              {overflowLabel ?? defaultOverflowLabel}
            </div>
          )}

          {showGoalReachedLabel && isGoalReached && (
            <div className={styles.goalReachedLabel}>
              {goalReachedLabel}
            </div>
          )}
        </div>
      )}
    </div>
  )
})

KmhGoalChart.displayName = 'KmhGoalChart'

/* =========================================================
   COMPANION COMPONENT: LEGEND
========================================================= */

export interface KmhGoalChartLegendProps {
  items: KmhGoalChartLegendItem[]
  layout?: 'horizontal' | 'vertical'
  gap?: number | string
  dotSize?: number
  className?: string
}

export const KmhGoalChartLegend: React.FC<
KmhGoalChartLegendProps
> = ({
  items,
  layout = 'horizontal',
  gap = 14,
  dotSize = 9,
  className
}) => {
  return (
    <div
      className={[
        styles.legend,
        layout === 'vertical'
          ? styles.legendVertical
          : styles.legendHorizontal,
        className
      ].filter(Boolean).join(' ')}
      style={{ gap }}
    >
      {items.map((item, index) => (
        <div
          key={item.id ?? `${item.label}-${index}`}
          className={styles.legendItem}
        >
          <span
            className={styles.legendSwatch}
            style={{
              backgroundColor: item.color,
              width: dotSize,
              height: dotSize
            }}
            aria-hidden="true"
          />

          <div className={styles.legendContent}>
            <span className={styles.legendLabel}>
              {item.label}
            </span>

            {item.description && (
              <span className={styles.legendDescription}>
                {item.description}
              </span>
            )}
          </div>

          {item.value !== undefined && (
            <span className={styles.legendValue}>
              {item.value}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
