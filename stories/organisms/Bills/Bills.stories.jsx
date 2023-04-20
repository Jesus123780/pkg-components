import React from 'react';
import { Example } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/Example',
  component: Example,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Example {...args} />;

export const TemplateExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateExample.args = {

};
