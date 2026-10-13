import type { Meta, StoryObj } from '@storybook/react'

import { RippleButton } from './index'

const meta = {
  title: 'Components/Buttons/RippleButton',
  component: RippleButton,
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered'
  },
  args: {
    label: 'Continuar',
    type: 'button',
    loading: false,
    disabled: false,
    ripple: true,
    rippleDuration: 650,
    fullWidth: true
  },
  argTypes: {
    label: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ripple: { control: 'boolean' },
    rippleDuration: {
      control: { type: 'number', min: 100, max: 2000, step: 50 }
    },
    rippleColor: { control: 'color' },
    fullWidth: { control: 'boolean' },
    bgColor: { control: 'color' },
    color: { control: 'color' },
    radius: { control: 'text' },
    padding: { control: 'text' },
    height: { control: 'text' },
    margin: { control: 'text' },
    border: { control: 'text' },
    family: { control: 'text' },
    loadingLabel: { control: 'text' },
    active: { control: 'text' },
    standard: { control: 'boolean' }
  }
} satisfies Meta<typeof RippleButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithChildren: Story = {
  args: {
    label: 'Comprar',
    children: <strong aria-hidden="true"> ↗</strong>,
    radius: '8px'
  }
}

export const Loading: Story = {
  args: {
    label: 'Guardando cambios',
    loading: true,
    loadingLabel: 'Guardando, por favor espera…'
  }
}

export const Disabled: Story = {
  args: {
    label: 'No disponible',
    disabled: true
  }
}

export const CustomAppearance: Story = {
  args: {
    label: 'Confirmar pago',
    bgColor: '#202938',
    color: '#ffffff',
    radius: '12px',
    border: '1px solid #3b4658',
    padding: '0.9rem 1.4rem',
    height: '52px',
    rippleColor: 'rgba(255, 255, 255, 0.52)'
  }
}

export const WithoutRipple: Story = {
  args: {
    label: 'Sin animación ripple',
    ripple: false
  }
}

export const ContentWidth: Story = {
  args: {
    label: 'Ancho según el contenido',
    fullWidth: false,
    radius: '8px',
    padding: '0.8rem 1.25rem'
  }
}
