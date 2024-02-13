import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  HorizontalBarChart,
  Circle,
  DoughnutChar,
  BarChat,
} from './index';

export default {
  title: 'organisms/Charts',
  component: HorizontalBarChart,
} as Meta;

const Template: Story = (args) => <HorizontalBarChart {...args} />;

export const HorizontalBarChartStory = Template.bind({});
HorizontalBarChartStory.args = {
  data: {
    labels: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'],
    datasets: [
      {
        label: 'ejemplo',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
};

export const CircleStory = () => <Circle />;
export const DoughnutCharStory = () => <DoughnutChar />;
export const BarChatStory = () => <BarChat />;
