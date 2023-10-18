import React from 'react'
import { Column } from './index'

export default {
  title: 'Atoms/Column',
  component: Column
}

const Template = (args) => {
  return (
    <Column {...args}>
      <div>This is a column.</div>
      <div>It can have multiple children.</div>
    </Column>
  )
}

export const Default = Template.bind({})
Default.args = {
  width: '200px',
  padding: '10px'
}
