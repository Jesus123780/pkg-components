import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CounterAnimation } from './index'

const meta = {
  title: 'Molecules/CounterAnimation Pro',
  component: CounterAnimation,
  parameters: { layout: 'centered' },
  args: { number: 1523896.27, size: '44px', numberformat: true }
} satisfies Meta<typeof CounterAnimation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const SalesKpi: Story = {
  args: {
    number: 24285860.45,
    size: 'clamp(2rem, 5vw, 4rem)',
    variant: 'card',
    tone: 'success',
    prefix: '$',
    label: 'Ventas de hoy',
    description: 'Actualización en tiempo real',
    locale: 'es-CO',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }
}
export const CompactBadge: Story = {
  args: {
    number: 98.7,
    size: '28px',
    variant: 'soft',
    tone: 'primary',
    animation: 'compact',
    numberformat: false,
    suffix: '%'
  }
}
export const Currency: Story = {
  args: {
    number: -19876.45,
    size: '36px',
    formatStyle: 'currency',
    currency: 'COP',
    locale: 'es-CO',
    variant: 'outline',
    tone: 'danger'
  }
}
export const PlainLegacy: Story = {
  args: { number: 1234.5, size: '2rem', numberformat: true }
}
export const Glass: Story = {
  args: {
    number: 2026,
    size: '3rem',
    numberformat: false,
    variant: 'glass',
    tone: 'neutral',
    suffix: 'año'
  }
}

/** Cambios sucesivos hacia arriba/abajo sin desmontar el contador. */
export const Interactive = () => {
  const [number, setNumber] = useState(999.99)
  return <div style={{ display: 'grid', gap: 24, justifyItems: 'center', padding: 24 }}>
    <CounterAnimation number={number} size="44px" variant="card"
      label="Prueba de incrementos y decrementos" tone="primary" />
    <div style={{ display: 'flex', gap: 12 }}>
      <button type="button" onClick={() => setNumber(v => v - 1.01)}>−1,01</button>
      <button type="button" onClick={() => setNumber(v => v + 1.01)}>+1,01</button>
      <button type="button" onClick={() => setNumber(v => -v)}>Cambiar signo</button>
      <button type="button" onClick={() => setNumber(0)}>Reiniciar</button>
    </div>
  </div>
}

/** Prueba determinista del préstamo 200 -> 199 -> 198 y vuelta a 200. */
export const DecreaseBorrow = () => {
  const [value, setValue] = useState(200)
  return <div style={{ display: 'grid', gap: 20, justifyItems: 'center', padding: 24 }}>
    <CounterAnimation number={value} size="56px" numberformat={false}
      direction="decrease" staggerOrder="auto" animation="reel"
      duration={760} stagger={85} tone="danger" variant="card"
      label="Odómetro descendente" />
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
      <button type="button" onClick={() => setValue(199)}>200 → 199</button>
      <button type="button" onClick={() => setValue(99)}>→ 99</button>
      <button type="button" onClick={() => setValue(v => Math.max(0, v - 1))}>−1</button>
      <button type="button" onClick={() => setValue(200)}>Volver a 200</button>
    </div>
    <p style={{ maxWidth: 380, textAlign: 'center', fontSize: 12 }}>
      Al decrementar, los cilindros deben bajar. El escalonamiento empieza por la derecha.
      Al volver a 200, direction="decrease" fuerza el movimiento visual hacia abajo.
    </p>
  </div>
}
