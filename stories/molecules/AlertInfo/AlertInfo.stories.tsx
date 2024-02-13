import type { Meta, StoryObj } from '@storybook/react';
import { AlertInfo } from './index';

const meta: Meta<typeof AlertInfo> = {
  component: AlertInfo,
  title: 'molecules/AlertInfo',
  argTypes: {
    type: { control: 'select' },
    message: { control: 'text' }
  },
  args: {
    type: 'info',
    message: 'This is an alert'
  },
};

export default meta;
type Story = StoryObj<typeof AlertInfo>;

export const AlertInfoMain: Story = {
  args: {
    type: 'info',
    message: 'This is an alert'
  },
};

export const AlertInfoWarning: Story = {
  args: {
    type: 'warning',
    message: 'This is an alert warning'
  },
};

export const AlertInfoError: Story = {
  args: {
    type: 'error',
    message: 'This is an alert error'
  },
};
