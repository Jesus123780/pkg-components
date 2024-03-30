import React from 'react'
import { CircleDay } from './styled'
interface DaySelectorProps {
  days: Array<{ day: number, name: string }>
  selectedDays: number[]
  handleDaySelection: (day: number) => void
}
export const DaySelector: React.FC<DaySelectorProps> = ({
  days = [],
  selectedDays = [],
  handleDaySelection = () => {}
}) => {
  return (
    <>
      {days.map((day) => {
        return (
        <CircleDay
            key={day.day}
            onClick={() => {
              handleDaySelection(day.day)
            }}
            pulse={selectedDays.includes(day.day) as boolean}
          >
            {day.name}
          </CircleDay>
        )
      })}
    </>
  )
}
