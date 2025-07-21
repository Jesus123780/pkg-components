// CustomLink.test.tsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CustomLink } from './index'

// Mock de next/link para test
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

describe('CustomLink component', () => {
  it('should render with default href when none is provided', () => {
    render(<CustomLink>Home</CustomLink>)
    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('should render with provided href', () => {
    render(<CustomLink href="/about">About</CustomLink>)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })

  it('should render children correctly', () => {
    render(<CustomLink href="/contact"><span>Contact</span></CustomLink>)
    const link = screen.getByRole('link')
    expect(link).toContainHTML('<span>Contact</span>')
  })
})
