import type { Meta, StoryObj } from '@storybook/react'

import { SetupSchedule } from './index'
import { days } from '../../molecules/DaySelector/DaySelector.stories'

const meta: Meta<typeof SetupSchedule> = {
  component: SetupSchedule,
  title: 'organisms/SetupSchedule'
}

export default meta
type Story = StoryObj<typeof SetupSchedule>

export const Primary: Story = {
  args: {
    days: days
  }
}
