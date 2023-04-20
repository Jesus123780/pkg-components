import React from 'react';
import { CardProducts } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/CardProducts',
  component: CardProducts,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardProducts {...args} />;

export const TemplateCardProducts = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateCardProducts.args = {

};
