import type { Meta, StoryObj } from '@storybook/react'
import { Barcodes } from './index'

const meta: Meta<typeof Barcodes> = {
  component: Barcodes,
  title: 'molecules/Barcodes',
  argTypes: {
    value: { control: 'text' }
  },
  args: {
    value: 'info'
  }
}

export default meta
type Story = StoryObj<typeof Barcodes>

export const BarcodesMain: Story = {
  args: {
    value: 'info'
  }
}
