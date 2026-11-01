import React from 'react'
import { ProgressBar } from './index'
import { Meta } from '@storybook/react'

export default {
  title: 'atoms/ProgressBar',
  component: ProgressBar
} as Meta

const Template = (args: any) => {return <ProgressBar {...args} />}

export const Default = Template.bind({})


