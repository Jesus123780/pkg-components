import React from 'react'
import { AlertInfo } from './index'

export default {
  title: 'molecules/AlertInfo',
  component: AlertInfo,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

const Template = (args) => {
  return <AlertInfo {...args} />
}

export const TemplateAlertInfo = Template.bind({})

TemplateAlertInfo.args = {
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac nisi'
}

export const Warning = Template.bind({})
Warning.args = {
  type: 'warning',
  message: 'This is a warning message'
}

export const Error = Template.bind({})
Error.args = {
  type: 'error',
  message: 'This is an error message'
}

export const Info = Template.bind({})
Info.args = {
  type: 'info',
  message: 'This is an info message'
}
