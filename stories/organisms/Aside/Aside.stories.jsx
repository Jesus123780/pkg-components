import { userEvent, within } from '@storybook/testing-library'
import React from 'react'
import { Aside } from './index'

export default {
  title: 'organisms/Aside',
  component: Aside,
  argTypes: {
    backgroundColor: { control: 'color' }
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