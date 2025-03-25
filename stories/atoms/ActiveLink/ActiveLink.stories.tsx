import { type Meta, type StoryObj } from '@storybook/react'
import { ActiveLink, type ActiveLinkProps } from './index' // Ajusta la ruta según sea necesario

const meta: Meta<ActiveLinkProps> = {
  title: 'atoms/ActiveLink',
  component: ActiveLink,
  argTypes: {
    href: {
      control: { type: 'text' },
      description: 'The URL for the link.'
    },
    activeClassName: {
      control: { type: 'text' },
      description: 'The class name for the active state.'
    }
  }
}

export default meta

// Creación de las historias utilizando StoryObj
export const Active: StoryObj<ActiveLinkProps> = {
  args: {
    href: '/some-path',
    activeClassName: 'active'
  }
}

export const NotActive: StoryObj<ActiveLinkProps> = {
  args: {
    href: '/another-path',
    activeClassName: 'active'
  }
}
