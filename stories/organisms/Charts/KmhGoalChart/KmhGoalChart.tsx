'use client'

import React, { forwardRef, memo, useId, useMemo } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import {
  clamp,
  createZonePaths,
  describeArcSweep,
  finite,
  getSvgCoordinate,
  getSweepAngle,
  polarToCartesian,
  resolveGoalMetrics
} from './geometry'
import { useAnimatedProgress } from './useAnimatedProgress'
import type {
  KmhGoalChartLegendProps,
  KmhGoalChartProps,
  KmhGoalChartRenderContext,
  KmhGoalChartVariant,
  KmhGoalChartTone,
  KmhGoalChartEasing
} from './types'
import styles from './KmhGoalChart.module.css'

// Type-only re-exports preserve imports from the original component path.
export type {
  KmhGoalChartProps,
  KmhGoalChartLegendProps,
  KmhGoalChartLegendItem,
  KmhGoalChartPosition,
  KmhGoalChartEasing,
  KmhGoalChartColorStop,
  KmhGoalChartGradient,
  KmhGoalChartType,
  KmhGoalChartVariant,
  KmhGoalChartTone,
  KmhGoalChartDensity,
  KmhGoalChartZone,
  KmhGoalChartRenderContext
} from './types'

const hasContent = (node: ReactNode): boolean =>
  node !== undefined && node !== null && node !== false && node !== ''

const variantClasses: Record<KmhGoalChartVariant, string> = {
  plain: styles.variantPlain,
  soft: styles.variantSoft,
  card: styles.variantCard,
  outline: styles.variantOutline,
  glass: styles.variantGlass,
  minimal: styles.variantMinimal
}

const toneClasses: Record<KmhGoalChartTone, string> = {
  primary: styles.tonePrimary,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
  neutral: styles.toneNeutral
}

interface ProgressLayerProps {
  percentage: number
  animated: boolean
  animateOnMount: boolean
  animationDuration: number
  animationDelay: number
  animationEasing: KmhGoalChartEasing
  onAnimationComplete?: () => void
  showProgress: boolean
  fullPath: string
  customProgressDash?: string
  cx: number
  cy: number
  resolvedRadius: number
  arcStart: number
  signedSweep: number
  progressStroke: string
  progressWidth: number
  progressOpacity: number
  strokeLinecap: 'round' | 'butt' | 'square'
  filterId?: string
  showProgressIndicator: boolean
  indicatorRadius: number
  indicatorColor: string
}

/** Isolates the 60fps re-renders from metadata, legend and chart geometry. */
const ProgressLayer = memo(function ProgressLayer ({
  percentage, animated, animateOnMount, animationDuration, animationDelay,
  animationEasing, onAnimationComplete, showProgress, fullPath,
  customProgressDash, cx, cy, resolvedRadius, arcStart, signedSweep,
  progressStroke, progressWidth, progressOpacity, strokeLinecap, filterId,
  showProgressIndicator, indicatorRadius, indicatorColor
}: ProgressLayerProps) {
  const visualPercentage = useAnimatedProgress(percentage, {
    animated, animateOnMount, duration: animationDuration,
    delay: animationDelay, easing: animationEasing, onComplete: onAnimationComplete
  })
  const progressPath = customProgressDash
    ? describeArcSweep(cx, cy, resolvedRadius, arcStart, signedSweep * clamp(visualPercentage, 0, 100) / 100)
    : fullPath
  const dot = polarToCartesian(cx, cy, resolvedRadius, arcStart + signedSweep * clamp(visualPercentage, 0, 100) / 100)
  if (!showProgress) return null
  return (
    <>
      <path
        data-testid="kmh-progress"
        className={styles.progress}
        d={progressPath}
        pathLength={customProgressDash ? undefined : 100}
        stroke={progressStroke}
        strokeWidth={progressWidth}
        strokeOpacity={visualPercentage <= 0 ? 0 : clamp(progressOpacity, 0, 1)}
        strokeDasharray={customProgressDash ?? '100 100'}
        strokeDashoffset={customProgressDash ? undefined : 100 - clamp(visualPercentage, 0, 100)}
        strokeLinecap={strokeLinecap}
        filter={filterId}
      />
      {showProgressIndicator && visualPercentage > 0 && (
        <circle className={styles.indicator} cx={dot.x} cy={dot.y}
          r={clamp(indicatorRadius, 0.5, 30)} fill={indicatorColor} />
      )}
    </>
  )
})

/**
 * Backward-compatible goal chart (semicircle, quarter, 3/4, radial and donut).
 * The original percentage rules, render slots, style props and SVG positions are retained.
 * Decorative SVG is aria-hidden; the forwarded div remains a semantic progressbar.
 */
export const KmhGoalChart = forwardRef<HTMLDivElement, KmhGoalChartProps>(
  function KmhGoalChart ({
    current,
    goal,
    size = 250,
    width,
    height,
    viewBoxSize = 240,
    centerX,
    centerY,
    radius = 100,
    moneyFormat = false,
    numberFormat,
    valueFormatter,
    valueText,
    formatPercentage,
    showPercentage = true,
    showValue = true,
    fontSize = 13,
    percentageFontSize = 26,
    textColor = 'var(--kgc-text)',
    valueColor = 'var(--kgc-muted)',
    textWeight = 750,
    valueFontWeight = 500,
    textPosition = { x: '50%', y: '58%' },
    percentagePosition = { x: '50%', y: '58%' },
    percentageTextOffsetY = -20,
    rotateText = false,
    bgColor = 'var(--kgc-track)',
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
    startAngle,
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
    endpointLabelColor = 'var(--kgc-muted)',
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
    overflowColor = 'var(--kgc-warning)',
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
    chartStyle,
    // Extensions
    chartType,
    variant = 'plain',
    tone = 'primary',
    density = 'comfortable',
    responsive = false,
    zones = [],
    zoneOpacity = 0.55,
    showProgressIndicator = false,
    indicatorRadius = 4,
    indicatorColor,
    locale,
    currency = 'COP',
    renderCenter,
    legendItems,
    legendLayout = 'horizontal',
    testId
  }, forwardedRef) {
    const reactId = useId()
    const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, '')
    const gradientId = `kmh-gradient-${safeId}`
    const glowId = `kmh-glow-${safeId}`
    const metrics = resolveGoalMetrics(current, goal)
    const { percentage, rawPercentage, isOverGoal, isGoalReached } = metrics
    const baseProgressColor = progressColor ?? fgColor ?? 'var(--kgc-progress)'
    const themeVariable = /^--[\w-]+$/.test(themeColorVariable) ? themeColorVariable : '--color-primary-red'
    const rootStyle = {
      '--kgc-theme-progress': `var(${themeVariable}, ${fallbackProgressColor})`,
      ...containerStyle
    } as CSSProperties

    const resolvedProgressColor = useMemo(() => {
      let color = baseProgressColor
      const ordered = [...colorStops].sort((a, b) => a.minPercentage - b.minPercentage)
      for (const stop of ordered) {
        if (percentage >= stop.minPercentage && stop.color) color = stop.color
      }
      return color
    }, [baseProgressColor, colorStops, percentage])

    const safeBox = clamp(viewBoxSize, 32, 4096)
    const cx = clamp(centerX ?? safeBox / 2, 0, safeBox)
    const cy = clamp(centerY ?? safeBox / 2, 0, safeBox)
    const trackWidth = clamp(trackStrokeWidth ?? strokeWidth, 0.5, safeBox / 3)
    const progressWidth = clamp(progressStrokeWidth ?? strokeWidth, 0.5, safeBox / 3)
    const widestStroke = Math.max(trackWidth, progressWidth)
    const extraSpace = Math.max(
      showTicks ? Math.max(0, tickGap) + Math.max(0, tickLength) + Math.max(0, tickStrokeWidth) / 2 : 0,
      showGoalMarker ? Math.max(0, goalMarkerLength) : 0,
      showProgressIndicator ? Math.max(0, indicatorRadius) : 0
    )
    const maxRadius = Math.max(1, Math.min(cx, cy, safeBox - cx, safeBox - cy) - widestStroke / 2 - extraSpace - 2)
    const resolvedRadius = clamp(radius, 1, maxRadius)
    const resolvedSweep = getSweepAngle(chartType, orientation, sweepAngle)
    // Preserve the old reverseDirection behavior: rotate 180°, not invert the sweep.
    const defaultEndAngle = chartType === 'semicircle' || chartType === 'quarter'
      ? 90
      : chartType === 'three-quarter' ? 135 : 180
    const adjustedStartAngle = finite(startAngle ?? defaultEndAngle, defaultEndAngle) + (reverseDirection ? 180 : 0)
    const direction = sweepDirection === 'counterclockwise' ? -1 : 1
    const arcStart = direction === 1 ? adjustedStartAngle - resolvedSweep : adjustedStartAngle
    const signedSweep = resolvedSweep * direction

    const fullPath = useMemo(() => describeArcSweep(cx, cy, resolvedRadius, arcStart, signedSweep), [cx, cy, resolvedRadius, arcStart, signedSweep])
    // A fixed full path + stroke-dashoffset is cheaper than reconstructing the path every frame.
    // Custom dash patterns retain the old partial-path behavior for compatibility.
    const customProgressDash = progressDasharray || strokeDasharray || undefined
    const customTrackDash = trackDasharray || strokeDasharray || undefined
    const zonePaths = useMemo(
      () => createZonePaths(zones, cx, cy, resolvedRadius, arcStart, signedSweep),
      [zones, cx, cy, resolvedRadius, arcStart, signedSweep]
    )

    const ticks = useMemo(() => {
      if (!showTicks) return []
      const count = clamp(Math.floor(tickCount), 1, 120)
      const outer = resolvedRadius + widestStroke / 2 + Math.max(0, tickGap)
      return Array.from({ length: count + 1 }, (_, index) => {
        const pointAngle = arcStart + (signedSweep * index / count)
        const a = polarToCartesian(cx, cy, outer, pointAngle)
        const b = polarToCartesian(cx, cy, outer + Math.max(0, tickLength), pointAngle)
        return { x1: a.x, y1: a.y, x2: b.x, y2: b.y }
      })
    }, [showTicks, tickCount, resolvedRadius, widestStroke, tickGap, tickLength, arcStart, signedSweep, cx, cy])

    const markerRadius = resolvedRadius + widestStroke / 2
    const markerA = polarToCartesian(cx, cy, markerRadius - Math.max(0, goalMarkerLength) / 2, arcStart + signedSweep)
    const markerB = polarToCartesian(cx, cy, markerRadius + Math.max(0, goalMarkerLength) / 2, arcStart + signedSweep)
    const startPoint = polarToCartesian(cx, cy, resolvedRadius + widestStroke / 2 + 15, arcStart)
    const endPoint = polarToCartesian(cx, cy, resolvedRadius + widestStroke / 2 + 15, arcStart + signedSweep)

    const percentageX = getSvgCoordinate(percentagePosition.x, safeBox, cx)
    const percentageY = getSvgCoordinate(percentagePosition.y, safeBox, cy)
    const valueX = getSvgCoordinate(textPosition.x, safeBox, cx)
    const valueY = getSvgCoordinate(textPosition.y, safeBox, cy)
    const percentageRotation = rotateText ? `rotate(270 ${percentageX} ${percentageY + percentageTextOffsetY})` : undefined
    const valueRotation = rotateText ? `rotate(270 ${valueX} ${valueY})` : undefined
    const formattedPercentage = formatPercentage ? formatPercentage(percentage) : `${Math.round(percentage)}%`
    const defaultFormat = (value: number): string => {
      if (numberFormat) return numberFormat(value)
      if (!locale) return String(value) // Retain legacy formatting by default.
      try {
        return new Intl.NumberFormat(locale, moneyFormat ? { style: 'currency', currency } : undefined).format(value)
      } catch { return String(value) }
    }
    const formattedValue = valueText ?? valueFormatter?.(metrics.current, metrics.goal) ??
      (moneyFormat ? `${defaultFormat(metrics.current)} de ${defaultFormat(metrics.goal)}` : `${metrics.current} de ${metrics.goal}`)

    const context: KmhGoalChartRenderContext = {
      ...metrics
    }
    // centerContent/children keep their legacy priority over any new render prop.
    const customCenter = centerContent ?? children ?? renderCenter?.(context)
    const hasCustomCenter = hasContent(customCenter)
    const showMeta = hasContent(caption) || hasContent(description) || hasContent(statusLabel) ||
      (showOverflowLabel && isOverGoal) || (showGoalReachedLabel && isGoalReached)
    const rootClass = [
      styles.root,
      variantClasses[variant] ?? styles.variantPlain,
      toneClasses[tone] ?? styles.tonePrimary,
      density === 'compact' ? styles.densityCompact : styles.densityComfortable,
      responsive ? styles.responsive : '',
      className
    ].filter(Boolean).join(' ')
    const chartClass = [styles.chart, chartClassName].filter(Boolean).join(' ')
    const centerClass = [styles.centerContent, centerClassName].filter(Boolean).join(' ')
    const resolvedChartStyle: CSSProperties = responsive
      ? { width: width ?? '100%', maxWidth: width ? undefined : size, height: height ?? 'auto', aspectRatio: '1', ...chartStyle }
      : { width: width ?? size, height: height ?? size, ...chartStyle }
    const progressStroke = progressGradient ? `url(#${gradientId})` : resolvedProgressColor
    const valueTextAria = ariaValueText ?? `${Math.round(percentage)}% del objetivo`

    return (
      <div
        ref={forwardedRef}
        id={id}
        data-testid={testId}
        data-chart-type={chartType ?? (orientation === 'full' ? 'radial' : 'gauge')}
        data-goal-reached={isGoalReached || undefined}
        className={rootClass}
        style={rootStyle}
        role={hasCustomCenter ? undefined : 'progressbar'}
        aria-label={hasCustomCenter ? undefined : ariaLabel ?? title ?? 'Progreso de objetivo'}
        aria-valuemin={hasCustomCenter ? undefined : 0}
        aria-valuemax={hasCustomCenter ? undefined : 100}
        aria-valuenow={hasCustomCenter ? undefined : Number(percentage.toFixed(2))}
        aria-valuetext={hasCustomCenter ? undefined : valueTextAria}
        title={title}
      >
        {/* A separate progressbar avoids flattening interactive centerContent in the ARIA tree. */}
        {hasCustomCenter && (
          <span className={styles.srOnly} role="progressbar"
            aria-label={ariaLabel ?? title ?? 'Progreso de objetivo'}
            aria-valuemin={0} aria-valuemax={100}
            aria-valuenow={Number(percentage.toFixed(2))}
            aria-valuetext={valueTextAria}
          />
        )}
        <div className={chartClass} style={resolvedChartStyle}>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${safeBox} ${safeBox}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              {progressGradient && (
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={progressGradient.startColor} />
                  <stop offset="100%" stopColor={progressGradient.endColor} />
                </linearGradient>
              )}
              {showGlow && (
                <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation={clamp(glowBlur, 0, 60)} result="blur" />
                  <feFlood floodColor={glowColor ?? resolvedProgressColor} result="glowColor" />
                  <feComposite in="glowColor" in2="blur" operator="in" result="coloredGlow" />
                  <feMerge><feMergeNode in="coloredGlow" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              )}
            </defs>

            {showTrack && (
              <path
                data-testid="kmh-track"
                className={styles.track}
                d={fullPath}
                stroke={trackColor ?? bgColor}
                strokeWidth={trackWidth}
                strokeOpacity={clamp(trackOpacity, 0, 1)}
                strokeDasharray={customTrackDash}
                strokeLinecap={trackLinecap ?? strokeLinecap}
              />
            )}

            {zonePaths.map(zone => (
              <path
                key={zone.key}
                className={styles.zone}
                d={zone.path}
                stroke={zone.color}
                strokeOpacity={clamp(zoneOpacity, 0, 1)}
                strokeWidth={trackWidth}
                strokeLinecap="butt"
              >
                {zone.label && <title>{zone.label}</title>}
              </path>
            ))}

            {showTicks && ticks.map((tick, index) => (
              <line
                key={index}
                className={styles.tick}
                x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2}
                stroke={tickColor ?? trackColor ?? bgColor}
                strokeWidth={clamp(tickStrokeWidth, 0.5, 20)}
                strokeLinecap="round"
              />
            ))}

            <ProgressLayer
              percentage={percentage}
              animated={animated}
              animateOnMount={animateOnMount}
              animationDuration={animationDuration}
              animationDelay={animationDelay}
              animationEasing={animationEasing}
              onAnimationComplete={onAnimationComplete}
              showProgress={showProgress}
              fullPath={fullPath}
              customProgressDash={customProgressDash}
              cx={cx} cy={cy} resolvedRadius={resolvedRadius}
              arcStart={arcStart} signedSweep={signedSweep}
              progressStroke={progressStroke}
              progressWidth={progressWidth}
              progressOpacity={progressOpacity}
              strokeLinecap={progressLinecap ?? strokeLinecap}
              filterId={showGlow ? `url(#${glowId})` : undefined}
              showProgressIndicator={showProgressIndicator}
              indicatorRadius={indicatorRadius}
              indicatorColor={indicatorColor ?? resolvedProgressColor}
            />

            {showGoalMarker && (
              <line
                className={styles.goalMarker}
                x1={markerA.x} y1={markerA.y} x2={markerB.x} y2={markerB.y}
                stroke={goalMarkerColor ?? resolvedProgressColor}
                strokeWidth={2}
                strokeLinecap="round"
              />
            )}

            {startLabel && (
              <text className={styles.endpointLabel} x={startPoint.x} y={startPoint.y}
                textAnchor="middle" fill={endpointLabelColor} fontSize={endpointLabelFontSize}>{startLabel}</text>
            )}
            {endLabel && (
              <text className={styles.endpointLabel} x={endPoint.x} y={endPoint.y}
                textAnchor="middle" fill={endpointLabelColor} fontSize={endpointLabelFontSize}>{endLabel}</text>
            )}

            {!hasCustomCenter && showPercentage && (
              <text className={styles.percentageText}
                x={percentageX} y={percentageY} dy={percentageTextOffsetY}
                textAnchor="middle" fontSize={percentageFontSize}
                fill={textColor} fontWeight={textWeight} transform={percentageRotation}
              >{formattedPercentage}</text>
            )}
            {!hasCustomCenter && showValue && (
              <text className={styles.valueText}
                x={valueX} y={valueY}
                textAnchor="middle" fontSize={fontSize}
                fill={valueColor} fontWeight={valueFontWeight} transform={valueRotation}
              >{formattedValue}</text>
            )}
            {title && <title>{title}</title>}
          </svg>
          {hasCustomCenter && <div className={centerClass}>{customCenter}</div>}
        </div>

        {showMeta && (
          <div className={styles.meta}>
            {hasContent(caption) && <div className={styles.caption}>{caption}</div>}
            {hasContent(description) && <div className={styles.description}>{description}</div>}
            {hasContent(statusLabel) && <div className={styles.statusLabel}>{statusLabel}</div>}
            {showOverflowLabel && isOverGoal && (
              <div className={styles.overflowLabel} style={{ color: overflowColor }}>
                {overflowLabel ?? `+${Math.round(rawPercentage - 100)}% sobre la meta`}
              </div>
            )}
            {showGoalReachedLabel && isGoalReached && (
              <div className={styles.goalReachedLabel}>{goalReachedLabel}</div>
            )}
          </div>
        )}
        {legendItems && legendItems.length > 0 && (
          <KmhGoalChartLegend items={legendItems} layout={legendLayout} />
        )}
      </div>
    )
  }
)

KmhGoalChart.displayName = 'KmhGoalChart'

/** Optional companion; standalone export retained from the original library. */
export const KmhGoalChartLegend = ({
  items,
  layout = 'horizontal',
  gap = 14,
  dotSize = 9,
  className
}: KmhGoalChartLegendProps) => (
  <div
    className={[styles.legend, layout === 'vertical' ? styles.legendVertical : styles.legendHorizontal, className].filter(Boolean).join(' ')}
    style={{ gap }}
    aria-label="Leyenda del gráfico"
  >
    {items.map((item, index) => (
      <div key={item.id ?? `${item.label}-${index}`} className={styles.legendItem}>
        <span className={styles.legendSwatch}
          style={{ backgroundColor: item.color, width: dotSize, height: dotSize }}
          aria-hidden="true" />
        <div className={styles.legendContent}>
          <span className={styles.legendLabel}>{item.label}</span>
          {item.description && <span className={styles.legendDescription}>{item.description}</span>}
        </div>
        {item.value !== undefined && <span className={styles.legendValue}>{item.value}</span>}
      </div>
    ))}
  </div>
)

KmhGoalChartLegend.displayName = 'KmhGoalChartLegend'
