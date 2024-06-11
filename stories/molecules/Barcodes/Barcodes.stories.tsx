import type { Meta, StoryObj } from '@storybook/react'
import { BarCodes } from './index'

const meta: Meta<typeof BarCodes> = {
  component: BarCodes,
  title: 'molecules/BarCodes',
  argTypes: {
    value: { control: 'text' }
  },
  args: {
    value: 'info'
  }
}

export default meta
type Story = StoryObj<typeof BarCodes>

export const BarCodesMain: Story = {
  args: {
    value: 'info'
  }
}
