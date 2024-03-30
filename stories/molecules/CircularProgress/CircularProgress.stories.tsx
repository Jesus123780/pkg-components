import type { Meta, StoryObj } from '@storybook/react'

import { CircularProgress } from './index'
import { getGlobalStyle } from '../../../helpers'

const meta: Meta<typeof CircularProgress> = {
  component: CircularProgress,
  title: 'Molecules/CircularProgress'
}

export default meta
type Story = StoryObj<typeof CircularProgress>

export const Primary: Story = {
  args: {
    size: 150,
    // Change the size of the progress stroke
    strokeWidth: 5,
    // Progress percentage to be filled
    progress: 58,
    // Progress bar color
    progressBar: getGlobalStyle('--color-icons-primary'),
    // Progress outer border color
    progressBorder: '#ddd'
  }
}
