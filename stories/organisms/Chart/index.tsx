'use client'

import React, { useEffect, useId, useMemo, useRef, useState, type FC } from 'react'
import PropTypes from 'prop-types'
import { choices } from '../../../scripts/tokens/choices'
import hStyles from './horizontalBarChart.module.css'
import { createChart, LineStyle, CrosshairMode, type LineWidth } from 'lightweight-charts'
import { ChartComponent } from '../ChartComponentLightWeight'
import {
  Doughnut,
  Pie
} from 'react-chartjs-2'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  Text as TextChart,
  PolarAngleAxis,
  RadialBar
} from 'recharts'
import { Text } from '../../atoms'
import { areaConfig, newAreaConfig } from '../ChartComponentLightWeight/chartConfig'
import { fi } from 'date-fns/locale'
import { getGlobalStyle } from '../../../helpers'

interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }>
}

interface ChartOptions {
  indexAxis: string
  elements: {
    bar: {
      borderWidth: number
    }
  }
  responsive: boolean
  plugins: {
    legend: {
      position: string
    }
    title: {
      display: boolean
    }
  }
  type: string
}

const dataTest: ChartData = {
  labels: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'],
  datasets: [
    {
      label: 'ejemplo',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
}

const optionsTest: ChartOptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: true
    }
  },
  type: 'doughnut'
}

interface HorizontalBarChartProps {
  data?: ChartData
  options?: ChartOptions
}

/* =========================================================
   HorizontalBarChart (SVG line chart)
   =========================================================
   Reimplemented as a hand-drawn SVG line chart mirroring the look, feel and
   interactions of the dashboard "Tendencia de ventas" widget (SalesTrendChart):
   smooth Bézier line, gradient area, left-to-right reveal animation, endpoint
   marker, keyboard-accessible hotspots and a floating tooltip.

   It stays presentational and keeps the original `{ data, options }` signature
   so existing consumers (Chart.js style `{ labels, datasets }`) keep working.
*/

const HBC_VIEWBOX_W = 720
const HBC_VIEWBOX_H = 260
const HBC_PADDING = { top: 24, right: 20, bottom: 28, left: 56 }
const HBC_X_INSET_LEFT = 10
const HBC_X_INSET_RIGHT = 0
const HBC_ENDPOINT_RADIUS = 5
const HBC_CURVE_TENSION = 0.16
const HBC_DEFAULT_STROKE = 'var(--color-feedback-success-dark)'

interface HbcPoint {
  key: string
  label: string
  value: number
}

interface HbcCoordinate {
  x: number
  y: number
  point: HbcPoint
  index: number
}

/**
 * Converts a raw value into a finite, non-negative number.
 *
 * @param {unknown} value - Raw value.
 * @returns {number} Safe non-negative number.
 */
const hbcToSafeNumber = (value: unknown): number => {
  const parsed = typeof value === 'number'
    ? value
    : typeof value === 'string' && value.trim()
      ? Number(value)
      : NaN

  return Number.isFinite(parsed) && (parsed as number) > 0 ? (parsed as number) : 0
}

/**
 * Normalizes Chart.js-style `{ labels, datasets }` data into chart points,
 * using the first dataset as the plotted series.
 *
 * @param {ChartData | undefined} input - Chart data in Chart.js format.
 * @returns {HbcPoint[]} Normalized points.
 */
const hbcNormalizePoints = (input?: ChartData): HbcPoint[] => {
  const labels = Array.isArray(input?.labels) ? input?.labels : []
  const series = Array.isArray(input?.datasets?.[0]?.data)
    ? input?.datasets?.[0]?.data
    : []

  if (!series || series.length === 0) { return [] }

  return series.map((raw, index) => {
    const label = typeof labels?.[index] === 'string'
      ? (labels[index] as string)
      : `${index + 1}`

    return {
      key: `${label}-${index}`,
      label,
      value: hbcToSafeNumber(raw)
    }
  })
}

/**
 * Creates an SVG coordinate.
 *
 * @param {number} x - Horizontal coordinate.
 * @param {number} y - Vertical coordinate.
 * @returns {{x: number, y: number}} SVG coordinate.
 */
const hbcCreatePoint = (x: number, y: number) => ({ x, y })

/**
 * Builds a smooth cubic Bézier path across the supplied coordinates.
 *
 * @param {Array<{x: number, y: number}>} coordinates - Chart coordinates.
 * @returns {string} SVG path definition.
 */
const hbcCreateSmoothPath = (coordinates: Array<{ x: number, y: number }>): string => {
  if (coordinates.length === 0) { return '' }

  if (coordinates.length === 1) {
    const [first] = coordinates
    return `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`
  }

  return coordinates.reduce((path, current, index) => {
    if (index === 0) {
      return `M ${current.x.toFixed(2)} ${current.y.toFixed(2)}`
    }

    const previous = coordinates[index - 1]
    const beforePrevious = coordinates[index - 2] ?? previous
    const next = coordinates[index + 1] ?? current
    const deltaX = current.x - previous.x

    const control1 = hbcCreatePoint(
      previous.x + deltaX / 3,
      previous.y + (current.y - beforePrevious.y) * HBC_CURVE_TENSION
    )

    const control2 = hbcCreatePoint(
      current.x - deltaX / 3,
      current.y - (next.y - previous.y) * HBC_CURVE_TENSION
    )

    return [
      path,
      `C ${control1.x.toFixed(2)} ${control1.y.toFixed(2)}`,
      `${control2.x.toFixed(2)} ${control2.y.toFixed(2)}`,
      `${current.x.toFixed(2)} ${current.y.toFixed(2)}`
    ].join(' ')
  }, '')
}

/**
 * Closes the area path below the line.
 *
 * @param {string} linePath - Existing SVG line path.
 * @param {Array<{x: number, y: number}>} coordinates - Chart coordinates.
 * @param {number} baselineY - Bottom coordinate of the plotting area.
 * @returns {string} Closed SVG area path.
 */
const hbcCreateAreaPath = (
  linePath: string,
  coordinates: Array<{ x: number, y: number }>,
  baselineY: number
): string => {
  if (!linePath || coordinates.length === 0) { return '' }

  const first = coordinates[0]
  const last = coordinates[coordinates.length - 1]

  return [
    linePath,
    `L ${last.x.toFixed(2)} ${baselineY.toFixed(2)}`,
    `L ${first.x.toFixed(2)} ${baselineY.toFixed(2)}`,
    'Z'
  ].join(' ')
}

/**
 * Compact number formatter for axis labels (e.g. 1.2k, 3.4M).
 *
 * @param {number} value - Numeric value.
 * @returns {string} Compact representation.
 */
const hbcFormatCompact = (value: number): string => {
  try {
    return new Intl.NumberFormat('es-CO', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value)
  } catch {
    return String(Math.round(value))
  }
}

/**
 * Plain number formatter for tooltips.
 *
 * @param {number} value - Numeric value.
 * @returns {string} Localized number.
 */
const hbcFormatNumber = (value: number): string => {
  try {
    return new Intl.NumberFormat('es-CO').format(value)
  } catch {
    return String(value)
  }
}

/**
 * Builds SVG geometry (coordinates, line, area, ticks and hotspots).
 *
 * @param {HbcPoint[]} points - Normalized chart points.
 * @returns {object | null} Chart geometry, or null when there are no points.
 */
const hbcBuildGeometry = (points: HbcPoint[]) => {
  if (points.length === 0) { return null }

  const innerWidth = HBC_VIEWBOX_W - HBC_PADDING.left - HBC_PADDING.right
  const innerHeight = HBC_VIEWBOX_H - HBC_PADDING.top - HBC_PADDING.bottom
  const plotWidth = Math.max(innerWidth - HBC_X_INSET_LEFT - HBC_X_INSET_RIGHT, 1)
  const plotLeft = HBC_PADDING.left + HBC_X_INSET_LEFT
  const plotRight = plotLeft + plotWidth
  const baselineY = HBC_PADDING.top + innerHeight

  const maxValue = Math.max(...points.map((point) => point.value), 0)
  const safeMax = maxValue || 1
  const stepX = points.length > 1 ? plotWidth / (points.length - 1) : 0

  const coordinates: HbcCoordinate[] = points.map((point, index) => {
    const x = points.length > 1
      ? plotLeft + index * stepX
      : plotLeft + plotWidth / 2

    const y = baselineY - (point.value / safeMax) * innerHeight

    return { x, y, point, index }
  })

  const line = hbcCreateSmoothPath(coordinates)
  const area = hbcCreateAreaPath(line, coordinates, baselineY)

  const ticks = maxValue > 0
    ? [0, 0.25, 0.5, 0.75, 1].map((fraction) => ({
      value: maxValue * fraction,
      y: baselineY - fraction * innerHeight
    }))
    : [{ value: 0, y: baselineY }]

  const hotspots = coordinates.map((coordinate, index) => {
    const previous = coordinates[index - 1]
    const next = coordinates[index + 1]

    const left = previous
      ? (previous.x + coordinate.x) / 2
      : coordinate.x - (stepX || 24) / 2

    const right = next
      ? (coordinate.x + next.x) / 2
      : coordinate.x + (stepX || 24) / 2

    const x = Math.max(plotLeft, left)
    const endX = Math.min(plotRight, right)

    return { x, width: Math.max(endX - x, 1) }
  })

  return {
    coordinates,
    hotspots,
    line,
    area,
    ticks,
    innerHeight,
    baselineY,
    plotLeft,
    plotRight,
    plotWidth,
    maxValue
  }
}

/**
 * Resolves the horizontal tooltip position and alignment.
 *
 * @param {number} x - Active point horizontal coordinate.
 * @returns {React.CSSProperties} Tooltip positioning styles.
 */
const hbcGetTooltipPosition = (x: number): React.CSSProperties => {
  const percentage = (x / HBC_VIEWBOX_W) * 100
  const clamped = Math.min(Math.max(percentage, 9), 91)

  const alignment = clamped <= 12 ? 'left' : clamped >= 88 ? 'right' : 'center'
  const translate = { left: '0', center: '-50%', right: '-100%' }

  return {
    left: `${clamped}%`,
    ['--tooltip-offset' as string]: translate[alignment]
  }
}

interface SvgHorizontalBarChartProps {
  /** Chart.js-style data ({ labels, datasets }). */
  data?: ChartData
  /** Reserved for API compatibility; not used by the SVG renderer. */
  options?: ChartOptions
  /** Accessible label for the series. */
  seriesLabel?: string
  /** Stroke / area color. Falls back to the dataset borderColor or theme token. */
  color?: string
}

export const HorizontalBarChart: FC<SvgHorizontalBarChartProps> = ({
  data,
  seriesLabel,
  color
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const generatedId = useId().replace(/:/g, '')
  const gradientId = `hbcFill-${generatedId}`
  const revealId = `hbcReveal-${generatedId}`

  const resolvedData = data ?? dataTest
  const strokeColor = color
    ?? resolvedData?.datasets?.[0]?.borderColor?.[0]
    ?? HBC_DEFAULT_STROKE
  const label = seriesLabel ?? resolvedData?.datasets?.[0]?.label ?? 'Serie'

  const points = useMemo(
    () => hbcNormalizePoints(resolvedData),
    [resolvedData]
  )

  const geometry = useMemo(
    () => hbcBuildGeometry(points),
    [points]
  )

  const animationKey = useMemo(
    () => points.map((point) => `${point.label}:${point.value}`).join('|'),
    [points]
  )

  const active = activeIndex !== null
    ? geometry?.coordinates[activeIndex] ?? null
    : null

  /**
   * Keyboard navigation across data points.
   *
   * @param {React.KeyboardEvent} event - Keyboard interaction.
   * @param {number} index - Current point index.
   * @returns {void}
   */
  const handlePointKeyDown = (event: React.KeyboardEvent, index: number): void => {
    const lastIndex = points.length - 1

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        setActiveIndex(Math.min(index + 1, lastIndex))
        break
      case 'ArrowLeft':
        event.preventDefault()
        setActiveIndex(Math.max(index - 1, 0))
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(lastIndex)
        break
      case 'Escape':
        setActiveIndex(null)
        break
      default:
        break
    }
  }

  if (points.length === 0 || !geometry) {
    return (
      <div className={hStyles.empty}>
        <Text as='p' className={hStyles.emptyTitle} size='md' weight={600}>
          No hay datos para mostrar
        </Text>
        <Text as='p' className={hStyles.emptyText} size='sm'>
          No hay información disponible para el periodo seleccionado.
        </Text>
      </div>
    )
  }

  const tooltipPosition = active ? hbcGetTooltipPosition(active.x) : null
  const lastCoordinate = geometry.coordinates[geometry.coordinates.length - 1]
  const revealWidth = Math.min(
    HBC_VIEWBOX_W,
    geometry.plotRight + HBC_ENDPOINT_RADIUS + 5
  )

  return (
    <div className={hStyles.chartWrap}>
      <svg
        aria-label={`Gráfico de ${label}`}
        className={hStyles.svg}
        preserveAspectRatio='none'
        role='img'
        viewBox={`0 0 ${HBC_VIEWBOX_W} ${HBC_VIEWBOX_H}`}
        style={{ ['--hbc-color' as string]: strokeColor }}
      >
        <defs>
          <linearGradient id={gradientId} x1='0' x2='0' y1='0' y2='1'>
            <stop offset='0%' stopColor={strokeColor} stopOpacity='0.25' />
            <stop offset='55%' stopColor={strokeColor} stopOpacity='0.10' />
            <stop offset='100%' stopColor={strokeColor} stopOpacity='0' />
          </linearGradient>

          <clipPath key={animationKey} clipPathUnits='userSpaceOnUse' id={revealId}>
            <rect
              className={hStyles.revealMask}
              height={HBC_VIEWBOX_H}
              width={revealWidth}
              x={0}
              y={0}
            />
          </clipPath>
        </defs>

        {/* Horizontal grid and Y-axis labels */}
        <g className={hStyles.grid}>
          {geometry.ticks.map((tick, index) => (
            <g
              className={hStyles.gridRow}
              key={`tick-${index}`}
              style={{ ['--grid-delay' as string]: `${200 + index * 65}ms` }}
            >
              <line
                className={hStyles.gridline}
                x1={HBC_PADDING.left}
                x2={HBC_VIEWBOX_W - HBC_PADDING.right}
                y1={tick.y}
                y2={tick.y}
              />
              <text
                className={hStyles.axisLabel}
                textAnchor='end'
                x={HBC_PADDING.left - 8}
                y={tick.y + 4}
              >
                {hbcFormatCompact(tick.value)}
              </text>
            </g>
          ))}
        </g>

        {/* Line, area and endpoint share the same reveal clip path */}
        <g clipPath={`url(#${revealId})`}>
          <path
            className={hStyles.area}
            d={geometry.area}
            fill={`url(#${gradientId})`}
          />
          <path
            className={hStyles.line}
            d={geometry.line}
            fill='none'
            stroke={strokeColor}
            strokeLinecap='round'
            strokeLinejoin='round'
            vectorEffect='non-scaling-stroke'
          />

          {geometry.coordinates.length > 1 && (
            <g className={hStyles.endPoint}>
              <circle
                className={hStyles.endPointHalo}
                cx={lastCoordinate.x}
                cy={lastCoordinate.y}
                r={HBC_ENDPOINT_RADIUS + 4}
              />
              <circle
                className={hStyles.endPointCore}
                cx={lastCoordinate.x}
                cy={lastCoordinate.y}
                r={HBC_ENDPOINT_RADIUS}
              />
            </g>
          )}

          {geometry.coordinates.length === 1 && (
            <circle
              className={hStyles.singlePoint}
              cx={geometry.coordinates[0].x}
              cy={geometry.coordinates[0].y}
              r={HBC_ENDPOINT_RADIUS}
            />
          )}
        </g>

        {/* Interactive, keyboard-accessible hotspots */}
        {geometry.coordinates.map((coordinate, index) => {
          const hotspot = geometry.hotspots[index]
          return (
            <rect
              aria-label={`${coordinate.point.label}: ${hbcFormatNumber(coordinate.point.value)}`}
              aria-pressed={activeIndex === index}
              className={hStyles.hotspot}
              height={geometry.innerHeight}
              key={coordinate.point.key}
              onBlur={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => handlePointKeyDown(event, index)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              role='button'
              tabIndex={0}
              width={hotspot.width}
              x={hotspot.x}
              y={HBC_PADDING.top}
            />
          )
        })}

        {/* Selected point indicator */}
        {active && (
          <g className={hStyles.activeIndicator} pointerEvents='none'>
            <line
              className={hStyles.activeLine}
              x1={active.x}
              x2={active.x}
              y1={HBC_PADDING.top}
              y2={geometry.baselineY}
            />
            <circle
              className={hStyles.activeHalo}
              cx={active.x}
              cy={active.y}
              r={10}
            />
            <circle
              className={hStyles.activeDot}
              cx={active.x}
              cy={active.y}
              r={5}
            />
          </g>
        )}
      </svg>

      {/* X-axis labels */}
      <div className={hStyles.axisX}>
        {geometry.coordinates.map((coordinate, index) => {
          const totalPoints = geometry.coordinates.length
          const interval = Math.ceil(totalPoints / 8)
          const shouldShow = totalPoints <= 8 ||
            index === 0 ||
            index === totalPoints - 1 ||
            index % interval === 0

          return (
            <span
              className={hStyles.axisXLabel}
              key={coordinate.point.key}
              title={coordinate.point.label}
            >
              {shouldShow ? coordinate.point.label : ''}
            </span>
          )
        })}
      </div>

      {/* Floating tooltip */}
      {active && tooltipPosition && (
        <div
          aria-live='polite'
          className={hStyles.tooltip}
          key={active.point.key}
          style={tooltipPosition}
        >
          <Text as='span' className={hStyles.tooltipDate} size='sm'>
            {active.point.label}
          </Text>
          <Text as='span' className={hStyles.tooltipValue} size='md' weight={700}>
            {hbcFormatNumber(active.point.value)}
          </Text>
        </div>
      )}
    </div>
  )
}

HorizontalBarChart.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any,
  seriesLabel: PropTypes.string,
  color: PropTypes.string
}

export const HorizontalBarChartJs: FC<HorizontalBarChartProps> = ({ data, options }) => {
  return (
    <div className='header' style={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data as any}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line yAxisId={0} type="monotone" dataKey="pv" stroke={`${choices.color.brand.fuelYellow}`} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="uv" stroke={`${choices.color.brand.kellyGreen}`} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

interface CircleProps {
  data?: ChartData
  options?: ChartOptions
}

export const Circle: FC<CircleProps> = ({ data, options }) => {
  return (
    <div className='header'>
      <div className='links'></div>
      <Pie data={data ?? dataTest} options={options ?? optionsTest} />
    </div>
  )
}

Circle.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any
}

interface DoughnutCharProps {
  data?: ChartData
  options?: ChartOptions
}

export const DoughnutChar: FC<DoughnutCharProps> = ({ data, options }) => {
  return (
    <div className='header'>
      <div className='links'></div>
      <Doughnut data={data ?? dataTest} options={options ?? optionsTest} />
    </div>
  )
}

DoughnutChar.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any
}

interface BarChatProps {
  data?: ChartData
  options?: ChartOptions
}

/* =========================================================
   BarChat (SVG bar chart)
   =========================================================
   Hand-drawn SVG vertical bar chart that removes the react-chartjs-2
   dependency. It shares the visual language of HorizontalBarChart /
   SalesTrendChart: gridlines with compact Y labels, a left-to-right reveal
   animation, keyboard-accessible bars, a floating tooltip and an empty state.

   Keeps the original `{ data, options }` signature (Chart.js-style
   `{ labels, datasets }`) so existing consumers keep working.
*/

const BAR_GAP_RATIO = 0.35
const BAR_MAX_WIDTH = 46
const BAR_RADIUS = 6

interface BarGeometryBar {
  x: number
  y: number
  width: number
  height: number
  point: HbcPoint
  index: number
}

/**
 * Builds the bar-chart geometry: bars, gridlines/ticks and the plotting box.
 *
 * @param {HbcPoint[]} points - Normalized chart points.
 * @returns {object | null} Bar geometry, or null when there are no points.
 */
const barBuildGeometry = (points: HbcPoint[]) => {
  if (points.length === 0) { return null }

  const innerWidth = HBC_VIEWBOX_W - HBC_PADDING.left - HBC_PADDING.right
  const innerHeight = HBC_VIEWBOX_H - HBC_PADDING.top - HBC_PADDING.bottom
  const plotLeft = HBC_PADDING.left
  const baselineY = HBC_PADDING.top + innerHeight

  const maxValue = Math.max(...points.map((point) => point.value), 0)
  const safeMax = maxValue || 1

  const slot = innerWidth / points.length
  const barWidth = Math.min(slot * (1 - BAR_GAP_RATIO), BAR_MAX_WIDTH)

  const bars: BarGeometryBar[] = points.map((point, index) => {
    const slotCenter = plotLeft + slot * index + slot / 2
    const barHeight = (point.value / safeMax) * innerHeight
    const x = slotCenter - barWidth / 2
    const y = baselineY - barHeight

    return {
      x,
      y,
      width: barWidth,
      height: Math.max(barHeight, 0),
      point,
      index
    }
  })

  const ticks = maxValue > 0
    ? [0, 0.25, 0.5, 0.75, 1].map((fraction) => ({
      value: maxValue * fraction,
      y: baselineY - fraction * innerHeight
    }))
    : [{ value: 0, y: baselineY }]

  return {
    bars,
    ticks,
    innerWidth,
    innerHeight,
    baselineY,
    plotLeft,
    plotRight: plotLeft + innerWidth,
    slot,
    maxValue
  }
}

interface SvgBarChartProps {
  /** Chart.js-style data ({ labels, datasets }). */
  data?: ChartData
  /** Reserved for API compatibility; not used by the SVG renderer. */
  options?: ChartOptions
  /** Accessible label for the series. */
  seriesLabel?: string
  /** Bar color. Falls back to the dataset borderColor or theme token. */
  color?: string
}

export const BarChat: FC<SvgBarChartProps> = ({
  data,
  seriesLabel,
  color
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const generatedId = useId().replace(/:/g, '')
  const gradientId = `barFill-${generatedId}`
  const revealId = `barReveal-${generatedId}`

  const resolvedData = data ?? dataTest
  const barColor = color
    ?? resolvedData?.datasets?.[0]?.borderColor?.[0]
    ?? HBC_DEFAULT_STROKE
  const label = seriesLabel ?? resolvedData?.datasets?.[0]?.label ?? 'Serie'

  const points = useMemo(
    () => hbcNormalizePoints(resolvedData),
    [resolvedData]
  )

  const geometry = useMemo(
    () => barBuildGeometry(points),
    [points]
  )

  const animationKey = useMemo(
    () => points.map((point) => `${point.label}:${point.value}`).join('|'),
    [points]
  )

  const active = activeIndex !== null
    ? geometry?.bars[activeIndex] ?? null
    : null

  /**
   * Keyboard navigation across bars.
   *
   * @param {React.KeyboardEvent} event - Keyboard interaction.
   * @param {number} index - Current bar index.
   * @returns {void}
   */
  const handleBarKeyDown = (event: React.KeyboardEvent, index: number): void => {
    const lastIndex = points.length - 1

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        setActiveIndex(Math.min(index + 1, lastIndex))
        break
      case 'ArrowLeft':
        event.preventDefault()
        setActiveIndex(Math.max(index - 1, 0))
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(lastIndex)
        break
      case 'Escape':
        setActiveIndex(null)
        break
      default:
        break
    }
  }

  if (points.length === 0 || !geometry) {
    return (
      <div className={hStyles.empty}>
        <Text as='p' className={hStyles.emptyTitle} size='md' weight={600}>
          No hay datos para mostrar
        </Text>
        <Text as='p' className={hStyles.emptyText} size='sm'>
          No hay información disponible para el periodo seleccionado.
        </Text>
      </div>
    )
  }

  const tooltipPosition = active ? hbcGetTooltipPosition(active.x + active.width / 2) : null
  const revealHeight = HBC_VIEWBOX_H

  return (
    <div className={hStyles.chartWrap}>
      <svg
        aria-label={`Gráfico de ${label}`}
        className={hStyles.svg}
        preserveAspectRatio='none'
        role='img'
        viewBox={`0 0 ${HBC_VIEWBOX_W} ${HBC_VIEWBOX_H}`}
        style={{ ['--hbc-color' as string]: barColor }}
      >
        <defs>
          <linearGradient id={gradientId} x1='0' x2='0' y1='0' y2='1'>
            <stop offset='0%' stopColor={barColor} stopOpacity='0.95' />
            <stop offset='100%' stopColor={barColor} stopOpacity='0.55' />
          </linearGradient>

          <clipPath key={animationKey} clipPathUnits='userSpaceOnUse' id={revealId}>
            <rect
              className={hStyles.barRevealMask}
              height={revealHeight}
              width={HBC_VIEWBOX_W}
              x={0}
              y={0}
            />
          </clipPath>
        </defs>

        {/* Horizontal grid and Y-axis labels */}
        <g className={hStyles.grid}>
          {geometry.ticks.map((tick, index) => (
            <g
              className={hStyles.gridRow}
              key={`tick-${index}`}
              style={{ ['--grid-delay' as string]: `${200 + index * 65}ms` }}
            >
              <line
                className={hStyles.gridline}
                x1={HBC_PADDING.left}
                x2={HBC_VIEWBOX_W - HBC_PADDING.right}
                y1={tick.y}
                y2={tick.y}
              />
              <text
                className={hStyles.axisLabel}
                textAnchor='end'
                x={HBC_PADDING.left - 8}
                y={tick.y + 4}
              >
                {hbcFormatCompact(tick.value)}
              </text>
            </g>
          ))}
        </g>

        {/* Bars revealed with a single clip path */}
        <g clipPath={`url(#${revealId})`}>
          {geometry.bars.map((bar) => (
            <rect
              className={hStyles.bar}
              fill={`url(#${gradientId})`}
              height={bar.height}
              key={bar.point.key}
              rx={Math.min(BAR_RADIUS, bar.width / 2)}
              style={{ ['--bar-delay' as string]: `${200 + bar.index * 45}ms` }}
              width={bar.width}
              x={bar.x}
              y={bar.y}
            />
          ))}
        </g>

        {/* Interactive, keyboard-accessible bar hotspots */}
        {geometry.bars.map((bar, index) => (
          <rect
            aria-label={`${bar.point.label}: ${hbcFormatNumber(bar.point.value)}`}
            aria-pressed={activeIndex === index}
            className={hStyles.hotspot}
            height={geometry.innerHeight}
            key={`hotspot-${bar.point.key}`}
            onBlur={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onKeyDown={(event) => handleBarKeyDown(event, index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            role='button'
            tabIndex={0}
            width={geometry.slot}
            x={geometry.plotLeft + geometry.slot * index}
            y={HBC_PADDING.top}
          />
        ))}

        {/* Selected bar highlight */}
        {active && (
          <rect
            className={hStyles.barActive}
            height={active.height}
            pointerEvents='none'
            rx={Math.min(BAR_RADIUS, active.width / 2)}
            width={active.width}
            x={active.x}
            y={active.y}
          />
        )}
      </svg>

      {/* X-axis labels */}
      <div className={hStyles.axisXBars}>
        {geometry.bars.map((bar, index) => {
          const totalBars = geometry.bars.length
          const interval = Math.ceil(totalBars / 10)
          const shouldShow = totalBars <= 10 ||
            index === 0 ||
            index === totalBars - 1 ||
            index % interval === 0

          return (
            <span
              className={hStyles.axisXLabel}
              key={bar.point.key}
              title={bar.point.label}
            >
              {shouldShow ? bar.point.label : ''}
            </span>
          )
        })}
      </div>

      {/* Floating tooltip */}
      {active && tooltipPosition && (
        <div
          aria-live='polite'
          className={hStyles.tooltip}
          key={active.point.key}
          style={tooltipPosition}
        >
          <Text as='span' className={hStyles.tooltipDate} size='sm'>
            {active.point.label}
          </Text>
          <Text as='span' className={hStyles.tooltipValue} size='md' weight={700}>
            {hbcFormatNumber(active.point.value)}
          </Text>
        </div>
      )}
    </div>
  )
}

BarChat.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any,
  seriesLabel: PropTypes.string,
  color: PropTypes.string
}

export const LightweightChartComponent = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    // Crear el gráfico y asociarlo con el div
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight
    })

    // Definir los datos y la serie
    const lineSeries = chart.addLineSeries()
    lineSeries.setData([
      { time: 1633072800, value: 70 },
      { time: 1633076400, value: 72 },
      { time: 1633080000, value: 75 },
      { time: 1633083600, value: 80 }
    ])

    // Limpiar el gráfico cuando el componente se desmonte
    return () => {
      chart.remove()
    }
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

export const LargeChartComponent = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    // Crear el gráfico y asociarlo con el div
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        backgroundColor: '#1E1E1E', // Fondo oscuro para la sección del gráfico
        textColor: '#D1D4D7' // Color del texto
      },
      grid: {
        vertLines: {
          color: '#333' // Color de las líneas verticales
        },
        horzLines: {
          color: '#333' // Color de las líneas horizontales
        }
      },
      crosshair: {
        mode: 0 // Modo de cruce (0=por defecto)
      },
      priceScale: {
        borderColor: '#555' // Color de borde del eje Y (de precios)
      },
      timeScale: {
        borderColor: '#555' // Color de borde del eje X (de tiempo)
      }
    })

    // Crear la serie de velas
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#4fff00', // Color para las velas alcistas
      borderUpColor: '#4fff00', // Color de borde para las velas alcistas
      wickUpColor: '#4fff00', // Color de la mecha de las velas alcistas
      downColor: '#ff4976', // Color para las velas bajistas
      borderDownColor: '#ff4976', // Color de borde para las velas bajistas
      wickDownColor: '#ff4976' // Color de la mecha de las velas bajistas
    })

    // Datos de ejemplo para las velas (formato: [tiempo, apertura, cierre, mínimo, máximo])
    const candlestickData = [
      { time: 1633072800, open: 40000, high: 41000, low: 39000, close: 40500 },
      { time: 1633076400, open: 40500, high: 42000, low: 40000, close: 41500 },
      { time: 1633080000, open: 41500, high: 42500, low: 41000, close: 42000 },
      { time: 1633083600, open: 42000, high: 44000, low: 41500, close: 43000 },
      { time: 1633087200, open: 43000, high: 45000, low: 42000, close: 44000 },
      { time: 1633090800, open: 44000, high: 46000, low: 43000, close: 45000 },
      { time: 1633094400, open: 45000, high: 47000, low: 44000, close: 46000 },
      { time: 1633098000, open: 46000, high: 48000, low: 45500, close: 47000 }
    ]

    // Establecer los datos de la serie
    candlestickSeries.setData(candlestickData)

    // Suscripción para el movimiento del cruce (crosshair)
    chart.subscribeCrosshairMove(function (param) {
      if (!param || !param.time) return
      const price = param.seriesData.get(candlestickSeries)
      console.log(`Price at time ${param.time}: Open: ${price.open}, Close: ${price.close}`)
    })

    // Limpiar el gráfico cuando el componente se desmonte
    return () => {
      chart.remove()
    }
  }, [])

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '500px', position: 'relative' }}
    />
  )
}

export const SalesDashboardChart = () => {
  useEffect(() => {
    // Datos proporcionados
    const data = [
      { day: 'Domingos', totalSales: 20000 },
      { day: 'Lunes', totalSales: 0 },
      { day: 'Martes', totalSales: 35001.8 },
      { day: 'Miércoles', totalSales: 0 },
      { day: 'Jueves', totalSales: 1000 },
      { day: 'Viernes', totalSales: 0 },
      { day: 'Sábados', totalSales: 0 }
    ]

    // Convertir los días en un arreglo de fechas o índices (timestamps para un gráfico de líneas)
    const chartData = data.map((item, index) => ({
      time: index, // Usa un índice como "time"
      value: item.totalSales
    }))

    // Crear el gráfico
    const chart = createChart('chart-container', {
      width: 600,
      height: 400,
      crosshair: {
        mode: CrosshairMode.Normal
      }
    })

    // Crear la línea de ventas
    const lineSeries = chart.addLineSeries({
      color: '#4e73df',
      lineStyle: LineStyle.Solid,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 5
    })

    // Establecer los datos en la serie
    lineSeries.setData(chartData.map((item) => ({ time: item.time, value: item.value })))
  }, [])

  return (
    <div id="chart-container" style={{ position: 'relative', width: '600px', height: '400px' }}></div>
  )
}

interface StockMovementsChartProps {
  className?: string
  width?: number
  title?: string
  height?: number
  chartData: Array<{
    date: string
    TotalIn: number
    TotalOut: number
  }>
}

export const StockMovementsChart: FC<StockMovementsChartProps> = ({
  chartData,
  className,
  width = 600,
  height = 400,
  title = ''
}) => {
  const stockOutData = chartData.map((item) => ({
    time: item.date,
    value: item.TotalOut
  }))

  const stockInData = chartData.map((item) => ({
    time: item.date,
    value: item.TotalIn
  }))

  const TotalAdjustment = chartData.map((item) => ({
    time: item.date,
    value: item.TotalAdjustment
  }))

  const dataSets = [
    { name: 'stock_in', data: stockInData, config: areaConfig },
    { name: 'stock_out', data: stockOutData, config: areaConfig },
    { name: 'total_adjustment', data: TotalAdjustment, config: { ...areaConfig, lineColor: 'rgba(187, 160, 6, 0.89)' } }
  ]

  return (
    <div className={className}>
      <Text size='5xl'>
        {title}
      </Text>
      <ChartComponent
        width={width}
        height={height}
        data={dataSets}
        currentPrice={{
          time: Date.now(),
          value: 19.10
        }}
      />
    </div>
  )
}

interface KmhGoalChartProps {
  current: number
  goal: number
  size?: number
  moneyFormat?: boolean
  numberFormat?: (value: number) => string
  bgColor?: string // Color del arco de fondo
  fgColor?: string // Color del arco de progreso
  strokeWidth?: number // Grosor del arco
  fontSize?: string // Tamaño de fuente para texto
  textColor?: string // Color del texto
  textWeight?: 'normal' | 'bold' | 'bolder' // Peso del texto
  rotateText?: boolean // Rotar el texto según el gráfico
  textPosition?: { x: string, y: string } // Personalización de la posición del texto
  showPercentage?: boolean // Mostrar o no el porcentaje
  orientation?: 'horizontal' | 'vertical' | 'full' // Orientación del gráfico
  startAngle?: number // Ángulo desde el que comienza la línea indicadora (0 a 360 grados)
  reverseDirection?: boolean // Invertir la dirección del gráfico
  strokeDasharray?: string // Personalización de la línea (opcional)
  ref?: React.RefObject<HTMLDivElement>
}

export const KmhGoalChart: React.FC<KmhGoalChartProps> = ({
  current,
  goal,
  size = 250,
  moneyFormat = false,
  numberFormat = (value: number) => value.toString(),
  bgColor = '#eee',
  fgColor = getGlobalStyle('--color-primary-red'),
  strokeWidth = 15,
  fontSize = 'calc(10px + 1vw)',
  textColor = '#333',
  textWeight = 'bold',
  rotateText = false,
  textPosition = { x: '50%', y: '58%' },
  showPercentage = true,
  orientation = 'horizontal', // Default to horizontal
  startAngle = 180, // Default starting at 180 degrees (top)
  reverseDirection = false,
  strokeDasharray = '', // Default to no dash pattern
  ref
}) => {
  const radius = 100
  const percentage = Math.min((current / goal) * 100, 100)

  // Calcular el ángulo en base al porcentaje
  const angle = (percentage / 100) * (orientation === 'full' ? 360 : 180)
  const adjustedStartAngle = reverseDirection ? startAngle + 180 : startAngle
  const endAngle = adjustedStartAngle - angle

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = startAngle - endAngle <= 180 ? '0' : '1'

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y
    ].join(' ')
  }

  const transformText = rotateText ? 'rotate(270)' : undefined

  return (
    <div style={{ width: 'fit-content', height: '100%', position: 'relative' }} ref={ref}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 240 240"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background arc */}
        <path
          d={describeArc(120, 120, radius, adjustedStartAngle, 0)}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          rx="10"
          ry="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray} // Optional: Dash pattern
        />
        {/* Foreground arc */}
        <path
          d={describeArc(120, 120, radius, adjustedStartAngle, endAngle)}
          stroke={fgColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray} // Optional: Dash pattern
        />
        {/* Percentage text */}
        {showPercentage && (
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            style={{
              transform: 'translateY(-20px)'
            }}
            fontSize='calc(10px + 1vw)'
            fill={textColor}
            fontWeight={textWeight}
            transform={transformText}
          >
            {!isNaN(percentage) && percentage > 0 ? `${Math.round(percentage)}%` : '0%'}
          </text>
        )}
        {/* Additional text */}
        <text
          x={textPosition.x}
          y={textPosition.y}
          textAnchor="middle"
          fontSize={fontSize}

          fill="#666"
          transform={transformText}
        >
          {moneyFormat ? `${numberFormat(current)} de ${numberFormat(goal)}` : `${current} de ${goal}`}
        </text>
      </svg>
    </div>
  )
}
