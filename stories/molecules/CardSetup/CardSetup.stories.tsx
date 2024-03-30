import type { Meta, StoryObj } from '@storybook/react'

import { CardSetup } from './index'

const meta: Meta<typeof CardSetup> = {
  component: CardSetup,
  title: 'Molecules/CardSetup'
}

export default meta
type Story = StoryObj<typeof CardSetup>

export const Primary: Story = {
  args: {
    title: 'Horario comercial',
    description: 'Registra el horario y los días comerciales de tu restaurante.'
  }
}
