import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import PropTypes from 'prop-types'
import { CustomLink } from '.'

const meta: Meta<typeof CustomLink> = {
  component: CustomLink,
  title: 'atoms/CustomLink',
  args: {
    children: 'Link Text',
    href: '/'
  }
}

export default meta

type Story = StoryObj<typeof CustomLink>

export const Default: Story = (args: any) => <CustomLink {...args} />

Default.args = {
  children: 'Link Text',
  href: '/'
}

Default.argTypes = {
  children: {
    control: {
      type: 'text'
    }
  },
  href: {
    control: {
      type: 'text'
    }
  }
}

Default.parameters = {
  controls: { hideNoControlsWarning: true }
}

CustomLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  otherProps: PropTypes.any
}
