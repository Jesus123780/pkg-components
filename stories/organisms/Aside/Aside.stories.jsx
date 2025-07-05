import { userEvent, within } from '@storybook/testing-library'
import React from 'react'
import { Aside } from './index'
import { ROUTES } from '../../../utils'

export default {
  title: 'organisms/Aside',
  component: Aside,
  argTypes: {
    backgroundColor: { control: 'color' },
    isMobile: { control: 'boolean' },
    location: { control: 'object' },
    setShowComponentModal: { control: 'function' },
    countPedido: { control: 'number' },
    handleClick: { control: 'function' },
    setCollapsed: { control: 'function' },
    setSalesOpen: { control: 'function' },
    salesOpen: { control: 'boolean' },
    collapsed: { control: 'boolean' },
    dataStore: { control: 'object' },
    loading: { control: 'boolean' }
  },
  args: {
    backgroundColor: '#f5f5f5',
    isMobile: false,
    location: { pathname: ROUTES.dashboard },
    setShowComponentModal: () => {},
    countPedido: 0,
    handleClick: () => {},
    setCollapsed: () => {},
    setSalesOpen: () => {},
    salesOpen: false,
    collapsed: false,
    dataStore: { storeName: 'Mi Tienda', idStore: '123', uState: 0 },
    loading: false
  }
}

const Template = (args) => {return <Aside {...args} />}

export const TemplateAside = Template.bind({})
const args = {
  isMobile: false,
  location: { pathname: '/dashboard' },
  setShowComponentModal: () => {},
  countPedido: 0,
  handleClick: () => {},
  setCollapsed: () => {},
  setSalesOpen: () => {},
  salesOpen: false,
  collapsed: false,
  dataStore: { storeName: 'Mi Tienda', idStore: '123', uState: 0 },
  loading: false
}
TemplateAside.args = {
  ...args
}

export const TestAside = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Obtén una referencia al botón o cualquier otro elemento con el que desees interactuar.
    const buttonGlobalCreate = canvas.getByRole('button', { name: /Agregar Nuevo/i })

    // Simula un clic en el botón
    await userEvent.click(buttonGlobalCreate)
  }
}
TestAside.args = {
  ...args
}