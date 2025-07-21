import type { Meta, StoryObj } from '@storybook/react'
import { ButtonContent } from './ButtonContent'

const meta: Meta<typeof ButtonContent> = {
  component: ButtonContent,
  title: 'atoms/ButtonContent',
  args: {
    children: 'Button Content',
    icon: <span>Icon</span>
  }
}

export default meta

type Story = StoryObj<typeof ButtonContent>

export const Primary: Story = {
  args: {
    icon: <></>
  }
}
