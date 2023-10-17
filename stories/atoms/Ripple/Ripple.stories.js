import React from 'react';
import { RippleButton } from './index';

export default {
  title: 'atoms/RippleButton',
  component: RippleButton,
};

const Template = (args) => <RippleButton {...args} />;

export const Example = Template.bind({});
Example.args = {
  label: 'Click Me',
  onClick: () => {
    alert('Button clicked!');
  },
};
