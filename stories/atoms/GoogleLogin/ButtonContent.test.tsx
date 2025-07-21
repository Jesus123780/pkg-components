import '@testing-library/jest-dom'

/**
 * @file ButtonContent component unit tests
 * @description Validates rendering and structure of the ButtonContent atom
 */

import { render, screen } from '@testing-library/react'
import { ButtonContent } from './ButtonContent'

describe('ButtonContent', () => {
  it('renders children content correctly', () => {
    render(<ButtonContent>Click Me</ButtonContent>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('does not render icon if not provided', () => {
    render(<ButtonContent>Only Text</ButtonContent>)
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
  })
})
