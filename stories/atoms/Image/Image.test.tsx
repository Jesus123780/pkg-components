import { render, screen } from '@testing-library/react'
import { Image } from './index'
import '@testing-library/jest-dom'

describe('Image', () => {
  const defaultProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
    width: '200',
    height: '100',
    className: 'custom-class'
  }

  it('should render the image with correct attributes', () => {
    render(<Image {...defaultProps} />)

    const img = screen.getByAltText('Test image') as HTMLImageElement

    expect(img).toBeInTheDocument()
    expect(img.src).toBe(defaultProps.src)
    expect(img.alt).toBe(defaultProps.alt)
    expect(img.width).toBe(Number(defaultProps.width))
    expect(img.height).toBe(Number(defaultProps.height))
    expect(img.className).toContain('custom-class')
  })

  it('should render the image without optional props', () => {
    render(<Image src="https://example.com/image.jpg" />)

    const img = screen.getByRole('img') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toBe('https://example.com/image.jpg')
    expect(img.alt).toBe('')
  })
})
