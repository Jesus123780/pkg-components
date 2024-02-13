import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { RippleButton } from './index'

describe('RippleButton', () => {
  it('should render correctly with label', () => {
    render(<RippleButton label='Test Button' />)
    const buttonElement = screen.getByText('Test Button')
    expect(buttonElement)

  })

  it('should trigger onClick function when clicked', () => {
    const onClickMock = jest.fn()
    render(<RippleButton label='Test Button' onClick={onClickMock} />)
    const buttonElement = screen.getByText('Test Button')
    userEvent.click(buttonElement)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
