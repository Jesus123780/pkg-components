import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LoadingButton } from './index';

const meta: Meta = {
  title: 'atoms/LoadingButton',
  component: LoadingButton,
};

export default meta;

type Story = StoryObj<typeof LoadingButton>;

export const Default: Story = {
    args: {
      color: 'transparent'
    },
  };