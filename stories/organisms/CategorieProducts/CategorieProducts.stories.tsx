import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CategorieProducts } from './index';
import {  data } from './mockData'
import { Root } from './types';

export default {
  title: 'organisms/CategorieProducts',
  component: CategorieProducts,
} as Meta<typeof CategorieProducts>;

type Story = StoryObj<typeof CategorieProducts>;

export const MainCategorieProducts: Story = (args: any) => (
  <CategorieProducts {...args} />
);

MainCategorieProducts.args = {
  data: data as Root[],
  
  breakpoints: {
    "320": {
      "spaceBetween": 12,
      "slidesPerView": 'auto'
    },
    "560": {
      "spaceBetween": 12,
      "slidesPerView": 'auto'

    },
    "960": {
      "spaceBetween": 12,
      "slidesPerView": 'auto'

    },
    "1440": {
      "spaceBetween": 16,
      "slidesPerView": 'auto'

    },
    "1818": {
      "spaceBetween": 16,
      "slidesPerView": 'auto'
      
    }
  }
};