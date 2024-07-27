import type { Meta, StoryObj } from '@storybook/react'
import { CharSalesMain } from './index'

const meta: Meta<typeof CharSalesMain> = {
  component: CharSalesMain,
  title: 'atoms/CharSalesMain',
  args: {

  }
}

export default meta

type Story = StoryObj<typeof CharSalesMain>

export const CharSalesMainComponent: Story = {
  args: {
  }
}
