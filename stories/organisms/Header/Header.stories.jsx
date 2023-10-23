import { userEvent, within } from '@storybook/testing-library'
import React from 'react'
import { Header } from './index'

export default {
  title: 'organisms/Header',
  component: Header,
  argTypes: {
    isMobile: { control: 'boolean' },
    salesOpen: { control: 'boolean' }
  }
}

const Template = (args) => {
  return <Header {...args} />
}

export const Default = Template.bind({})
Default.args = {
  isMobile: false,
  salesOpen: false
}

export const TestHeader = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Obtén una referencia al botón que abre el modal de ventas
    const salesButton = canvas.getByText(/Crear una venta/i)
    // Simula un clic en el botón
    await userEvent.click(salesButton)
    // Si hay otros elementos o acciones que desees probar, puedes continuar aquí...
  }
}
TestHeader.args = Default.args // Usa las mismas props que el story Default
