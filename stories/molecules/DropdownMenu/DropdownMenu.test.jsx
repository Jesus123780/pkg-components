import React from 'react';
import { render } from '@testing-library/react';
import { DropdownMenu } from './index';

describe('DropdownMenu Component', () => {
  const options = [
    { optionName: 'Option 1', icon: 'icon1', action: jest.fn() },
    { optionName: 'Option 2', icon: 'icon2', action: jest.fn() },
  ];

  test('renders with options', () => {
    const { getByText } = render(<DropdownMenu options={options} show={true} position={{ x: 0, y: 0 }} />);
    options.forEach((option) => {
      const optionElement = getByText(option.optionName);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test('does not render when show is false', () => {
    const { container } = render(<DropdownMenu options={options} show={false} position={{ x: 0, y: 0 }} />);
    expect(container.firstChild).toBeNull();
  });
});
