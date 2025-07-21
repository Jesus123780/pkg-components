import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './index'

const meta: Meta<typeof Image> = {
  title: 'atoms/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      defaultValue: 'https://picsum.photos/150'
    },
    alt: {
      control: 'text',
      defaultValue: 'Placeholder image'
    },
    width: {
      control: 'text',
      defaultValue: '150'
    },
    height: {
      control: 'text',
      defaultValue: '150'
    },
    className: {
      control: 'text',
      defaultValue: ''
    }
  }
}

export default meta
type Story = StoryObj<typeof Image>

export const Primary: Story = {
  args: {
    src: 'https://picsum.photos/150',
    alt: 'Sample Image',
    width: '150',
    height: '150',
    className: ''
  }
}
