import React from 'react'
import { AsideInfoStore } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'molecules/AsideInfoStore',
  component: AsideInfoStore,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: any) => {
  return <AsideInfoStore {...args} />
}

export const TemplateAsideInfoStore = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TemplateAsideInfoStore.args = {
  show: true,
  active: 0,
  children: ''
}
