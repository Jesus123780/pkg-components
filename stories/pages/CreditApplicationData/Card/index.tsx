import React from 'react'
import {
  Column,
  Icon,
  Paragraph
} from '../../../atoms'
import { PaymentInfo } from './PaymentInfo'
import { paymentInfo } from './PaymentInfo/helpers'
import styles from './Card.module.css'

export const Card = () => {
  return (
    <Column className={styles['card']}>
      <Icon icon='IconLogoCMFBlue' size={138} />
      <PaymentInfo paymentInfo={paymentInfo} />
      <Paragraph color='back' styles={{ marginTop: '10px' }}>
        12 Unidades disponibles en Cochez
      </Paragraph>
    </Column>
  )
}
