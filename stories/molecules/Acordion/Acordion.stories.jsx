import React, { useState } from 'react'
import { Options } from './index'

export default {
  title: 'molecules/Acordion',
  component: Options
}

const Template = (args) => {
  const [active, setActive] = useState(false)

  const toggleAccordion = () => {
    setActive(!active)
  }

  return <Options
    {...args}
    active={active}
    handleClick={toggleAccordion}
  />
}

export const Default = Template.bind({})
Default.args = {
  children: <div>Hola mundo</div>, // Reemplaza con el contenido adecuado
  icon: <></>, // Reemplaza con el componente de icono apropiado
  index: 1,
  label: 'Option Label', // Reemplaza con la etiqueta adecuada
  path: '/path' // Reemplaza con la ruta adecuada
}
