import React from 'react'
import { Meta } from '@storybook/react'
import { TeamRegister } from './index'

export default {
  title: 'pages/TeamRegister',
  component: TeamRegister,
} as Meta;

const Template: any = (args: any) => <TeamRegister {...args} />

export const TeamRegisterView = Template.bind({})
