import React from 'react'
import { Card } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/CartDissert',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <Card {...args} />
}

export const TemplateCartDissert = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateCartDissert.args = {}
