import PropTypes from "prop-types"
import React from 'react';
import { CircleDay } from './styled';

export const DaySelector = ({
  days = [],
  selectedDays = [],
  handleDaySelection = () => { return },
}) => {
  return (
    <>
      {days.map((day) => (
        <CircleDay
          key={day.day}
          onClick={() => handleDaySelection(day.day)}
          pulse={selectedDays.includes(day.day)}
        >
          {day.name}
        </CircleDay>
      ))}
    </>
  );
};

DaySelector.propTypes = {
  days: PropTypes.shape({
    map: PropTypes.func
  }),
  handleDaySelection: PropTypes.func,
  selectedDays: PropTypes.shape({
    includes: PropTypes.func
  })
}

