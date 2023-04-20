import React from 'react';
import { Carrusel3D } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'molecules/Carrusel3D',
  component: Carrusel3D,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Carrusel3D {...args} />;

export const TemplateCarrusel3D = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateCarrusel3D.args = {
  label: 'Carrusel3D'
};
