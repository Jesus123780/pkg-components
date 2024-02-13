// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';

import { ContentQueryCard } from './index';

const meta: Meta<typeof ContentQueryCard> = {
  component: ContentQueryCard,
    title: 'molecules/ContentQueryCard',
    argTypes: {
      day: { control: 'text' },
      delivery: { control: 'number' },
      restaurant: { control: 'number' },
      totalSales: { control: 'number' },
    },
    args: {
      day: 'hoy',
      delivery: 0,
      restaurant: 0,
      totalSales: 0,
    },
};

export default meta;
type Story = StoryObj<typeof ContentQueryCard>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {
  },
};