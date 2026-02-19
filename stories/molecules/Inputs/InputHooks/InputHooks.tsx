'use client'

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
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

/**
 * Minimal debounced callback hook.
 * If delay === 0 returns the original callback (no debounce).
 */
const useDebouncedCallback = <Args extends unknown[]>(
  cb: (...args: Args) => void,
  delay = 0
) => {
  const timerRef = useRef<number | null>(null)
  const cbRef = useRef(cb)
  cbRef.current = cb

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  return useCallback((...args: Args) => {
    if (!delay) {
      cbRef.current(...args)
      return
    }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      cbRef.current(...args)
      timerRef.current = null
    }, delay)
  }, [delay])
}

/**
 * Validation result
 */
type ValidationResult = { valid: boolean; message: string }

/**
 * Input props
 */
export interface InputHooksProps {
  autoComplete?: string
  border?: string
  cc?: boolean
  autoFocus?: boolean
  disabled?: boolean
  email?: boolean
  error?: string | boolean
  letters?: boolean
  maxWidth?: string
  name?: string
  nit?: boolean
  numeric?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, hasError: boolean) => void
  paddingInput?: string
  pass?: boolean
  passConfirm?: {
    passValue: number | string
    validate: number | string
  }
  placeholder?: string
  range?: {
    max: number | string
    min: number | string
  } | null
  containerRef?: React.RefObject<HTMLDivElement>
  required?: boolean
  title?: string
  messageError?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea'
  as?: 'input' | 'textarea'
  value?: string
  width?: string
  info?: string
  max?: number
  step?: number
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  /**
   * When to run validations. 'change' keeps original behavior (validate on every change).
   * 'blur' validates only on blur. 'paste' validates on paste events.
   */
  validateOn?: 'change' | 'blur' | 'paste'
  /**
   * Debounce milliseconds for change validation. 0 = no debounce (default).
   * IMPORTANT: onChange is still called immediately for controlled inputs (so parent updates value).
   * The second param (hasError) will be updated later once debounced validation completes.
   */
  debounceMs?: number
}

/**
 * InputHooks
 *
 * @remarks
 * - `onChange` receives second param `hasError` (true when input is invalid) to preserve existing behaviour.
 * - Component is memoized and supports forwarding refs to the underlying input/textarea.
 */
export const InputHooks = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputHooksProps>((props, forwardedRef) => {
  const {
    autoComplete = 'off',
    border = '',
    autoFocus = false,
    disabled = false,
    email = false,
    error = false,
    letters = false,
    maxWidth = '',
    name = '',
    nit = false,
    numeric = false,
    paddingInput = '',
    pass = false,
    passConfirm,
    placeholder = '',
    range = null,
    containerRef,
    required = false,
    title = '',
    cc = false,
    messageError = 'El campo no debe estar vacío',
    type = 'text',
    as = 'input',
    value = '',
    width = '100%',
    info = '',
    max = Infinity,
    step = undefined,
    onChange = () => undefined,
    onFocus = () => undefined,
    onBlur = () => undefined,
    onKeyDown = () => undefined,
    validateOn = 'change',
    debounceMs = 0,
    ...rest
  } = props

  // Internal refs
  const internalRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  // expose internalRef to parent (keeps parity with previous implementation)
  useImperativeHandle(forwardedRef, () => internalRef.current as any, [internalRef])

  // error state
  const [errors, setErrors] = useState<string | boolean>(Boolean(error) ? error : false)
  const [message, setMessage] = useState<string>(messageError)
  const [focused, setFocused] = useState(false)

  // stable validators object (memoized)
  const validationRules = useMemo(() => ({
    required: {
      validate: (v: string) => Boolean(required) && v.length === 0,
      message: 'El campo no debe estar vacío'
    },
    numeric: {
      validate: (v: string) => numeric && isNaN(Number(v)),
      message: 'El campo debe ser numérico'
    },
    range: {
      validate: (v: string) =>
        range !== null &&
        (Number((v ?? '').length) < Number(range?.min) || Number((v ?? '').length) > Number(range?.max)),
      message: `El rango de caracteres es de ${range?.min} a ${range?.max}`
    },
    letters: {
      validate: (v: string) => Boolean(letters) && !onlyLetters(v),
      message: 'El campo debe contener solo letras'
    },
    email: {
      validate: (v: string) => email === true && isEmail(v),
      message: 'El formato de email no es válido'
    },
    pass: {
      validate: (v: string) => Boolean(pass) && !isPassword(v),
      message:
        'La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.'
    },
    nit: {
      validate: (v: string) => nit && !valNit(v),
      message: 'El nit no es correcto'
    },
    cc: {
      validate: (v: string) => cc && !isCC(v),
      message: 'El número de documento no es correcto'
    },
    tel: {
      validate: (v: string) => type === 'tel' && !validatePhoneNumber(v),
      message: 'El número de teléfono no es correcto'
    },
    passConfirm: {
      validate: (v: string) =>
        Boolean(passConfirm?.validate) && String(v) !== String(passConfirm?.passValue),
      message: 'Las contraseñas no coinciden.'
    }
  }), [required, numeric, range, letters, email, pass, nit, cc, type, passConfirm])

  /**
   * Validate value against rules and return status + message
   */
  const validateInput = useCallback((v: string): ValidationResult => {
    for (const key of Object.keys(validationRules)) {
      // @ts-ignore - index by key
      const rule = validationRules[key]
      if (rule?.validate?.(v)) {
        return { valid: false, message: rule.message }
      }
    }
    return { valid: true, message: '' }
  }, [validationRules])

  // keep external error prop in sync (only when prop changes)
  useEffect(() => {
    setErrors(Boolean(error) ? error : false)
  }, [error])

  // Memoize style object to avoid re-creating on each render
  const containerStyle = useMemo<React.CSSProperties>(() => ({
    boxShadow: errors === true
      ? `${getGlobalStyle('--box-shadow-red-rose')}`
      : focused
        ? `${getGlobalStyle('--box-shadow-xs')}`
        : border,
    maxWidth,
    padding: paddingInput,
    width,
    border: errors === true ? '1px solid transparent' : `1px solid ${getGlobalStyle('--color-neutral-gray-silver')}`,
    maxHeight: 'auto',
    minHeight: 'auto'
  }), [errors, focused, border, maxWidth, paddingInput, width, as])

  const inputStyle = useMemo<React.CSSProperties>(() => ({
    maxHeight: 'auto',
    minHeight: 'auto'
  }), [as])

  /**
   * Build a small synthetic event-compatible object for async callbacks.
   * This avoids using React's pooled synthetic event asynchronously.
   */
  const makeEventLike = useCallback((val: string) => {
    return { target: { value: val, name } } as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  }, [name])

  /**
   * Core: validate & emit (sync)
   * Used by immediate flows (blur, paste when not debounced, or when debounceMs === 0)
   */
  const emitValidationResult = useCallback((val: string, originalEvent: React.ChangeEvent<any> | null) => {
    const { valid, message: m } = validateInput(val)
    setErrors(!valid)
    setMessage(m || messageError)
    // prefer to forward the original event when available, otherwise send a small synthetic-like event
    const eToSend = originalEvent ?? makeEventLike(val)
    onChange(eToSend as any, !valid)
  }, [validateInput, onChange, makeEventLike, messageError])

  /**
   * Debounced variant of emitValidationResult (only used when debounceMs > 0)
   * It receives (value) and then calls emitValidationResult with a synthetic event.
   */
  const debouncedEmit = useDebouncedCallback((val: string) => {
    emitValidationResult(val, null)
  }, debounceMs)

  // handlers (memoized)
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value: val } = e.target
    // important: call onChange immediately so parent-controlled value updates without input lag
    // but pass current "errors" (stale) so parent can update its state; real validation will come debounced.
    onChange(e, Boolean(errors))

    if (validateOn === 'change') {
      if (debounceMs > 0) {
        // schedule debounced validation that will call onChange later with the real hasError
        debouncedEmit(val)
      } else {
        // immediate validation
        emitValidationResult(val, e)
      }
    }
  }, [onChange, errors, validateOn, debounceMs, debouncedEmit, emitValidationResult])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (validateOn === 'blur' || validateOn === 'change') {
      // on blur we always validate immediately (do not rely on debounced result)
      const val = (e.target as HTMLInputElement).value
      emitValidationResult(val, e as any)
    }
    setFocused(false)
    onBlur(e)
  }, [onBlur, validateOn, emitValidationResult])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const navKeys = ['Enter', 'Tab', 'Escape', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete']
    if (navKeys.includes(e.key) && validateOn === 'change' && debounceMs === 0) {
      // re-validate synchronously on special nav keys only when not debounced (keeps previous behaviour)
      const val = (e.target as HTMLInputElement).value
      const { valid, message: m } = validateInput(val)
      setErrors(!valid)
      setMessage(m || messageError)
    }
    onKeyDown(e)
  }, [onKeyDown, validateInput, messageError, validateOn, debounceMs])

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(true)
    onFocus(e)
  }, [onFocus])

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pasted = e.clipboardData.getData('text')
    if (validateOn === 'paste' || validateOn === 'change') {
      // for paste, prefer immediate validation (keeps UX consistent), but if debounce configured, schedule debounced
      if (debounceMs > 0 && validateOn === 'change') {
        debouncedEmit(pasted)
        // also forward immediate change so parent updates value if it relies on controlled flow
        onChange(e as any, Boolean(errors))
      } else {
        emitValidationResult(pasted, e as any)
      }
    } else {
      onChange(e as any, Boolean(errors))
    }
  }, [validateOn, debounceMs, debouncedEmit, emitValidationResult, onChange, errors])

  // attach internalRef to actual DOM node
  const setRef = useCallback((node: HTMLInputElement | HTMLTextAreaElement | null) => {
    internalRef.current = node
  }, [])

  // focus helper for label button
  const focusInput = useCallback(() => {
    internalRef.current?.focus()
  }, [])

  const Component = as === 'textarea' ? 'textarea' : 'input'

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={styles.wrap_input}
    >
      <Component
        {...(rest as any)}
        ref={setRef}
        autoFocus={autoFocus}
        data-required={Boolean(required)}
        disabled={Boolean(disabled)}
        data-required-step={step}
        name={name}
        max={typeof range?.max === 'number' ? range.max : undefined}
        min={typeof range?.min === 'number' ? range.min : undefined}
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
        style={inputStyle}
      />
      <button
        type="button"
        className={styles['label-input']}
        tabIndex={0}
        onClick={focusInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            focusInput()
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
            <>{title}</>
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
            style={{ color: getGlobalStyle(errors === true ? '--color-text-error' : '--color-text-black') }}
          >
            {errors === true ? message : info}
          </span>
        </Row>
      )}

      {typeof range?.max !== 'undefined' && range?.max !== null && typeof value === 'string' && as === 'textarea' && (
        <Column className={styles.range_counter_container} alignItems='flex-end'>
          <Text className={styles.range_counter_text} color='gray'>
            <span style={{
              marginRight: getGlobalStyle('--spacing-sm'),
              color: (value.length > Number(range.max)) ? getGlobalStyle('--color-text-error') : undefined
            }}>
              {value.length}
            </span>/ {range.max}
          </Text>
        </Column>
      )}
    </div>
  )
})

// memo for preventing unnecessary re-renders when props shallowly equal
export default React.memo(InputHooks)