import React from 'react'
import { ChoicesHeader } from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ChoicesHeader> = {
  title: 'molecules/ChoicesHeader',
  component: ChoicesHeader
}

export default meta

type Story = StoryObj<typeof ChoicesHeader>

export const Default: Story = {
  render: () => <ChoicesHeader />
}
