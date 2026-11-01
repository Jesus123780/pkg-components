import React, { KeyboardEvent } from 'react'
import { Icon, Row } from '../../../atoms'
import { getGlobalStyle } from '../../../../helpers'
import styles from './styles.module.css'

export interface EditableInputProps {
  handleCancelUpdateQuantity?: () => void
  handleSuccessUpdateQuantity?: () => void
  handleChangeQuantity?: (event: {
    target: { name: string; value: number }
  }) => void
  quantity?: string | number
}

/**
 * EditableInput component for editing product quantity.
 * - Accepts only positive integers
 * - Limits input to 4 digits
 * - Enter confirms change
 * - Escape cancels change
 *
 * @param {EditableInputProps} props
 * @returns {JSX.Element}
 */
export const EditableInput: React.FC<EditableInputProps> = ({
  handleChangeQuantity,
  handleCancelUpdateQuantity,
  handleSuccessUpdateQuantity,
  quantity = ''
}) => {
  /**
   * Handles input value change with validation.
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target

    if (!/^\d{0,4}$/.test(value)) return

    handleChangeQuantity?.({
      target: {
        name: 'quantity',
        value: value === '' ? 0 : Number(value)
      }
    })
  }

  /**
   * Handles keyboard interactions.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSuccessUpdateQuantity?.()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      handleCancelUpdateQuantity?.()
    }
  }

  return (
    <Row alignItems='center' style={{ height: '100%' }}>
      <button
        type='button'
        onClick={handleCancelUpdateQuantity}
        className={styles.button_actions}
      >
        <Icon
          icon='IconCancel'
          size={20}
          color={getGlobalStyle('--color-icons-primary')}
        />
      </button>

      <input
        className={`${styles.editableInput} ${styles.editableInput_anim}`}
        placeholder='000'
        type='text'
        name='quantity'
        inputMode='numeric'
        autoComplete='off'
        value={quantity.toString()}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <button
        type='button'
        onClick={handleSuccessUpdateQuantity}
        className={styles.button_actions}
      >
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
