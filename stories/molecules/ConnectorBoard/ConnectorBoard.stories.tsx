import type { Meta, StoryObj } from '@storybook/react'

import { ConnectorBoardExample } from './index'

const meta: Meta<typeof ConnectorBoardExample> = {
  component: ConnectorBoardExample,
  title: 'Molecules/ConnectorBoardExample'
}

export default meta
type Story = StoryObj<typeof ConnectorBoardExample>

export const Primary: Story = {
  args: {
  }
}
