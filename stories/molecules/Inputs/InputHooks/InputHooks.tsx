'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  isCC,
  isEmail,
  isPassword,
  onlyLetters,
  valNit,
  validatePhoneNumber
} from '../../../../utils'
import { getGlobalStyle } from '../../../../helpers'
import { Column, Icon, Row, Text } from '../../../atoms'
import styles from './styles.module.css'

interface InputHooksProps {
  autoComplete?: string
  border?: string
  cc?: boolean
  autoFocus?: any
  disabled?: boolean
  email?: any
  error?: string | boolean
  letters?: any
  maxWidth?: string
  name?: string
  nit?: boolean
  numeric?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, v: string | number) => void
  paddingInput?: string
  pass?: any
  passConfirm?: {
    passValue: number | string
    validate: number | string
  }
  placeholder?: string
  range?: {
    max: number | string
    min: number | string
  }
  reference?: React.RefObject<HTMLInputElement>
  required?: boolean
  title?: string
  messageError?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea'
  typeTextarea?: boolean
  value?: string
  width?: string
  info?: string
  max?: number
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const InputHooks: React.FC<InputHooksProps> = ({
  autoComplete = 'off',
  border = '',
  autoFocus,
  disabled = false,
  email = false,
  error = false,
  letters = false,
  maxWidth = '',
  name = '',
  nit = false,
  numeric = false,
  paddingInput = '',
  pass,
  passConfirm,
  placeholder = '',
  range = null,
  reference,
  required,
  title = '',
  cc = false,
  messageError = 'El campo no debe estar vacío',
  type = 'text',
  typeTextarea = false,
  value = '',
  width = '100%',
  info = '',
  max = Infinity,
  onChange = (e) => e,
  onFocus = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault()
  },
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

  const validationRules = useMemo<Record<string, { validate: (value: string) => boolean, message: string }>>(() => ({
    required: {
      validate: (value) => Boolean(required) && value.length === 0,
      message: 'El campo no debe estar vacío'
    },
    numeric: {
      validate: (value) => numeric && isNaN(Number(value)),
      message: 'El campo debe ser numérico'
    },
    range: {
      validate: (value) =>
        range !== null &&
        range !== undefined &&
        (Number(value?.length) < Number(range?.min) || Number(value?.length) > Number(range?.max)),
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
  }), [required, numeric, range, letters, email, pass, nit, cc, type, passConfirm])

  const validateInput = (value: string): { valid: boolean, message: string } => {
    for (const key in validationRules) {
      if (validationRules[key].validate(value)) {
        return { valid: false, message: validationRules[key].message }
      }
    }
    return { valid: true, message: '' }
  }
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target
      const { valid, message } = validateInput(value)
      setError(!valid)
      setMessage(message)
      onChange(e, !valid)
    },
    [onChange]
  )

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
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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
      ref={reference}
      style={{
        boxShadow: errors === true
          ? `${getGlobalStyle('--box-shadow-red-rose')}`
          : focused
            ? `${getGlobalStyle('--box-shadow-xs')}`
            : border,
        maxWidth,
        padding: paddingInput,
        width,
        border: errors === true ? '1px solid transparent' : `1px solid ${getGlobalStyle('--color-neutral-gray-silver')}`,
        maxHeight: typeTextarea ? '10rem' : 'auto',
        minHeight: typeTextarea ? '10rem' : 'auto'
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
        aria-invalid={errors === true}
        onKeyDown={handleKeyDown as any}
        className={styles.input}
        type={type}
        style={{
          maxHeight: typeTextarea ? '10rem' : 'auto',
          minHeight: typeTextarea ? '10rem' : 'auto'
        }}
      />
      <button
        type="button"
        className={styles['label-input']}
        tabIndex={0}
        onClick={() => refInput.current?.focus()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            refInput.current?.focus()
          }
        }}
        style={{
          top: typeof value === 'string' && value.trim() !== '' ? '-8px' : '20px',
          border: 'none',
          padding: 0,
          margin: 0,
          width: 'auto',
          textAlign: 'left',
          cursor: 'pointer'
        }}
      >
        {title?.includes('*')
          ? (
            <>
              {title.replace('*', '')}
              <span style={{
                fontSize: getGlobalStyle('--font-size-xs'),
                marginLeft: getGlobalStyle('--spacing-xs'),
                color: getGlobalStyle('--color-neutral-gray-silver')
              }}>
                (Obligatorio)
              </span>
              <span style={{ color: getGlobalStyle('--color-feedback-error-dark') }}>
                *
              </span>
            </>
            )
          : (
            <>
              {title}
            </>
            )}
      </button>
      {(errors === true || info !== '') && (
        <Row className={styles.wrap_tooltip} alignItems='center'>
          <Icon
            icon='IconInfo'
            size={10}
            color={getGlobalStyle(errors === true ? '--color-icons-error' : '--color-icons-info')}
          />
          <span
            className={styles.tooltip}
            style={{ color: getGlobalStyle(error === true ? '--color-text-error' : '--color-text-black') }}
          >
            {errors === true ? message : info}
          </span>
        </Row>
      )}
      {typeof range?.max !== 'undefined' && range?.max !== null && typeof value === 'string' && typeTextarea && (
        <Column className={styles.range_counter_container} alignItems='flex-end'>
          <Text className={styles.range_counter_text} color='gray'>
            <span style={{
              marginRight: getGlobalStyle('--spacing-sm'),
              color: value.length > Number(range.max) ? getGlobalStyle('--color-text-error') : undefined
            }}>
              {value.length}
            </span>/ {range.max}
          </Text>
        </Column>
      )}
    </div>
  )
}
