import React from 'react';
import { Toast } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'molecules/Toast',
  component: Toast,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Toast {...args} />;

export const TemplateToast = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateToast.args = {
  toastList: [
  {
    backgroundColor: 'red',
    title: 'Title',
    description: 'Description'
  },
  ]
};
