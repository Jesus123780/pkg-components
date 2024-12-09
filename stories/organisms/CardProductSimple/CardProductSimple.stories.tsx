import type { Meta, StoryObj } from '@storybook/react'
import { CardProductSimple } from './index'

const meta: Meta<typeof CardProductSimple> = {
  component: CardProductSimple,
  title: 'organisms/CardProductSimple'
}
export default meta
type Story = StoryObj<typeof CardProductSimple>

const productProps = {
  ProDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec, consectetur adipiscing elit. Nullam auctor, nunc nec',
  ProDescuento: 2000,
  ProImage: 'https://via.placeholder.com/250',
  ProPrice: 1500.01,
  pName: 'Potato and chips, 1kg',
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
  ProQuantity: 0,
  ProStar: 0,
  ProUniDisponibles: null,
  ProVoltaje: null,
  ProWeight: undefined,
  pDatCre: '',
  pDatMod: '',
  pState: 1,
  sTateLogistic: 0,
  sizeId: null,
  ValueDelivery: 5000,
  area: null,
  comment: false,
  dataExtra: [],
  dataOptional: [],
  feat: null,
  getOneTags: null,
  onClick: () => {},
  render: true,
  __typename: 'ProductFood'
}
export const CardProductSimplePrimary: Story = {
  args: {
    ...productProps

  }
}

export const CardProductSimpleSecondary: Story = {
  args: {
    ...productProps
  }
}

export const CardProductFree: Story = {
  args: {
    ...productProps,
    free: true,
    handleFree: true
  }
}

export const CardProductDelete: Story = {
  args: {
    ...productProps,
    free: true,
    handleFree: true,
    del: true
  }
}
export const CardProductEdit: Story = {
  args: {
    ...productProps,
    free: false,
    handleFree: true,
    edit: true
  }
}

export const CardProductEditAndDeleteActions: Story = {
  args: {
    ...productProps,
    free: false,
    handleFree: true,
    edit: true,
    del: true
  }
}

export const CardProductWithQuantity: Story = {
  args: {
    ...productProps,
    free: false,
    handleFree: true,
    edit: true,
    del: true,
    sum: true,
    ProQuantity: 100
  }
}
const dataExtra = [
  {
    __typename: 'ExtProductFood',
    pId: 'c143fc6f-16be-4ef8-a788-21622918d1e9',
    exPid: '5275de47-df5b-4024-9d46-3591abb0bebb',
    exState: 0,
    extraName: '234',
    extraPrice: 234,
    state: 1,
    pDatCre: '2024-12-10T02:17:55.534Z',
    pDatMod: '2024-12-10T02:17:55.534Z'
  },
  {
    __typename: 'ExtProductFood',
    pId: 'c143fc6f-16be-4ef8-a788-21622918d1e9',
    exPid: 'a61f10e0-133c-4b78-b2fa-0fc9f6f15149',
    exState: 0,
    extraName: '23423',
    extraPrice: 4234,
    state: 1,
    pDatCre: '2024-12-10T02:17:55.530Z',
    pDatMod: '2024-12-10T02:17:55.530Z'
  }
]
const dataOptional = [
  {
    __typename: 'ExtProductFoodOptional',
    pId: 'c143fc6f-16be-4ef8-a788-21622918d1e9',
    opExPid: 'a639eb43-3325-4184-9c70-f741f4202f5c',
    OptionalProName: '234234',
    state: 1,
    code: 'zMdvyoieN',
    numbersOptionalOnly: 4,
    pDatCre: '2024-12-10T02:17:44.489Z',
    required: 0,
    pDatMod: '2024-12-10T02:17:44.489Z',
    ExtProductFoodsSubOptionalAll: [
      {
        __typename: 'ExtProductFoodSubOptional',
        pId: 'c143fc6f-16be-4ef8-a788-21622918d1e9',
        opExPid: null,
        idStore: '550b6315-a01e-43e5-be2c-e0adf39fcc31',
        opSubExPid: 'b574a939-3d4a-422b-ac8b-d9bf6a0a9851',
        OptionalSubProName: '23432',
        exCodeOptionExtra: 'zMdvyoieN',
        exCode: 'Pqcyi4ecJ',
        state: 1,
        pDatCre: '2024-12-10T02:17:45.636Z',
        pDatMod: '2024-12-10T02:17:45.636Z'
      },
      {
        __typename: 'ExtProductFoodSubOptional',
        pId: 'c143fc6f-16be-4ef8-a788-21622918d1e9',
        opExPid: null,
        idStore: '550b6315-a01e-43e5-be2c-e0adf39fcc31',
        opSubExPid: '7b51029e-3bae-41fd-b433-7e4b9ec5dbe3',
        OptionalSubProName: '234322342',
        exCodeOptionExtra: 'zMdvyoieN',
        exCode: 'oQdfklxQa',
        state: 1,
        pDatCre: '2024-12-10T02:17:47.041Z',
        pDatMod: '2024-12-10T02:17:47.041Z'
      },
      {
        __typename: 'ExtProductFoodSubOptional',
        pId: 'c143fc6f-16be-4ef8-a788-21622918d1e9',
        opExPid: null,
        idStore: '550b6315-a01e-43e5-be2c-e0adf39fcc31',
        opSubExPid: 'a6df0264-099d-4230-b9aa-548d16a95b43',
        OptionalSubProName: '234322342234',
        exCodeOptionExtra: 'zMdvyoieN',
        exCode: 'PpQWsAkqg',
        state: 1,
        pDatCre: '2024-12-10T02:17:48.055Z',
        pDatMod: '2024-12-10T02:17:48.055Z'
      },
      {
        __typename: 'ExtProductFoodSubOptional',
        pId: 'c143fc6f-16be-4ef8-a788-21622918d1e9',
        opExPid: null,
        idStore: '550b6315-a01e-43e5-be2c-e0adf39fcc31',
        opSubExPid: '1aa9c7ab-0a57-4024-8b79-eaf67e60b1a1',
        OptionalSubProName: '234322342234234',
        exCodeOptionExtra: 'zMdvyoieN',
        exCode: '0TbL863vS',
        state: 1,
        pDatCre: '2024-12-10T02:17:49.287Z',
        pDatMod: '2024-12-10T02:17:49.287Z'
      }
    ]
  }
]
export const CardProductWithDataExtra: Story = {
  args: {
    ...productProps,
    free: false,
    handleFree: true,
    edit: true,
    del: true,
    sum: false,
    dataExtra,
    dataOptional
  }
}

// tag: {
//   tag: 'Tag'
// },
