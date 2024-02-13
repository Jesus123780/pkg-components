import React from 'react'
import { HeaderSteps } from './index'

export default {
  title: 'molecules/HeaderSteps',
  component: HeaderSteps
}

const Template = (args) => {
  return <HeaderSteps {...args} />
}

export const Default = Template.bind({})
Default.args = {
  active: 0,
  hover: true, 
  overActive: 0, 
  steps: ['Detalles', 'Adicionales', 'Complementos', 'Disponibilidad']
}
