import React from 'react';
import { Tooltip } from './index';

export default {
  title: 'atoms/Tooltip',
  component: Tooltip,
};

const Template = (args) => (
  <Tooltip {...args}>
    <button>Hover me</button>
  </Tooltip>
);

export const TopPosition = Template.bind({});
TopPosition.args = {
  text: 'Tooltip at the top',
  position: 'top',
};

export const BottomPosition = Template.bind({});
BottomPosition.args = {
  text: 'Tooltip at the bottom',
  position: 'bottom',
};

export const LeftPosition = Template.bind({});
LeftPosition.args = {
  text: 'Tooltip at the left',
  position: 'left',
};

export const RightPosition = Template.bind({});
RightPosition.args = {
  text: 'Tooltip at the right',
  position: 'right',
};
