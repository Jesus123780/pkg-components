import React from 'react'
import { type Story, type Meta } from '@storybook/react'
import {
  HorizontalBarChart,
  Circle,
  DoughnutChar,
  BarChat,
  LightweightChartComponent,
  LargeChartComponent,
  SalesDashboardChart
} from './index'

export default {
  title: 'organisms/Charts',
  component: HorizontalBarChart
} as Meta

const Template: Story = (args) => <HorizontalBarChart {...args} />

export const HorizontalBarChartStory = Template.bind({})
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]
HorizontalBarChartStory.args = {
  data
}
export const CircleStory = () => <Circle />
export const DoughnutCharStory = () => <DoughnutChar />
export const BarChatStory = () => <BarChat />
export const LightweightChart = () => <LightweightChartComponent />
export const LargeChart = () => <LargeChartComponent />
export const SalesDashboard = () => <SalesDashboardChart />
