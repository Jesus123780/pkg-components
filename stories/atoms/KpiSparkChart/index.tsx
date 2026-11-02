'use client'

import React, { useEffect, useRef, type FC } from 'react'
import {
  ColorType,
  createChart,
  LineType,
  type IChartApi,
  type Time
} from 'lightweight-charts'

/**
 * Props for {@link KpiSparkChart}.
 */
export interface KpiSparkChartProps {
  /** Numeric series rendered as an area line. */
  data: number[]
  /** Line color (any CSS color / token value). */
  lineColor?: string
  /** Area top gradient color. */
  topColor?: string
  /** Area bottom gradient color. */
  bottomColor?: string
  /** Chart height in px. Width always follows the container. */
  height?: number
  /** Accessible label for the sparkline. */
  ariaLabel?: string
}

/**
 * Compact, auto-sizing area sparkline built on `lightweight-charts`.
 *
 * Designed for KPI cards: no axes, grid, crosshair or interaction. Renders
 * nothing when the series has fewer than two finite points, so empty data never
 * shows a misleading flat line. The chart resizes with its container via
 * `ResizeObserver` and is fully cleaned up on unmount.
 *
 * @param props - See {@link KpiSparkChartProps}.
 * @returns A container element hosting the sparkline, or an empty placeholder.
 */
export const KpiSparkChart: FC<KpiSparkChartProps> = ({
  data,
  lineColor = 'rgba(80, 167, 115, 1)',
  topColor = 'rgba(80, 167, 115, 0.25)',
  bottomColor = 'rgba(80, 167, 115, 0)',
  height = 40,
  ariaLabel = 'Tendencia'
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  const points = Array.isArray(data)
    ? data.filter((n) => Number.isFinite(Number(n))).map(Number)
    : []
  const hasSeries = points.length >= 2

  useEffect(() => {
    if (!hasSeries || containerRef.current == null) return undefined

    const container = containerRef.current
    const chart = createChart(container, {
      width: container.clientWidth > 0 ? container.clientWidth : 96,
      height,
      autoSize: false,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'transparent'
      },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { visible: false },
      leftPriceScale: { visible: false },
      timeScale: { visible: false, borderVisible: false },
      crosshair: { horzLine: { visible: false }, vertLine: { visible: false } },
      handleScale: false,
      handleScroll: false
    })

    const series = chart.addAreaSeries({
      lineType: LineType.Curved,
      lineWidth: 2,
      lineColor,
      topColor,
      bottomColor,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false
    })

    // Synthetic evenly-spaced timestamps; only the shape matters for a spark.
    const base = Math.floor(Date.now() / 1000) - points.length * 86400
    series.setData(
      points.map((value, index) => ({ time: (base + index * 86400) as Time, value }))
    )
    chart.timeScale().fitContent()
    chartRef.current = chart

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0
      if (width > 0 && chartRef.current != null) {
        chartRef.current.applyOptions({ width: Math.max(1, Math.floor(width)) })
        chartRef.current.timeScale().fitContent()
      }
    })
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
      chartRef.current = null
    }
  }, [hasSeries, points.join(','), lineColor, topColor, bottomColor, height])

  if (!hasSeries) {
    return <span aria-hidden='true' style={{ display: 'inline-block', width: 96, height }} />
  }

  return <div aria-label={ariaLabel} ref={containerRef} role='img' style={{ width: '100%', height }} />
}
