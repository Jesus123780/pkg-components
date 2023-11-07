import PropTypes from 'prop-types'
import React from 'react'
import { CreateExtra } from './index'

// Definir props de ejemplo
const exampleLineItems = {
  Lines: [
    {
      extraName: 'Complemento 1',
      extraPrice: 100,
      exState: true,
      exPid: '1'
    },
    {
      extraName: 'Complemento 2',
      extraPrice: 200,
      exState: false,
      exPid: '2'
    }
  ]
}

// Funciones ficticias para simular la funcionalidad
const handleLineChange = () => {return console.log('Line changed')}
const handleFocusChange = () => {return console.log('Focused')}
const handleRemove = () => {return console.log('Removed')}
const onSubmitUpdate = () => {return console.log('Submitted')}
const setModal = () => {return console.log('Modal set')}
const CleanLines = () => {return console.log('Cleaned')}

export default {
  title: 'Organisms/CreateExtra',
  component: CreateExtra,
  argTypes: {
    LineItems: { control: 'object' },
    loading: { control: 'boolean' },
    modal: { control: 'boolean' },
    pId: { control: 'text' }
  }
}

const Template = (args) => {return <CreateExtra {...args} />}

export const Default = Template.bind({})
Default.args = {
  LineItems: exampleLineItems,
  loading: false,
  modal: true,
  pId: 'examplePid',
  CleanLines,
  handleAdd: () => {},
  handleFocusChange,
  handleLineChange,
  handleRemove,
  onSubmitUpdate,
  setModal
}

Default.propTypes = {
  CleanLines: PropTypes.func,
  LineItems: PropTypes.object,
  handleAdd: PropTypes.func,
  handleFocusChange: PropTypes.func,
  handleLineChange: PropTypes.func,
  handleRemove: PropTypes.func,
  loading: PropTypes.bool,
  modal: PropTypes.bool,
  onSubmitUpdate: PropTypes.func,
  pId: PropTypes.string,
  setModal: PropTypes.func
}
