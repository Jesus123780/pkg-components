import { render, screen } from '@testing-library/react'
import { Tag } from './index'

describe('Tag', () => {
  it('renders with default label', () => {
    render(<Tag label='OBLIGATORIO' />)
    const tagElement = screen.getByText('OBLIGATORIO')
    expect(tagElement)
  })

  it('renders with custom label', () => {
    render(<Tag label='Custom Label' />)
    const tagElement = screen.getByText('Custom Label')
    expect(tagElement)
  })
})
