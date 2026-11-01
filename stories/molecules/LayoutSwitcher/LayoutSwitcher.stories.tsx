import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { LayoutSwitcher } from './index'

const meta: Meta<typeof LayoutSwitcher> = {
  title: 'molecules/LayoutSwitcher',
  component: LayoutSwitcher,
  // Aquí puedes definir controles (argTypes) si quieres limitar los valores de los props
  argTypes: {
    // Si tu componente acepta un prop `layout` (o un callback), lo puedes exponer aquí
    initialLayout: {
      control: { type: 'radio' },
      options: ['list', 'grid', 'columns'],
      description: 'Diseño inicial mostrado por el LayoutSwitcher',
    },
    // Si tienes una función callback para cambios de layout
    onLayoutChange: {
      action: 'layoutChanged',
      description: 'Evento cuando cambia el layout',
    },
  },
  args: {
    initialLayout: 'list',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // estos args se van a pasar al componente
    initialLayout: 'list',
  },
  render: (args) => {
    // Aquí puedes pasar args a tu componente
    return <LayoutSwitcher {...args} />
  },
}

export const StartGrid: Story = {
  args: {
    initialLayout: 'grid',
  },
}

export const StartColumns: Story = {
  args: {
    initialLayout: 'columns',
  },
}
