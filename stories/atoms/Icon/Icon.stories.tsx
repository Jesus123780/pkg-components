import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './index';

const meta: Meta<typeof Icon> = {
    component: Icon,
    title: "atoms/Icon",
    args: {
      icon: 'MiniCheck',
      size: 24,
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const IconoMiniCheck: Story = {
  args: {
    icon: 'MiniCheck',
    size: 24,
  },
};

export const IconoLogoCMF: Story = {
  args: {
    icon: 'LogoCMF',
    size: 100,
  },
};
