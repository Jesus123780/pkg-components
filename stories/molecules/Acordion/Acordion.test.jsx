// Import the necessary dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Options } from './index';

describe('Options Component', () => {
  it('should render with default props', () => {
    render(
      <Options
        active={false}
        children="Some children"
        handleClick={() => console.log('Option clicked')}
        icon={<YourIconComponent />}
        index={1}
        label="Option Label"
        path="/path"
      />
    );

    // Add your assertions here
    // For example:
    const optionLabelElement = screen.getByText('Option Label');
    expect(optionLabelElement).toBeInTheDocument();
  });

  // Add more tests as needed
});
