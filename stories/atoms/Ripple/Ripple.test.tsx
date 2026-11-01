import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { RippleButton } from './index'

jest.mock('../../../assets', () => ({
  IconLoading: ({ color, size }: { color: string; size: number }) => (
    <svg data-testid="icon-loading" data-color={color} data-size={size} />
  )
}))

jest.mock('../../../utils', () => ({
  getGlobalStyle: () => '#ffffff'
}))

jest.mock('../../../assets/colors', () => ({
  BGColor: '#ffffff',
  PColor: '#e53935'
}))

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('RippleButton', () => {
  it('renders the label and preserves the legacy global class', () => {
    render(<RippleButton label="Guardar" />)

    const button = screen.getByRole('button', { name: 'Guardar' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('ripple-button')
  })

  it('calls onClick and renders a ripple after a normal click', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    render(<RippleButton label="Continuar" onClick={onClick} />)
    await user.click(screen.getByRole('button', { name: 'Continuar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('ripple-wave')).toBeInTheDocument()
  })

  it('removes a ripple when its animation finishes', async () => {
    const user = userEvent.setup()

    render(<RippleButton label="Continuar" />)
    const button = screen.getByRole('button', { name: 'Continuar' })
    await user.click(button)

    const ripple = screen.getByTestId('ripple-wave')
    ripple.dispatchEvent(new Event('animationend', { bubbles: true }))

    expect(screen.queryByTestId('ripple-wave')).not.toBeInTheDocument()
  })

  it('still calls onClick when the ripple effect is turned off', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    render(
      <RippleButton label="Sin onda" ripple={false} onClick={onClick} />
    )
    await user.click(screen.getByRole('button', { name: 'Sin onda' }))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('ripple-wave')).not.toBeInTheDocument()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    render(
      <RippleButton label="Deshabilitado" disabled onClick={onClick} />
    )
    const button = screen.getByRole('button', { name: 'Deshabilitado' })

    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('disables the button and announces the loading state', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    render(
      <RippleButton
        label="Guardar"
        loading
        loadingLabel="Guardando información…"
        onClick={onClick}
      />
    )

    const button = screen.getByRole('button', { name: 'Guardar' })
    expect(button).toBeDisabled()
    expect(screen.getByRole('status')).toHaveTextContent(
      'Guardando información…'
    )
    expect(screen.getByTestId('icon-loading')).toBeInTheDocument()

    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders children alongside the label', () => {
    render(
      <RippleButton label="Abrir">
        <span>detalle adicional</span>
      </RippleButton>
    )

    expect(
      screen.getByRole('button', { name: 'Abrir detalle adicional' })
    ).toBeInTheDocument()
  })

  it('forwards standard button attributes and custom styles', () => {
    render(
      <RippleButton
        id="save-button"
        label="Guardar"
        aria-label="Guardar formulario"
        title="Guardar los cambios"
        bgColor="#123456"
        radius="10px"
        data-testid="save-control"
      />
    )

    const button = screen.getByTestId('save-control')
    expect(button).toHaveAttribute('id', 'save-button')
    expect(button).toHaveAttribute('aria-label', 'Guardar formulario')
    expect(button).toHaveAttribute('title', 'Guardar los cambios')
    expect(button.style.getPropertyValue('--rb-bg-color')).toBe('#123456')
    expect(button.style.getPropertyValue('--rb-radius')).toBe('10px')
  })

  it('supports keyboard activation and creates a ripple', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    render(<RippleButton label="Accesible" onClick={onClick} />)
    await user.tab()
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('ripple-wave')).toBeInTheDocument()
  })
})
