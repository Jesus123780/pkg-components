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
    items: {
      control: 'array',
      defaultValue: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
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
  }
}

const Template = (args) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handleOnClick = (page) => {
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
    />
  )
}

export const Default = Template.bind({})
