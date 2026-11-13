/** Compile-only usage examples: keep this file under strict tsc, not as a Jest test. */
import React from 'react'
import { KmhGoalChart } from './KmhGoalChart'
import type { KmhGoalChartProps, KmhGoalChartType, KmhGoalChartZone } from './KmhGoalChart'

const oldApi: KmhGoalChartProps = {
  current: 60,
  goal: 100,
  orientation: 'horizontal',
  startAngle: 180,
  sweepDirection: 'clockwise',
  strokeDasharray: '2 1',
  showTicks: true,
  showGoalMarker: true,
  showGlow: true,
  animated: true,
  centerContent: <strong>60%</strong>
}

const zones: readonly KmhGoalChartZone[] = [
  { from: 0, to: 60, color: '#f55' },
  { from: 60, to: 100, color: '#2a6' }
]

const chartType: KmhGoalChartType = 'radial'
export const LegacyUsage = () => <KmhGoalChart {...oldApi} />
export const TypedUsage = () => <KmhGoalChart {...oldApi} chartType={chartType} zones={zones}
  variant="card" tone="success" responsive showProgressIndicator />
