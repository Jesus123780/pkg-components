// Loading.test.tsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Loading } from './index'

describe('Loading components', () => {
  it('should render Loading component with default background', () => {
    render(<Loading />)
    const container = screen.getByRole('loading')
    expect(container).toHaveStyle(`background-color: #7777774e`)
    expect(container.querySelector('.loader')).toBeInTheDocument()
  })

  it('should render Loading component with custom background color', () => {
    render(<Loading bgColor="#000000" />)
    const container = screen.getByRole('loading')
    expect(container).toHaveStyle(`background-color: #000000`)
  })
})
