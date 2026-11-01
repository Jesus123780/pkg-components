import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Paragraph } from './index'

export default {
  title: 'atoms/Paragraph',
  component: Paragraph,
} as Meta;

const Template: Story = (args: any) => <Paragraph {...args} >Basic</Paragraph>;

export const Basic = Template.bind({});
Basic.args = {
  paragraph: 'Hello, Storybook!',
  color: 'blue',
  fontSize: '20px',
  fontWeight: 600,
};

export const Default = () => <Paragraph size='sm' >Hola</Paragraph>

export const CustomClass = () => (
  <Paragraph className="custom-class" >Paragraph with Custom Class</Paragraph>
);


export const CustomStyle = () => (
  <Paragraph color="default" weight='normal' >Paragraph with Custom Class</Paragraph>
);