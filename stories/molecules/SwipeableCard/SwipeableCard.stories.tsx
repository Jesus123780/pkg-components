import type { Meta, StoryObj } from '@storybook/react'
import { SwipeableCard } from './index'
import {
  fireEvent,
  within,
  waitFor
} from '@storybook/testing-library'

const meta: Meta<typeof SwipeableCard> = {
  component: SwipeableCard,
  title: 'molecules/SwipeableCard',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const swipeableCard = canvas.getByText('Swipe me!').parentElement as HTMLElement

    // 1️⃣ Deslizar a la izquierda para mostrar acciones
    fireEvent.pointerDown(swipeableCard, { clientX: 200 })
    fireEvent.pointerMove(swipeableCard, { clientX: 80 })
    fireEvent.pointerUp(swipeableCard)

    await waitFor(() => new Promise((r) => setTimeout(r, 400)))

    // 2️⃣ Deslizar más a la izquierda para simular eliminación
    fireEvent.pointerDown(swipeableCard, { clientX: 200 })
    fireEvent.pointerMove(swipeableCard, { clientX: 0 }) // largo → deleteReady true
    fireEvent.pointerUp(swipeableCard)

    await waitFor(() => new Promise((r) => setTimeout(r, 600)))

    // 3️⃣ Reinsertar el swipe para probar el cierre automático (autoClose)
    fireEvent.pointerDown(swipeableCard, { clientX: 200 })
    fireEvent.pointerMove(swipeableCard, { clientX: 100 })
    fireEvent.pointerUp(swipeableCard)

    // esperar el autoClose

    // 4️⃣ Finalmente, deslizar hacia la derecha (volver a posición normal)
    fireEvent.pointerDown(swipeableCard, { clientX: 80 })
    fireEvent.pointerMove(swipeableCard, { clientX: 200 })
    fireEvent.pointerUp(swipeableCard)

  }
}

export default meta
type Story = StoryObj<typeof SwipeableCard>

const rightActions = (<button aria-label="delete">Delete</button>)
const children = (<div style={{ padding: '150px', backgroundColor: '#f0f0f0' }}>Swipe me!</div>)

export const Primary: Story = {
  args: {
    rightActions,
    children
  }
}

export const WithoutActions: Story = {
  args: {
    children
  }
}

export const Sticky: Story = {
  args: {
    sticky: true,
    rightActions,
    children
  }
}

export const AutoClose: Story = {
  args: {
    autoClose: true,
    rightActions,
    children
  }
}

export const Shake: Story = {
  args: {
    shake: true,
    rightActions,
    children
  }
}
