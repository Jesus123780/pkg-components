import React from 'react'
import { MemoModalDetailOrder } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/MemoModalDetailOrder',
  component: MemoModalDetailOrder,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <MemoModalDetailOrder {...args} />
}

export const TemplateMemoModalDetailOrder = Template.bind({})
// More on args: https://storyb ook.js.org/docs/react/writing-stories/args
TemplateMemoModalDetailOrder.args = {
  memoModalDetailOrder: {
    cards: [1, 2, 3]
  }
}
