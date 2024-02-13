import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Draggable } from './index'

describe('Draggable', () => {
  it('renders correctly', () => {
    const { container } = render(<Draggable />)
    expect(container).toMatchSnapshot()
  })

  it('should start dragging when mouse is down', () => {
    const { getByTestId } = render(<Draggable />)
    const draggableElement = getByTestId('draggable-element')

    fireEvent.mouseDown(draggableElement)
    expect(draggableElement.style.position).toBe('fixed')
  })
})
