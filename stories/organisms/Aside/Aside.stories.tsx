import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Aside } from './index'

const meta: Meta<typeof Aside> = {
  component: Aside,
  title: 'organisms/Aside',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true
    },
    docs: {
      description: {
        component:
          'Aside principal del dashboard. Incluye navegación por módulos, acciones rápidas, soporte para dispositivos móviles, modo electron, drag and drop y estados de colapso.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isElectron: {
      control: 'boolean',
      description: 'Activa los botones de navegación de Electron'
    },
    isMobile: {
      control: 'boolean',
      description: 'Simula comportamiento en dispositivos móviles'
    },
    collapsed: {
      control: 'boolean',
      description: 'Estado colapsado en mobile'
    },
    isCollapsedMenu: {
      control: 'boolean',
      description: 'Estado visual del menú colapsado'
    },
    connected: {
      control: 'boolean',
      description: 'Estado de conexión para el Pulse'
    },
    salesOpen: {
      control: 'boolean',
      description: 'Estado del panel de ventas'
    },
    version: {
      control: 'text',
      description: 'Versión visible en el footer'
    },
    logicalVersion: {
      control: 'text',
      description: 'Versión lógica visible en el footer'
    },
    pathname: {
      control: 'text',
      description: 'Ruta activa del dashboard'
    }
  }
}

export default meta
type Story = StoryObj<typeof Aside>

const sampleModules = [
  {
    mId: '1',
    mName: 'Dashboard',
    mPath: 'dashboard',
    mIcon: 'IconDashboard',
    subModules: []
  },
  {
    mId: '2',
    mName: 'Pedidos',
    mPath: 'orders',
    mIcon: 'IconOrders',
    subModules: [
      {
        smId: '2-1',
        smName: 'Pendientes',
        smPath: 'orders/pending',
        smIcon: 'IconClock'
      },
      {
        smId: '2-2',
        smName: 'Completados',
        smPath: 'orders/completed',
        smIcon: 'IconCheck'
      }
    ]
  },
  {
    mId: '3',
    mName: 'Configuración',
    mPath: '?time=true',
    mIcon: 'IconSettings',
    subModules: []
  },
  {
    mId: '4',
    mName: 'Metas',
    mPath: '?goals=true',
    mIcon: 'IconTarget',
    subModules: []
  }
]

const sampleDataStore = {
  storeName: 'Mi Tienda',
  idStore: 'store-123',
  uState: 0
}

const baseArgs = {
  isElectron: false,
  isMobile: false,
  pathname: '/dashboard/mi-tienda/store-123',
  version: '1.0.0',
  logicalVersion: '1.0.0',
  connected: true,
  collapsed: false,
  isCollapsedMenu: false,
  dataStore: sampleDataStore,
  modules: sampleModules,
  salesOpen: false,
  handleClick: () => { },
  handleOpenDeliveryTime: () => { },
  setSalesOpen: () => { },
  handleCollapsedMenu: () => { },
  setShowComponentModal: () => { },
  onDragEnd: () => { },
  setCollapsed: () => { },
  setIsDragDisabled: () => { }
}

const InteractiveTemplate = (args: Story['args']) => {
  const [collapsed, setCollapsed] = useState(args?.collapsed ?? false)
  const [salesOpen, setSalesOpen] = useState(args?.salesOpen ?? false)
  const [isCollapsedMenu, setIsCollapsedMenu] = useState(args?.isCollapsedMenu ?? false)

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fb' }}>
      <Aside
        {...args}
        version='1.0.0'
        logicalVersion='1.0.0'
        pathname={args?.pathname ?? '/dashboard/mi-tienda/store-123'}
        connected={args?.connected ?? true}
        collapsed={collapsed}
        salesOpen={salesOpen}
        isCollapsedMenu={isCollapsedMenu}
        setCollapsed={setCollapsed}
        setSalesOpen={setSalesOpen}
        handleCollapsedMenu={() => setIsCollapsedMenu((prev) => !prev)}
        handleClick={(value: any) => {
          console.log('handleClick', value)
          return value
        }}
        handleOpenDeliveryTime={() => {
          console.log('handleOpenDeliveryTime')
        }}
        setShowComponentModal={(value: any) => {
          console.log('setShowComponentModal', value)
          return value
        }}
        onDragEnd={(result: any) => {
          console.log('onDragEnd', result)
          return result
        }}
      />
    </div>
  )
}

export const Primary: Story = {
  args: {
    ...baseArgs
  },
  render: (args) => <InteractiveTemplate {...args} />
}

export const Mobile: Story = {
  args: {
    ...baseArgs,
    isMobile: true,
    collapsed: true,
    isCollapsedMenu: true,
    pathname: '/dashboard/mi-tienda/store-123'
  },
  render: (args) => <InteractiveTemplate {...args} />
}

export const CollapsedMenu: Story = {
  args: {
    ...baseArgs,
    isCollapsedMenu: true,
    pathname: '/dashboard/mi-tienda/store-123'
  },
  render: (args) => <InteractiveTemplate {...args} />
}

export const WithNoModules: Story = {
  args: {
    ...baseArgs,
    modules: [],
    pathname: '/dashboard/mi-tienda/store-123'
  },
  render: (args) => <InteractiveTemplate {...args} />
}

export const StoreInPause: Story = {
  args: {
    ...baseArgs,
    dataStore: {
      storeName: 'Mi Tienda',
      idStore: 'store-123',
      uState: '1'
    }
  },
  render: (args) => <InteractiveTemplate {...args} />
}

export const SalesPanelOpen: Story = {
  args: {
    ...baseArgs,
    salesOpen: true
  },
  render: (args) => <InteractiveTemplate {...args} />
}

export const DifferentRoute: Story = {
  args: {
    ...baseArgs,
    pathname: '/dashboard/mi-tienda/store-123/orders'
  },
  render: (args) => <InteractiveTemplate {...args} />
}