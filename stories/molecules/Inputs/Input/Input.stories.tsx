import type React from 'react'
import type { Meta } from '@storybook/react'
import { Input } from './index'

const meta: Meta = {
  title: 'molecules/Input',
  component: Input,
  argTypes: {
    autoComplete: { control: 'text' },
    border: { control: 'text' }
  }
}

export default meta

export const Default = {
  args: {
    autoComplete: 'off',
    border: '1px solid #ccc',
    placeholder: 'Enter text here',
    value: '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)
  }
}
