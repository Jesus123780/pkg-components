import React from 'react'
import { Text } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'atoms/Text',
  component: Text,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {return <Text {...args} />}

export const TemplateText = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateText.args = {
  label: '',
  children: 'Hello, world'
}
