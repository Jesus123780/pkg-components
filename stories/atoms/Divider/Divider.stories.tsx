// Divider.stories.tsx
import { type Meta, type StoryObj } from '@storybook/react'
import { Divider } from './index'

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    borderTop: { control: 'boolean' },
    borderBottom: { control: 'boolean' },
    margin: { control: { type: 'number' } },
    marginTop: { control: { type: 'text' } },
    marginBottom: { control: { type: 'text' } },
    style: { control: 'object' }
  }
}

export default meta

type Story = StoryObj<typeof Divider>

export const Default: Story = {
  args: {
    borderTop: true,
    borderBottom: false,
    margin: 16
  }
}

export const TopAndBottomBorder: Story = {
  args: {
    borderTop: true,
    borderBottom: true,
    marginTop: '20px',
    marginBottom: '20px'
  }
}

export const WithCustomStyle: Story = {
  args: {
    borderTop: true,
    style: {
      borderColor: 'red',
      margin: '24px'
    }
  }
}
