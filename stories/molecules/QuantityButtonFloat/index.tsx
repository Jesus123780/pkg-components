/* eslint-disable multiline-ternary */
import { MouseEvent, FC } from 'react'
import { Icon, Text } from '../../atoms'
import { EditableInput, type EditableInputProps } from './helpers/EditableInput'
import styles from './styles.module.css'

interface QuantityButtonFloatProps extends EditableInputProps {
  quantity?: number
  editable?: boolean
  editing?: boolean
  open?: boolean
  increment?: boolean
  decrement?: boolean
  handleIncrement?: (event?: MouseEvent<HTMLButtonElement>) => void
  handleDecrement?: (event?: MouseEvent<HTMLButtonElement>) => void
  handleToggleEditingStatus?: () => void
}

export const QuantityButtonFloat: FC<QuantityButtonFloatProps> = ({
  quantity = 0,
  open = false,
  editing = false,
  editable = false,
  decrement = true,
  increment = true,
  handleChangeQuantity = () => null,
  handleIncrement = () => null,
  handleDecrement = () => null,
  handleToggleEditingStatus = () => null,
  handleCancelUpdateQuantity = () => null,
  handleSuccessUpdateQuantity = () => null
} = {}) => {
  return (
    <div style={{
      position: 'relative',
      width: open ? '100px' : '38px',
    }}
    className={`${styles['quick-add']} ${!open && styles['quick-add_initial']} ${editing && styles['quick-add_editing']}`}
    >
      <>
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
            {decrement &&
              <button onClick={(event) => {
                return handleDecrement(event)
              }} style={{
                paddingRight: 0
              }}>
                <Icon
                  size={24}
                  width={24}
                  height={24}
                  icon='IconMinus'
                />
              </button>
            }
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
            {increment &&
              <button onClick={(event) => {
                return handleIncrement(event)
              }}>
                <Icon icon='IconPlus' />
              </button>
            }
          </>
        )}
      </>
    </div>
  )
}
