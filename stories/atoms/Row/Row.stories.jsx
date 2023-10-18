import React from 'react'
import { Row } from './index'

export default {
  title: 'atoms/Row',
  component: Row
}

const Template = (args) => {return <Row {...args} />}

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <div>Child 1</div>
      <div>Child 2</div>
    </>
  )
}

export const WithCustomAsProp = Template.bind({})
WithCustomAsProp.args = {
  as: 'section',
  children: (
    <>
      <div>Child 1</div>
      <div>Child 2</div>
    </>
  )
}
