import type { Meta, StoryObj } from '@storybook/react';
import { LateralStoreInfo } from './index'

const meta: Meta<typeof LateralStoreInfo> = {
    component: LateralStoreInfo,
    title: "atoms/LateralStoreInfo",
    parameters: {
      controls: { expanded: true },
      chromatic: { viewports: [320, 1200] }
    },
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
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
  args: {
    show: true,
    active: 1,
    handleClose: () => {
      console.log('Close button clicked')
    }
  },
};

