import type { Meta, StoryObj } from '@storybook/react'
import { GenerateSales } from './index'
import { products, data } from './mock'
import { data as dataCategorie } from '../../organisms/CategorieProducts/mockData'

const meta: Meta<typeof GenerateSales> = {
  component: GenerateSales,
  title: 'pages/GenerateSales',
  args: {
    show: true,
    openAside: false,
    isLoading: true,
    propsSliderCategory: {
      data: dataCategorie,
      onChange: () => { console.log('onChange') },
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
  },
  argTypes: {
    productsFood: {
      control: {
        type: 'object'
      }
    },
    data: {
      control: {
        type: 'object'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof GenerateSales>

export const Primary: Story = {
  args: {
    show: true,
    productsFood: products,
    data
  }
}
