import React from 'react'
import { PdfSalesInvoice } from './index'
import { mockData } from './mockData'
import { PdfContainer } from '../PdfContainer'

export default {
  title: 'templates/PdfSalesInvoice',
  component: PdfSalesInvoice,
  argTypes: {
    data: mockData
  },
  parameters: {
    docs: {
      description: {
        component: 'A component to display and download a PDF document.'
      }
    }
  }
}

export const Default = (args) => {
  return (
    <PdfContainer>
      <PdfSalesInvoice {...args} data={mockData} />
    </PdfContainer>
  )
}

Default.args = {
  data: mockData
}
