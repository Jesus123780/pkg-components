import type { Meta, StoryObj } from '@storybook/react'

import { CardOrder } from './index'

const meta: Meta<typeof CardOrder> = {
  component: CardOrder,
title: 'Molecules/CardOrder',
};

export default meta;
type Story = StoryObj<typeof CardOrder>;

export const Primary: Story = {
  args: {
  },
};