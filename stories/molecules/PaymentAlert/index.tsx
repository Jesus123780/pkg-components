import React from 'react'
import {
  Divider,
  Icon,
  Row,
  Text
} from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import styles from './PaymentAlert.module.css'

interface PaymentAlertProps {
  text?: string
}

const PaymentAlertToMemo: React.FC<PaymentAlertProps> = ({ text = '' }) => {
  return (
    <div className={styles['payment-state-msg-wrapper']}>
      <Row style={{ padding: getGlobalStyle('--spacing-xl') }} alignItems='center'>
        <Icon icon='IconInfo' size={40} color={getGlobalStyle('--color-icons-white')} />
        <Row>
            <Divider margin={20} style={{
              width: '0%'
            }} />
            <Text color='white' weight='bold'>
                {text}
            </Text>
        </Row>
      </Row>
    </div>
  )
}

export const PaymentAlert = React.memo(PaymentAlertToMemo)
