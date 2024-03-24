import type { Meta, StoryObj } from '@storybook/react'
import { Icon, Icons } from './index'
import React from 'react'
import { getGlobalStyle } from '../../../helpers'

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'atoms/Icon',
  args: {
    icon: 'MiniCheck',
    size: 24
  }
}

export default meta

type Story = StoryObj<typeof Icon>

export const IconoMiniCheck: Story = {
  args: {
    icon: 'MiniCheck',
    size: 24
  }
}

export const allIcons: React.FC = () => {
  const keys = Object.keys(Icons)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'minmax(100px, max-content)repeat(auto-fill, 100px) 20%',
        alignContent: 'center'
      }}
    >
      {keys.map((key) => (
        <div
          key={key}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Icon
            icon={key}
            size={24}
            height={24}
            width={24}
            color={getGlobalStyle('--color-icons-black')}
          />
          <span style={{ fontSize: '10px' }}>{key}</span>
        </div>
      ))}
    </div>
  )
}
