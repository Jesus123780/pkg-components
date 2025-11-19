import React from 'react'
import {
  Column,
  Icon,
  Text
} from '../../atoms'
import styles from './styles.module.css'

export interface Methods {
  id: string
  name: string
  icon: string
}

interface PaymentMethodsProps {
  methods: Methods[]
  payId?: string
  dispatch: React.Dispatch<any>
}
export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  methods,
  payId = '',
  dispatch
}) => {
  return (
    <div className={styles.paymentMethodsContainer}>
      <div className={styles.methods}>
        {methods.map((method) => {
          return (
            <Column key={method.id}>
          <Column
            className={`${styles.method} ${
              payId === method.id ? styles.selected : ''
            }`}

            onClick={() => {
              dispatch({
                type: 'PAYMENT_METHOD',
                payload: method.id
              })
            }}
          >
            <Icon
              icon={method.icon}
              size={40}
            />
          </Column>
            <Text align='center'>
              {method.name}
            </Text>
            </Column>
          )
        })}
      </div>
    </div>
  )
}
