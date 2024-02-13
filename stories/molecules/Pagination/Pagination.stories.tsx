import React, { useState } from 'react'
import { Pagination } from './index'

export default {
  title: 'molecules/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: {
      control: 'number',
      defaultValue: 1
    },
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isVisableButtonLeft: {
      control: 'boolean',
      defaultValue: false
    },
    isVisableButtonRight: {
      control: 'boolean',
      defaultValue: false
    },
    isVisableButtons: {
      control: 'boolean',
      defaultValue: true
    }
  },
  args: {
    currentPage: 1,
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    isVisableButtonLeft: false,
    isVisableButtonRight: false,
    isVisableButtons: true
  
  }
}

const Template = (args: any) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handleOnClick = (page: any) => {
    setCurrentPage(page)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => {return Math.max(prev - 1, 1)})
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => {return prev + 1})
  }

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      handleNextPage={handleNextPage}
      handleOnClick={handleOnClick}
      handlePrevPage={handlePrevPage}
      items={args.items}
    />
  )
}

export const Default = Template.bind({})
