import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, fireEvent, fn, waitFor, within } from '@storybook/test'
import { SwipeableCard, type SwipeableCardProps, type SwipeSide } from './index'

const tile: React.CSSProperties = {
  boxSizing: 'border-box',
  width: 330,
  maxWidth: '100%',
  minHeight: 96,
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: '20px 24px',
  background: '#fff',
  boxShadow: '0 6px 18px rgb(15 23 42 / 7%)',
  fontFamily: 'inherit'
}

const actionStyle: React.CSSProperties = {
  border: 0,
  height: '100%',
  width: '100%',
  padding: '8px',
  background: '#dc2626',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 600
}

const rightActions = <button type="button" style={actionStyle} onClick={() => {}}>Eliminar</button>
const leftActions = (
  <button type="button" style={{ ...actionStyle, background: '#059669' }} onClick={() => {}}>
    Archivar
  </button>
)

const content = (
  <div style={tile}>
    <strong>Pedido #2456</strong>
    <p style={{ margin: '6px 0 0', color: '#64748b' }}>Desliza para descubrir acciones</p>
  </div>
)

const demo = (args: SwipeableCardProps) => (
  <div style={{ padding: 32, maxWidth: '100%', background: '#f8fafc', borderRadius: 16 }}>
    <SwipeableCard {...args} />
  </div>
)

const meta = {
  title: 'molecules/SwipeableCard',
  component: SwipeableCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tarjeta con acciones laterales accesibles y gestos configurables.

- **Izquierda:** revela \`rightActions\`; si se supera \`fullSwipeThreshold\`, ejecuta \`onDelete\` y/o \`onFullSwipeLeft\`.
- **Derecha:** revela \`leftActions\`; admite \`onFullSwipeRight\`.
- **Arriba/abajo:** llama a \`onSwipeUp\` / \`onSwipeDown\` al soltar tras superar el umbral.
- **Teclado:** enfoca el contenedor; usa ← o → para abrir y Escape/Home para cerrar. Los botones quedan disponibles al abrir.
- **Scroll móvil:** de forma predeterminada se conserva el desplazamiento vertical nativo. Para reconocer gestos verticales con el dedo usa \`enableVerticalTouch\`, sabiendo que impide ese scroll sobre la tarjeta.
- **API compatible:** mantiene \`swipeWidth\`, \`swipeHeight\`, \`autoClose\`, \`sticky\`, \`shake\`, \`delay\`, \`gradientAnimation\`, \`style\`, \`onDelete\` y \`onSwipeUp\`.
- **Respeto al movimiento reducido:** consulta \`prefers-reduced-motion\`.

El componente no elimina elementos de una lista por sí solo: el consumidor actualiza el estado de la lista dentro de \`onDelete\`.
        `.trim()
      }
    }
  },
  argTypes: {
    children: { control: false },
    rightActions: { control: false },
    leftActions: { control: false },
    swipeDirections: { control: 'select', options: ['left', 'right', 'both', 'none'] },
    verticalSwipe: { control: 'select', options: ['up', 'down', 'both', 'none'] },
    motion: { control: 'select', options: ['spring', 'smooth', 'snappy', 'none'] },
    defaultOpen: { control: 'select', options: [null, 'left', 'right'] },
    open: { control: false },
    style: { control: false },
    wrapperStyle: { control: false },
    leftActionsStyle: { control: false }
  },
  args: {
    children: content,
    rightActions,
    swipeWidth: 100,
    swipeHeight: 80,
    autoClose: false,
    gradientAnimation: false,
    motion: 'spring',
    testId: 'swipeable-card',
    onOpenChange: fn(),
    onDelete: fn()
  },
  render: demo
} satisfies Meta<typeof SwipeableCard>

export default meta
type Story = StoryObj<typeof meta>

/** Legado: desliza a la izquierda, suelta y luego arrastra de regreso. */
export const Primary: Story = { args: {} }

/** Una tarjeta puede ser desplazable aunque no reciba acciones laterales. */
export const WithoutActions: Story = {
  args: { rightActions: undefined, onDelete: undefined }
}

/** La zona de acciones crece con el deslizamiento, sin desaparecer. */
export const Sticky: Story = {
  args: { sticky: true, gradientAnimation: true, shake: true }
}

/** Se cierra 3 segundos después de abrir. */
export const AutoClose: Story = {
  args: { autoClose: true, autoCloseDelay: 3000 }
}

/** Destaca el cruce del umbral de acción completa. */
export const Shake: Story = {
  args: { shake: true, gradientAnimation: true }
}

/** Desliza a ambos lados: eliminar a la izquierda y archivar a la derecha. */
export const Bidirectional: Story = {
  args: {
    leftActions,
    swipeDirections: 'both',
    leftSwipeWidth: 115,
    onFullSwipeRight: fn()
  }
}

/** Activa los dos callbacks verticales. El gesto táctil vertical es opt-in. */
export const VerticalGestures: Story = {
  args: {
    verticalSwipe: 'both',
    enableVerticalTouch: true,
    onSwipeUp: fn(),
    onSwipeDown: fn()
  }
}

/** Cambia la curva de easing y aplica rotación/escala sutil. */
export const RichMotion: Story = {
  args: {
    motion: 'spring',
    animationDuration: 520,
    rotateOnSwipe: 2.5,
    scaleOnSwipe: 0.025,
    sticky: true,
    gradientAnimation: true
  }
}

export const Disabled: Story = { args: { disabled: true } }

/** Mantiene la API legacy `delay`. */
export const DelayedActions: Story = { args: { delay: 750 } }

/** Evita abrir el panel accidentalmente al pulsar botones internos. */
export const InteractiveContent: Story = {
  args: {
    children: (
      <div style={tile}>
        <strong>Pedido interactivo</strong>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button type="button" onClick={fn()}>Ver detalle</button>
          <a href="#detalles" onClick={(event) => event.preventDefault()}>Ir al detalle</a>
        </div>
      </div>
    )
  }
}

const ControlledExample = (props: SwipeableCardProps) => {
  const [side, setSide] = useState<SwipeSide | null>(null)
  return (
    <div style={{ display: 'grid', gap: 16, padding: 32 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setSide('right')}>Abrir derecha</button>
        <button onClick={() => setSide('left')}>Abrir izquierda</button>
        <button onClick={() => setSide(null)}>Cerrar</button>
      </div>
      <SwipeableCard {...props} leftActions={leftActions} swipeDirections="both" open={side} onOpenChange={setSide} />
    </div>
  )
}

/** El estado `open` lo controla el padre; ideal para cerrar otras tarjetas abiertas. */
export const Controlled: Story = {
  render: (args) => <ControlledExample {...args} />,
  args: { leftActions, swipeDirections: 'both' }
}

/** Verificación interactiva en Storybook: swipe corto y cierre por Escape. */
export const InteractionSwipeLeft: Story = {
  args: { onDelete: fn() },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByTestId('swipeable-card')
    fireEvent.pointerDown(card, { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0, clientX: 240, clientY: 80 })
    fireEvent.pointerMove(card, { pointerId: 1, pointerType: 'mouse', isPrimary: true, clientX: 150, clientY: 81 })
    fireEvent.pointerUp(card, { pointerId: 1, pointerType: 'mouse', isPrimary: true, clientX: 150, clientY: 81 })
    await expect(card).toHaveAttribute('data-state', 'open-right')
    await expect(args.onOpenChange).toHaveBeenCalledWith('right')
    card.focus()
    await userEvent.keyboard('{Escape}')
    await expect(card).toHaveAttribute('data-state', 'closed')
  }
}

/** Verificación interactiva: el panel izquierdo se abre con teclado. */
export const InteractionKeyboard: Story = {
  args: { leftActions, swipeDirections: 'both' },
  play: async ({ canvasElement, userEvent }) => {
    const card = within(canvasElement).getByTestId('swipeable-card')
    card.focus()
    await userEvent.keyboard('{ArrowRight}')
    await expect(card).toHaveAttribute('data-state', 'open-left')
    await userEvent.keyboard('{Home}')
    await expect(card).toHaveAttribute('data-state', 'closed')
  }
}

/** Verificación interactiva: no se dispara el swipe cuando está deshabilitado. */
export const InteractionDisabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const card = within(canvasElement).getByTestId('swipeable-card')
    fireEvent.pointerDown(card, { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0, clientX: 230, clientY: 70 })
    fireEvent.pointerMove(card, { pointerId: 1, pointerType: 'mouse', isPrimary: true, clientX: 80, clientY: 70 })
    fireEvent.pointerUp(card, { pointerId: 1, pointerType: 'mouse', isPrimary: true })
    await expect(card).toHaveAttribute('data-state', 'closed')
  }
}

/** Test automatizado en Storybook: el full swipe ejecuta la acción al terminar la salida. */
export const InteractionFullSwipe: Story = {
  args: { onDelete: fn(), exitDuration: 180 },
  play: async ({ canvasElement, args }) => {
    const card = within(canvasElement).getByTestId('swipeable-card')
    fireEvent.pointerDown(card, { pointerId: 2, pointerType: 'mouse', isPrimary: true, button: 0, clientX: 290, clientY: 75 })
    fireEvent.pointerMove(card, { pointerId: 2, pointerType: 'mouse', isPrimary: true, clientX: 80, clientY: 75 })
    fireEvent.pointerUp(card, { pointerId: 2, pointerType: 'mouse', isPrimary: true, clientX: 80, clientY: 75 })
    await expect(card).toHaveAttribute('data-state', 'leaving')
    await waitFor(() => expect(args.onDelete).toHaveBeenCalledTimes(1))
    await expect(card).toHaveAttribute('data-state', 'closed')
  }
}

/** Test automatizado: hacia arriba dispara onSwipeUp; el reposo devuelve la tarjeta. */
export const InteractionVerticalUp: Story = {
  args: { onSwipeUp: fn(), verticalSwipe: 'up', exitDuration: 180 },
  play: async ({ canvasElement, args }) => {
    const card = within(canvasElement).getByTestId('swipeable-card')
    fireEvent.pointerDown(card, { pointerId: 3, pointerType: 'mouse', isPrimary: true, button: 0, clientX: 175, clientY: 250 })
    fireEvent.pointerMove(card, { pointerId: 3, pointerType: 'mouse', isPrimary: true, clientX: 176, clientY: 110 })
    fireEvent.pointerUp(card, { pointerId: 3, pointerType: 'mouse', isPrimary: true, clientX: 176, clientY: 110 })
    await waitFor(() => expect(args.onSwipeUp).toHaveBeenCalledTimes(1))
    await expect(card).toHaveAttribute('data-state', 'closed')
  }
}

/** Test automatizado: cierre automático sin borrar el elemento. */
export const InteractionAutoClose: Story = {
  args: { autoClose: true, autoCloseDelay: 350, onDelete: fn() },
  play: async ({ canvasElement, args }) => {
    const card = within(canvasElement).getByTestId('swipeable-card')
    fireEvent.pointerDown(card, { pointerId: 4, pointerType: 'mouse', isPrimary: true, button: 0, clientX: 230, clientY: 75 })
    fireEvent.pointerMove(card, { pointerId: 4, pointerType: 'mouse', isPrimary: true, clientX: 150, clientY: 75 })
    fireEvent.pointerUp(card, { pointerId: 4, pointerType: 'mouse', isPrimary: true, clientX: 150, clientY: 75 })
    await expect(card).toHaveAttribute('data-state', 'open-right')
    await waitFor(() => expect(card).toHaveAttribute('data-state', 'closed'))
    await expect(args.onDelete).not.toHaveBeenCalled()
  }
}
