import { render, screen } from '@testing-library/react'
import { AnimationsNumber } from './index'

describe('AnimationsNumber', () => {
  it('should render the default text "0.00" when no props are provided', () => {
    render(<AnimationsNumber />)
    const spans = screen.getAllByText(/[\d.]/)
    expect(spans).toHaveLength(4)
    expect(spans.map((el) => el.textContent).join('')).toBe('0.00')
  })

  it('should render each character of provided text as individual span', () => {
    const text = '123.45'
    render(<AnimationsNumber text={text} />)
    const spans = screen.getAllByText(/[\d.]/)
    expect(spans).toHaveLength(text.length)
    expect(spans.map((el) => el.textContent).join('')).toBe(text)
  })

  it('should match snapshot with custom text', () => {
    const text = '99.99'
    const { container } = render(<AnimationsNumber text={text} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should handle empty text gracefully', () => {
    render(<AnimationsNumber text="" />)
    const spans = screen.queryAllByText(/[\s\S]/) // Any character
    expect(spans.length).toBe(0)
  })
})
