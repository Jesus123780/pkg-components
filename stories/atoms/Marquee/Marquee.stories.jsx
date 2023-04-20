import React from 'react';
import { Marquee } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'atoms/Marquee',
  component: Marquee,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Marquee {...args} />;

export const TemplateMarquee = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateMarquee.args = {
  children: 'some text',
  primary: false,
  label: 'Marquee'
};
