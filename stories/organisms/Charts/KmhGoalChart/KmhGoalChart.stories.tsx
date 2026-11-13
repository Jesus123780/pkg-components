'use client'

import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { KmhGoalChart } from './KmhGoalChart'

const meta = {
  title: 'Organisms/Charts/KmhGoalChart',
  component: KmhGoalChart,
  parameters: { layout: 'centered' },
  argTypes: {
    chartType: { control: 'select', options: ['gauge', 'semicircle', 'quarter', 'three-quarter', 'radial', 'donut', 'custom'] },
    variant: { control: 'select', options: ['plain', 'soft', 'card', 'outline', 'glass', 'minimal'] },
    tone: { control: 'select', options: ['primary', 'success', 'warning', 'danger', 'neutral'] }
  },
  args: { current: 64, goal: 100, size: 260, showGoalReachedLabel: true }
} satisfies Meta<typeof KmhGoalChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }

export const Radial: Story = {
  args: {
    chartType: 'radial', variant: 'card', tone: 'success',
    current: 82, goal: 100, showTicks: true, tickCount: 10,
    caption: 'Cumplimiento de ventas', description: 'Objetivo mensual'
  }
}

export const Semicircle: Story = {
  args: {
    chartType: 'semicircle', variant: 'soft', tone: 'primary',
    showGoalMarker: true, startLabel: 'Inicio', endLabel: 'Meta',
    current: 44, goal: 70, showProgressIndicator: true
  }
}

export const ThreeQuarter: Story = {
  args: {
    chartType: 'three-quarter', variant: 'outline', tone: 'warning',
    current: 75, goal: 100,
    zones: [
      { from: 0, to: 40, color: '#e56a70', label: 'Bajo' },
      { from: 40, to: 75, color: '#e8b154', label: 'Medio' },
      { from: 75, to: 100, color: '#29a47b', label: 'Alto' }
    ]
  }
}

export const FullDonut: Story = {
  args: {
    chartType: 'donut', variant: 'glass', tone: 'primary',
    current: 950000, goal: 1000000, locale: 'es-CO', moneyFormat: true,
    currency: 'COP', progressGradient: { startColor: '#e94057', endColor: '#8b5cf6' },
    caption: 'Ingresos del día'
  }
}

export const GoalExceeded: Story = {
  args: {
    chartType: 'radial', tone: 'success', variant: 'card',
    current: 125, goal: 100, showOverflowLabel: true, showGoalReachedLabel: true,
    showGlow: true, glowBlur: 3
  }
}

export const CustomCenter: Story = {
  args: {
    chartType: 'donut', variant: 'soft', current: 74, goal: 100,
    renderCenter: ({ percentage }) => <div style={{ textAlign: 'center' }}>
      <strong style={{ display: 'block', fontSize: 26 }}>{percentage.toFixed(0)}%</strong>
      <small>Conversión</small>
    </div>,
    legendItems: [
      { label: 'Completado', color: '#299b73', value: '74%' },
      { label: 'Pendiente', color: '#b8c1ce', value: '26%' }
    ]
  }
}

export const ReducedMotionReady: Story = {
  args: { chartType: 'quarter', variant: 'minimal', current: 12, goal: 100, animationDuration: 1400 }
}
