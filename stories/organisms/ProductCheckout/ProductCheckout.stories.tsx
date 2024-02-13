import React from 'react'
import { ProductCheckout } from './index'
import { mockDataProduct } from './mockData'

export default {
  title: 'organisms/ProductCheckout',
  component: ProductCheckout,
  argTypes: {
    product: mockDataProduct
  }
}

const Template = (args) => {return <ProductCheckout {...args} />}

export const Default = Template.bind({})
Default.args = {
  product: mockDataProduct
}
