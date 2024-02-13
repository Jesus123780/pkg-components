import React from 'react'
import { Marquee } from './index'

export default {
  title: 'atoms/Marquee',
  component: Marquee,
  argTypes: {
  },
  args: {
    play: true,
    direction: 'left',
    delay: 0,
    gradient: true,
    gradientColor: [255, 255, 255],
    gradientWidth: 200
  }
}

const Template = (args: any) => {return (
  <Marquee {...args}>
    {/* Add your content here */}
    <div>This is some scrolling content.</div>
    <div>It can be anything you want.</div>
  </Marquee>
)}

export const Default = Template.bind({})