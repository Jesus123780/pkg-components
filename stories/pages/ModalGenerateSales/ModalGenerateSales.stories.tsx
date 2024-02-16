import type { Meta, StoryObj } from '@storybook/react';
import { ModalGenerateSales } from './index'
import React from 'react';
import { products } from './mock';

const meta: Meta<typeof ModalGenerateSales> = {
    component: ModalGenerateSales,
    title: "pages/ModalGenerateSales",
    args: {
      show: true,
    },
};

export default meta;

type Story = StoryObj<typeof ModalGenerateSales>;

export const Primary: Story = {
  args: {
    show: true,
    productsFood: products
  },
};
