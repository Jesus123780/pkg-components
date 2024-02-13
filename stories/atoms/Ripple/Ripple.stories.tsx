import React from 'react';
import type { Meta, StoryObj } from '@storybook/react'; 
import { RippleButtonProps, RippleButton } from './index';

const meta: Meta<RippleButtonProps> = {
  component: RippleButton,
  title: 'atoms/RippleButton',
};

export default meta;

type Story = StoryObj<typeof RippleButton>;

export const Example: Story = (args = {}) => <RippleButton {...args as RippleButtonProps} />
Example.args = {
  label: 'Click Me',
  onClick: () => {
    alert('Button clicked!');
  },
};
