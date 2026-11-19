/** @vitest-environment jsdom */
import React, { createRef, useState } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import {
  SwipeableCard,
  type SwipeableCardHandle,
  type SwipeableCardProps,
  type SwipeSide
} from './index'

// Some jsdom versions do not implement PointerEvent. Keep tests portable.
beforeAll(() => {
  if (typeof window.PointerEvent !== 'undefined') return
  class MockPointerEvent extends MouseEvent {
    readonly pointerId: number
    readonly pointerType: string
    readonly isPrimary: boolean
    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init)
      this.pointerId = init.pointerId ?? 1
      this.pointerType = init.pointerType ?? 'mouse'
      this.isPrimary = init.isPrimary ?? true
    }
  }
  Object.defineProperty(window, 'PointerEvent', {
    configurable: true,
    value: MockPointerEvent
  })
})

const content = <div>Swipe me!</div>
const actions = <button type="button">Delete action</button>
const leftActions = <button type="button">Archive action</button>

const setup = (props: Partial<SwipeableCardProps> & React.RefAttributes<SwipeableCardHandle> = {}) => {
  const result = render(
    <SwipeableCard testId="card" rightActions={actions} {...props}>
      {props.children ?? content}
    </SwipeableCard>
  )
  const card = screen.getByTestId('card')
  const front = card.querySelector('[class*="frontContent"]') as HTMLElement
  return { ...result, card, front }
}

interface MoveOptions {
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  pointerType?: 'mouse' | 'touch'
  cancel?: boolean
}

const drag = (target: Element, {
  x1 = 280,
  y1 = 120,
  x2 = 205,
  y2 = 120,
  pointerType = 'mouse',
  cancel = false
}: MoveOptions = {}) => {
  const pointer = { pointerId: 1, isPrimary: true, pointerType, button: 0 }
  fireEvent.pointerDown(target, { ...pointer, clientX: x1, clientY: y1 })
  fireEvent.pointerMove(target, { ...pointer, clientX: x2, clientY: y2 })
  if (cancel) fireEvent.pointerCancel(target, { ...pointer, clientX: x2, clientY: y2 })
  else fireEvent.pointerUp(target, { ...pointer, clientX: x2, clientY: y2 })
}

afterEach(() => {
  vi.clearAllTimers()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('SwipeableCard • retrocompatibilidad', () => {
  it('renderiza hijos y botones de acciones sin alterarlos', () => {
    const { card } = setup()
    expect(screen.getByText('Swipe me!')).toBeTruthy()
    expect(screen.getByRole('group', { name: 'Tarjeta deslizable' })).toBe(card)
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('abre acciones a la derecha al deslizar hacia la izquierda', () => {
    const onOpenChange = vi.fn()
    const onSwipeLeft = vi.fn()
    const { card, front } = setup({ onOpenChange, onSwipeLeft })
    drag(card)
    expect(card.getAttribute('data-state')).toBe('open-right')
    expect(front.style.transform).toContain('translate3d(-100px, 0px, 0)')
    expect(onOpenChange).toHaveBeenCalledWith('right')
    expect(onSwipeLeft).toHaveBeenCalledTimes(1)
  })

  it('no abre con un movimiento inferior al umbral', () => {
    const { card } = setup()
    drag(card, { x2: 260 })
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('permite cerrar deslizando a la derecha desde una tarjeta abierta', () => {
    const { card } = setup({ defaultOpen: 'right' })
    expect(card.getAttribute('data-state')).toBe('open-right')
    drag(card, { x1: 100, x2: 210 })
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('elimina solo después de un full swipe y de la animación de salida', () => {
    vi.useFakeTimers()
    const onDelete = vi.fn()
    const onFullSwipeLeft = vi.fn()
    const { card } = setup({ onDelete, onFullSwipeLeft, exitDuration: 240 })
    drag(card, { x1: 300, x2: 100 })
    expect(card.getAttribute('data-state')).toBe('leaving')
    expect(onDelete).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(240))
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onFullSwipeLeft).toHaveBeenCalledTimes(1)
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('sin onDelete un swipe largo revela las acciones, no ejecuta una eliminación', () => {
    const { card } = setup({ onDelete: undefined, onFullSwipeLeft: undefined })
    drag(card, { x1: 300, x2: 100 })
    expect(card.getAttribute('data-state')).toBe('open-right')
  })

  it('cierra solo al cumplirse autoCloseDelay', () => {
    vi.useFakeTimers()
    const { card } = setup({ autoClose: true, autoCloseDelay: 900 })
    drag(card)
    expect(card.getAttribute('data-state')).toBe('open-right')
    act(() => vi.advanceTimersByTime(899))
    expect(card.getAttribute('data-state')).toBe('open-right')
    act(() => vi.advanceTimersByTime(1))
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('respeta sticky y el estilo heredado de rightActions', () => {
    const { card } = setup({ sticky: true, gradientAnimation: true, style: { borderRadius: 8 } })
    const panel = card.querySelector('[data-swipe-action-panel="right"]') as HTMLElement
    const p = { pointerId: 2, isPrimary: true, pointerType: 'mouse', button: 0 }
    fireEvent.pointerDown(card, { ...p, clientX: 300, clientY: 100 })
    fireEvent.pointerMove(card, { ...p, clientX: 170, clientY: 100 })
    expect(panel.style.width).toBe('130px')
    expect(panel.style.background).toMatch(/^rgb\(/)
    expect(panel.style.borderRadius).toBe('8px')
    fireEvent.pointerUp(card, { ...p, clientX: 170, clientY: 100 })
  })

  it('mantiene la opción delay para renderizar las acciones', () => {
    vi.useFakeTimers()
    setup({ delay: 200 })
    expect(screen.queryByText('Delete action')).toBeNull()
    act(() => vi.advanceTimersByTime(200))
    expect(screen.getByText('Delete action')).toBeTruthy()
  })
})

describe('SwipeableCard • movimientos adicionales', () => {
  it('abre y cierra acciones de ambos lados', () => {
    const onSwipeRight = vi.fn()
    const { card } = setup({ leftActions, swipeDirections: 'both', leftSwipeWidth: 120, onSwipeRight })
    drag(card, { x1: 100, x2: 190 })
    expect(card.getAttribute('data-state')).toBe('open-left')
    expect(onSwipeRight).toHaveBeenCalledTimes(1)
    drag(card, { x1: 220, x2: 110 })
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('full swipe a la derecha ejecuta solo su callback', () => {
    vi.useFakeTimers()
    const onFullSwipeRight = vi.fn()
    const onDelete = vi.fn()
    const { card } = setup({ leftActions, swipeDirections: 'both', onFullSwipeRight, onDelete })
    drag(card, { x1: 100, x2: 310 })
    expect(card.getAttribute('data-state')).toBe('leaving')
    act(() => vi.advanceTimersByTime(240))
    expect(onFullSwipeRight).toHaveBeenCalledOnce()
    expect(onDelete).not.toHaveBeenCalled()
  })

  it('swipe hacia arriba se ejecuta al soltar y después de animar', () => {
    vi.useFakeTimers()
    const onSwipeUp = vi.fn()
    const { card } = setup({ onSwipeUp })
    drag(card, { x1: 200, x2: 201, y1: 300, y2: 160 })
    expect(card.getAttribute('data-state')).toBe('leaving')
    expect(onSwipeUp).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(240))
    expect(onSwipeUp).toHaveBeenCalledOnce()
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('swipe hacia abajo requiere habilitación explícita', () => {
    vi.useFakeTimers()
    const onSwipeDown = vi.fn()
    const { card } = setup({ verticalSwipe: 'both', onSwipeDown })
    drag(card, { x1: 200, x2: 201, y1: 100, y2: 230 })
    act(() => vi.advanceTimersByTime(240))
    expect(onSwipeDown).toHaveBeenCalledOnce()
  })

  it('mantiene el scroll táctil vertical nativo por defecto', () => {
    const onSwipeUp = vi.fn()
    const { card } = setup({ onSwipeUp })
    expect(card.style.touchAction).toBe('pan-y')
    drag(card, { x1: 180, x2: 181, y1: 250, y2: 120, pointerType: 'touch' })
    expect(onSwipeUp).not.toHaveBeenCalled()
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('puede capturar el swipe vertical táctil mediante opt-in', () => {
    vi.useFakeTimers()
    const onSwipeUp = vi.fn()
    const { card } = setup({ onSwipeUp, enableVerticalTouch: true })
    expect(card.style.touchAction).toBe('none')
    drag(card, { x1: 180, x2: 180, y1: 240, y2: 80, pointerType: 'touch' })
    act(() => vi.advanceTimersByTime(240))
    expect(onSwipeUp).toHaveBeenCalledOnce()
  })

  it('cancela el gesto sin disparar acciones ni eliminar', () => {
    const onSwipeCancel = vi.fn()
    const onDelete = vi.fn()
    const { card } = setup({ onSwipeCancel, onDelete, defaultOpen: 'right' })
    drag(card, { x1: 200, x2: 310, cancel: true })
    expect(card.getAttribute('data-state')).toBe('open-right')
    expect(onSwipeCancel).toHaveBeenCalledOnce()
    expect(onDelete).not.toHaveBeenCalled()
  })

  it('reporta inicio, progreso y fin con información tipada', () => {
    const onSwipeStart = vi.fn()
    const onSwipeMove = vi.fn()
    const onSwipeEnd = vi.fn()
    const { card } = setup({ onSwipeStart, onSwipeMove, onSwipeEnd })
    drag(card)
    expect(onSwipeStart).toHaveBeenCalledOnce()
    expect(onSwipeMove).toHaveBeenCalledWith(expect.objectContaining({ axis: 'horizontal', direction: 'left', progress: 0.75 }))
    expect(onSwipeEnd).toHaveBeenCalledWith(expect.objectContaining({ direction: 'left' }))
  })
})

describe('SwipeableCard • accesibilidad y composición', () => {
  it('abre con flechas y cierra con Escape/Home', () => {
    const { card } = setup({ leftActions, swipeDirections: 'both' })
    fireEvent.keyDown(card, { key: 'ArrowLeft' })
    expect(card.getAttribute('data-state')).toBe('open-right')
    fireEvent.keyDown(card, { key: 'Escape' })
    expect(card.getAttribute('data-state')).toBe('closed')
    fireEvent.keyDown(card, { key: 'ArrowRight' })
    expect(card.getAttribute('data-state')).toBe('open-left')
    fireEvent.keyDown(card, { key: 'Home' })
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('no inicia drag sobre un botón hijo', () => {
    const handler = vi.fn()
    setup({ children: <button onClick={handler}>Guardar</button> })
    const button = screen.getByRole('button', { name: 'Guardar' })
    drag(button, { x1: 200, x2: 60 })
    fireEvent.click(button)
    expect(handler).toHaveBeenCalledOnce()
    expect(screen.getByTestId('card').getAttribute('data-state')).toBe('closed')
  })

  it('bloquea el click accidental inmediatamente después de arrastrar', () => {
    const handler = vi.fn()
    const { card } = setup({ children: <div onClick={handler}>Tarjeta clicable</div> })
    drag(card)
    fireEvent.click(screen.getByText('Tarjeta clicable'))
    expect(handler).not.toHaveBeenCalled()
  })

  it('disabled impide gestos y teclado', () => {
    const onDelete = vi.fn()
    const { card } = setup({ disabled: true, onDelete })
    drag(card, { x1: 300, x2: 30 })
    fireEvent.keyDown(card, { key: 'ArrowLeft' })
    expect(card.getAttribute('data-state')).toBe('closed')
    expect(card.hasAttribute('tabindex')).toBe(false)
    expect(onDelete).not.toHaveBeenCalled()
  })

  it('permite disparar Delete por teclado solo con permiso explícito', () => {
    vi.useFakeTimers()
    const onDelete = vi.fn()
    const { card } = setup({ onDelete, deleteOnKeyboard: true })
    fireEvent.keyDown(card, { key: 'Delete' })
    act(() => vi.advanceTimersByTime(240))
    expect(onDelete).toHaveBeenCalledOnce()
  })

  it('cierra al seleccionar un botón lateral si se habilita', () => {
    const { card } = setup({ defaultOpen: 'right', closeOnActionClick: true })
    fireEvent.click(screen.getByText('Delete action'))
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('cierra al tocar fuera si se habilita', () => {
    const { card } = setup({ defaultOpen: 'right', closeOnOutsideClick: true })
    fireEvent.pointerDown(document.body, { pointerId: 9, pointerType: 'mouse' })
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('expone una ref con open, close y reset', () => {
    const api = createRef<SwipeableCardHandle>()
    const { card } = setup({ ref: api })
    act(() => api.current?.open('right'))
    expect(card.getAttribute('data-state')).toBe('open-right')
    act(() => api.current?.close())
    expect(card.getAttribute('data-state')).toBe('closed')
    act(() => api.current?.open('right'))
    act(() => api.current?.reset())
    expect(card.getAttribute('data-state')).toBe('closed')
  })

  it('el padre puede controlar el panel abierto', () => {
    function Controlled() {
      const [side, setSide] = useState<SwipeSide | null>(null)
      return (
        <>
          <button onClick={() => setSide('right')}>Abrir desde el padre</button>
          <SwipeableCard testId="card" open={side} rightActions={actions} onOpenChange={setSide}>
            {content}
          </SwipeableCard>
        </>
      )
    }
    render(<Controlled />)
    fireEvent.click(screen.getByText('Abrir desde el padre'))
    expect(screen.getByTestId('card').getAttribute('data-state')).toBe('open-right')
    fireEvent.keyDown(screen.getByTestId('card'), { key: 'Escape' })
    expect(screen.getByTestId('card').getAttribute('data-state')).toBe('closed')
  })


  it('permite deshabilitar el full swipe conservando la apertura', () => {
    const onDelete = vi.fn()
    const { card } = setup({ allowFullSwipe: false, onDelete })
    drag(card, { x1: 300, x2: 80 })
    expect(card.getAttribute('data-state')).toBe('open-right')
    expect(onDelete).not.toHaveBeenCalled()
  })

  it('aplica rotación y escala solo cuando se configuran', () => {
    const { card, front } = setup({ rotateOnSwipe: 3, scaleOnSwipe: 0.04 })
    const pointer = { pointerId: 7, isPrimary: true, pointerType: 'mouse', button: 0 }
    fireEvent.pointerDown(card, { ...pointer, clientX: 300, clientY: 100 })
    fireEvent.pointerMove(card, { ...pointer, clientX: 200, clientY: 100 })
    expect(front.style.transform).toContain('rotate(-3deg)')
    expect(front.style.transform).toContain('scale(0.96)')
    fireEvent.pointerUp(card, { ...pointer, clientX: 200, clientY: 100 })
  })

  it('reset aborta un full-swipe pendiente e impide callbacks atrasados', () => {
    vi.useFakeTimers()
    const onDelete = vi.fn()
    const ref = createRef<SwipeableCardHandle>()
    const { card } = setup({ ref, onDelete })
    drag(card, { x1: 300, x2: 100 })
    expect(card.getAttribute('data-state')).toBe('leaving')
    act(() => ref.current?.reset())
    act(() => vi.advanceTimersByTime(1000))
    expect(onDelete).not.toHaveBeenCalled()
    expect(card.getAttribute('data-state')).toBe('closed')
  })
  it('limpia timers cuando se desmonta durante un full swipe', () => {
    vi.useFakeTimers()
    const onDelete = vi.fn()
    const { card, unmount } = setup({ onDelete })
    drag(card, { x1: 300, x2: 90 })
    unmount()
    act(() => vi.advanceTimersByTime(500))
    expect(onDelete).not.toHaveBeenCalled()
  })
})
