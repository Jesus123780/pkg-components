import type { Meta, StoryObj } from '@storybook/react'
import { BarcodeScanner } from './index'

const meta: Meta<typeof BarcodeScanner> = {
  component: BarcodeScanner,
  title: 'organisms/BarcodeScanner'
}
export default meta
type Story = StoryObj<typeof BarcodeScanner>

const barcodeScannerProps = {
}
export const BarcodeScannerPrimary: Story = {
  args: {
    ...barcodeScannerProps

  }
}

export const BarcodeScannerSecondary: Story = {
  args: {
    ...barcodeScannerProps
  }
}
