import type { Meta, StoryObj } from '@storybook/react'
import { CardOrderView, CardOrder } from './index'

const meta: Meta<typeof CardOrderView> = {
  component: CardOrderView,
  title: 'organisms/CardOrderView'
}
export default meta
type Story = StoryObj<typeof CardOrderView>

const sampleData: CardOrder = {
  title: "Increase sales by 50%",
  company: "Medium",
  amount: "$523,121",
  date: new Date().toLocaleString(),
  comments: 12,
  avatars: [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
  ],
  logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
};

export const Primary: Story = {
  args: {
    ...sampleData
  }
}
