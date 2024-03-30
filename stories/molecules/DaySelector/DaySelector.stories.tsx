/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { DaySelector } from './index'

export default {
  title: 'molecules/DaySelector',
  component: DaySelector
}

export const days = [
  { day: 1, name: 'Lu' },
  { day: 2, name: 'Mar' },
  { day: 3, name: 'Mie' },
  { day: 4, name: 'Jue' },
  { day: 5, name: 'Vie' },
  { day: 6, name: 'Sab' },
  { day: 7, name: 'Dom' }
]

export const Default = () => {
  return (
  <DaySelector
    days={days}
    handleDaySelection={(day) => { return console.log('Selected day:', day) }}
    selectedDays={[1]}
  />
  )
}
