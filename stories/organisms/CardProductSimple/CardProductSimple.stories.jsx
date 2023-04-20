import React from 'react';
import { CardProductSimple } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/CardProductSimple',
  component: CardProductSimple,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardProductSimple {...args} />;

export const TemplateCardProductSimple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateCardProductSimple.args = {

};
