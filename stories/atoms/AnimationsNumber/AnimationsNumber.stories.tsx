import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AnimationsNumber } from './index';

export default {
  title: 'atoms/AnimationsNumber',
  component: AnimationsNumber,
} as Meta;

const Template: Story = (args) => <AnimationsNumber {...args} />;

export const Example = Template.bind({});
Example.args = {
  text: '0.00',
};
