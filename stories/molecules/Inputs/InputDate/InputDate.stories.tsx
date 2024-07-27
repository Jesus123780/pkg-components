import type { Meta, StoryObj } from '@storybook/react'
import { InputDate } from './index'

const meta: Meta<typeof InputDate> = {
  component: InputDate,
  title: 'molecules/InputDate',
  args: {
  }
}

export default meta

type Story = StoryObj<typeof InputDate>

export const InputDatePrimary: Story = {
  args: {
    label: 'Label',
    withRange: false
  }
}
