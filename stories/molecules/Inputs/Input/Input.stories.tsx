import React from 'react'
import { Meta } from '@storybook/react'
import { Input } from './index'

export default {
  title: 'atoms/Input',
  component: Input,
  argTypes: {
    autoComplete: { control: 'text' },
    border: { control: 'text' }
  },
} as Meta

const Template = (args: any) => <Input {...args} />

export const Default = Template.bind({})

Default.args = {
  placeholder: 'Enter text...',
  width: '400px',
  labelButton: 'Button'
}
