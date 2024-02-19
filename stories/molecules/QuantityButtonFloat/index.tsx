import React from 'react'
import { Icon, Text } from '../../atoms'
import styles from './styles.module.css'

interface QuantityButtonFloatProps {
  quantity?: number
  handleIncrement?: () => void
  handleDecrement?: () => void
  open?: boolean
}

export const QuantityButtonFloat: React.FC<QuantityButtonFloatProps> = ({
  quantity = 0,
  handleIncrement = () => {
    return null
  },
  handleDecrement = () => {
    return null
  },
  open = false
}) => {
  return (
    <div
      className={`${styles['quick-add']} ${
        !open && styles['quick-add_initial']
      }`}
    >
      <button onClick={() => {
        handleDecrement()
      }}>
        <Icon
          size={24}
          width={24}
          height={24}
          icon="IconMinus"
        />
      </button>
      <Text align='center' className={styles.quantity}>
        {quantity}
      </Text>
      <button onClick={() => {
        handleIncrement()
      }}>
        <Icon icon="IconPlus" />
      </button>
    </div>
  )
}
