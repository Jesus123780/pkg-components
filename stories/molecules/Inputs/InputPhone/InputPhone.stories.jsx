import React from 'react'
import { PhoneInput } from './index'

export default {
  title: 'molecules/PhoneInput',
  component: PhoneInput,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

const Template = (args) => {
  return <PhoneInput {...args} />
}

export const TemplatePhoneInput = Template.bind({})
TemplatePhoneInput.args = {
  value: 'Hello, world',
  defaultCountry: 'col',
  required: true,
  countries: [
    [
      'Colombia',
      'col',
      '57',
      '.... ......'
    ]
  ]
}
