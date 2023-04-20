import React from 'react';
import { Skeleton } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'molecules/Skeleton',
  component: Skeleton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Skeleton {...args} />;

export const TemplateSkeleton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateSkeleton.args = {
  numberObject: 21,
  height: 100,
  width: 100,
  margin: '100px'
};
