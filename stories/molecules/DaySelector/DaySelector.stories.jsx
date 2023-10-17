import React from 'react';
import { DaySelector } from './index';

export default {
  title: 'molecules/DaySelector',
  component: DaySelector,
};

const days = [
    { day: 1, name: 'Monday' },
    { day: 2, name: 'Tuesday' },
    { day: 3, name: 'Wednesday' },
    { day: 4, name: 'Thursday' },
    { day: 5, name: 'Friday' },
    { day: 6, name: 'Saturday' },
    { day: 7, name: 'Sunday' },
]

export const Default = () => (
  <DaySelector days={days} selectedDays={[1]} handleDaySelection={(day) => console.log('Selected day:', day)} />
);
