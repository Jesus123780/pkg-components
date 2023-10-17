import React from 'react';
import { render } from '@testing-library/react';
import { Overline } from './index';

describe('Overline', () => {
  it('should render correctly with default props', () => {
    const { container } = render(<Overline />);
    const overlineElement = container.firstChild;
  });

  it('should render with custom styles', () => {
    const { container } = render(
      <Overline zIndex={100} bgColor="rgba(255, 0, 0, 0.5)" show />
    );
    const overlineElement = container.firstChild;

  expect(overlineElement).toBeTruthy();

  });
});
