import type { Meta, StoryObj } from '@storybook/react'
import { NewSelect } from './NewSelect'

const meta: Meta<typeof NewSelect> = {
  component: NewSelect,
  title: 'molecules/NewSelect',
  args: {
  }
}

export default meta

type Story = StoryObj<typeof NewSelect>
const departments = [
  {
    __typename: 'catProducts',
    carProId: '7670d813-9c2a-4c65-52fd-4b8488c9fb57',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Postres',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: 'f4029fb3-e329-96ce-31a1-f3005a23ea20',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Platos Fuertes',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: 'a2df5405-d63f-c303-0925-4227ce6e53d2',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Panadería',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: '44aa8ce5-e7be-bf62-cada-35b123343570',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'NINGUNO',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: 'd677aae4-9d42-3274-a404-b9e3b47be8f2',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Menú Infantil',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: '4dff3905-061e-9dee-a0ef-172240e61d2d',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Entradas',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: '63c9e209-1a3e-606f-781c-31202b2cae47',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Ensaladas',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: 'c1a56246-73c3-6c1c-fb75-2dd171cb751f',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Desayunos',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: '013e5387-34a1-6a78-303d-5098f17bf640',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Combos',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: 'a3729864-eb9d-9204-5fd3-ae4077457d25',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Bebidas',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  },
  {
    __typename: 'catProducts',
    carProId: '65575a8e-bf90-ba74-0bb3-c3eafe849a0c',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    pName: 'Acompañamientos',
    ProDescription: null,
    ProImage: null,
    pState: 1,
    pDatCre: '2024-09-01T03:29:05.043Z',
    pDatMod: '2024-09-01T03:29:05.043Z'
  }
]
export const NewSelectPrimary: Story = {
  args: {
    title: 'Hola Input select*',
    options: departments ?? [],
    accessor: 'pName',
    optionName: 'pName',
    value: '1',
    id: 'carProId',
    name: 'carProId'
  }
}

export const NewSelectDisabled: Story = {
  args: {
    disabled: true,
    title: 'Hola Input select*',
    options: departments ?? [],
    accessor: 'pName',
    optionName: 'pName',
    value: '1',
    id: 'carProId',
    name: 'carProId'
  }
}

export const NewSelectWithAction: Story = {
  args: {
    action: true,
    title: 'Hola Input select*',
    options: departments ?? [],
    accessor: 'pName',
    optionName: 'pName',
    value: '1',
    id: 'carProId',
    name: 'carProId'
  }
}
