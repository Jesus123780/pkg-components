import React from 'react';
import { Meta, Story } from '@storybook/react'
import { Column, ColumnProps } from './index'

export default {
  title: 'atoms/Column',
  component: Column,
  argTypes: {
    alignItems: {
      control: { type: 'select', options: ['flex-start', 'flex-end', 'center', 'stretch'] },
    },
    justifyContent: {
      control: { type: 'select', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'] },
    },
  },
} as Meta;

const Template: Story<ColumnProps> = (args) => <Column {...args} />;

export const Default = Template.bind({});
Default.args = {
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};
