import { render, screen } from '@testing-library/react'
import React from 'react'
import { Text } from './index'

describe('Text', () => {
  it('renders children correctly', () => {
    render(<Text>Hello, world!</Text>)
    const textElement = screen.getByText('Hello, world!')
    expect(textElement)
  })

  it('renders with specified tag', () => {
    render(<Text as='h1'>Heading Text</Text>)
    const headingElement = screen.getByText('Heading Text')
    expect(headingElement)
    expect(headingElement.tagName).toBe('H1')
  })
})
