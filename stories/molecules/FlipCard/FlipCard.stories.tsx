import type { Meta, StoryObj } from '@storybook/react';
import { FlipCard } from './index'
import React from 'react';

const meta: Meta<typeof FlipCard> = {
    component: FlipCard,
    title: "molecules/FlipCard",
    args: {
        backChild: <div>Back</div>,
        frontChild: <div>Front</div>,
        flipped: false,
        setFlipped: (flipped: boolean) => {
            console.log(flipped);
        },
    },
};

export default meta;

type Story = StoryObj<typeof FlipCard>;

export const FlipCardPrimary: Story = {
  args: {
  }
};

export const FlipCardPrimaryBack: Story = {
  args: {
    flipped: true,
  }
};
