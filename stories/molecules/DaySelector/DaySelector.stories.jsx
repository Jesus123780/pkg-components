import React from 'react'
import { DaySelector } from './index'

export default {
  title: 'molecules/DaySelector',
  component: DaySelector
}

const days = [
  { day: 1, name: 'Monday' },
  { day: 2, name: 'Tuesday' },
  { day: 3, name: 'Wednesday' },
  { day: 4, name: 'Thursday' },
  { day: 5, name: 'Friday' },
  { day: 6, name: 'Saturday' },
  { day: 7, name: 'Sunday' }
]

export const Default = () => {return (
  <DaySelector
    days={days}
    handleDaySelection={(day) => {return console.log('Selected day:', day)}}
    selectedDays={[1]}
  />
)}
