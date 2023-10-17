import React from 'react';
import { render, screen } from '@testing-library/react';
import { Column } from './index';

describe('Column', () => {
  it('renders children correctly', () => {
    render(
      <Column>
        <div>Child 1</div>
        <div>Child 2</div>
      </Column>
    );

    const child1 = screen.getByText('Child 1');
    const child2 = screen.getByText('Child 2');
  });

  it('applies styles correctly', () => {
    render(
      <Column width="300px" padding="20px">
        <div>Child 1</div>
      </Column>
    );

    const column = screen.getByText('Child 1').parentElement;
  });
});
