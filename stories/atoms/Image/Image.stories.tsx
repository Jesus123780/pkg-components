import React from 'react'
import { Meta } from '@storybook/react'
import { Image } from './index'

export default {
  title: 'atoms/Image',
  component: Image,
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
  },
} as Meta;

const Template: any = (args: any) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://via.placeholder.com/150',
  alt: 'Placeholder Image',
};
