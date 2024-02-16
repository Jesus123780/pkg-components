import React from 'react'
import { Icon, Text } from '../../atoms'
import styles from './styles.module.css'

export const QuantityButtonFloat = ({
  quantity = 0,
  handleIncrement = () => {
    return
  },
  handleDecrement = () => {
    return
  },
  open = false,
}) => {
  return (
    <div className={`${styles['quick-add']} ${!open && styles['quick-add_initial'] }`}>
      <button onClick={handleDecrement}>
        <Icon size={24} width={24} height={24}  icon='IconMinus' />
      </button>
      <Text className={styles.quantity} >
        {quantity}
      </Text>
      <button onClick={handleIncrement}>
        <Icon icon='IconPlus' />
      </button>
    </div>
  )
}
