import type { Meta, StoryObj } from '@storybook/react'
import { InputHooks } from './InputHooks'

const meta: Meta<typeof InputHooks> = {
  component: InputHooks,
  title: 'molecules/InputHooks',
  args: {
  }
}

export default meta

type Story = StoryObj<typeof InputHooks>

export const InputHooksPrimary: Story = {
  args: {
    autoComplete: 'off',
    value: 'Hello World!',
    title: 'Hello World!',
    error: false
  }
}

export const InputHooksError: Story = {
  args: {
    autoComplete: 'off',
    value: 'Hello World!',
    title: 'Hello World!',
    error: true
  }
}

export const InputHooksInfo: Story = {
  args: {
    autoComplete: 'off',
    value: 'Hello World!',
    title: 'Hello World!',
    error: true,
    info: 'This is an info message'
  }
}
