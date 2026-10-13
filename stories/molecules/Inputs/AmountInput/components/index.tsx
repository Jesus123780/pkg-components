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
import {
  type CurrencyInputProps,
  type CurrencyInputOnChangeValues
} from './CurrencyInputProps'

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

const focusNextByTabIndex = (
  currentElement: HTMLElement
): void => {
  const currentTabIndex = currentElement.tabIndex

  if (currentTabIndex < 0) {
    return
  }

  const focusableElements = Array.from(
    document.querySelectorAll<HTMLElement>(
      [
        'input:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'select:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
      ].join(',')
    )
  ).filter((element) => {
    if (element === currentElement) {
      return false
    }

    if (
      element.hidden ||
      element.getAttribute('aria-hidden') === 'true'
    ) {
      return false
    }

    /**
     * Evita elementos que no estén realmente visibles.
     */
    if (element.getClientRects().length === 0) {
      return false
    }

    /**
     * Solo nos interesan elementos posteriores
     * al tabIndex actual.
     */
    return element.tabIndex > currentTabIndex
  })

  /**
   * Ordenamos por tabIndex.
   *
   * 1 -> 2 -> 3 -> 4 -> 5
   */
  focusableElements.sort(
    (a, b) => a.tabIndex - b.tabIndex
  )

  const nextElement =
    focusableElements[0]

  if (!nextElement) {
    return
  }

  nextElement.focus()

  /**
   * Coloca el cursor al final cuando el
   * siguiente elemento es un input/textarea.
   */
  if (
    nextElement instanceof
      HTMLInputElement ||
    nextElement instanceof
      HTMLTextAreaElement
  ) {
    const length =
      nextElement.value.length

    try {
      nextElement.setSelectionRange(
        length,
        length
      )
    } catch {
      // Algunos tipos de input no soportan setSelectionRange.
    }
  }
}

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

    const localeConfig = useMemo(
      () => getLocaleConfig(intlConfig),
      [intlConfig]
    )

    const decimalSeparator =
      _decimalSeparator || localeConfig.decimalSeparator || ''

    const groupSeparator =
      _groupSeparator || localeConfig.groupSeparator || ''

    if (
      decimalSeparator &&
      groupSeparator &&
      decimalSeparator === groupSeparator &&
      !disableGroupSeparators
    ) {
      throw new Error(
        'decimalSeparator cannot be the same as groupSeparator'
      )
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

    /**
     * Se usa ref en lugar de state para tener siempre
     * la última tecla disponible inmediatamente.
     */
    const lastKeyStrokeRef = useRef<string | null>(null)

    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    /**
     * Convierte el valor actual del input en número
     * sin considerar abreviaturas.
     *
     * Ejemplo:
     *
     * $50.000       -> 50000
     * $1.500,25     -> 1500.25
     * $50.000.000   -> 50000000
     */
    const getCurrentNumericValue = (): number | null => {
      const currentValue = inputRef.current?.value ?? stateValue

      if (!currentValue) {
        return null
      }

      const cleaned = cleanValue({
        value: currentValue,
        ...cleanValueOptions,
        disableAbbreviations: true
      })

      if (!cleaned || cleaned === '-') {
        return null
      }

      const normalized = decimalSeparator
        ? cleaned.replace(
          new RegExp(
            decimalSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            'g'
          ),
          '.'
        )
        : cleaned

      const numericValue = Number(normalized)

      return Number.isFinite(numericValue)
        ? numericValue
        : null
    }

    /**
     * Procesa una abreviatura:
     *
     * K -> x 1.000
     * M -> x 1.000.000
     * B -> x 1.000.000.000
     *
     * Esto evita que el navegador inserte:
     *
     * $50|.000 + M
     *
     * como:
     *
     * $50M.000
     *
     * En cambio interpreta primero el valor completo.
     */
    const processAbbreviation = (key: string): boolean => {
      if (disableAbbreviations) {
        return false
      }

      const abbreviation = key.toLowerCase()

      const multipliers: Record<string, number> = {
        k: 1_000,
        m: 1_000_000,
        b: 1_000_000_000
      }

      const multiplier = multipliers[abbreviation]

      if (!multiplier) {
        return false
      }

      const currentValue = getCurrentNumericValue()

      /**
       * Si no existe número, no permitimos insertar
       * la abreviatura sola.
       */
      if (currentValue === null) {
        return true
      }

      const newValue = currentValue * multiplier

      /**
       * Protección contra Infinity / NaN.
       */
      if (!Number.isFinite(newValue)) {
        return true
      }

      /**
       * Validaciones existentes del componente.
       */
      if (
        (min !== undefined && newValue < Number(min)) ||
        (!allowNegativeValue && newValue < 0)
      ) {
        return true
      }

      if (max !== undefined && newValue > Number(max)) {
        return true
      }

      const valueAsString = String(newValue)

      const formattedValue = formatValue({
        ...formatValueOptions,
        value: valueAsString
      })

      /**
       * Calculamos directamente el cursor final.
       */
      setCursor(formattedValue.length)

      setDirty(true)
      setChangeCount((prev) => prev + 1)
      setStateValue(formattedValue)

      if (typeof onValueChange === 'function') {
        const values: CurrencyInputOnChangeValues = {
          float: newValue,
          formatted: formattedValue,
          value: valueAsString
        }

        onValueChange(newValue, name, values)
      }

      return true
    }

    /**
     * Process change in value
     */
    const processChange = (
      value: string,
      selectionStart?: number | null
    ): void => {
      setDirty(true)

      const {
        modifiedValue,
        cursorPosition
      } = repositionCursor({
        selectionStart,
        value,
        lastKeyStroke: lastKeyStrokeRef.current,
        stateValue,
        groupSeparator
      })

      const stringValue = cleanValue({
        value: modifiedValue,
        ...cleanValueOptions
      })

      if (
        userMaxLength &&
        stringValue.replace(/-/g, '').length > userMaxLength
      ) {
        return
      }

      if (
        stringValue === '' ||
        stringValue === '-' ||
        stringValue === decimalSeparator
      ) {
        onValueChange &&
          onValueChange(undefined, name, {
            float: null,
            formatted: '',
            value: ''
          })

        setStateValue(stringValue)

        /**
         * Always sets cursor after '-' or decimalSeparator input
         */
        setCursor(1)

        return
      }

      const stringValueWithoutSeparator = decimalSeparator
        ? stringValue.replace(
          new RegExp(
            decimalSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            'g'
          ),
          '.'
        )
        : stringValue

      const numberValue = Number(stringValueWithoutSeparator)

      /**
       * Nunca permitimos que NaN llegue al estado
       * ni a onValueChange.
       */
      if (!Number.isFinite(numberValue)) {
        return
      }

      const formattedValue = formatValue({
        value: stringValue,
        ...formatValueOptions
      })

      /**
       * Prevent cursor jumping
       */
      if (cursorPosition != null) {
        let newCursor =
          cursorPosition + (formattedValue.length - value.length)

        newCursor =
          newCursor <= 0
            ? prefix
              ? prefix.length
              : 0
            : newCursor

        setCursor(newCursor)
        setChangeCount((prev) => prev + 1)
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
    const handleOnChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ): void => {
      const {
        target: {
          value,
          selectionStart
        }
      } = event

      processChange(value, selectionStart)

      onChange && onChange(event)
    }

    /**
     * Handle focus event
     */
    const handleOnFocus = (
      event: React.FocusEvent<HTMLInputElement>
    ): number => {
      onFocus && onFocus(event)

      return stateValue ? stateValue.length : 0
    }

    /**
     * Handle blur event
     */
    const handleOnBlur = (
      event: React.FocusEvent<HTMLInputElement>
    ): void => {
      const {
        target: { value }
      } = event

      const valueOnly = cleanValue({
        value,
        ...cleanValueOptions
      })

      if (
        valueOnly === '-' ||
        valueOnly === decimalSeparator ||
        !valueOnly
      ) {
        setStateValue('')
        onBlur && onBlur(event)
        return
      }

      const fixedDecimals = fixedDecimalValue(
        valueOnly,
        decimalSeparator,
        fixedDecimalLength
      )

      const newValue = padTrimValue(
        fixedDecimals,
        decimalSeparator,
        decimalScale !== undefined
          ? decimalScale
          : fixedDecimalLength
      )

      const stringValueWithoutSeparator = decimalSeparator
        ? newValue.replace(
          new RegExp(
            decimalSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            'g'
          ),
          '.'
        )
        : newValue

      const numberValue = Number(stringValueWithoutSeparator)

      /**
       * Protección extra para blur.
       */
      if (!Number.isFinite(numberValue)) {
        setStateValue('')
        onBlur && onBlur(event)
        return
      }

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

const handleOnKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>
): void => {
  const {
    key,
    currentTarget
  } = event

  /**
   * Guardamos la última tecla inmediatamente.
   */
  lastKeyStrokeRef.current = key

  /**
   * =========================================================
   * TAB / SHIFT + TAB
   * =========================================================
   *
   * Completamente nativo.
   */
  if (key === 'Tab') {
    onKeyDown && onKeyDown(event)
    return
  }

  /**
   * =========================================================
   * ENTER
   * =========================================================
   *
   * Busca el siguiente elemento con un tabIndex mayor.
   *
   * Ejemplo:
   *
   * tabIndex=1
   *      ↓ Enter
   * tabIndex=2
   *      ↓ Enter
   * tabIndex=3
   */
  if (key === 'Enter') {
    event.preventDefault()

    focusNextByTabIndex(
      currentTarget
    )

    onKeyDown && onKeyDown(event)

    return
  }

  /**
   * =========================================================
   * K / M / B
   * =========================================================
   */
  if (
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    !event.isComposing &&
    ['k', 'm', 'b'].includes(
      key.toLowerCase()
    ) &&
    !disableAbbreviations
  ) {
    event.preventDefault()

    processAbbreviation(key)

    onKeyDown && onKeyDown(event)

    return
  }

  /**
   * =========================================================
   * ARROW UP / ARROW DOWN
   * =========================================================
   */
  if (
    step &&
    (
      key === 'ArrowUp' ||
      key === 'ArrowDown'
    )
  ) {
    event.preventDefault()

    setCursor(
      stateValue.length
    )

    const stringValue =
      userValue != null
        ? String(userValue)
        : undefined

    const stringValueWithoutSeparator =
      decimalSeparator &&
      stringValue
        ? stringValue.replace(
            new RegExp(
              decimalSeparator.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
              ),
              'g'
            ),
            '.'
          )
        : stringValue

    const cleanedValue =
      cleanValue({
        value:
          stringValueWithoutSeparator != null
            ? stringValueWithoutSeparator
            : stateValue,
        ...cleanValueOptions
      })

    const normalizedCleanedValue =
      decimalSeparator
        ? cleanedValue.replace(
            new RegExp(
              decimalSeparator.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
              ),
              'g'
            ),
            '.'
          )
        : cleanedValue

    const parsedValue =
      Number(
        normalizedCleanedValue
      )

    const currentValue =
      Number.isFinite(parsedValue)
        ? parsedValue
        : 0

    const newValue =
      key === 'ArrowUp'
        ? currentValue + step
        : currentValue - step

    if (
      (min !== undefined &&
        newValue < Number(min)) ||
      (!allowNegativeValue &&
        newValue < 0)
    ) {
      onKeyDown && onKeyDown(event)
      return
    }

    if (
      max !== undefined &&
      newValue > Number(max)
    ) {
      onKeyDown && onKeyDown(event)
      return
    }

    const fixedLength =
      String(step).includes('.')
        ? Number(
            String(step).split('.')[1].length
          )
        : undefined

    const nextValue =
      String(
        fixedLength !== undefined
          ? newValue.toFixed(
              fixedLength
            )
          : newValue
      ).replace(
        '.',
        decimalSeparator
      )

    processChange(nextValue)

    onKeyDown && onKeyDown(event)

    return
  }

  /**
   * =========================================================
   * RESTO
   * =========================================================
   */
  onKeyDown && onKeyDown(event)
}

    /**
     * Handle key up event
     *
     * Move cursor if there is a suffix to prevent
     * user typing past suffix
     */
    const handleOnKeyUp = (
      event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
      const {
        key,
        currentTarget: { selectionStart }
      } = event

      if (
        key !== 'ArrowUp' &&
        key !== 'ArrowDown' &&
        stateValue !== '-'
      ) {
        const currentSuffix = getSuffix(
          stateValue,
          {
            groupSeparator,
            decimalSeparator
          }
        )

        if (
          currentSuffix &&
          selectionStart &&
          selectionStart >
          stateValue.length - currentSuffix.length
        ) {
          if (inputRef.current) {
            const newCursor =
              stateValue.length - currentSuffix.length

            inputRef.current.setSelectionRange(
              newCursor,
              newCursor
            )
          }
        }
      }

      onKeyUp && onKeyUp(event)
    }

    /**
     * Update state if userValue changes to undefined
     */
    useEffect(() => {
      if (
        userValue == null &&
        defaultValue == null
      ) {
        setStateValue('')
      }
    }, [defaultValue, userValue])

    useEffect(() => {
      if (
        dirty ||
        (
          stateValue !== '-' &&
          inputRef.current &&
          document.activeElement === inputRef.current
        )
      ) {
        inputRef.current?.setSelectionRange(
          cursor,
          cursor
        )
      }
    }, [
      stateValue,
      cursor,
      dirty,
      changeCount
    ])

    /**
     * Render value
     */
    const getRenderValue = () => {
      /**
       * Conservamos valores parcialmente válidos.
       *
       * Ej:
       * 12,
       */
      if (
        dirty &&
        (
          stateValue.endsWith(decimalSeparator) ||
          Number.isNaN(
            Number(stateValue)
          )
        )
      ) {
        return stateValue
      }

      if (
        (
          userValue != null ||
          defaultValue != null
        ) &&
        stateValue !== '-' &&
        (
          !decimalSeparator ||
          stateValue !== decimalSeparator
        )
      ) {
        const value = formatValue({
          ...formatValueOptions,
          decimalScale:
            dirty
              ? undefined
              : decimalScale,
          value: String(
            userValue ?? defaultValue
          )
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

    const label = String(
      inputProps.label ?? ''
    )

    return (
      <div
        style={{
          position: 'relative'
        }}
      >
        {label !== '' && (
          <label className={styles.label}>
            {label?.includes('*')
              ? (
                <>
                  {label.replace('*', '')}

                  <span
                    style={{
                      fontSize:
                        getGlobalStyle(
                          '--font-size-xs'
                        ),
                      marginLeft:
                        getGlobalStyle(
                          '--spacing-xs'
                        ),
                      color:
                        getGlobalStyle(
                          '--color-neutral-gray-silver'
                        )
                    }}
                  >
                    (Obligatorio)
                  </span>

                  <span
                    style={{
                      color:
                        getGlobalStyle(
                          '--color-feedback-error-dark'
                        )
                    }}
                  >
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
        )}

        <input
          {...inputProps}
          className={`${styles.input} ${className ?? ''
            }`}
        />
      </div>
    )
  }
)

AmountInput.displayName = 'AmountInput'