import React from 'react'
import styles from './styles.module.css'

export interface AmountInputProps {
  accessibilityLabel?: string
  allowDecimals?: boolean
  decimalSeparator?: string
  decimalsLimit?: number
  defaultValue?: string
  disabled?: boolean
  error?: boolean
  groupSeparator?: string
  icon?: string
  label?: string
  name?: string
  placeholder?: string
  prefix?: string
  textHelper?: string
  value?: string
  onChange: (amount: string) => void
  onFocus?: () => void
  useAmountInput?: () => { inputValue: string, preProcess: (value: string) => void }
}

export const AmountInput: React.FC<AmountInputProps> = ({
  useAmountInput = (props: AmountInputProps) => {
    return {
      inputValue: '',
      preProcess: (value = '') => {
        return value
      }
    }
  },
  ...props
}) => {
  const { inputValue, preProcess } = useAmountInput(props as AmountInputProps)
  const {
    label,
    placeholder,
    disabled,
    name
  } = props

  return (
    <div style={{
      position: 'relative'
    }}>
      {label !== '' && <label className={styles.label} >
        {label}
      </label>}
      <input
        className={styles.input}
        disabled={disabled}
        name={name}
        onChange={(e) => {
          preProcess(e.target.value)
        }}
        placeholder={placeholder}
        type='numeric'
        value={inputValue}
        onFocus={props.onFocus}
      />
    </div>
  )
}
