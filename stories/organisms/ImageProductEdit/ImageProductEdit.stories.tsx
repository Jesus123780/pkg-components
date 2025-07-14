import type { Meta, StoryObj } from '@storybook/react'
import { ImageProductEdit } from './index'

const meta: Meta<typeof ImageProductEdit> = {
  component: ImageProductEdit,
  title: 'atoms/ImageProductEdit',
  args: {

  }
}

export default meta

type Story = StoryObj<typeof ImageProductEdit>

export const ImageProductEditComponent: Story = {
  args: {
  }
}
