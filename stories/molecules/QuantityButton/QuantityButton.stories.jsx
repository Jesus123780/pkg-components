import React from 'react'
import { QuantityButton } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'molecules/QuantityButton',
  component: QuantityButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <QuantityButton {...args} />
}

export const TemplateQuantityButton = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateQuantityButton.args = {
  quantity: 1
}
