import type { Meta, StoryObj } from '@storybook/react'
import { AwesomeModal } from './index'

const meta: Meta<typeof AwesomeModal> = {
  component: AwesomeModal,
  title: 'organisms/AwesomeModal'
}

export default meta
type Story = StoryObj<typeof AwesomeModal>

export const TemplateAwesomeModal: Story = {
  args: {
    show: true,
    children: '',
    header: true,
    footer: false,
    height: 'auto'
  }
}

export const TemplateAwesomeModalNoHeader: Story = {
  args: {
    show: true,
    header: false,
    footer: false,
    height: 'auto',
    children: 'This is a modal without header',
    title: 'This is a modal without header'
  }
}

export const TemplateAwesomeModalNoFooter: Story = {
  args: {
    show: true,
    header: false,
    footer: false,
    height: 'auto',
    children: 'This is a modal without header',
    title: 'This is a modal without header'
  }
}

export const TemplateAwesomeModalNoHeaderNoFooter: Story = {
  args: {
    show: true,
    header: false,
    footer: false,
    height: 'auto',
    children: 'This is a modal without header',
    title: 'This is a modal without header'
  }
}

export const TemplateAwesomeModalLargeModal: Story = {
  args: {
    show: true,
    header: true,
    footer: false,
    height: 'auto',
    children: 'This is a modal large',
    title: 'This is a modal large',
    size: 'large'
  }
}

export const TemplateAwesomeModalSmallModal: Story = {
  args: {
    show: true,
    header: true,
    footer: false,
    height: 'auto',
    children: 'This is a modal small',
    title: 'This is a modal small',
    size: 'small'
  }
}

export const TemplateAwesomeModalMediumModal: Story = {
  args: {
    show: true,
    header: true,
    footer: false,
    height: 'auto',
    children: 'This is a modal medium',
    title: 'This is a modal medium',
    size: 'medium'
  }
}

export const TemplateAwesomeModalNoHeaderNoFooterWithFooter: Story = {
  args: {
    show: true,
    header: true,
    footer: true,
    height: '80%',
    customHeight: '86%',
    children: 'This is a modal with header',
    title: 'This is a modal with header'
  }
}
