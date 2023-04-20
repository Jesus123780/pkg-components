import React from 'react';
import { ResisesColumns } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/ResisesColumns',
  component: ResisesColumns,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ResisesColumns {...args} />;

export const TemplateResisesColumns = Template.bind({});
// More on args: https://storyb ook.js.org/docs/react/writing-stories/args
TemplateResisesColumns.args = {
  resisesColumns: {
    cards: [1, 2, 3]
  }
};
