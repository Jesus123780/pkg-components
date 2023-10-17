import React from 'react';
import { DropdownMenu } from './index';

export default {
  title: 'molecules/DropdownMenu',
  component: DropdownMenu
};

const options = [
  { optionName: 'Option 1', icon: 'icon1', action: () => console.log('Option 1 clicked') },
  { optionName: 'Option 2', icon: 'icon2', action: () => console.log('Option 2 clicked') },
];

const Template = (args) => <DropdownMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  options,
  show: true,
  position: { x: 100, y: 100 },
};
