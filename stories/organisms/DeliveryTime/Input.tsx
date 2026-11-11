'use client'

import React, {
  type ChangeEvent,
  type FC,
  type KeyboardEventHandler
} from 'react'

import styles from './styles.module.css'

interface TimeInputProps {
  value?: number | string | null
  onChange?: (value: number | null) => void
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

export const TimeInput: FC<TimeInputProps> = ({
  value,
  onChange,
  onKeyDown
}) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = event.target.value

    if (inputValue === '') {
      onChange?.(null)
      return
    }

    const numericValue = Number(inputValue)

    if (
      Number.isInteger(numericValue) &&
      numericValue >= 1 &&
      numericValue <= 60
    ) {
      onChange?.(numericValue)
    }
  }

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputField}
        id="input_date"
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder=" "
        type="number"
        min={1}
        max={60}
        step={1}
        value={value ?? ''}
      />

      <label
        className={styles.label}
        htmlFor="input_date"
      >
        Minutos (1-60)
      </label>
    </div>
  )
}

TimeInput.displayName = 'TimeInput'
