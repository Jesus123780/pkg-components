import { render, screen } from '@testing-library/react'
import React from 'react'
import { Column } from './index'

describe('Column', () => {
  it('renders children correctly', () => {
    render(
      <Column>
        <div>Child 1</div>
        <div>Child 2</div>
      </Column>
    )

    screen.getByText('Child 1')
    screen.getByText('Child 2')
  })

  it('applies styles correctly', () => {
    render(
      <Column padding='20px' width='300px'>
        <div>Child 1</div>
      </Column>
    )

    const column = screen.getByText('Child 1').parentElement
  })
})
