import type { Meta, StoryObj } from '@storybook/react';
import { MiniCardProduct } from './index'

const meta: Meta<typeof MiniCardProduct> = {
    component: MiniCardProduct,
    title: "organisms/MiniCardProduct",
    args: {
    },
};

export default meta;

type Story = StoryObj<typeof MiniCardProduct>;

export const MiniCardProductPrimary: Story = {
  args: {
      __typename: "ProductFood",
      pId: "075c0df7-8ec2-2fdf-7db6-2b7b481c03bd",
      sizeId: null,
      colorId: null,
      cId: null,
      dId: null,
      openQuantity: true,
      withQuantity: true,
      ctId: null,
      fId: null,
      pName: "Test con muchos sub items",
      getOneTags: null,
      ProPrice: 5000,
      ProDescuento: "3",
      free: 0,
      ProUniDisponibles: null,
      ProDescription:
        "Alta calidad",
      ProProtegido: null,
      ProAssurance: null,
      ValueDelivery: null,
      ProStar: 0,
      sTateLogistic: 1,
      ProImage:
        "https:https://front-back-server.onrender.comstatic/platos/undefined",
      ProWidth: null,
      ProHeight: null,
      ProLength: "1",
      ProWeight: "1",
      ProQuantity: null,
      ProOutstanding: 0,
      pDatCre: "2024-02-13T10:22:37.930Z",
      pDatMod: "2024-02-13T10:22:37.930Z",
      ProDelivery: 0,
      ProVoltaje: null,
      pState: 1,
      feat: null,
      area: null,
      comment: false,
      edit: false,
      onClick: () => {
          return;
      },
      render: "<IconSales />",
      tag: null,
  },
};

export const MiniCardProductQuantity: Story = {
  args: {
      withQuantity: true,
      __typename: "ProductFood",
      pId: "075c0df7-8ec2-2fdf-7db6-2b7b481c03bd",
      sizeId: null,
      colorId: null,
      cId: null,
      dId: null,
      ctId: null,
      fId: null,
      pName: "Test con muchos sub items",
      getOneTags: null,
      ProPrice: 5000,
      ProDescuento: "3",
      free: 0,
      ProUniDisponibles: null,
      ProDescription:
        "Alta calidad",
      ProProtegido: null,
      ProAssurance: null,
      ValueDelivery: null,
      ProStar: 0,
      sTateLogistic: 1,
      ProImage:
        "https:https://front-back-server.onrender.comstatic/platos/undefined",
      ProWidth: null,
      ProHeight: null,
      ProLength: "1",
      ProWeight: "1",
      ProQuantity: null,
      ProOutstanding: 0,
      pDatCre: "2024-02-13T10:22:37.930Z",
      pDatMod: "2024-02-13T10:22:37.930Z",
      ProDelivery: 0,
      ProVoltaje: null,
      pState: 1,
      feat: null,
      area: null,
      comment: false,
      edit: false,
      onClick: () => {
          return;
      },
      render: "<IconSales />",
      tag: null,
  },
};
