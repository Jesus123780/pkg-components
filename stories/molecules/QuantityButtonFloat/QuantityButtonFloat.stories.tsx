import type { Meta, StoryObj } from '@storybook/react'
import { QuantityButtonFloat } from './index'

const meta: Meta<typeof QuantityButtonFloat> = {
  component: QuantityButtonFloat,
  title: 'molecules/QuantityButtonFloat',
  args: {
    quantity: 0,
    handleIncrement: () => {

    },
    handleDecrement: () => {

    },
    open: false
  },
  argTypes: {
    quantity: {
      control: {
        type: 'number'
      }
    },
    handleIncrement: {
      action: 'handleIncrement'
    },
    handleDecrement: {
      action: 'handleDecrement'
    },
    open: {
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof QuantityButtonFloat>

export const QuantityButtonFloatPrimary: Story = {
  args: {
    open: false
  }
}

export const QuantityButtonFloatPrimaryEditable: Story = {
  args: {
    open: true,
    editable: true
  }
}
