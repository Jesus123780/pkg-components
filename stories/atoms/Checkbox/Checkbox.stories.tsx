import React from 'react'
import { Meta } from '@storybook/react'
import { Checkbox } from './index'

export default {
  title: 'atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    onChange: { action: 'Checkbox Changed' },
  },
} as Meta

export const Default = (args: any) => (
  <Checkbox
    label="Default Checkbox"
    checked={false}
    onChange={(event: React.ChangeEvent<HTMLInputElement>, id?: any) => {}}
    {...args}
  />
)

export const Checked = (args: any) => (
  <Checkbox
    label="Checked Checkbox"
    checked={true}
    onChange={(event: React.ChangeEvent<HTMLInputElement>, id?: any) => {}}
    {...args}
  />
)
