import React from 'react'
import { type Meta } from '@storybook/react'
import { Home } from './index' // Asegúrate de tener la ruta correcta

export default {
  title: 'pages/Home',
  component: Home
} as Meta

const Template: any = (args: any) => <Home {...args} />

export const HomeView = Template.bind({})
