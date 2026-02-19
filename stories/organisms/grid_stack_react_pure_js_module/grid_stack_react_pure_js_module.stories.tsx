import React, { useState } from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import GridStack from './components/GridStack/GridStack'

const meta: Meta<typeof GridStack> = {
  title: 'organisms/GridStack',
  component: GridStack,
  tags: ['autodocs'],
  argTypes: {
    dragMode: {
      control: 'select',
      options: ['overlay', 'direct'],
    },
    collisionMode: {
      control: 'select',
      options: ['push', 'swap', 'none'],
    },
  },
}

export default meta
type Story = StoryObj<typeof GridStack>
