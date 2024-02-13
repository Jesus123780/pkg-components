
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './index';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'atoms/Tooltip',
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  args: {
    text: 'Tooltip at the top',
    position: ''
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {
    text: 'Tooltip',
    position: ''
  },
}

export const TopPosition: Story = {
  args: {
    text: 'Tooltip at the top',
    position: 'top'
  },
}

export const BottonPosition: Story = {
  args: {
    text: 'Tooltip at the bottom',
    position: 'bottom'
  },
};
