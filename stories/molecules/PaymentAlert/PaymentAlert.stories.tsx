import type { Meta, StoryObj } from '@storybook/react'
import { PaymentAlert } from './index'

const meta: Meta<typeof PaymentAlert> = {
  component: PaymentAlert,
  title: 'molecules/PaymentAlert'
}

export default meta
type Story = StoryObj<typeof PaymentAlert>

export const Primary: Story = {
  args: {
    text: 'Disfruta de tu periodo de prueba, Quedan 7 día(s) de prueba gratuita.'
  }
}

export const StepTwo: Story = {
  args: {
    text: 'Disfruta de tu periodo de prueba, Quedan 7 día(s) de prueba gratuita.'
  }
}

export const StepEnd: Story = {
  args: {
    text: 'Disfruta de tu periodo de prueba, Quedan 7 día(s) de prueba gratuita.'
  }
}
