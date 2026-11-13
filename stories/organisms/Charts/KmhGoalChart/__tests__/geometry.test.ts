import {
  applyEasing,
  clamp,
  createZonePaths,
  describeArcSweep,
  getSvgCoordinate,
  getSweepAngle,
  resolveGoalMetrics
} from '../geometry'

describe('KmhGoalChart geometry / compatibility', () => {
  it('clamps values and rejects non-finite values', () => {
    expect(clamp(250, 0, 100)).toBe(100)
    expect(clamp(-12, 0, 100)).toBe(0)
    expect(clamp(Number.NaN, 0, 100)).toBe(0)
  })

  it('preserves the original percentage behavior and overflow', () => {
    expect(resolveGoalMetrics(50, 100).percentage).toBe(50)
    expect(resolveGoalMetrics(125, 100)).toMatchObject({
      rawPercentage: 125, percentage: 100, isOverGoal: true, isGoalReached: true
    })
    expect(resolveGoalMetrics(2, 0)).toMatchObject({ percentage: 100, isGoalReached: false })
    expect(resolveGoalMetrics(-2, 10).percentage).toBe(0)
  })

  it('preserves orientation while supporting new chart types', () => {
    expect(getSweepAngle(undefined, 'horizontal')).toBe(180)
    expect(getSweepAngle(undefined, 'full')).toBe(360)
    expect(getSweepAngle('quarter', 'horizontal')).toBe(90)
    expect(getSweepAngle('three-quarter', 'horizontal')).toBe(270)
    expect(getSweepAngle('radial', 'horizontal')).toBe(360)
    expect(getSweepAngle('donut', 'horizontal', 205)).toBe(205)
  })

  it('creates two arcs for 360° and respects counterclockwise direction', () => {
    const full = describeArcSweep(120, 120, 90, 180, 360)
    expect(full.match(/ A /g)).toHaveLength(2)
    expect(full).not.toMatch(/NaN|Infinity/)
    expect(describeArcSweep(120, 120, 90, 180, -180)).toContain('0 0')
    expect(describeArcSweep(120, 120, 90, 0, 0)).toBe('')
  })

  it('handles coordinate percentages and all easing functions safely', () => {
    expect(getSvgCoordinate('45%', 200, 90)).toBe(90)
    expect(getSvgCoordinate('bad', 200, 120)).toBe(120)
    expect(applyEasing(0.5, 'linear')).toBe(0.5)
    expect(applyEasing(0.5, 'ease-in')).toBeCloseTo(0.125)
    expect(applyEasing(0.5, 'ease-out')).toBeCloseTo(0.875)
    expect(applyEasing(0.5, () => Number.NaN)).toBe(0.5)
  })

  it('clips zone bounds without mutating the caller input', () => {
    const zones = Object.freeze([
      Object.freeze({ from: -5, to: 25, color: '#f00' }),
      Object.freeze({ from: 60, to: 200, color: '#0f0' }),
      Object.freeze({ from: 90, to: 80, color: '#00f' })
    ])
    const paths = createZonePaths(zones, 120, 120, 90, 0, 180)
    expect(paths).toHaveLength(2)
    expect(paths[0].color).toBe('#f00')
    expect(paths[1].path).not.toMatch(/NaN|Infinity/)
  })
})
