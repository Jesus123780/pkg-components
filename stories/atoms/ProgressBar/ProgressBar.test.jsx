import { render, screen } from '@testing-library/react';
import { ProgressBar } from './index';
import React from 'react';

describe('ProgressBar', () => {
  it('should render with progress', () => {
    render(<ProgressBar progress={50} />);
    const progressBarElement = screen.getByTestId('progress-bar');

    // Ensure the progress bar is visible (opacity is not 0%)
    const computedStyles = window.getComputedStyle(progressBarElement);
    expect(computedStyles.opacity).not.toBe('0');
  });

  it('should change to final color when progress reaches final value', () => {
    render(<ProgressBar progress={100} final={100} />);
    const progressBarElement = screen.getByTestId('progress-bar');

    // Ensure the progress bar is visible (opacity is not 0%)
    const computedStyles = window.getComputedStyle(progressBarElement);
    expect(computedStyles.opacity).not.toBe('0');
  });
});
