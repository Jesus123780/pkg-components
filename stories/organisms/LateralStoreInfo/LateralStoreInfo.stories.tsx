import React from 'react'
import { LateralStoreInfo } from './index'

export default {
  title: 'organisms/LateralStoreInfo',
  component: LateralStoreInfo
}

const Template = (args) => {return <LateralStoreInfo {...args} />}

export const Default = Template.bind({})
Default.args = {
  show: true,
  active: 1,
  handleClose: () => {
    console.log('Close button clicked')
  }
}
