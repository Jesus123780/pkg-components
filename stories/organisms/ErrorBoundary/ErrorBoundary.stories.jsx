import React from 'react'
import { ErrorBoundary } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/ErrorBoundary',
  component: ErrorBoundary,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <ErrorBoundary {...args} />
}

export const TemplateErrorBoundary = Template.bind({})
// More on args: https://storyb ook.js.org/docs/react/writing-stories/args
TemplateErrorBoundary.args = {}
