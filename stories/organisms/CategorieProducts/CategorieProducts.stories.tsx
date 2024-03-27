import React from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import { CategoriesProducts } from './index'
import { data } from './mockData'
import { type Root } from './types'

export default {
  title: 'organisms/CategorieProducts',
  component: CategoriesProducts
} as Meta<typeof CategoriesProducts>

type Story = StoryObj<typeof CategoriesProducts>

export const MainCategorieProducts: Story = (args: any) => (
  <CategoriesProducts {...args} />
)

MainCategorieProducts.args = {
  data: data as Root[],
  breakpoints: {
    320: {
      spaceBetween: 12,
      slidesPerView: 'auto'
    },
    560: {
      spaceBetween: 12,
      slidesPerView: 'auto'

    },
    960: {
      spaceBetween: 12,
      slidesPerView: 'auto'

    },
    1440: {
      spaceBetween: 16,
      slidesPerView: 'auto'

    },
    1818: {
      spaceBetween: 16,
      slidesPerView: 'auto'

    }
  }
}
