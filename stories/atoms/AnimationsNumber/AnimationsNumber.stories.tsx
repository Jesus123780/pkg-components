import { type Meta, type StoryObj } from '@storybook/react'
import { AnimationsNumber, type AnimationsNumberProps } from './index' // Ajusta la ruta según sea necesario

const meta: Meta<AnimationsNumberProps> = {
  title: 'atoms/AnimationsNumber',
  component: AnimationsNumber,
  argTypes: {
  }
}

export default meta

// Creación de las historias utilizando StoryObj
export const Primary: StoryObj<AnimationsNumberProps> = {
  args: {
    text: '3000'
  }
}
