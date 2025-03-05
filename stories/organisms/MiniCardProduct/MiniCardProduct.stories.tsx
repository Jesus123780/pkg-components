import type { Meta, StoryObj } from '@storybook/react'
import { MiniCardProduct } from './index'

const meta: Meta<typeof MiniCardProduct> = {
  component: MiniCardProduct,
  title: 'organisms/MiniCardProduct',
  args: {
  }
}

export default meta

type Story = StoryObj<typeof MiniCardProduct>
const argsProduct = {
  withQuantity: true,
  __typename: 'ProductFood',
  pId: '075c0df7-8ec2-2fdf-7db6-2b7b481c03bd',
  sizeId: null,
  colorId: null,
  cId: null,
  dId: null,
  ctId: null,
  fId: null,
  pName: 'Test con muchos sub items que se pueden agregar, ademas de tener un precio muy accesible, also have a lot of sub items that you can add, also have a very',
  getOneTags: null,
  ProPrice: 5000,
  ProDescuento: 3,
  free: false,
  ProUniDisponibles: null,
  ProDescription: 'Alta calidad, con el mejor sabor y textura que puedas encontrar en el mercado, te lo garantizamos, ven y comprueba por ti mismo. also have a lot of sub items that you can add, also have a very',
  ProProtegido: null,
  ProAssurance: null,
  ValueDelivery: null,
  ProStar: 0,
  sTateLogistic: 1,
  ProImage:
      'https:https://front-back-server.onrender.comstatic/platos/undefined',
  ProWidth: null,
  ProHeight: null,
  ProLength: '1',
  ProWeight: '1',
  ProOutstanding: 0,
  pDatCre: '2024-02-13T10:22:37.930Z',
  pDatMod: '2024-02-13T10:22:37.930Z',
  ProDelivery: 0,
  ProQuantity: 1,
  ProVoltaje: null,
  pState: 1,
  feat: null,
  area: null,
  comment: false,
  edit: false,
  onClick: () => {

  },
  render: '<IconSales />',
  tag: null
}
export const MiniCardProductPrimary: Story = {
  args: {
    ...argsProduct
  }
}

export const MiniCardProductQuantity: Story = {
  args: {
    ...argsProduct,
    editing: true,
    openQuantity: true
  }
}

export const MiniCardProductFree: Story = {
  args: {
    ...argsProduct,
    free: true
  }
}

export const MiniCardProductCanDeleted: Story = {
  args: {
    ...argsProduct,
    free: false,
    canDelete: true,
    editable: true,
    hoverFree: true
  }
}

export const MiniCardProductOnlyStock: Story = {
  args: {
    ...argsProduct,
    free: false,
    canDelete: false,
    withQuantity: false,
    withStock: false,
    editable: false,
    hoverFree: false
  }
}

export const MiniCardProductShowInfo: Story = {
  args: {
    ...argsProduct,
    free: false,
    canDelete: false,
    withQuantity: false,
    withStock: false,
    editable: false,
    hoverFree: false,
    showInfo: true,
    withStock: true,
    stock: 10
  }
}
