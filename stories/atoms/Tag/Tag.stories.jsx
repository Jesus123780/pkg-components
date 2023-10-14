import React from 'react';
import { Tag } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'atoms/Tag',
  component: Tag,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Tag {...args} />;

export const TemplateTag = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateTag.args = {
  label: "Tag"
};
