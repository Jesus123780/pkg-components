import React from 'react';
import { render } from '@testing-library/react';
import { Tooltip } from './index';

describe('Tooltip', () => {
  it('should render the tooltip with given text', () => {
    const { getByText } = render(
      <Tooltip text="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(getByText('This is a tooltip'))
  });
});
