import React from 'react';
import { render } from '@testing-library/react';
import { AlertBox } from './index';

test('renders AlertBox component', () => {
  const error = {
    color: 'red',
    duration: 5000,
    message: 'This is an error message',
  };

  const { getByText } = render(<AlertBox err={error} />);
  const errorMessage = getByText('This is an error message');
  expect(errorMessage)
});
