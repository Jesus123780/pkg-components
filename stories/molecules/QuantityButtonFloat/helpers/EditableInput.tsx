import React from 'react'
import styles from './styles.module.css'
import { Icon, Row } from '../../../atoms'
import { getGlobalStyle } from '../../../../helpers'

export interface EditableInputProps {
  handleCancelUpdateQuantity?: () => void
  handleSuccessUpdateQuantity?: () => void
  handleToggleEditingStatus?: () => void
  handleChangeQuantity?: (event: { target: { name: string, value: string | number } }) => void
  quantity?: string | number
}

/**
 * EditableInput component that displays an input field for quantity.
 * Limits `quantity` to a maximum of 4 digits.
 *
 * @param {EditableInputProps} props - EditableInput properties.
 * @returns {JSX.Element} EditableInput component.
 */
export const EditableInput: React.FC<EditableInputProps> = ({
  handleChangeQuantity,
  handleCancelUpdateQuantity,
  handleSuccessUpdateQuantity,
  quantity = ''
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value

    // Verifica si el valor contiene solo números enteros positivos y no excede 4 dígitos
    if (!/^\d{0,4}$/.test(inputValue)) return

    // Pasa el valor validado a handleChangeQuantity
    handleChangeQuantity?.({ target: { name: 'quantity', value: Number(inputValue) } })
  }

  return (
    <Row alignItems='center' style={{ height: '100%' }}>
      <button onClick={handleCancelUpdateQuantity} className={styles.button_actions}>
        <Icon icon='IconCancel' size={20} color={getGlobalStyle('--color-icons-primary')} />
      </button>
      <input
        className={`${styles.editableInput} ${styles.editableInput_anim}`}
        placeholder='000'
        type='number'
        name='quantity'
        step='1'
        min='0'
        autoComplete='off'
        id='quantity'
        value={quantity?.toString()}
        onChange={handleInputChange} // Updated to use handleInputChange
      />
      <button onClick={handleSuccessUpdateQuantity} className={styles.button_actions}>
        <Icon
          icon='IconMiniCheck'
          size={15}
          width={15}
          color={getGlobalStyle('--color-feedback-success-light')} 
        />
      </button>
    </Row>
  )
}
