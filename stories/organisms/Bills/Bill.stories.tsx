import React from 'react'
import { Bill } from './index'

export default {
  title: 'organisms/Bill',
  component: Bill,
  argTypes: {
    client: {
      description: 'Datos del cliente',
      defaultValue: {
        clientName: 'Juan Pérez',
        address: 'Calle 123',
        tlf: '123-456-789'
      },
      control: 'object'
    },
    products: {
      description: 'Lista de productos',
      defaultValue: [
        {
          pName: 'Pízza H',
          ProQuantity: 1,
          unitPrice: 50000,
          dataOptional: [
            {
              OptionalProName: 'Elije tu salsa',
              ExtProductFoodsSubOptionalAll: [
                { OptionalSubProName: 'Napolitana' },
                { OptionalSubProName: 'Queso cheda' },
                { OptionalSubProName: 'Salsa de ajo' }
              ]
            }
          ],
          dataExtra: [
            { extraName: 'Porcion de queso extra', extraPrice: 5000, newExtraPrice: 20000 },
            { extraName: 'Porcion de papas', extraPrice: 3000, newExtraPrice: 12000 }
          ]
        }
      ],
      control: 'array'
    },
    restaurante: {
      description: 'Datos del restaurante',
      defaultValue: {
        name: 'Restaurante XYZ',
        address: 'Avenida 123',
        tlf: '987-654-321'
      },
      control: 'object'
    },
    orderStatus: {
      description: 'Estado del pedido',
      defaultValue: 'En Progreso',
      control: 'text'
    },
    totalAmount: {
      description: 'Monto total del pedido',
      defaultValue: 30,
      control: 'number'
    },
    paymentMethod: {
      description: 'Método de pago',
      defaultValue: 'Efectivo',
      control: {
        type: 'select',
        options: ['Efectivo', 'Tarjeta']
      }
    }
  }
}

const Template = (args) => {return <Bill {...args} />}

export const Default = Template.bind({})
Default.args = {
  client: {
    clientName: 'Juan Pérez',
    address: 'Calle 123',
    tlf: '123-456-789'
  },
  products: [
    {
      pName: 'Pízza H',
      ProQuantity: 1,
      unitPrice: 50000,
      dataOptional: [
        {
          OptionalProName: 'Elije tu salsa',
          ExtProductFoodsSubOptionalAll: [
            { OptionalSubProName: 'Napolitana' },
            { OptionalSubProName: 'Queso cheda' },
            { OptionalSubProName: 'Salsa de ajo' }
          ]
        }
      ],
      dataExtra: [
        { extraName: 'Porcion de queso extra', extraPrice: 5000, newExtraPrice: 20000 },
        { extraName: 'Porcion de papas', extraPrice: 3000, newExtraPrice: 12000 }
      ]
    }
  ],
  restaurante: {
    name: 'Restaurante XYZ',
    address: 'Avenida 123',
    tlf: '987-654-321'
  },
  orderStatus: 'En Progreso',
  totalAmount: 30,
  paymentMethod: 'Efectivo'
}
