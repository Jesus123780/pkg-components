import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { StepsComponent } from './index';

export default {
  title: 'molecules/StepsComponent',
  component: StepsComponent,
} as Meta<typeof StepsComponent>;

type Story = StoryObj<typeof StepsComponent>;

export const MainStepsComponent: Story = (args: any) => (
  <StepsComponent {...args} />
);

MainStepsComponent.args = {
  titles: [
    'First Step',
    'Second Step',
    'Third Step',
    'Fourth Step',
    'Fifth Step',
  ] as string[],
};
