import React from 'react';
import { Rate } from './index';

export default {
  title: 'molecules/Rate',
  component: Rate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: 'color' },
    size: { control: 'number' },
  },
};

const Template = (args) => <Rate {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 5,
  rating: 3,
};


export const LargeSize = Template.bind({});
LargeSize.args = {
  count: 5,
  rating: 2,
  size: 30,
};

export const NoHoverEffect = Template.bind({});
NoHoverEffect.args = {
  count: 5,
  rating: 2,
  size: 30,
};

export const OnRatingCallback = Template.bind({});
OnRatingCallback.args = {
  count: 5,
  rating: 4,
  onRating: (rating) => console.log(`Rated ${rating} stars`),
};
