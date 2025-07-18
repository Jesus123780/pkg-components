import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { InputTags } from './index'
import type { InputTagsProps } from './index'

const meta: Meta<typeof InputTags> = {
  title: 'molecules/InputTags',
  component: InputTags,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof InputTags>

const Wrapper: React.FC<InputTagsProps> = (props: Omit<InputTagsProps, 'setTags' | 'selectedTags'>) => {
  const [tags, setTags] = useState<string[]>(props?.tags ?? [])

  return (
    <InputTags
      {...props}
      tags={tags}
      setTags={setTags}
      selectedTags={(tags: string[]) => console.log('Selected:', tags)}
    />
  )
}

export const Primary: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    disabled: false,
    width: '300px',
    tags: []
  }
}

export const Disabled: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    disabled: true,
    width: '300px',
    tags: ['tag1', 'tag2']
  }
}

export const WithInitialTags: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    disabled: false,
    width: '300px',
    tags: ['react', 'storybook']
  }
}
