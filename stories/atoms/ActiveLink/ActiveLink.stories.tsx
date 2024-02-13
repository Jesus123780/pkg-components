import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ActiveLink } from './index'

interface ActiveLinkProps {
  href: string
  activeClassName: string,
  asPath: string
  children: React.ReactNode
}

export default {
  title: 'atoms/ActiveLink',
  component: ActiveLink,
  argTypes: {
    href: {
      control: { type: 'text' },
      description: 'The URL for the link.',
    },
    activeClassName: {
      control: { type: 'text' },
      description: 'The class name for the active state.',
    },
  },
} as Meta

const Template: Story<ActiveLinkProps> = (args) => (
  <ActiveLink {...args}>
    <a className="custom-link">Link</a>
  </ActiveLink>
)

export const Active: Story<ActiveLinkProps> = Template.bind({})
Active.args = {
  href: '/some-path',
  activeClassName: 'active',
}

export const NotActive: Story<ActiveLinkProps> = Template.bind({})
NotActive.args = {
  href: '/another-path',
  activeClassName: 'active',
}
