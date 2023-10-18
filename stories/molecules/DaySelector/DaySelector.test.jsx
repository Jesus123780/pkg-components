import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { DaySelector } from './index'

describe('DaySelector', () => {
  const days = [
    { day: 1, name: 'Monday' },
    { day: 2, name: 'Tuesday' }
    // ... add more days as needed
  ]

  it('renders correctly', () => {
    const { container } = render(<DaySelector
      days={days}
      handleDaySelection={() => {}}
      selectedDays={[1]}
    />)
    expect(container).toMatchSnapshot()
  })

  it('calls handleDaySelection on circle click', () => {
    const handleDaySelection = jest.fn()
    const { getByText } = render(<DaySelector
      days={days}
      handleDaySelection={handleDaySelection}
      selectedDays={[1]}
    />)

    fireEvent.click(getByText('Monday')) // Assuming 'Monday' is in the list

    expect(handleDaySelection).toHaveBeenCalledWith(1)
  })
})
