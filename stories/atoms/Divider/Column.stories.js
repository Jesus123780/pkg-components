import React from 'react'
import { Divider } from './index'

export default {
  title: 'atoms/Divider',
  component: Divider,
  argTypes: {
    borderTop: { control: 'boolean' },
    borderBottom: { control: 'boolean' },
    margin: { control: 'number' }
  }
}

const Template = (args) => {return <Divider {...args} />}

export const Default = Template.bind({})
Default.args = {
  borderTop: true,
  borderBottom: true,
  margin: 10
}
