import React from 'react'
import { DateRange } from './index'

export default {
  title: 'molecules/DateRange',
  component: DateRange
}

const Template = (args) => {return <DateRange {...args} />}

export const Default = Template.bind({})
Default.args = {
  startDate: '2024-10-01',
  endDate: '2024-10-03'
}

Default.argTypes = {
  startDate: {
    control: {
      type: 'date'
    },
    description: 'The start date of the range.',
    defaultValue: '2024-10-01',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '2024-10-01' }
    }
  },
  endDate: {
    control: {
      type: 'date'
    },
    description: 'The end date of the range.',
    defaultValue: '2024-10-03',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '2024-10-03' }
    }
  }
}

Default.parameters = {
  docs: {
    description: {
      component: 'A component to display a date range in the format "1 de Oct - 3 de Octubre".'
    }
  }
}
