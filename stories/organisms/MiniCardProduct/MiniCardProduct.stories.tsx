import type { Meta, StoryObj } from '@storybook/react';
import { MiniCardProduct } from './index'

const meta: Meta<typeof MiniCardProduct> = {
    component: MiniCardProduct,
    title: "organisms/MiniCardProduct",
    args: {
    },
};

export default meta;

type Story = StoryObj<typeof MiniCardProduct>;

export const MiniCardProductPrimary: Story = {
  args: {
  },
};
