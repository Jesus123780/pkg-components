import type { Meta, StoryObj } from '@storybook/react'

import { EditorImagen } from './index'

const meta: Meta<typeof EditorImagen> = {
  component: EditorImagen,
  title: 'Molecules/EditorImagen'
}

export default meta
type Story = StoryObj<typeof EditorImagen>

export const Primary: Story = {
  args: {
  }
}
