import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Options } from '.'
import {
  AppRouterContext,
  type AppRouterInstance
} from 'next/dist/shared/lib/app-router-context.shared-runtime'

const meta: Meta<typeof Options> = {
  component: Options,
  title: 'molecules/Acordion',
  args: {
  },
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={{} as AppRouterInstance}>
        <Story />
      </AppRouterContext.Provider>
    )
  ]
}

export default meta

type Story = StoryObj<typeof Options>

export const Default: Story = (args: any) => <Options {...args} />

Default.args = {
  children: 'Link Text'
}

Default.argTypes = {
  children: {
    control: {
      type: 'text'
    }
  }
}

Default.parameters = {
  controls: { hideNoControlsWarning: true }
}

Options.propTypes = {
  children: PropTypes.node
}
