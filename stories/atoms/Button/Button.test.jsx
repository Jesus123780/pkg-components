import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './index';

describe('Button', () => {
  it('renders the button with default props', () => {
    render(<Button label="Click me" />);
    // Assert that the button is rendered with the label
  });

  it('renders the button with custom props', () => {
    render(
      <Button
        label="Custom button"
        primary
        backgroundColor="blue"
        size="large"
        onClick={() => {}}
      />
    );

    // Assert that the button is rendered with the given props
    const button = screen.getByText('Custom button');
  });

  // Add more test cases for different scenarios

  it('handles click event', () => {
    const mockOnClick = jest.fn();
    render(<Button label="Click me" onClick={mockOnClick} />);
    // Simulate a click event on the button
    const button = screen.getByText('Click me');
    button.click();

    // Verify that the click handler was called
    expect(mockOnClick).toHaveBeenCalled();
  });
});
