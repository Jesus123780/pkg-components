import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { CopyToClipboard } from './index'

describe('CopyToClipboard', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('copies to clipboard via navigator.clipboard and shows copied message then reverts', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })

    render(<CopyToClipboard text="Hello" />)
    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(writeText).toHaveBeenCalledWith('Hello')
    expect(button).toHaveTextContent('Copied!')

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      expect(button).toHaveTextContent('Copy')
    })
  })

  it('falls back to execCommand if navigator.clipboard is not available', async () => {
    document.execCommand = jest.fn().mockReturnValue(true)
    Object.defineProperty(navigator, 'clipboard', {
      value: null,
      configurable: true,
    })

    render(<CopyToClipboard text="Fallback" />)
    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(button).toHaveTextContent('Copied!')

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      expect(button).toHaveTextContent('Copy')
    })
  })

  it('uses provided label and copiedMessage props', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })

    render(<CopyToClipboard text="Secret" label="Press" copiedMessage="Done" />)
    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('Press')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(writeText).toHaveBeenCalledWith('Secret')
    expect(button).toHaveTextContent('Done')

    act(() => jest.advanceTimersByTime(2000))
    await waitFor(() => expect(button).toHaveTextContent('Press'))
  })

  it('logs error and shows errorMessage when clipboard copy fails', async () => {
    const writeText = jest.fn().mockRejectedValue(new Error('fail'))
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })

    render(<CopyToClipboard text="Hello" errorMessage="Failed" />)
    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(consoleError).toHaveBeenCalled()
    expect(button).toHaveTextContent('Failed')

    act(() => jest.advanceTimersByTime(2000))
    await waitFor(() => expect(button).toHaveTextContent('Copy'))

    consoleError.mockRestore()
  })
})
