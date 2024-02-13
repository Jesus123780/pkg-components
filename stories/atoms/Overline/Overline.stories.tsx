import React from 'react'
import { Overline } from './index'

export default {
  title: 'atoms/Overline',
  component: Overline,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  args: {
    zIndex: 100,
    bgColor: 'rgba(0, 0, 0, 0.5)',
    show: true
  }
}

const Template = (args: any) => {return <Overline {...args} />}

export const OverLine = Template.bind({})
