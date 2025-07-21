import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Divider } from './index'

describe('Divider', () => {
  it('renders without crashing', () => {
    const { container } = render(<Divider />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
