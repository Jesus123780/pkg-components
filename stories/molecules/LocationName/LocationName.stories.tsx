import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LocationName } from './index'

const meta: Meta<typeof LocationName> = {
    component: LocationName,
    title: "molecules/LocationName",
    args: {
    },
};

export default meta;

type Story = StoryObj<typeof LocationName>;

export const LocationNameTemplate: Story = {
  args: {
    Text: window.location.host ?? '',
    children: <div>Children</div>,
  }
};
