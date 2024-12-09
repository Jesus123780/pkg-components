import type { Meta, StoryObj } from '@storybook/react'
import DEFAULTBANNER from '../../../public/Images/DEFAULTBANNER.png'
import { CardProducts } from './index'

const meta: Meta<typeof CardProducts> = {
  component: CardProducts,
  title: 'organisms/CardProducts'
}
export default meta
type Story = StoryObj<typeof CardProducts>

const productProps = {
  ProDescription: 'description',
  ProDescuento: 0,
  ProImage: DEFAULTBANNER.src,
  ProPrice: 1500.01,
  pName: 'name',
  fId: null,
  pId: null,
  cId: null,
  colorId: null,
  ctId: null,
  dId: null,
  editing: false,
  edit: false,
  ProAssurance: null,
  ProDelivery: 0,
  ProHeight: null,
  ProOutstanding: 0,
  ProProtegido: null,
  ProQuantity: null,
  ProStar: 0,
  ProUniDisponibles: null,
  ProVoltaje: null,
  ProWeight: undefined,
  pDatCre: '',
  pDatMod: '',
  pState: 1,
  sTateLogistic: 0,
  sizeId: null,
  tag: null,
  ValueDelivery: null,
  area: null,
  comment: false,
  dataExtra: [],
  dataOptional: [],
  feat: null,
  getOneTags: null,
  onClick: () => {},
  render: null,
  __typename: 'ProductFood'
}
export const Primary: Story = {
  args: {
    isVisible: true,
    food: {
      ...productProps
    },
    loading: false
  }
}

export const Secondary: Story = {
  args: {
    isVisible: true,
    food: {
      ...productProps
    },
    loading: true
  }
}
