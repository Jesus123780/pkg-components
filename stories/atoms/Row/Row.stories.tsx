import type { Meta, StoryObj } from '@storybook/react'
import { Row } from './index';

const meta: Meta<typeof Row> = {
  component: Row,
};

export default meta;
type Story = StoryObj<typeof Row>;

export const Primary: Story = {
  args: {
    justifyContent: 'flex-start'
  },
};