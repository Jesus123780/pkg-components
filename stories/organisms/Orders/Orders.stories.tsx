import React from 'react'
import { Orders } from './index'

export default {
  title: 'organisms/orders',
  component: Orders,
  argTypes: {
    orders: [1, 2, 4]
  }
}

const Template = (args) => {return <Orders {...args} />}

export const Default = Template.bind({})
Default.args = {
  orders: [1, 2, 4]

}
