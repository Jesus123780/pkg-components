/**
 * @file Icon.test.tsx
 * @description Unit tests for the Icon component
 */

import { render, screen } from '@testing-library/react'
import { Icon } from './index'
import '@testing-library/jest-dom'

// Mock de un ícono registrado
jest.mock('../../../assets', () => ({
  IconHome: ({ size }: { size?: number }) => <svg data-testid="icon-home" width={size} />,
}))

describe('Icon', () => {
  it('renders a valid icon correctly', () => {
    render(<Icon icon="home" size={32} />)
    expect(screen.getByTestId('icon-home')).toBeInTheDocument()
  })

  it('renders error message when icon is invalid', () => {
    render(<Icon icon="unknownIcon" />)
    expect(screen.getByText(/no se encontró el ícono/i)).toBeInTheDocument()
  })

  it('renders nothing when icon is "none"', () => {
    const { container } = render(<Icon icon="none" />)
    expect(container).toBeEmptyDOMElement()
  })
})
