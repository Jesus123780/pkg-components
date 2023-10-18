import PropTypes from 'prop-types'
import React from 'react'
import { CircleDay } from './styled'

export const DaySelector = ({
  days = [],
  selectedDays = [],
  handleDaySelection = () => {
    return
  }
}) => {
  return (
    <>
      {days.map((day) => {
        return (
          <CircleDay
            key={day.day}
            onClick={() => {
              return handleDaySelection(day.day)
            }}
            pulse={selectedDays.includes(day.day)}
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
