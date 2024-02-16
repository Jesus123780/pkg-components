import React from 'react';
import { Toast, ToastProps } from './index';

export default {
  title: 'molecules/Toast',
  component: Toast,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args: ToastProps) => {
  return <Toast {...args} />;
};

export const TemplateToast = Template.bind({});
// @ts-ignore
TemplateToast.args = {
  toastList: [
    {
      backgroundColor: 'red',
      title: 'Title',
      description: 'Description',
    },
  ],
};

export const MultipleToasts = Template.bind({})
// @ts-ignore
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
