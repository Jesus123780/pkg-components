import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Options, type OptionsProps } from './index'

jest.mock('../../atoms', () => ({
  Icon: ({ icon }: { icon: string }) => <svg data-testid={`icon-${icon}`} aria-hidden='true' />
}))

describe('Options Component', () => {
  const handleClick = jest.fn()
  const defaults: OptionsProps = { active: false, handleClick, icon: 'IconBox', index: 1, label: 'Productos', size: 15 }
  const renderOptions = (props: Partial<OptionsProps> = {}) => render(
    <Options {...defaults} {...props}>
      <a href='/products'>Todos los productos</a>
      <a href='/categories'>Categorías</a>
    </Options>
  )
  const trigger = () => screen.getByRole('button', { name: 'Productos' })
  beforeEach(() => jest.clearAllMocks())

  describe('Rendering', () => {
    it('renders with defaults', () => { renderOptions(); expect(trigger()).toBeInTheDocument() })
    it('renders a custom label', () => { renderOptions({ label: 'Inventario' }); expect(screen.getByText('Inventario')).toBeInTheDocument() })
    it('renders a named icon', () => { renderOptions(); expect(screen.getByTestId('icon-IconBox')).toBeInTheDocument() })
    it('renders a React icon', () => { renderOptions({ icon: <span data-testid='custom-icon' /> }); expect(screen.getByTestId('custom-icon')).toBeInTheDocument() })
    it('omits the none icon', () => { renderOptions({ icon: 'none' }); expect(screen.queryByTestId('icon-none')).not.toBeInTheDocument() })
    it('renders without children or expansion arrow', () => { render(<Options {...defaults} />); expect(trigger()).toBeInTheDocument(); expect(screen.queryByTestId('icon-IconArrowBottom')).not.toBeInTheDocument() })
    it('accepts a custom class', () => { const { container } = renderOptions({ className: 'custom-navigation-option' }); expect(container.firstElementChild).toHaveClass('custom-navigation-option') })
  })
  describe('Controlled state', () => {
    it('is collapsed by default', () => { renderOptions(); expect(trigger()).toHaveAttribute('aria-expanded', 'false') })
    it('is expanded when active', () => { renderOptions({ active: true }); expect(trigger()).toHaveAttribute('aria-expanded', 'true') })
    it('exposes expanded children', () => { renderOptions({ active: true }); expect(screen.getByRole('link', { name: 'Todos los productos' })).toBeInTheDocument(); expect(screen.getByRole('link', { name: 'Categorías' })).toBeInTheDocument() })
    it('hides collapsed children from the accessibility tree', () => { renderOptions(); expect(screen.queryByRole('link', { name: 'Categorías' })).not.toBeInTheDocument() })
    it('makes collapsed content inert', () => { renderOptions(); const panel = screen.getByRole('group', { hidden: true }); expect(panel).toHaveAttribute('inert'); expect(panel).toHaveAttribute('aria-hidden', 'true') })
    it('removes inert when open', () => { renderOptions({ active: true }); const panel = screen.getByRole('group'); expect(panel).not.toHaveAttribute('inert'); expect(panel).toHaveAttribute('aria-hidden', 'false') })
    it('responds to external state changes', () => { const { rerender } = render(<Options {...defaults}><span>Contenido</span></Options>); expect(trigger()).toHaveAttribute('aria-expanded', 'false'); rerender(<Options {...defaults} active><span>Contenido</span></Options>); expect(trigger()).toHaveAttribute('aria-expanded', 'true') })
    it('does not expand without changing active', async () => { const user = userEvent.setup(); renderOptions(); await user.click(trigger()); expect(handleClick).toHaveBeenCalledTimes(1); expect(trigger()).toHaveAttribute('aria-expanded', 'false') })
  })
  describe('Interactions', () => {
    it.each([[5, 5], ['7', 7], [false, 0], ['invalid', 0]])('normalizes index %s to %s', async (index, expected) => { const user = userEvent.setup(); renderOptions({ index }); await user.click(trigger()); expect(handleClick).toHaveBeenCalledTimes(1); expect(handleClick).toHaveBeenCalledWith(expected) })
    it('invokes the callback once when clicking the arrow', async () => { const user = userEvent.setup(); renderOptions(); await user.click(screen.getByTestId('icon-IconArrowBottom')); expect(handleClick).toHaveBeenCalledTimes(1) })
    it('does not toggle when interacting with a child', async () => { const user = userEvent.setup(); const action = jest.fn(); render(<Options {...defaults} active><button onClick={action}>Nuevo producto</button></Options>); await user.click(screen.getByRole('button', { name: 'Nuevo producto' })); expect(action).toHaveBeenCalledTimes(1); expect(handleClick).not.toHaveBeenCalled() })
    it('disables the trigger', () => { renderOptions({ disabled: true }); expect(trigger()).toBeDisabled() })
    it('does not invoke disabled triggers', async () => { const user = userEvent.setup(); renderOptions({ disabled: true }); await user.click(trigger()); expect(handleClick).not.toHaveBeenCalled() })
  })
  describe('Accessibility', () => {
    it('provides an accessible name', () => { renderOptions(); expect(trigger()).toHaveAccessibleName('Productos') })
    it('associates trigger and panel', () => { renderOptions({ active: true }); const panel = screen.getByRole('group'); expect(trigger()).toHaveAttribute('aria-controls', panel.id); expect(panel).toHaveAttribute('aria-labelledby', trigger().id) })
    it('is keyboard focusable', async () => { const user = userEvent.setup(); renderOptions(); await user.tab(); expect(trigger()).toHaveFocus() })
    it.each(['{Enter}', ' '])('supports keyboard activation via %s', async key => { const user = userEvent.setup(); renderOptions(); await user.tab(); await user.keyboard(key); expect(handleClick).toHaveBeenCalledTimes(1) })
    it('generates unique accessibility ids', () => { render(<><Options {...defaults} label='Productos'>A</Options><Options {...defaults} label='Inventario'>B</Options></>); const other = screen.getByRole('button', { name: 'Inventario' }); expect(trigger().id).not.toBe(other.id); expect(trigger().getAttribute('aria-controls')).not.toBe(other.getAttribute('aria-controls')) })
    it('restores trigger focus upon external collapse', () => { const { rerender } = render(<Options {...defaults} active><button>Child action</button></Options>); screen.getByRole('button', { name: 'Child action' }).focus(); rerender(<Options {...defaults}><button>Child action</button></Options>); expect(trigger()).toHaveFocus() })
  })
  describe('Dynamic content and motion', () => {
    it('supports dynamic content', () => { const { rerender } = render(<Options {...defaults} active><span>Producto 1</span></Options>); rerender(<Options {...defaults} active><span>Producto 1</span><span>Producto 2</span><span>Producto 3</span></Options>); const panel = screen.getByRole('group'); for (const name of ['Producto 1', 'Producto 2', 'Producto 3']) expect(within(panel).getByText(name)).toBeInTheDocument() })
    it('preserves child state when collapsed', async () => { const user = userEvent.setup(); const { rerender } = render(<Options {...defaults} active><input aria-label='Nombre' /></Options>); await user.type(screen.getByRole('textbox', { name: 'Nombre' }), 'Venty'); rerender(<Options {...defaults}><input aria-label='Nombre' /></Options>); rerender(<Options {...defaults} active><input aria-label='Nombre' /></Options>); expect(screen.getByRole('textbox', { name: 'Nombre' })).toHaveValue('Venty') })
    it('remains interactive with motion disabled', async () => { const user = userEvent.setup(); renderOptions({ motion: false }); await user.click(trigger()); expect(handleClick).toHaveBeenCalledTimes(1) })
  })
})
