import { type Meta, type StoryObj } from '@storybook/react'
import { Button, type ButtonProps } from './index' // Ajusta la ruta según sea necesario

const meta: Meta<ButtonProps> = {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    primary: { control: 'boolean' },
    type: { control: 'text' }
  }
}

export default meta

// Creación de las historias utilizando StoryObj
export const Primary: StoryObj<ButtonProps> = {
  args: {
    primary: true,
    type: 'primary',
    children: 'Primary Button'
  }
}

export const Secondary: StoryObj<ButtonProps> = {
  args: {
    primary: false,
    type: 'secondary',
    children: 'Secondary Button'
  }
}
