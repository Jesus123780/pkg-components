import type { Meta, StoryObj } from '@storybook/react'

import { InputFiles } from './index'

const meta: Meta<typeof InputFiles> = {
  component: InputFiles,
  title: 'organisms/InputFiles'
}

export default meta
type Story = StoryObj<typeof InputFiles>

export const Primary: Story = {
  args: {
    limit: 1
  }
}
