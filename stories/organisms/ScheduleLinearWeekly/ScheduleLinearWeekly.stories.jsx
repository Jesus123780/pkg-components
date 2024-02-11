import React from 'react'
import { ScheduleLinearWeekly } from './index.jsx'
import { mockData } from './mockData.js'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/ScheduleLinearWeekly',
  component: ScheduleLinearWeekly,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    schedules: mockData
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <ScheduleLinearWeekly {...args} />
}

export const TemplateScheduleLinearWeekly = Template.bind({})
// More on args: https://storyb ook.js.org/docs/react/writing-stories/args
TemplateScheduleLinearWeekly.args = {
  schedules: mockData
}
