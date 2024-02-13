import React from 'react'
import { PdfSalesInvoice } from './index'
import { mockData } from './mockData'
import { pdf } from '@react-pdf/renderer'

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
  return (<PdfSalesInvoice {...args} data={mockData} /> )
}

Default.args = {
  data: mockData
}