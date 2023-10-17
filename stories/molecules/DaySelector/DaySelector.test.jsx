import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DaySelector } from './index';

describe('DaySelector', () => {
  const days = [
    { day: 1, name: 'Monday' },
    { day: 2, name: 'Tuesday' },
    // ... add more days as needed
  ];

  it('renders correctly', () => {
    const { container } = render(
      <DaySelector days={days} selectedDays={[1]} handleDaySelection={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  it('calls handleDaySelection on circle click', () => {
    const handleDaySelection = jest.fn();
    const { getByText } = render(
      <DaySelector days={days} selectedDays={[1]} handleDaySelection={handleDaySelection} />
    );

    fireEvent.click(getByText('Monday')); // Assuming 'Monday' is in the list

    expect(handleDaySelection).toHaveBeenCalledWith(1);
  });
});
