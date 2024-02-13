import React from 'react';
import { InputImage } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/InputImage',
  component: InputImage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <InputImage {...args} />;

export const TemplateInputImage = Template.bind({});
// More on args: https://storyb ook.js.org/docs/react/writing-stories/args
TemplateInputImage.args = {
};
