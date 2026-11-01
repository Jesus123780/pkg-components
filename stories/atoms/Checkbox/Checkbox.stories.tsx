import React from 'react'
import { Meta } from '@storybook/react'
import { CheckboxCube } from './index'

export default {
  title: 'atoms/CheckboxCube',
  component: CheckboxCube,
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
    onChange: { action: 'CheckboxCube Changed' },
  },
} as Meta

export const Default = (args: any) => (
  <CheckboxCube
    label="Default CheckboxCube"
    checked={false}
    onChange={(event: React.ChangeEvent<HTMLInputElement>, id?: any) => {}}
    {...args}
  />
)

export const Checked = (args: any) => (
  <CheckboxCube
    label="Checked CheckboxCube"
    checked={true}
    onChange={(event: React.ChangeEvent<HTMLInputElement>, id?: any) => {}}
    {...args}
  />
)
