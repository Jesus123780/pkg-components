import type { Meta, StoryObj } from '@storybook/react'
import { ModalDetailOrder } from './index'
import { mockDataOrder } from './mockData'

const meta: Meta<typeof ModalDetailOrder> = {
  component: ModalDetailOrder,
  title: 'atoms/ModalDetailOrder',
  args: {

  }
}

export default meta

type Story = StoryObj<typeof ModalDetailOrder>

export const ModalDetailOrderComponent: Story = {
  args: {
    ...mockDataOrder
  }
}
