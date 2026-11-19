
import type { Meta, StoryObj } from '@storybook/react'
import { StockLevel } from './index'

const meta = {
  title: 'Molecules/StockLevel',
  component: StockLevel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Componente para visualizar el nivel de inventario de un producto.

Permite identificar visualmente:
- Stock actual.
- Stock mínimo requerido.
- Stock máximo permitido.
- Productos agotados.
- Productos con inventario bajo.
- Productos con exceso de inventario.

La barra segmentada representa el porcentaje de stock
respecto al máximo configurado.

La línea vertical indica el umbral mínimo.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    stock: {
      control: {
        type: 'number',
        min: 0,
        step: 1
      },
      description: 'Cantidad actual de inventario'
    },
    minStock: {
      control: {
        type: 'number',
        min: 0,
        step: 1
      },
      description: 'Cantidad mínima recomendada'
    },
    maxStock: {
      control: {
        type: 'number',
        min: 0,
        step: 1
      },
      description: 'Capacidad máxima del inventario'
    },
    unit: {
      control: 'text',
      description: 'Unidad de medida del producto'
    },
    showStatus: {
      control: 'boolean',
      description: 'Mostrar el estado del inventario'
    },
    className: {
      control: 'text',
      description: 'Clase CSS personalizada'
    }
  },
  args: {
    stock: 245,
    minStock: 100,
    maxStock: 300,
    unit: 'unidades',
    showStatus: true
  },
  decorators: [
    (Story) => (
      <div style={{ width: 260, maxWidth: '100%' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof StockLevel>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Estado predeterminado.
 */
export const Default: Story = {}

/**
 * Inventario disponible.
 */
export const Available: Story = {
  args: {
    stock: 245,
    minStock: 100,
    maxStock: 300
  }
}

/**
 * Inventario cercano al mínimo.
 */
export const NearMinimum: Story = {
  args: {
    stock: 156,
    minStock: 150,
    maxStock: 200
  }
}

/**
 * Inventario por debajo del mínimo.
 */
export const LowStock: Story = {
  args: {
    stock: 89,
    minStock: 100,
    maxStock: 200
  }
}

/**
 * Producto agotado.
 */
export const OutOfStock: Story = {
  args: {
    stock: 0,
    minStock: 50,
    maxStock: 200
  }
}

/**
 * Inventario justo en el mínimo.
 */
export const AtMinimum: Story = {
  args: {
    stock: 100,
    minStock: 100,
    maxStock: 300
  }
}

/**
 * Inventario en su capacidad máxima.
 */
export const AtMaximum: Story = {
  args: {
    stock: 300,
    minStock: 100,
    maxStock: 300
  }
}

/**
 * Stock por encima del máximo.
 */
export const Exceeded: Story = {
  args: {
    stock: 350,
    minStock: 100,
    maxStock: 300
  }
}

/**
 * Sin etiqueta de estado.
 */
export const WithoutStatus: Story = {
  args: {
    stock: 178,
    minStock: 80,
    maxStock: 250,
    showStatus: false
  }
}

/**
 * Unidad personalizada.
 */
export const CustomUnit: Story = {
  args: {
    stock: 25,
    minStock: 10,
    maxStock: 50,
    unit: 'kg'
  }
}

/**
 * Grandes cantidades.
 */
export const LargeNumbers: Story = {
  args: {
    stock: 125000,
    minStock: 50000,
    maxStock: 200000
  }
}

/**
 * Stock mínimo configurado en cero.
 */
export const ZeroMinimum: Story = {
  args: {
    stock: 40,
    minStock: 0,
    maxStock: 100
  }
}

/**
 * Máximo sin configurar.
 * Caso límite para validar la representación.
 */
export const ZeroMaximum: Story = {
  args: {
    stock: 20,
    minStock: 0,
    maxStock: 0
  }
}

/**
 * Visualización compacta para tablas.
 */
export const Compact: Story = {
  args: {
    stock: 124,
    minStock: 100,
    maxStock: 200,
    showStatus: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: 150 }}>
        <Story />
      </div>
    )
  ]
}

/**
 * Galería de estados para comparación visual.
 */
export const AllStates: Story = {
  render: () => {
    const products = [
      {
        name: 'Inventario disponible',
        stock: 245,
        minStock: 100,
        maxStock: 300
      },
      {
        name: 'Cerca del mínimo',
        stock: 156,
        minStock: 150,
        maxStock: 200
      },
      {
        name: 'Inventario bajo',
        stock: 89,
        minStock: 100,
        maxStock: 200
      },
      {
        name: 'Agotado',
        stock: 0,
        minStock: 50,
        maxStock: 200
      },
      {
        name: 'En el mínimo',
        stock: 100,
        minStock: 100,
        maxStock: 300
      },
      {
        name: 'En el máximo',
        stock: 300,
        minStock: 100,
        maxStock: 300
      },
      {
        name: 'Exceso de inventario',
        stock: 350,
        minStock: 100,
        maxStock: 300
      }
    ]

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: 320,
          maxWidth: '100%'
        }}
      >
        {products.map((product) => (
          <div
            key={product.name}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                padding: '10px 12px 0',
                fontSize: 12,
                fontWeight: 600
              }}
            >
              {product.name}
            </div>

            <StockLevel
              stock={product.stock}
              minStock={product.minStock}
              maxStock={product.maxStock}
            />
          </div>
        ))}
      </div>
    )
  }
}

/**
 * Ejemplo en tabla de productos.
 */
export const InventoryTable: Story = {
  render: () => {
    const products = [
      {
        id: 1,
        name: 'Coca-Cola 400ml',
        stock: 245,
        minStock: 100,
        maxStock: 300
      },
      {
        id: 2,
        name: 'Arroz 500g',
        stock: 156,
        minStock: 150,
        maxStock: 200
      },
      {
        id: 3,
        name: 'Aceite 1L',
        stock: 0,
        minStock: 50,
        maxStock: 200
      },
      {
        id: 4,
        name: 'Leche entera',
        stock: 89,
        minStock: 100,
        maxStock: 200
      },
      {
        id: 5,
        name: 'Azúcar 1kg',
        stock: 350,
        minStock: 80,
        maxStock: 300
      }
    ]

    return (
      <div
        style={{
          width: 620,
          maxWidth: '100%',
          overflowX: 'auto'
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 13
          }}
        >
          <thead>
            <tr>
              <th style={headerStyle}>
                Producto
              </th>
              <th style={headerStyle}>
                Nivel de stock
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={cellStyle}>
                  {product.name}
                </td>

                <td style={{ ...cellStyle, width: 250 }}>
                  <StockLevel
                    stock={product.stock}
                    minStock={product.minStock}
                    maxStock={product.maxStock}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const headerStyle: React.CSSProperties = {
  padding: '12px 16px',
  textAlign: 'left',
  background: '#f8f9fa',
  borderBottom: '1px solid #e5e7eb',
  fontWeight: 600
}

const cellStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderBottom: '1px solid #e5e7eb'
}
