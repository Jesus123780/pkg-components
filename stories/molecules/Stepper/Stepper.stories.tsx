import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './index'

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  title: 'molecules/stepper'
}

export default meta
type Story = StoryObj<typeof Stepper>

export const Primary: Story = {
  args: {
    active: 0
  }
}

export const StepTwo: Story = {
  args: {
    active: 1
  }
}

export const StepEnd: Story = {
  args: {
    active: 2
  }
}
