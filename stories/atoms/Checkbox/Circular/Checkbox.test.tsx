import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Checkbox } from './index'

describe('Checkbox', () => {
  it('renders correctly with default props', () => {
    render(<Checkbox label='Checkbox Label' />)
    const checkbox = screen.getByLabelText('Checkbox Label')
  })

  it('renders as checked', () => {
    render(<Checkbox checked label='Checkbox Label' />)
    const checkbox = screen.getByLabelText('Checkbox Label')
  })

  it('renders as disabled', () => {
    render(<Checkbox disabled label='Checkbox Label' />)
    const checkbox = screen.getByLabelText('Checkbox Label')
  })

  it('renders as indeterminate', () => {
    render(<Checkbox indeterminate label='Checkbox Label' />)
    const checkbox = screen.getByLabelText('Checkbox Label')

    // Ensure that the checkbox is found and is an HTMLInputElement
    expect(checkbox).toBeTruthy()
    expect(checkbox.tagName).toBe('INPUT')

    // Check the indeterminate property
    expect(checkbox.indeterminate).toBe(true)
  })

  it('calls onChange when clicked', () => {
    const onChangeMock = jest.fn()
    render(<Checkbox label='Checkbox Label' onChange={onChangeMock} />)
    const checkbox = screen.getByLabelText('Checkbox Label')

    fireEvent.click(checkbox)
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })
})
