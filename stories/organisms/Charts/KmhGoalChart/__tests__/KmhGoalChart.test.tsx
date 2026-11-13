import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import '@testing-library/jest-dom'
import { KmhGoalChart, KmhGoalChartLegend } from '../KmhGoalChart'

describe('KmhGoalChart component', () => {
  it('keeps the original API, progress role, values and forwarded ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <KmhGoalChart ref={ref} current={25} goal={100}
        animated={false} size={220} caption="Ventas" showGoalReachedLabel />
    )
    expect(ref.current).toBe(screen.getByRole('progressbar'))
    expect(ref.current).toHaveAttribute('aria-valuenow', '25')
    expect(ref.current).toHaveAttribute('aria-valuemax', '100')
    expect(screen.getByText('25%')).toBeInTheDocument()
    expect(screen.getByText('Ventas')).toBeInTheDocument()
    expect(screen.queryByText('Meta alcanzada')).not.toBeInTheDocument()
    expect(screen.getByTestId('kmh-progress')).toHaveAttribute('stroke-dashoffset', '75')
  })

  it('supports full chart, zones, indicator, custom types and tones', () => {
    const { container } = render(
      <KmhGoalChart current={70} goal={100} animated={false}
        chartType="radial" variant="card" tone="success"
        zones={[{ from: 0, to: 40, color: 'red' }, { from: 40, to: 100, color: 'lime' }]}
        showProgressIndicator testId="my-chart" />
    )
    expect(screen.getByTestId('my-chart')).toHaveAttribute('data-chart-type', 'radial')
    expect(container.querySelectorAll('path')).toHaveLength(4)
    expect(container.querySelector('circle')).not.toBeNull()
  })

  it('does not mutate colorStops while applying the highest matching color', () => {
    const colorStops = Object.freeze([
      Object.freeze({ minPercentage: 80, color: '#00f' }),
      Object.freeze({ minPercentage: 30, color: '#f00' })
    ])
    render(<KmhGoalChart current={50} goal={100} animated={false} colorStops={colorStops as any} />)
    expect(screen.getByTestId('kmh-progress')).toHaveAttribute('stroke', '#f00')
  })

  it('retains SVG dash patterns and render slot precedence', () => {
    render(
      <KmhGoalChart current={30} goal={100} animated={false} strokeDasharray="4 2"
        centerContent={<span>Prioritario</span>}
        renderCenter={() => <span>Secundario</span>}
        showPercentage showValue />
    )
    const progress = screen.getByTestId('kmh-progress')
    expect(progress).toHaveAttribute('stroke-dasharray', '4 2')
    expect(progress).not.toHaveAttribute('stroke-dashoffset')
    expect(screen.getByText('Prioritario')).toBeInTheDocument()
    expect(screen.queryByText('Secundario')).not.toBeInTheDocument()
    expect(screen.queryByText('30%')).not.toBeInTheDocument()
  })

  it('preserves overflow and goal reached labels for 100+ percent', () => {
    render(<KmhGoalChart current={145} goal={100} animated={false}
      showOverflowLabel showGoalReachedLabel />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
    expect(screen.getByText('+45% sobre la meta')).toBeInTheDocument()
    expect(screen.getByText('Meta alcanzada')).toBeInTheDocument()
  })

  it('updates the visual progress when a goal changes without animation', () => {
    const { rerender } = render(<KmhGoalChart current={20} goal={100} animated={false} />)
    expect(screen.getByTestId('kmh-progress')).toHaveAttribute('stroke-dashoffset', '80')
    rerender(<KmhGoalChart current={90} goal={100} animated={false} />)
    expect(screen.getByTestId('kmh-progress')).toHaveAttribute('stroke-dashoffset', '10')
  })

  it('exposes interactive center content outside the presentational progressbar subtree', () => {
    render(<KmhGoalChart current={60} goal={100} animated={false}
      centerContent={<button type="button">Abrir detalle</button>} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '60')
    expect(screen.getByRole('button', { name: 'Abrir detalle' })).toBeInTheDocument()
  })

  it('renders on the server without reading window or document', () => {
    const html = renderToString(<KmhGoalChart current={40} goal={100} animated={false} />)
    expect(html).toContain('aria-valuenow="40"')
    expect(html).toContain('viewBox="0 0 240 240"')
  })

  it('honors reduced-motion preference by jumping to the final state', () => {
    const oldMatchMedia = window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn().mockReturnValue({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      })
    })
    try {
      render(<KmhGoalChart current={60} goal={100} animated />)
      expect(screen.getByTestId('kmh-progress')).toHaveAttribute('stroke-dashoffset', '40')
    } finally {
      Object.defineProperty(window, 'matchMedia', { configurable: true, value: oldMatchMedia })
    }
  })

  it('supports responsive sizing and an embedded legend', () => {
    const { container } = render(
      <KmhGoalChart current={80} goal={100} animated={false} responsive
        legendItems={[{ label: 'Completado', color: '#0a0', value: '80%' }]} />
    )
    expect(screen.getByText('Completado')).toBeInTheDocument()
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 240 240')
    expect(container.querySelector('[style*="max-width"]')).not.toBeNull()
  })

  it('keeps the standalone legend API', () => {
    render(<KmhGoalChartLegend items={[{ label: 'Restante', color: '#999', description: 'Saldo' }]} />)
    expect(screen.getByText('Restante')).toBeInTheDocument()
    expect(screen.getByText('Saldo')).toBeInTheDocument()
  })
})
