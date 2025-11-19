import { Meta, StoryObj } from '@storybook/react'
import { CopyToClipboard, CopyToClipboardProps } from './index'

const meta: Meta<CopyToClipboardProps> = {
  title: 'atoms/CopyToClipboard',
  component: CopyToClipboard,
  tags: ['autodocs'],
  args: {
    text: 'https://example.com',
    label: 'Copy URL'
  }
}

export default meta
type Story = StoryObj<CopyToClipboardProps>

export const Default: Story = {}

export const CustomCopiedMessage: Story = {
  args: {
    copiedMessage: '¡Listo!'
  }
}
