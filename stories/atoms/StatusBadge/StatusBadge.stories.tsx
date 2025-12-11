import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from './index'

const meta: Meta<typeof StatusBadge> = {
  title: 'atoms/StatusBadge',
  component: StatusBadge,
}
export default meta

type Story = StoryObj<typeof StatusBadge>

export const Default: Story = {
  args: {
    id: '1',
    status: 'approved',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <StatusBadge id="1" status="approved" size="sm" />
      <StatusBadge id="2" status="approved" size="md" />
      <StatusBadge id="3" status="approved" size="lg" />
    </div>
  )
}

export const UnknownStatus: Story = {
  args: {
    id: '9',
    status: 'mystery',
  },
}