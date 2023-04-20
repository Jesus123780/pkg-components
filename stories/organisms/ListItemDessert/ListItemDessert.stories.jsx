import React from 'react';
import { List } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/List',
  component: List,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <List {...args} />;

export const TemplateList = Template.bind({});
// More on args: https://storyb ook.js.org/docs/react/writing-stories/args
TemplateList.args = {
  list: {
    cards: [1, 2, 3]
  }
};
