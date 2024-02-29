import type { Meta, StoryObj } from '@storybook/react'
import { LoaderSubItem } from './index'

const meta: Meta<typeof LoaderSubItem> = {
  component: LoaderSubItem,
  title: 'skeletons/LoaderSubItem'
}

export default meta
type Story = StoryObj<typeof LoaderSubItem>

export const LoaderSubItemMain: Story = {
}
