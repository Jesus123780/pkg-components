import React from 'react';
import { AwesomeModal } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/AwesomeModal',
  component: AwesomeModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <AwesomeModal {...args} />;

export const TemplateAwesomeModal = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateAwesomeModal.args = {
  show: true,
  children: ''
};
