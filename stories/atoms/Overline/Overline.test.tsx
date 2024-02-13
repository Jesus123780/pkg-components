import { render } from '@testing-library/react'
import React from 'react'
import { Overline } from './index'

describe('Overline', () => {
  it('should render correctly with default props', () => {
    const { container } = render(<Overline />)
    const overlineElement = container.firstChild
  })

  it('should render with custom styles', () => {
    const { container } = render(
      <Overline
        bgColor='rgba(255, 0, 0, 0.5)'
        show
        zIndex={100}
      />
    )
    const overlineElement = container.firstChild

    expect(overlineElement).toBeTruthy()

  })
})
