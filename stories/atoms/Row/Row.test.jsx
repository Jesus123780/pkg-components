import React from 'react';
import { render } from '@testing-library/react';
import { Row } from './index';

describe('Row', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <Row>
        <div>Child 1</div>
        <div>Child 2</div>
      </Row>
    );

  });

  it('should accept custom "as" prop', () => {
    const { container } = render(
      <Row as="section">
        <div>Child 1</div>
        <div>Child 2</div>
      </Row>
    );

    const sectionElement = container.querySelector('section');
  });
});
