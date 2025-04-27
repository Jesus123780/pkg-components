import type { Meta, StoryObj } from '@storybook/react'
import { Gridstack } from '../Gridstack/index'

const meta: Meta<typeof Gridstack> = {
  component: Gridstack,
  title: 'molecules/Gridstack',
  args: {
  }
}

export default meta

type Story = StoryObj<typeof Gridstack>

export const GridTemplate: Story = {
  args: {}
}
