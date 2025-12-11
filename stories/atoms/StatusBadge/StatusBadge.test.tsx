import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StatusBadge } from './index'

describe('StatusBadge', () => {
  test('renders approved label', () => {
    render(<StatusBadge id="1" status="approved" />)
    expect(screen.getByText('Approved')).toBeInTheDocument()
  })

  test('renders custom label', () => {
    render(<StatusBadge id="2" status="approved" label="Paid" />)
    expect(screen.getByText('Paid')).toBeInTheDocument()
  })

  test('fallback for unknown status', () => {
    render(<StatusBadge id="3" status="weird" />)
    expect(screen.getByText('weird')).toBeInTheDocument()
  })

  test('invalid with missing id', () => {
    // @ts-expect-error testing invalid
    render(<StatusBadge status="approved" />)
    expect(screen.getByText('Invalid')).toBeInTheDocument()
  })
})
