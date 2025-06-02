import type { Meta, StoryObj } from '@storybook/react'
import { AmountInput } from './index'

const meta: Meta<typeof AmountInput> = {
  component: AmountInput,
  title: 'organisms/AmountInput',
  args: {
  }
}

export default meta

type Story = StoryObj<typeof AmountInput>

export const AmountInputPrimary: Story = {
  args: {
    label: 'Amount'
  }
}
