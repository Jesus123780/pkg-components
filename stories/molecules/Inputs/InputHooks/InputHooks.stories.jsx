import React from 'react';
import { InputHooks } from './InputHooks';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'molecules/InputHooks',
  component: InputHooks,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <InputHooks {...args} />;

export const TemplateInputHookProducts = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateInputHookProducts.args = {
  label: 'InputHooks',
  value: 'Hello, world'
};
