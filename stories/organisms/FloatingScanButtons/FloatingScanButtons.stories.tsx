import React from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import { FloatingScanButtons } from './index'

const meta: Meta<typeof FloatingScanButtons> = {
  title: 'organisms/FloatingScanButtons',
  component: FloatingScanButtons,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof FloatingScanButtons>

export const Default: Story = {
  args: {
    onOpenQRModal: () => alert('QR modal opened'),
    onOpenBarcodeModal: () => alert('Barcode modal opened')
  }
}
