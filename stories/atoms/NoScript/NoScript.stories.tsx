import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NoScript } from './index';

const meta: Meta = {
  title: 'atoms/NoScript',
  component: NoScript,
  argTypes: {
  },
  args: {
    children: <div>Some content</div>,
  },
};

export default meta;

type Story = StoryObj<typeof NoScript>;

export const Default: Story = {
    args: {
      children: <div>Some content</div>,
    },
  };