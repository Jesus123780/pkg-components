import type { KmhGoalChartType, KmhGoalChartZone } from './types'

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max)

export const finite = (value: number, fallback: number): number =>
  Number.isFinite(value) ? value : fallback

/** SVG angles: 0 = 12 o'clock, 90 = 3 o'clock. */
export const polarToCartesian = (
  centerX: number, centerY: number, radius: number, angleInDegrees: number
): { x: number, y: number } => {
  const angle = ((angleInDegrees - 90) * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  }
}

/** A whole 360° ring uses two valid SVG arcs, not a degenerate single arc. */
export const describeArcSweep = (
  centerX: number, centerY: number, radius: number, startAngle: number, sweep: number
): string => {
  if (Math.abs(sweep) < 0.000001 || radius <= 0) return ''
  const absoluteSweep = clamp(Math.abs(sweep), 0, 360)
  const signedSweep = Math.sign(sweep) * absoluteSweep
  const sweepFlag = signedSweep >= 0 ? 1 : 0
  const start = polarToCartesian(centerX, centerY, radius, startAngle)
  const end = polarToCartesian(centerX, centerY, radius, startAngle + signedSweep)
  if (absoluteSweep >= 359.999) {
    const middle = polarToCartesian(centerX, centerY, radius, startAngle + signedSweep / 2)
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 1 ${sweepFlag} ${middle.x} ${middle.y} A ${radius} ${radius} 0 1 ${sweepFlag} ${end.x} ${end.y}`
  }
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${absoluteSweep > 180 ? 1 : 0} ${sweepFlag} ${end.x} ${end.y}`
}

export const getSvgCoordinate = (value: number | string, viewBoxSize: number, fallback: number): number => {
  if (typeof value === 'number') return finite(value, fallback)
  const cleaned = value.trim()
  const parsed = Number.parseFloat(cleaned)
  if (!Number.isFinite(parsed)) return fallback
  return cleaned.endsWith('%') ? parsed * viewBoxSize / 100 : parsed
}

export interface GoalMetrics {
  current: number
  goal: number
  rawPercentage: number
  percentage: number
  isOverGoal: boolean
  isGoalReached: boolean
}

/** Legacy behavior: a positive current with goal<=0 reports 100% visual progress. */
export const resolveGoalMetrics = (current: number, goal: number): GoalMetrics => {
  const safeCurrent = finite(current, 0)
  const safeGoal = finite(goal, 0)
  const rawPercentage = safeGoal > 0 ? (safeCurrent / safeGoal) * 100 : safeCurrent > 0 ? 100 : 0
  return {
    current: safeCurrent,
    goal: safeGoal,
    rawPercentage,
    percentage: clamp(rawPercentage, 0, 100),
    isOverGoal: rawPercentage > 100,
    isGoalReached: rawPercentage >= 100 && safeGoal > 0
  }
}

/** A selected chartType overrides orientation, but a caller-provided sweepAngle always wins. */
export const getSweepAngle = (
  chartType: KmhGoalChartType | undefined,
  orientation: 'horizontal' | 'full',
  sweepAngle?: number
): number => {
  const typeToSweep: Record<KmhGoalChartType, number> = {
    gauge: 180,
    semicircle: 180,
    quarter: 90,
    'three-quarter': 270,
    radial: 360,
    donut: 360,
    custom: orientation === 'full' ? 360 : 180
  }
  return clamp(sweepAngle ?? (chartType ? typeToSweep[chartType] : (orientation === 'full' ? 360 : 180)), 1, 360)
}

export const applyEasing = (
  progress: number,
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | ((progress: number) => number)
): number => {
  const t = clamp(progress, 0, 1)
  if (typeof easing === 'function') {
    const result = easing(t)
    return Number.isFinite(result) ? clamp(result, 0, 1) : t
  }
  switch (easing) {
    case 'linear': return t
    case 'ease-in': return t * t * t
    case 'ease-in-out': return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    default: return 1 - Math.pow(1 - t, 3)
  }
}

/** Compute segment paths without mutating the caller's zones. */
export const createZonePaths = (
  zones: readonly KmhGoalChartZone[],
  cx: number, cy: number, radius: number, start: number, sweep: number
): Array<{ key: string, path: string, color: string, label?: string }> => {
  return zones.slice(0, 60).flatMap((zone, index) => {
    const from = clamp(zone.from, 0, 100)
    const to = clamp(zone.to, 0, 100)
    if (to <= from || !zone.color) return []
    return [{
      key: zone.id ?? `${index}-${from}-${to}`,
      color: zone.color,
      label: zone.label,
      path: describeArcSweep(cx, cy, radius, start + (from / 100) * sweep, ((to - from) / 100) * sweep)
    }]
  })
}
