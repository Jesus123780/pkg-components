import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { Range } from './index'

const meta: Meta<typeof Range> = {
  component: Range,
  title: 'molecules/Range',
  tags: ['autodocs'],
  args: {
    min: 0,
    max: 100,
    value: 50,
    label: 'Volume',
    showProgress: true,
    width: '100%'
  }
}

export default meta
type Story = StoryObj<typeof Range>

export const RangePrimary: Story = {
  args: {
    label: 'Volume',
    showProgress: true,
    value: 50
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')

    // Simula mover el slider
    await userEvent.type(slider, '{arrowRight>}')
  }
}

export const RangeChangeInteraction: Story = {
  args: {
    label: 'Brightness',
    value: 30,
    showProgress: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    canvas.getByRole('slider')
  }
}

export const RangeWithoutProgress: Story = {
  args: {
    label: 'Brightness',
    showProgress: false,
    value: 30
  }
}

export const RangeWithCustomLimits: Story = {
  args: {
    label: 'Custom Limits',
    min: 10,
    max: 200,
    value: 120,
    showProgress: true
  }
}

export const RangeAtMinValue: Story = {
  args: {
    label: 'Minimum',
    value: 0,
    showProgress: true
  }
}

export const RangeAtMaxValue: Story = {
  args: {
    label: 'Maximum',
    value: 100,
    showProgress: true
  }
}

export const RangeWithoutLabel: Story = {
  args: {
    label: '',
    value: 40,
    showProgress: true
  }
}

export const RangeWithFixedWidth: Story = {
  args: {
    label: 'Fixed Width',
    value: 60,
    width: 300,
    showProgress: true
  }
}
