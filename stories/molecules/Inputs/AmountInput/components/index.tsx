'use client'

import React, {
  type FC,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
  useImperativeHandle
} from 'react'
import { type CurrencyInputProps, type CurrencyInputOnChangeValues } from './CurrencyInputProps'
import {
  isNumber,
  cleanValue,
  fixedDecimalValue,
  formatValue,
  getLocaleConfig,
  padTrimValue,
  type CleanValueOptions,
  getSuffix,
  type FormatValueOptions,
  repositionCursor
} from './utils'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../../../utils'

export const AmountInput: FC<CurrencyInputProps> = forwardRef<
HTMLInputElement,
CurrencyInputProps
>(
  (
    {
      allowDecimals = true,
      allowNegativeValue = true,
      id,
      name,
      className,
      customInput,
      decimalsLimit = 2,
      defaultValue,
      disabled = false,
      maxLength: userMaxLength,
      value: userValue,
      onValueChange,
      fixedDecimalLength,
      placeholder = '$0,00',
      decimalScale,
      prefix,
      suffix,
      intlConfig,
      step,
      min,
      max,
      disableGroupSeparators = false,
      disableAbbreviations = false,
      decimalSeparator: _decimalSeparator = ',',
      groupSeparator: _groupSeparator = '.',
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      transformRawValue,
      formatValueOnBlur = false,
      ...props
    }: CurrencyInputProps,
    ref
  ) => {
    if (_decimalSeparator && isNumber(_decimalSeparator)) {
      throw new Error('decimalSeparator cannot be a number')
    }

    if (_groupSeparator && isNumber(_groupSeparator)) {
      throw new Error('groupSeparator cannot be a number')
    }

    const localeConfig = useMemo(() => getLocaleConfig(intlConfig), [intlConfig])
    const decimalSeparator = _decimalSeparator || localeConfig.decimalSeparator || ''
    const groupSeparator = _groupSeparator || localeConfig.groupSeparator || ''

    if (
      decimalSeparator &&
      groupSeparator &&
      decimalSeparator === groupSeparator &&
      !disableGroupSeparators
    ) {
      throw new Error('decimalSeparator cannot be the same as groupSeparator')
    }

    const formatValueOptions: Partial<FormatValueOptions> = {
      decimalSeparator,
      groupSeparator,
      disableGroupSeparators,
      intlConfig,
      prefix: prefix ?? localeConfig.prefix,
      suffix
    }

    const cleanValueOptions: Partial<CleanValueOptions> = {
      decimalSeparator,
      groupSeparator,
      allowDecimals,
      decimalsLimit: decimalsLimit || fixedDecimalLength || 2,
      allowNegativeValue,
      disableAbbreviations,
      prefix: prefix || localeConfig.prefix,
      transformRawValue
    }
    const [stateValue, setStateValue] = useState(() => {
      if (defaultValue != null) {
        return formatValue({
          ...formatValueOptions,
          decimalScale,
          value: String(defaultValue)
        })
      }

      if (userValue != null) {
        return formatValue({
          ...formatValueOptions,
          decimalScale,
          value: String(userValue)
        })
      }

      return ''
    })

    const [dirty, setDirty] = useState(false)
    const [cursor, setCursor] = useState(0)
    const [changeCount, setChangeCount] = useState(0)
    const [lastKeyStroke, setLastKeyStroke] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current!)

    /**
     * Process change in value
     */
    const processChange = (value: string, selectionStart?: number | null): void => {
      setDirty(true)

      const { modifiedValue, cursorPosition } = repositionCursor({
        selectionStart,
        value,
        lastKeyStroke,
        stateValue,
        groupSeparator
      })

      const stringValue = cleanValue({ value: modifiedValue, ...cleanValueOptions })
      if (userMaxLength && stringValue.replace(/-/g, '').length > userMaxLength) {
        return
      }

      if (stringValue === '' || stringValue === '-' || stringValue === decimalSeparator) {
        onValueChange && onValueChange(undefined, name, { float: null, formatted: '', value: '' })
        setStateValue(stringValue)
        // Always sets cursor after '-' or decimalSeparator input
        setCursor(1)
        return
      }

      const stringValueWithoutSeparator = decimalSeparator
        ? stringValue.replace(decimalSeparator, '.')
        : stringValue

      const numberValue = parseFloat(stringValueWithoutSeparator)
      const formattedValue = formatValue({
        value: stringValue,
        ...formatValueOptions
      })

      if (cursorPosition != null) {
        // Prevent cursor jumping
        let newCursor = cursorPosition + (formattedValue.length - value.length)
        newCursor = newCursor <= 0 ? (prefix ? prefix.length : 0) : newCursor

        setCursor(newCursor)
        setChangeCount(changeCount + 1)
      }

      setStateValue(formattedValue)

      if (typeof onValueChange === 'function') {
        const values: CurrencyInputOnChangeValues = {
          float: numberValue,
          formatted: formattedValue,
          value: stringValue
        }
        onValueChange(numberValue, name, values)
      }
    }

    /**
     * Handle change event
     */
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const {
        target: { value, selectionStart }
      } = event

      processChange(value, selectionStart)

      onChange && onChange(event)
    }

    /**
     * Handle focus event
     */
    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>): number => {
      onFocus && onFocus(event)
      return stateValue ? stateValue.length : 0
    }

    /**
         * Handle blur event
         *
         * Format value by padding/trimming decimals if required by
         */
    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
      const {
        target: { value }
      } = event

      const valueOnly = cleanValue({ value, ...cleanValueOptions })

      if (valueOnly === '-' || valueOnly === decimalSeparator || !valueOnly) {
        setStateValue('')
        onBlur && onBlur(event)
        return
      }

      const fixedDecimals = fixedDecimalValue(valueOnly, decimalSeparator, fixedDecimalLength)

      const newValue = padTrimValue(
        fixedDecimals,
        decimalSeparator,
        decimalScale !== undefined ? decimalScale : fixedDecimalLength
      )

      const stringValueWithoutSeparator = decimalSeparator
        ? newValue.replace(decimalSeparator, '.')
        : newValue

      const numberValue = parseFloat(stringValueWithoutSeparator)

      const formattedValue = formatValue({
        ...formatValueOptions,
        value: newValue
      })

      if (onValueChange && formatValueOnBlur) {
        onValueChange(newValue, name, {
          float: numberValue,
          formatted: formattedValue,
          value: newValue
        })
      }

      setStateValue(formattedValue)

      onBlur && onBlur(event)
    }

    /**
     * Handle key down event
     *
     * Increase or decrease value by step
     */
    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event

      setLastKeyStroke(key)

      if (step && (key === 'ArrowUp' || key === 'ArrowDown')) {
        event.preventDefault()
        setCursor(stateValue.length)

        const stringValue = userValue != null ? String(userValue) : undefined
        const stringValueWithoutSeparator =
          decimalSeparator && stringValue
            ? stringValue.replace(decimalSeparator, '.')
            : stringValue

        const currentValue =
          parseFloat(
            stringValueWithoutSeparator != null
              ? stringValueWithoutSeparator
              : cleanValue({ value: stateValue, ...cleanValueOptions })
          ) || 0
        const newValue = key === 'ArrowUp' ? currentValue + step : currentValue - step

        if (
          (min !== undefined && newValue < Number(min)) ||
          (!allowNegativeValue && newValue < 0)
        ) {
          return
        }

        if (max !== undefined && newValue > Number(max)) {
          return
        }

        const fixedLength = String(step).includes('.')
          ? Number(String(step).split('.')[1].length)
          : undefined

        processChange(
          String(fixedLength ? newValue.toFixed(fixedLength) : newValue).replace(
            '.',
            decimalSeparator
          )
        )
      }

      onKeyDown && onKeyDown(event)
    }

    /**
     * Handle key up event
     *
     * Move cursor if there is a suffix to prevent user typing past suffix
     */
    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const {
        key,
        currentTarget: { selectionStart }
      } = event
      if (key !== 'ArrowUp' && key !== 'ArrowDown' && stateValue !== '-') {
        const suffix = getSuffix(stateValue, { groupSeparator, decimalSeparator })

        if (suffix && selectionStart && selectionStart > stateValue.length - suffix.length) {
          /* istanbul ignore else */
          if (inputRef.current) {
            const newCursor = stateValue.length - suffix.length
            inputRef.current.setSelectionRange(newCursor, newCursor)
          }
        }
      }

      onKeyUp && onKeyUp(event)
    }

    // Update state if userValue changes to undefined
    useEffect(() => {
      if (userValue == null && defaultValue == null) {
        setStateValue('')
      }
    }, [defaultValue, userValue])

    useEffect(() => {
      // prevent cursor jumping if editing value
      if (
        dirty ||
        stateValue !== '-' &&
        inputRef.current &&
        document.activeElement === inputRef.current
      ) {
        inputRef.current.setSelectionRange(cursor, cursor)
      }
    }, [stateValue, cursor, inputRef, dirty, changeCount])

    /**
     * If user has only entered "-" or decimal separator,
     * keep the char to allow them to enter next value
     */
    const getRenderValue = () => {
      // Si el stateValue es parcialmente válido (ej: "12,"), úsalo para mostrarlo
      if (
        dirty &&
        (stateValue.endsWith(decimalSeparator) || isNaN(Number(stateValue)))
      ) {
        return stateValue
      }

      if (
        (userValue != null || defaultValue != null) &&
        stateValue !== '-' &&
        (!decimalSeparator || stateValue !== decimalSeparator)
      ) {
        const value = formatValue({
          ...formatValueOptions,
          decimalScale: dirty ? undefined : decimalScale,
          value: String(userValue ?? defaultValue)
        })
        return value
      }

      return stateValue
    }

    const inputProps: React.ComponentPropsWithRef<'input'> = {
      type: 'text',
      inputMode: 'decimal',
      id,
      name,
      className,
      onChange: handleOnChange,
      onBlur: handleOnBlur,
      onFocus: handleOnFocus,
      onKeyDown: handleOnKeyDown,
      onKeyUp: handleOnKeyUp,
      placeholder,
      disabled,
      value: getRenderValue(),
      ref: inputRef,
      ...props
    }

    if (customInput) {
      const CustomInput = customInput
      return <CustomInput {...inputProps} />
    }
    const label = String(inputProps.label ?? '')

    return <div style={{
      position: 'relative'
    }}>
      {label !== '' &&
        <label className={styles.label} >
          {label?.includes('*')
            ? (
              <>
                {label.replace('*', '')}
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
                {label}
              </>
              )}
        </label>
      }
      <input
        {...inputProps} className={`${styles.input} ${className ?? ''}`}
      />
    </div>
  }
)

AmountInput.displayName = 'AmountInput'
