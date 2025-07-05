import type { Meta, StoryObj } from '@storybook/react'
import { ButtonSuccess } from './index'

const meta: Meta<typeof ButtonSuccess> = {
  component: ButtonSuccess,
  title: 'molecules/ButtonSuccess',
  argTypes: {
  },
  args: {
    text: 'Confirmar compra'
  }
}

export default meta
type Story = StoryObj<typeof ButtonSuccess>

export const ButtonSuccessMain: Story = {
  args: {
    text: 'Confirmar compra',
    loading: true
  }
}
