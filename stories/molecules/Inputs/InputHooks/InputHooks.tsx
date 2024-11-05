import React, { useEffect, useRef, useState } from 'react'
import {
  isCC,
  isEmail,
  isPassword,
  onlyLetters,
  valNit,
  validatePhoneNumber
} from '../../../../utils'
import { getGlobalStyle } from '../../../../helpers'
import { Icon, Row } from '../../../atoms'
import styles from './styles.module.css'

interface InputHooksProps {
  autoComplete?: string
  border?: string
  cc?: boolean
  checked?: boolean
  autoFocus?: any
  dataForm?: object
  disabled?: boolean
  display?: string
  email?: any
  error?: string | boolean
  height?: any
  labelColor?: any
  labelTop?: any
  letters?: any
  margin?: string
  maxWidth?: string
  minWidth?: string
  name?: string
  nit?: boolean
  numeric?: boolean
  onChange?: (e: any, v: any) => void
  padding?: string
  paddingInput?: string
  pass?: any
  passConfirm?: {
    passValue: number | string
    validate: number | string
  }
  placeholder?: string
  radius?: string
  range?: {
    max: number | string
    min: number | string
  }
  reference?: React.RefObject<HTMLInputElement>
  required?: boolean
  title?: string
  messageError?: string
  type?: string
  typeTextarea?: boolean
  value?: string
  width?: string
  info?: string
  marginBottom?: string
  max?: number
  setDataValue?: (e: any) => void
  onFocus?: () => void
  onInvalid?: () => void
  onBlur?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const InputHooks: React.FC<InputHooksProps> = ({
  autoComplete = 'off',
  border = '',
  checked = false,
  autoFocus,
  dataForm = {},
  disabled = false,
  display = '',
  email = false,
  error = false,
  labelTop = '',
  height,
  labelColor,
  letters = false,
  margin = '0',
  maxWidth = '',
  minWidth = '',
  name = '',
  nit = false,
  numeric = false,
  padding = '',
  paddingInput = '',
  pass,
  passConfirm,
  placeholder = '',
  radius = '',
  range = null,
  reference,
  required,
  title = '',
  cc = false,
  messageError = 'El campo no debe estar vacío',
  type = 'text',
  typeTextarea = false,
  value = '',
  marginBottom = getGlobalStyle('--spacing-5xl'),
  width = '100%',
  info = '',
  max = Infinity,
  onChange = (e) => e,
  onFocus = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault()
  },
  onInvalid = () => { },
  setDataValue = () => { },
  onBlur = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault()
  },
  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  },
  ...rest
}) => {
  const [errors, setError] = useState<string | boolean>(error)
  const [message, setMessage] = useState<string>(messageError)
  const [focused, setFocused] = useState(false)
  const refInput = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const validationRules: Record<string, { validate: (value: string) => boolean, message: string }> = {
    required: {
      validate: (value) => Boolean(required) && value.length === 0,
      message: 'El campo no debe estar vacío'
    },
    numeric: {
      validate: (value) => numeric && isNaN(value),
      message: 'El campo debe ser numérico'
    },
    range: {
      validate: (value) => range && (Number(value?.length) < Number(range?.min) || Number(value?.length) > Number(range?.max)),
      message: `El rango de caracteres es de ${range?.min} a ${range?.max}`
    },
    letters: {
      validate: (value) => Boolean(letters) && onlyLetters(value),
      message: 'El campo debe contener solo letras'
    },
    email: {
      validate: (value) => email === true && isEmail(value),
      message: 'El formato de email no es válido'
    },
    pass: {
      validate: (value) => Boolean(pass) && !isPassword(value),
      message:
        'La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.'
    },
    nit: {
      validate: (value) => nit && !valNit(value),
      message: 'El nit no es correcto'
    },
    cc: {
      validate: (value) => cc && !isCC(value),
      message: 'El número de documento no es correcto'
    },
    tel: {
      validate: (value) => type === 'tel' && !validatePhoneNumber(value),
      message: 'El número de teléfono no es correcto'
    },
    passConfirm: {
      validate: (value) =>
        Boolean(passConfirm?.validate) && value !== passConfirm?.passValue,
      message: 'Las contraseñas no coinciden.'
    }
  }

  const validateInput = (value: string): { valid: boolean, message: string } => {
    for (const key in validationRules) {
      if (validationRules[key].validate(value)) {
        return { valid: false, message: validationRules[key].message }
      }
    }
    return { valid: true, message: '' }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    const { valid, message } = validateInput(value)
    setError(!valid)
    setMessage(message)
    onChange(e, !valid)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement> | React.FocusEvent<HTMLInputElement>): void => {
    const { value } = e.target
    const { valid, message } = validateInput(value)
    setError(!valid)
    setMessage(message)
    setFocused(false)
    onBlur(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (['Enter', 'Tab', 'Escape', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(e.key)) {
      const { value } = e.target as HTMLInputElement
      const { valid, message } = validateInput(value)
      setError(!valid)
      setMessage(message)
    }
    onKeyDown(e)
  }
  const handleFocus = (e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFocused(true) // El input está en foco
    onFocus(e)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value = e.clipboardData.getData('text')
    const { valid, message } = validateInput(value)
    setError(!valid)
    setMessage(message)
    onChange(e, !valid)
  }

  useEffect(() => {
    setError(error)
  }, [error])

  const Component = typeTextarea ? 'textarea' : 'input'

  return (
    <div
      style={{
        outline: errors === true
          ? `2px solid ${getGlobalStyle('--color-feedback-error-dark')}`
          : focused
            ? `2px solid ${getGlobalStyle('--color-secondary-blue')}` // Borde azul cuando está en foco
            : border,
        maxWidth,
        padding: paddingInput,
        width,
        marginBottom,
        maxHeight: typeTextarea ? '12.5rem' : 'auto',
        minHeight: typeTextarea ? '12.5rem' : 'auto'
      }}
      className={styles.wrap_input}
    >
      <Component
        {...rest}
        autoFocus={autoFocus}
        data-required={required}
        disabled={disabled}
        name={name}
        max={max}
        onFocus={handleFocus}
        onChange={handleChange}
        onPaste={handlePaste}
        onBlur={handleBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onKeyDown={handleKeyDown as any}
        className={styles.input}
        type={type}
        style={{
          maxHeight: typeTextarea ? '11.5rem' : 'auto',
          minHeight: typeTextarea ? '11.5rem' : 'auto'
        }}
      />
      <label
        className={styles['label-input']}
        onClick={() => refInput.current?.focus()}
        style={{
          top: value !== '' ? '-8px' : '20px'
        }}
      >
        {title?.includes('*')
          ? (
            <>
              {title.replace('*', '')}
              <span style={{ color: getGlobalStyle('--color-feedback-error-dark') }}>
                *
              </span>
            </>
            )
          : (
              title
            )}
      </label>
      {errors === true && (
        <Row className={styles.wrap_tooltip} alignItems='center'>
          <Icon icon='IconInfo' size={10} color={getGlobalStyle('--color-icons-error')} />
          <span className={styles.tooltip}>{message}</span>
        </Row>
      )}
      {info !== '' && (
        <Row
          className={styles.wrap_tooltip}
          alignItems='center'
          style={errors === true ? { bottom: '-30px' } : {}}
        >
          <Icon icon='IconInfo' size={10} color={getGlobalStyle('--color-icons-info')} />
          <span
            className={styles.tooltip}
            style={{
              color: getGlobalStyle('--color-text-black')
            }}
          >
            {info}
          </span>
        </Row>
      )}
    </div>
  )
}
