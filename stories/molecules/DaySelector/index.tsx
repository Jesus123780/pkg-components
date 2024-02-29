import React from 'react'
import PropTypes from 'prop-types'
import { CircleDay } from './styled'
interface DaySelectorProps {
  days: { day: number; name: string }[]
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

DaySelector.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number,
      name: PropTypes.string
    })
  ),
  handleDaySelection: PropTypes.func,
  selectedDays: PropTypes.arrayOf(PropTypes.number)
}
