import type { Meta, StoryObj } from '@storybook/react'
import { ImageQRCode } from './index'

const meta: Meta<typeof ImageQRCode> = {
  component: ImageQRCode,
  title: 'molecules/ImageQRCode',
  args: {
    size: 100,
    value: 'https://www.google.com'
  }
}

export default meta

type Story = StoryObj<typeof ImageQRCode>

export const GridTemplate: Story = {
  args: {}
}
