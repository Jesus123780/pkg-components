import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './index';

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'atoms/Tag',
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    label: 'OBLIGATORIO'
  },
};