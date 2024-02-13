import { render } from '@testing-library/react'
import React from 'react'
import { DropdownMenu } from './index'

describe('DropdownMenu Component', () => {
  const options = [
    { optionName: 'Option 1', icon: 'icon1', action: jest.fn() },
    { optionName: 'Option 2', icon: 'icon2', action: jest.fn() }
  ]

  test('renders with options', () => {
    const { getByText } = render(<DropdownMenu
      options={options}
      position={{ x: 0, y: 0 }}
      show={true}
    />)
    options.forEach((option) => {
      const optionElement = getByText(option.optionName)
      expect(optionElement).toBeInTheDocument()
    })
  })

  test('does not render when show is false', () => {
    const { container } = render(<DropdownMenu
      options={options}
      position={{ x: 0, y: 0 }}
      show={false}
    />)
    expect(container.firstChild).toBeNull()
  })
})
