import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LateralModal } from './index'
import * as slideHook from './useSlideTransition'

// Mock styles so class names are predictable
jest.mock('./styles.module.css', () => ({
  modal: 'modal',
  'modal--left': 'modal--left',
  'modal--right': 'modal--right',
  'modal--top': 'modal--top',
  'modal--bottom': 'modal--bottom',
  'modal--entering': 'modal--entering',
  'modal--entered': 'modal--entered',
  'modal--exiting': 'modal--exiting'
}))

// Mock the slide hook so tests can control mounted/stage
jest.mock('./useSlideTransition', () => ({
  useSlideTransition: jest.fn()
}))

// Mock Portal to simply render children
jest.mock('../../organisms', () => ({
  Portal: ({ children }: any) => <div data-testid="portal">{children}</div>
}))

// Mock Overline to expose onClick and props easily in tests
jest.mock('../../atoms', () => ({
  Overline: ({ show, bgColor, zIndex, onClick }: any) => (
    <div
      data-testid="overline"
      data-show={show}
      data-bg={bgColor}
      data-z={zIndex}
      onClick={onClick}
    />
  )
}))

// Mock helper
jest.mock('../../../helpers', () => ({
  getGlobalStyle: (v: string) => `global:${v}`
}))

const mockUseSlide = slideHook.useSlideTransition as jest.MockedFunction<
  typeof slideHook.useSlideTransition
>

describe('LateralModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('does not render when hook reports not mounted', () => {
    mockUseSlide.mockReturnValue({ mounted: false, stage: 'exiting' } as any)
    const { queryByRole } = render(<LateralModal open={true}>Child</LateralModal>)
    expect(queryByRole('dialog')).toBeNull()
  })

  test('renders dialog with children and aria attributes when mounted', () => {
    mockUseSlide.mockReturnValue({ mounted: true, stage: 'entered' } as any)
    render(
      <LateralModal open={true} ariaLabel="My panel">
        <div>Panel content</div>
      </LateralModal>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-hidden', 'false')
    expect(dialog).toHaveAttribute('aria-label', 'My panel')
    expect(screen.getByText('Panel content')).toBeInTheDocument()
  })

  test('applies direction and stage classes and transition duration style', () => {
    mockUseSlide.mockReturnValue({ mounted: true, stage: 'entering' } as any)
    const { container } = render(
      <LateralModal open={true} direction="left" duration={123}>
        X
      </LateralModal>
    )

    const dialog = screen.getByRole('dialog')
    // class names come from mocked styles
    expect(dialog.className).toContain('modal')
    expect(dialog.className).toContain('modal--left')
    expect(dialog.className).toContain('modal--entering')

    // style transition includes the provided duration
    const style = dialog.getAttribute('style') || ''
    expect(style).toContain('transform 123ms')
  })

  test('calls handleClose when Overline is clicked', () => {
    mockUseSlide.mockReturnValue({ mounted: true, stage: 'entered' } as any)
    const handleClose = jest.fn()
    render(
      <LateralModal open={true} handleClose={handleClose}>
        Content
      </LateralModal>
    )

    const overline = screen.getByTestId('overline')
    fireEvent.click(overline)
    expect(handleClose).toHaveBeenCalled()
  })

  test('invokes handleClose on Escape key', () => {
    mockUseSlide.mockReturnValue({ mounted: true, stage: 'entered' } as any)
    const handleClose = jest.fn()
    render(
      <LateralModal open={true} handleClose={handleClose}>
        Content
      </LateralModal>
    )

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(handleClose).toHaveBeenCalled()
  })

  test('does not call handleClose when clicking inside the modal (stops propagation)', () => {
    mockUseSlide.mockReturnValue({ mounted: true, stage: 'entered' } as any)
    const handleClose = jest.fn()
    render(
      <LateralModal open={true} handleClose={handleClose}>
        <button type="button">Inside</button>
      </LateralModal>
    )

    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog) // should stop propagation; overline click not triggered
    expect(handleClose).not.toHaveBeenCalled()
  })
})