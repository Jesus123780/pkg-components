import type { Meta, StoryObj } from '@storybook/react';
import { LateralStoreInfo } from './index'

const meta: Meta<typeof LateralStoreInfo> = {
    component: LateralStoreInfo,
    title: "atoms/LateralStoreInfo",
    args: {
      show: true,
      active: 1,
      handleClose: () => {
        console.log('Close button clicked')
      }
    },
};

export default meta;

type Story = StoryObj<typeof LateralStoreInfo>;

export const Default: Story = {
  args: {
    show: true,
    active: 1,
    handleClose: () => {
      console.log('Close button clicked')
    }
  },
};

