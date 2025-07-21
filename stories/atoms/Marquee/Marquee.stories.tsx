import type { Meta, StoryObj } from '@storybook/react'
import { Marquee } from './index'

const meta: Meta<typeof Marquee> = {
  title: 'atoms/Marquee',
  component: Marquee,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Marquee>

export const Default: Story = {
  args: {
    children: <>
    <div>This is some scrolling content.</div>
    <div>It can be anything you want.</div>
    </>,
    speed: 100,
    loop: true,
    onCycleComplete: false,
    pauseOnHover: true
  }
}
