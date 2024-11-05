/* eslint-disable multiline-ternary */
import React from 'react'
import { Icon, Text } from '../../atoms'
import { EditableInput, type EditableInputProps } from './helpers/EditableInput'
import styles from './styles.module.css'

interface QuantityButtonFloatProps extends EditableInputProps {
  quantity?: number
  editable?: boolean
  editing?: boolean
  open?: boolean
  handleIncrement?: () => void
  handleDecrement?: () => void
  handleToggleEditingStatus?: () => void
}

export const QuantityButtonFloat: React.FC<QuantityButtonFloatProps> = ({
  quantity = 0,
  open = false,
  editing = false,
  editable = false,
  handleChangeQuantity = () => null,
  handleIncrement = () => null,
  handleDecrement = () => null,
  handleToggleEditingStatus = () => null,
  handleCancelUpdateQuantity = () => null,
  handleSuccessUpdateQuantity = () => null
} = {}) => {
  return (
    <div style={{ position: 'relative', width: '100px' }}>
      <div
        className={`${styles['quick-add']} ${!open && styles['quick-add_initial']}
                    ${editing && styles['quick-add_editing']}`}
      >
        {(editable && editing) ? (
          <EditableInput
            quantity={quantity}
            handleChangeQuantity={handleChangeQuantity}
            handleSuccessUpdateQuantity={() => {
              return handleSuccessUpdateQuantity()
            }}
            handleCancelUpdateQuantity={() => {
              return handleCancelUpdateQuantity()
            }}
          />
        ) : (
          <>
            <button onClick={handleDecrement} style={{
              paddingRight: 0
            }}>
              <Icon
                size={24}
                width={24}
                height={24}
                icon='IconMinus'
              />
            </button>
            <button onClick={() => {
              return handleToggleEditingStatus()
            }} >
              <Text
                align='center'
                className={styles.quantity}
              >
                {quantity}
              </Text>
            </button>
            <button onClick={handleIncrement}>
              <Icon icon='IconPlus' />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
