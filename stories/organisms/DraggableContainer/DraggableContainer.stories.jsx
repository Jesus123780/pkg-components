import React from 'react';
import { DraggableContainer } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/DraggableContainer',
  component: DraggableContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <DraggableContainer {...args} />;

export const TemplateDraggableContainer = Template.bind({});
// More on args: https://storyb ook.js.org/docs/react/writing-stories/args
TemplateDraggableContainer.args = {
  maxWidth: '315px',
  isOpen: true,
  hiddenX: false,
  errorModal:false
};
