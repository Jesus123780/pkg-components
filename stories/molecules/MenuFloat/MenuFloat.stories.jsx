import React from 'react';
import { FloatMenu } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'molecules/FloatMenu',
  component: FloatMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FloatMenu {...args} />;

export const TemplateFloatMenu = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateFloatMenu.args = {
  label: 'FloatMenu'
};
