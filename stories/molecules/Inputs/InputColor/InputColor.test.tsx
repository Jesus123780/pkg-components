import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { InputColor } from './index'

describe('InputColor', () => {
  test('renders label and preview box', () => {
    render(<InputColor label="Color" />)

    // label
    expect(screen.getByText('Color')).toBeInTheDocument()

    // preview (solo tiene role="button")
    const preview = screen.getByRole('button')
    expect(preview).toBeInTheDocument()
  })

  test('opens and closes the color panel', () => {
    render(<InputColor />)

    const preview = screen.getByRole('button')

    // open panel
    fireEvent.click(preview)
    expect(screen.getByTestId('color-panel')).toBeInTheDocument()

    // close panel
    fireEvent.click(preview)
    expect(screen.queryByTestId('color-panel')).not.toBeInTheDocument()
  })

  test('updates hue slider and triggers onChange', () => {
    const onChange = jest.fn()

    render(<InputColor onChange={onChange} />)

    const preview = screen.getByRole('button')
    fireEvent.click(preview) // open

    const hueBar = screen.getByTestId('hue-bar')

    // rect fake
    jest
      .spyOn(hueBar, 'getBoundingClientRect')
      .mockReturnValue({ left: 0, width: 200 } as DOMRect)

    fireEvent.mouseDown(hueBar, { clientX: 50 })
    fireEvent.mouseMove(hueBar, { clientX: 120, buttons: 1 })
    fireEvent.mouseUp(hueBar)

    expect(onChange).toHaveBeenCalled()
  })

  test('copies the hex value', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    })

    render(<InputColor value="#ff0000" />)

    fireEvent.click(screen.getByRole('button')) // open panel

    const copyButton = screen.getByText('Copiar')
    fireEvent.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('#ff0000')
  })
})
