// src/stories/GridStack.stories.tsx
import React from 'react'
import type { GridItem } from './types/types'
import GridStack from './components/GridStack/GridStack'
import { type Meta, type StoryObj } from '@storybook/react'

// --- Componente Card mejorado
interface CardProps {
  title?: string
  color?: string
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, color = '#6366f1', children }) => (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${color}, ${adjustBrightness(color, -20)})`,
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    fontSize: 14,
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif, PFont-regular',
    cursor: 'grab',
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{title}</div>
      {children && <div style={{ fontSize: 12, opacity: 0.9 }}>{children}</div>}
    </div>
  </div>
)

// Utilidad para ajustar brillo de color
function adjustBrightness(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

// Mapping id -> componente con colores variados
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  a: (props: any) => <Card {...props} color="#6366f1" />,
  b: (props: any) => <Card {...props} color="#ec4899" />,
  c: (props: any) => <Card {...props} color="#14b8a6" />,
  d: (props: any) => <Card {...props} color="#f59e0b" />,
  f: (props: any) => <Card {...props} color="#10b981" />,
  g: (props: any) => <Card {...props} color="#3b82f6" />,
  h: (props: any) => <Card {...props} color="#8b5cf6" />,
}

// Items de ejemplo
const SAMPLE_ITEMS: GridItem[] = [
  { i: 'a', id: 'a', x: 0, y: 0, w: 4, h: 2, title: 'Widget A', component: { title: 'Widget A', children: 'Drag me!' } },
  { i: 'b', id: 'b', x: 4, y: 0, w: 4, h: 2, title: 'Widget B', component: { title: 'Widget B', children: 'Resize me!' } },
  { i: 'c', id: 'c', x: 8, y: 0, w: 4, h: 2, title: 'Widget C', component: { title: 'Widget C', children: 'Interact!' } },
  { i: 'd', id: 'd', x: 0, y: 2, w: 6, h: 3, title: 'Widget D', component: { title: 'Widget D', children: 'I am bigger!' } },
  { i: 'f', id: 'f', x: 6, y: 2, w: 6, h: 3, title: 'Widget F', component: { title: 'Widget F', children: 'I am bigger!' } },
  { i: 'g', id: 'g', x: 0, y: 5, w: 12, h: 2, title: 'Widget G', component: { title: 'Widget G', children: 'I am wide!' } },
  { i: 'h', id: 'h', x: 0, y: 7, w: 12, h: 2, title: 'Widget H', component: { title: 'Widget H', children: 'I am wide!' } },
]

const meta = {
  title: 'organisms/GridStack',
  component: GridStack,
  parameters: {
    docs: {
      description: {
        component: 'GridStack — grid interactivo con drag/resize, animaciones FLIP y overlay drag.',
      },
    },
  },
  argTypes: {
    dragMode: {
      control: { type: 'select' },
      options: ['overlay', 'move', 'ghost'],
      description: 'Modo de drag',
      table: { defaultValue: { summary: 'overlay' } },
    },
    collisionMode: {
      control: { type: 'select' },
      options: ['push', 'none'],
      description: 'Estrategia de colisión',
      table: { defaultValue: { summary: 'push' } },
    },
    items: {
      control: 'object',
      description: 'Items del grid',
    },
  },
} satisfies Meta<typeof GridStack>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => <GridStack {...args} componentMap={COMPONENT_MAP} />,
  args: {
    items: SAMPLE_ITEMS,

    /* layout base (más limpio y proporcional al sample) */
    cols: 12,
    rowHeight: 90,
    margin: [12, 12],
    containerPadding: [12, 12],
    onLayoutChange: (layout: GridItem[]) => console.log('Layout changed:', layout),

    /* snap / magnetismo */
    snapEnabled: false,
    snapThreshold: 0, // Pequeño para movimientos fluidos

    /* interacción */
    dragMode: 'overlay',
    collisionMode: 'push',
    overlayAnchor: 'grab',
    dragThrottleMs: 0,
    allowOverlapDuringDrag: false,
    animateOnDrop: true,
    preventCollision: true,
    isDraggable: true,
    isResizable: true,

    /* estilo visual */
    radio: 14,
    showGrid: true,

    /* animación - configuración optimizada para suavidad */
    animation: { duration: 380, easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)' }, // Spring easing suave

    /* soft displacement - controla la suavidad del empuje */
    softDisplacementStrength: 0.94, // 0.9-0.97 recomendado
    
    /* roll animation - rotación 3D sutil al empujar */
    enableRollOnPush: false, // Deshabilitado para movimiento más limpio
    rollAngleMax: 6,
    rollDuration: 320,
    rollStagger: 30,

    /* hit feedback - efecto "bump" al empujar */
    enableHitOnPush: true,
    hitMultiplier: 1.06, // 1.03-1.12 para bump perceptible
    hitDuration: 160, // Duración del efecto bump
    hitThresholdPx: 6, // Umbral mínimo de movimiento para activar
    
    /* sticky compaction */
    sticky: false,
    animation: { duration: 380, easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)' },
    softDisplacementStrength: 0.94,
    enableHitOnPush: true,
  },
}

export const SecondarySticky: Story = {
  render: (args) => <GridStack {...args} componentMap={COMPONENT_MAP} />,
  args: {
    items: SAMPLE_ITEMS,
    
    /* layout */
    cols: 12,
    rowHeight: 100,
    margin: [12, 12],
    containerPadding: [12, 12],
    radio: 16,
    showGrid: true,
    
    /* interacción */
    dragMode: 'overlay',
    collisionMode: 'push',
    overlayAnchor: 'grab',
    isDraggable: true,
    isResizable: true,
    preventCollision: true,
    snapEnabled: true,
    snapThreshold: 5,
    
    /* sticky mode - compactación automática */
    sticky: true,
    
    /* animación optimizada con bounce spring */
    animation: { duration: 420, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }, // Bounce spring
    
    /* soft displacement */
    softDisplacementStrength: 0.96, // Más suave para sticky mode
    
    /* roll animation - rotación 3D visible */
    enableRollOnPush: true,
    rollAngleMax: 8, // Rotación más pronunciada
    rollDuration: 380,
    rollStagger: 40,
    
    /* hit feedback - bump más notorio */
    enableHitOnPush: true,
    hitMultiplier: 1.10, // Bump más visible con sticky
    hitDuration: 180,
    hitThresholdPx: 8,
  },
}

/**
 * Story adicional para testing de configuraciones extremas
 * Valores máximos recomendados para animaciones ultra-suaves
 */
export const UltraSmooth: Story = {
  render: (args) => <GridStack {...args} componentMap={COMPONENT_MAP} />,
  args: {
    items: SAMPLE_ITEMS,
    
    cols: 12,
    rowHeight: 95,
    margin: [16, 16],
    containerPadding: [16, 16],
    radio: 18,
    showGrid: true,
    
    dragMode: 'overlay',
    collisionMode: 'push',
    overlayAnchor: 'grab',
    isDraggable: true,
    isResizable: true,
    preventCollision: true,
    snapEnabled: true,
    snapThreshold: 5,
    sticky: false,
    
    /* Duración máxima recomendada (320-480ms) */
    animation: { duration: 480, easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)' },
    
    /* Displacement máximo (0.9-0.97) - más suave */
    softDisplacementStrength: 0.97,
    
    /* Roll animation activado con valores altos */
    enableRollOnPush: true,
    rollAngleMax: 12,
    rollDuration: 440,
    rollStagger: 50,
    
    /* Hit feedback máximo (1.03-1.12) */
    enableHitOnPush: true,
    hitMultiplier: 1.12, // Máximo recomendado
    hitDuration: 200,
    hitThresholdPx: 6,
  },
}