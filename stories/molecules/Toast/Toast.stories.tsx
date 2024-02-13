import React from 'react';
import { Toast } from './index';

// Más sobre la exportación por defecto: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'molecules/Toast',
  component: Toast,
  // Más sobre argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// Más sobre plantillas de componentes: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <Toast {...args} />;
};

// Más sobre args: https://storybook.js.org/docs/react/writing-stories/args
export const TemplateToast = Template.bind({});
TemplateToast.args = {
  toastList: [
    {
      backgroundColor: 'red',
      title: 'Title',
      description: 'Description',
    },
  ],
};

export const MultipleToasts = Template.bind({});
MultipleToasts.args = {
  toastList: [
    {
      backgroundColor: 'red',
      title: 'Title 1',
      description: 'Description 1',
      id: 1,
    },
    {
      backgroundColor: 'green',
      title: 'Title 2',
      description: 'Description 2',
      id: 2,
    },
    {
      backgroundColor: 'blue',
      title: 'Title 3',
      description: 'Description 3',
      id: 3,
    },
  ],
};
