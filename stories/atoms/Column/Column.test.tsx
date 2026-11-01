import { render, screen } from '@testing-library/react'
import { Column } from './index'
import '@testing-library/jest-dom'

describe('Column component', () => {
  it('renders children correctly', () => {
    render(<Column>Test content</Column>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies alignItems and justifyContent classes', () => {
    render(<Column alignItems="center" justifyContent="flex-end">Layout</Column>)
    const element = screen.getByText('Layout')
    expect(element.className).toMatch(/align-items-center/)
    expect(element.className).toMatch(/justify-content-flex-end/)
  })

  it('applies custom className', () => {
    render(<Column className="custom-class">Styled</Column>)
    const element = screen.getByText('Styled')
    expect(element.className).toMatch(/custom-class/)
  })


  it('renders with custom element tag using "as" prop', () => {
    render(<Column as="section">Section Element</Column>)
    const element = screen.getByText('Section Element')
    expect(element.tagName).toBe('SECTION')
  })
})
