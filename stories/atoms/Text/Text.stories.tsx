import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Text } from './index'

export default {
  title: 'atoms/Text',
  component: Text,
} as Meta;

const Template: Story = (args: any) => <Text {...args} >Basic</Text>;

export const Basic = Template.bind({});
Basic.args = {
  text: 'Hello, Storybook!',
  color: 'blue',
  fontSize: '20px',
  fontWeight: 600,
};

export const Default = () => <Text size='sm' >Hola</Text>

export const CustomClass = () => (
  <Text className="custom-class" >Text with Custom Class</Text>
);

export const MultipleClasses = () => (
  <Text className={['class1', 'class2', 'class3']} >Text with Custom Class</Text>
);

export const CustomStyle = () => (
  <Text color="default" weight='normal' >Text with Custom Class</Text>
);