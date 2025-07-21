import React, { forwardRef } from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AmountInput } from '../index'

describe('<AmountInput/> customInput', () => {
  it('should render with customInput', () => {
    const customInput = forwardRef<HTMLInputElement>(
      (props: React.InputHTMLAttributes<HTMLInputElement>, ref) => {
        return <input {...props} ref={ref} />
      }
    )

    customInput.displayName = 'CustomInput'

    render(<AmountInput defaultValue="1234" customInput={customInput} />)

    expect(screen.getByRole('textbox')).toHaveValue('1,234')
  })
})
