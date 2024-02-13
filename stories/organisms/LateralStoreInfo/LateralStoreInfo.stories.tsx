import React from 'react'
import { LateralStoreInfo } from './index'
import { Text } from '../../atoms'

export default {
  title: 'organisms/LateralStoreInfo',
  component: LateralStoreInfo,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  args: {
    active: 0,
    fState: 0,
    idStore: '',
    minOrder: 0,
    overActive: 0,
    rating: 0,
    show: true,
    steps: [],
    schedulesStore: [],
    setRatingStar: (props: any) => console.log(props),
    handleClose: () => console.log('handleClose'),
    setActive: (active: any) => console.log(active),
    setRating: (rating: any) => console.log(rating),
    handleOverActive: (index: any) => console.log(index),
    removeFav: (idStore: any, fState: any) => console.log(idStore, fState),
    addFav: (idStore: any) => console.log(idStore)
  
  }
}

const Template = (args) => {
  return <>
  <Text>Hola</Text>
  <LateralStoreInfo {...args} />
  </>
}

export const TemplateLateralStoreInfo = Template.bind({})
TemplateLateralStoreInfo.args = {
  active: 0,
  fState: 0,
  idStore: '',
  minOrder: 0,
  overActive: 0,
  rating: 0,
  show: true,
  steps: [],
  schedulesStore: [],
  setRatingStar: (props: any) => console.log(props),
  handleClose: () => console.log('handleClose'),
  setActive: (active: any) => console.log(active),
  setRating: (rating: any) => console.log(rating),
  handleOverActive: (index: any) => console.log(index),
  removeFav: (idStore: any, fState: any) => console.log(idStore, fState),
  addFav: (idStore: any) => console.log(idStore)
}
