'use client'

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from 'react'

import {
  Icon,
  LoadingButton,
  Text
} from '../../../atoms'

import { getGlobalStyle } from '../../../../helpers'
import styles from './styles.module.css'

export type SelectRecord =
  Record<string, unknown>

export type SelectValue =
  | string
  | number
  | boolean
  | null
  | undefined

const LEGACY_ID_KEYS = [
  'id',
  'ID',
  'idKey',
  'value',
  '_id',
  'key'
] as const

const NOOP = () => {}

const normalizeText = (
  value: string
): string => {
  return value
    .normalize('NFD')
    .replace(
      /[\u0300-\u036f]/g,
      ''
    )
    .replace(
      /\s+/g,
      ' '
    )
    .trim()
    .toLowerCase()
}

const toValueString = (
  value: unknown
): string => {
  if (
    value === null ||
    value === undefined
  ) {
    return ''
  }

  return String(value)
}

const legacyGetOptionValue = <
  T extends SelectRecord
>(
    option: T,
    preferredKey?: string
  ): SelectValue => {
  if (
    preferredKey &&
    Object.prototype.hasOwnProperty.call(
      option,
      preferredKey
    )
  ) {
    const value =
      option[preferredKey]

    if (
      value !== null &&
      value !== undefined
    ) {
      return toValueString(value)
    }
  }

  for (
    const key of LEGACY_ID_KEYS
  ) {
    if (
      Object.prototype.hasOwnProperty.call(
        option,
        key
      )
    ) {
      const value =
        option[key]

      if (
        value !== null &&
        value !== undefined
      ) {
        return toValueString(value)
      }
    }
  }

  const idKey =
    Object.keys(option).find(
      key =>
        /id$/i.test(key) &&
        option[key] !== null &&
        option[key] !== undefined
    )

  if (idKey) {
    return toValueString(
      option[idKey]
    )
  }

  return null
}

const legacyGetOptionLabel = <
  T extends SelectRecord
>(
    option: T,
    optionName:
    | string
    | string[]
    | undefined,
    accessor?: string
  ): string => {
  if (!optionName) {
    return ''
  }

  let source:
    | SelectRecord =
    option

  if (accessor) {
    const nested =
      accessor
        .split('.')
        .filter(Boolean)
        .reduce<unknown>(
        (
          current,
          key
        ) => {
          if (
            current === null ||
              current === undefined ||
              typeof current !==
                'object'
          ) {
            return undefined
          }

          return (
            current as SelectRecord
          )[key]
        },
        option
      )

    if (
      nested &&
      typeof nested ===
        'object'
    ) {
      source =
        nested as SelectRecord
    }
  }

  if (
    Array.isArray(
      optionName
    )
  ) {
    return optionName
      .map(key =>
        toValueString(
          source[key]
        )
      )
      .filter(
        value =>
          value.length > 0
      )
      .join(' ')
  }

  return toValueString(
    source[optionName]
  )
}

const valueEquals = (
  first: SelectValue,
  second: SelectValue
): boolean => {
  if (
    first === null ||
    first === undefined
  ) {
    return (
      second === null ||
      second === undefined
    )
  }

  if (
    second === null ||
    second === undefined
  ) {
    return false
  }

  return (
    String(first) ===
    String(second)
  )
}

const findOption = <
  T extends SelectRecord
>(
    options: T[],
    value: SelectValue,
    getValue: (
      option: T
    ) => SelectValue
  ): T | null => {
  if (
    value === null ||
    value === undefined
  ) {
    return null
  }

  return (
    options.find(
      option =>
        valueEquals(
          getValue(option),
          value
        )
    ) ?? null
  )
}

const findOptionIndex = <
  T extends SelectRecord
>(
    options: T[],
    value: SelectValue,
    getValue: (
      option: T
    ) => SelectValue
  ): number => {
  if (
    value === null ||
    value === undefined
  ) {
    return -1
  }

  return options.findIndex(
    option =>
      valueEquals(
        getValue(option),
        value
      )
  )
}

const firstEnabledIndex = <
  T extends SelectRecord
>(
    options: T[],
    isDisabled: (
      option: T
    ) => boolean
  ): number => {
  for (
    let index = 0;
    index < options.length;
    index += 1
  ) {
    if (
      !isDisabled(
        options[index]
      )
    ) {
      return index
    }
  }

  return -1
}

const lastEnabledIndex = <
  T extends SelectRecord
>(
    options: T[],
    isDisabled: (
      option: T
    ) => boolean
  ): number => {
  for (
    let index =
      options.length - 1;
    index >= 0;
    index -= 1
  ) {
    if (
      !isDisabled(
        options[index]
      )
    ) {
      return index
    }
  }

  return -1
}

const nextEnabledIndex = <
  T extends SelectRecord
>(
    options: T[],
    currentIndex: number,
    delta: number,
    isDisabled: (
      option: T
    ) => boolean
  ): number => {
  const total =
    options.length

  if (
    total === 0 ||
    delta === 0
  ) {
    return -1
  }

  const direction =
    delta > 0
      ? 1
      : -1

  let nextIndex =
    currentIndex >= 0
      ? currentIndex + direction
      : direction > 0
        ? 0
        : total - 1

  if (
    nextIndex >= total
  ) {
    nextIndex = 0
  }

  if (
    nextIndex < 0
  ) {
    nextIndex =
      total - 1
  }

  const startIndex =
    nextIndex

  while (
    isDisabled(
      options[nextIndex]
    )
  ) {
    nextIndex += direction

    if (
      nextIndex >= total
    ) {
      nextIndex = 0
    }

    if (
      nextIndex < 0
    ) {
      nextIndex =
        total - 1
    }

    if (
      nextIndex ===
      startIndex
    ) {
      return -1
    }
  }

  return nextIndex
}

/**
 * ============================================================
 * Focus navigation by tabIndex
 * ============================================================
 *
 * Finds the next focusable element whose effective tabIndex
 * is greater than the current element's tabIndex.
 *
 * Example:
 *
 * 1 -> 2 -> 3 -> 4
 */
const focusNextByTabIndex = (
  currentElement: HTMLElement
): void => {
  const currentTabIndex =
    currentElement.tabIndex

  if (
    currentTabIndex < 0
  ) {
    return
  }

  const focusableElements =
    Array.from(
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
    )
      .filter(
        element => {
          if (
            element ===
            currentElement
          ) {
            return false
          }

          if (
            element.hidden ||
            element.getAttribute(
              'aria-hidden'
            ) === 'true'
          ) {
            return false
          }

          if (
            element.getClientRects()
              .length === 0
          ) {
            return false
          }

          return (
            element.tabIndex >
            currentTabIndex
          )
        }
      )
      .sort(
        (a, b) =>
          a.tabIndex -
          b.tabIndex
      )

  const nextElement =
    focusableElements[0]

  if (!nextElement) {
    return
  }

  nextElement.focus()

  /**
   * Put the caret at the end for input/textarea.
   */
  if (
    nextElement instanceof
      HTMLInputElement ||
    nextElement instanceof
      HTMLTextAreaElement
  ) {
    try {
      const length =
        nextElement.value.length

      nextElement.setSelectionRange(
        length,
        length
      )
    } catch {
      /**
       * Some input types do not support
       * setSelectionRange.
       */
    }
  }
}

export interface NewSelectProps<
  TOption extends SelectRecord
> {
  options?: TOption[]

  value?: SelectValue
  defaultValue?: SelectValue

  selectedOption?: TOption | null

  getOptionValue?: (
    option: TOption
  ) => SelectValue

  getOptionLabel?: (
    option: TOption
  ) => string

  getOptionDisabled?: (
    option: TOption
  ) => boolean

  renderOption?: (
    option: TOption,
    state: {
      selected: boolean
      highlighted: boolean
    }
  ) => React.ReactNode

  filterOption?: (
    option: TOption,
    normalizedQuery: string
  ) => boolean

  title?: string
  name?: string
  id?: string
  ariaLabel?: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  errorMessage?: React.ReactNode

  placeholder?: string

  loading?: boolean
  loadingMessage?: React.ReactNode
  emptyMessage?: React.ReactNode

  clearable?: boolean
  canDelete?: boolean

  onChange?: (event: {
    target: {
      name?: string
      value: SelectValue
      raw?: TOption | null
    }
  }) => void

  onValueChange?: (
    value: SelectValue,
    option: TOption | null
  ) => void

  onSearch?: (
    query: string
  ) => void

  onOpenChange?: (
    open: boolean
  ) => void

  debounceMs?: number
  maxResults?: number

  allowFreeText?: boolean

  autoSelectDefault?: boolean
  preserveMissingValue?: boolean

  showUnresolvedValue?: boolean
  unresolvedValueLabel?: string

  action?: boolean
  actionLabel?: (
    query: string
  ) => React.ReactNode
  actionLoading?: boolean
  onAction?: (
    query: string
  ) => void

  handleClickAction?: (
    query: string
  ) => void

  handleClean?: (
    dataForm?: Record<
      string,
      unknown
    >
  ) => void

  dataForm?: Record<
    string,
    unknown
  >

  optionName?:
    | string
    | string[]

  accessor?: string

  beforeLabel?: React.ReactNode
  sideLabel?: React.ReactNode

  icon?: boolean

  defaultOptionKey?: string

  step?: number | string

  /**
   * ==========================================================
   * Keyboard navigation
   * ==========================================================
   *
   * When defined:
   *
   * Enter -> next element with greater tabIndex
   *
   * Tab / Shift + Tab remain native browser behaviour.
   */
  tabIndex?: number
}

export function NewSelect<
  TOption extends SelectRecord
> ({
  options = [],
  value,
  defaultValue,
  selectedOption = null,
  getOptionValue:
    getOptionValueProp,
  getOptionLabel:
    getOptionLabelProp,
  getOptionDisabled:
    getOptionDisabledProp =
    option =>
      option.disabled === true,
  renderOption,
  filterOption,
  title = '',
  name = '',
  id,
  ariaLabel,
  required = false,
  disabled = false,
  error = false,
  errorMessage = null,
  placeholder = 'Buscar',
  loading = false,
  loadingMessage =
    'Cargando...',
  emptyMessage =
    'No hay resultados.',
  clearable,
  canDelete = false,
  onChange = NOOP,
  onValueChange,
  onSearch,
  onOpenChange,
  debounceMs = 250,
  maxResults,
  allowFreeText = false,
  autoSelectDefault = true,
  preserveMissingValue = true,
  showUnresolvedValue = false,
  unresolvedValueLabel,
  action = false,
  actionLabel,
  actionLoading = false,
  onAction,
  handleClickAction = NOOP,
  handleClean = NOOP,
  dataForm = {},
  optionName = 'name',
  accessor,
  beforeLabel = null,
  sideLabel = null,
  icon = true,
  defaultOptionKey,
  step,

  /**
   * NUEVO
   */
  tabIndex
}: NewSelectProps<TOption>) {
  const generatedId =
    useId()

  const baseId =
    id ??
    `newselect-${generatedId}`

  const inputId =
    id ??
    `${baseId}-input`

  const listboxId =
    `${baseId}-list`

  const labelId =
    `${baseId}-label`

  const errorId =
    `${baseId}-error`

  const inputRef =
    useRef<HTMLInputElement | null>(
      null
    )

  const rootRef =
    useRef<HTMLDivElement | null>(
      null
    )

  const optionRefs =
    useRef<
      Array<HTMLDivElement | null>
    >([])

  const userInteractedRef =
    useRef(false)

  /**
   * Prevents stale animation frames from trying to focus the
   * input after the component has already changed state.
   */
  const focusFrameRef =
    useRef<number | null>(null)

  const autoDefaultAppliedRef =
    useRef(false)

  const highlightedValueRef =
    useRef<SelectValue>(null)

  const controlled =
    value !== undefined

  const [
    internalValue,
    setInternalValue
  ] = useState<SelectValue>(
    defaultValue ?? null
  )

  const selectedValue =
    controlled
      ? value ?? null
      : internalValue

  const [
    inputValue,
    setInputValue
  ] = useState('')

  const [
    open,
    setOpen
  ] = useState(false)

  const [
    highlightedIndex,
    setHighlightedIndex
  ] = useState(-1)

  const [
    isEditing,
    setIsEditing
  ] = useState(false)

  const safeOptions =
    useMemo(
      () =>
        Array.isArray(options)
          ? options
          : [],
      [options]
    )

  const getValue =
    useCallback(
      (
        option: TOption
      ): SelectValue => {
        if (
          getOptionValueProp
        ) {
          return getOptionValueProp(
            option
          )
        }

        return legacyGetOptionValue(
          option,
          name
        )
      },
      [
        getOptionValueProp,
        name
      ]
    )

  const getLabel =
    useCallback(
      (
        option: TOption
      ): string => {
        if (
          getOptionLabelProp
        ) {
          return getOptionLabelProp(
            option
          )
        }

        return legacyGetOptionLabel(
          option,
          optionName,
          accessor
        )
      },
      [
        getOptionLabelProp,
        optionName,
        accessor
      ]
    )

  const getDisabled =
    useCallback(
      (
        option: TOption
      ): boolean => {
        return Boolean(
          getOptionDisabledProp(
            option
          )
        )
      },
      [
        getOptionDisabledProp
      ]
    )

  const selectedFromOptions =
    useMemo(
      () =>
        findOption(
          safeOptions,
          selectedValue,
          getValue
        ),
      [
        safeOptions,
        selectedValue,
        getValue
      ]
    )

  const selected =
    useMemo(
      () => {
        if (
          selectedFromOptions
        ) {
          return selectedFromOptions
        }

        if (
          selectedOption &&
          valueEquals(
            getValue(
              selectedOption
            ),
            selectedValue
          )
        ) {
          return selectedOption
        }

        return null
      },
      [
        selectedFromOptions,
        selectedOption,
        selectedValue,
        getValue
      ]
    )

  const selectedLabel =
    useMemo(
      () =>
        selected
          ? getLabel(selected)
          : '',
      [
        selected,
        getLabel
      ]
    )

  const unresolvedLabel =
    useMemo(
      () => {
        if (
          unresolvedValueLabel
        ) {
          return unresolvedValueLabel
        }

        if (
          showUnresolvedValue &&
          selectedValue !==
            null &&
          selectedValue !==
            undefined
        ) {
          return String(
            selectedValue
          )
        }

        return ''
      },
      [
        unresolvedValueLabel,
        showUnresolvedValue,
        selectedValue
      ]
    )

  const displayValue =
    selectedLabel ||
    unresolvedLabel

  const normalizedQuery =
    useMemo(
      () =>
        normalizeText(
          inputValue
        ),
      [inputValue]
    )

  const filtered =
    useMemo(() => {
      const result: TOption[] =
        []

      for (
        const option of
          safeOptions
      ) {
        /**
         * An empty query means that the user has just opened/focused
         * the select. In that state every option must be visible,
         * regardless of the selected value or a custom filter.
         */
        const matches =
          normalizedQuery.length === 0
            ? true
            : filterOption
              ? filterOption(
                  option,
                  normalizedQuery
                )
              : normalizeText(
                  getLabel(option)
                ).includes(
                  normalizedQuery
                )

        if (!matches) {
          continue
        }

        result.push(option)

        if (
          maxResults &&
          maxResults > 0 &&
          result.length >=
            maxResults
        ) {
          break
        }
      }

      return result
    }, [
      safeOptions,
      filterOption,
      normalizedQuery,
      getLabel,
      maxResults
    ])

  const trimmedInputValue =
    useMemo(
      () =>
        inputValue.trim(),
      [inputValue]
    )

  const hasValue =
    selectedValue !==
      null &&
    selectedValue !==
      undefined

  const clearableEnabled =
    clearable ??
    canDelete

  const showAction =
    action &&
    trimmedInputValue.length >
      0 &&
    !loading

  const activeOption =
    highlightedIndex >= 0 &&
    highlightedIndex <
      filtered.length
      ? filtered[
          highlightedIndex
        ]
      : null

  const activeOptionId =
    activeOption
      ? `${baseId}-option-${highlightedIndex}`
      : undefined

  const describedBy =
    errorMessage
      ? errorId
      : undefined

  const accessibleLabel =
    ariaLabel ||
    title ||
    name ||
    placeholder ||
    'Seleccionar opción'

  const setOpenState =
    useCallback(
      (
        nextOpen: boolean
      ) => {
        if (
          nextOpen &&
          disabled
        ) {
          return
        }

        if (
          open === nextOpen
        ) {
          return
        }

        setOpen(nextOpen)
        onOpenChange?.(
          nextOpen
        )
      },
      [
        open,
        disabled,
        onOpenChange
      ])

  const focusInput =
    useCallback(() => {
      if (
        focusFrameRef.current !== null
      ) {
        window.cancelAnimationFrame(
          focusFrameRef.current
        )
      }

      focusFrameRef.current =
        window.requestAnimationFrame(() => {
          inputRef.current?.focus({
            preventScroll: true
          })

          focusFrameRef.current =
            null
        })
    }, [])

  const startEditing =
    useCallback(() => {
      userInteractedRef.current =
        true

      /**
       * The selected option is the value of the field, not the
       * search query. Starting a new interaction must therefore
       * clear only the temporary query while keeping selectedValue
       * untouched.
       */
      if (!isEditing) {
        setInputValue('')
        setIsEditing(true)

        highlightedValueRef.current =
          null

        setHighlightedIndex(-1)
      }
    }, [
      isEditing
    ])

  const openDropdown =
    useCallback(() => {
      if (disabled) {
        return
      }

      startEditing()
      setOpenState(true)
      focusInput()
    }, [
      disabled,
      startEditing,
      setOpenState,
      focusInput
    ])

  useEffect(() => {
    return () => {
      if (
        focusFrameRef.current !== null
      ) {
        window.cancelAnimationFrame(
          focusFrameRef.current
        )
      }
    }
  }, [])

  const closeDropdown =
    useCallback(
      (
        restoreInput = false
      ) => {
        if (
          restoreInput &&
          !allowFreeText &&
          isEditing
        ) {
          setInputValue(
            displayValue
          )
          setIsEditing(false)
        }

        setOpenState(false)

        if (restoreInput) {
          setHighlightedIndex(
            -1
          )

          highlightedValueRef.current =
            null
        }
      },
      [
        allowFreeText,
        displayValue,
        isEditing,
        setOpenState
      ])

  useEffect(() => {
    if (!isEditing) {
      setInputValue(
        displayValue
      )
    }
  }, [
    displayValue,
    isEditing
  ])

  useEffect(() => {
    if (
      !onSearch ||
      !isEditing
    ) {
      return
    }

    const timer =
      globalThis.setTimeout(
        () => {
          onSearch(
            inputValue.trim()
          )
        },
        Math.max(
          0,
          debounceMs
        )
      )

    return () =>
      globalThis.clearTimeout(
        timer
      )
  }, [
    inputValue,
    debounceMs,
    isEditing,
    onSearch
  ])

  useEffect(() => {
    if (!open) {
      return
    }

    if (
      filtered.length === 0
    ) {
      highlightedValueRef.current =
        null

      setHighlightedIndex(
        -1
      )

      return
    }

    if (
      highlightedValueRef.current !==
      null
    ) {
      const retained =
        filtered.findIndex(
          option =>
            valueEquals(
              getValue(option),
              highlightedValueRef.current
            ) &&
            !getDisabled(
              option
            )
        )

      if (
        retained >= 0
      ) {
        setHighlightedIndex(
          retained
        )
        return
      }
    }

    const selectedIndex =
      findOptionIndex(
        filtered,
        selectedValue,
        getValue
      )

    if (
      selectedIndex >= 0 &&
      !getDisabled(
        filtered[
          selectedIndex
        ]
      )
    ) {
      const nextValue =
        getValue(
          filtered[
            selectedIndex
          ]
        )

      highlightedValueRef.current =
        nextValue

      setHighlightedIndex(
        selectedIndex
      )

      return
    }

    const first =
      firstEnabledIndex(
        filtered,
        getDisabled
      )

    const nextValue =
      first >= 0
        ? getValue(
            filtered[first]
          )
        : null

    highlightedValueRef.current =
      nextValue

    setHighlightedIndex(
      first
    )
  }, [
    open,
    filtered,
    selectedValue,
    getValue,
    getDisabled
  ])

  useEffect(() => {
    if (
      highlightedIndex < 0
    ) {
      return
    }

    optionRefs.current[
      highlightedIndex
    ]?.scrollIntoView({
      block: 'nearest',
      behavior: 'auto'
    })
  }, [
    highlightedIndex
  ])

  useEffect(() => {
    optionRefs.current =
      optionRefs.current.slice(
        0,
        filtered.length
      )
  }, [
    filtered.length
  ])

  useEffect(() => {
    if (
      !autoSelectDefault ||
      controlled ||
      autoDefaultAppliedRef.current ||
      userInteractedRef.current ||
      defaultValue !== undefined
    ) {
      return
    }

    const defaultOption =
      safeOptions.find(
        option =>
          defaultOptionKey
            ? option[
                defaultOptionKey
              ] === true
            : option.default === true
      )

    if (!defaultOption) {
      return
    }

    const nextValue =
      getValue(
        defaultOption
      )

    if (
      nextValue === null ||
      nextValue ===
        undefined
    ) {
      return
    }

    autoDefaultAppliedRef.current =
      true

    setInternalValue(
      nextValue
    )

    setInputValue(
      getLabel(
        defaultOption
      )
    )

    onValueChange?.(
      nextValue,
      defaultOption
    )

    onChange({
      target: {
        name,
        value: nextValue,
        raw: defaultOption
      }
    })
  }, [
    autoSelectDefault,
    controlled,
    defaultValue,
    safeOptions,
    defaultOptionKey,
    getValue,
    getLabel,
    onValueChange,
    onChange,
    name
  ])

  useEffect(() => {
    if (
      preserveMissingValue ||
      safeOptions.length === 0 ||
      selectedValue ===
        undefined ||
      selected
    ) {
      return
    }

    if (!controlled) {
      setInternalValue(
        null
      )
    }

    setInputValue('')
    setIsEditing(false)

    onValueChange?.(
      null,
      null
    )

    onChange({
      target: {
        name,
        value: undefined,
        raw: null
      }
    })
  }, [
    preserveMissingValue,
    safeOptions,
    selectedValue,
    selected,
    controlled,
    onValueChange,
    onChange,
    name
  ])

  useEffect(() => {
    const handlePointerDown = (
      event: PointerEvent
    ) => {
      const target =
        event.target

      if (
        target instanceof Node &&
        rootRef.current?.contains(
          target
        )
      ) {
        return
      }

      closeDropdown(true)
    }

    document.addEventListener(
      'pointerdown',
      handlePointerDown
    )

    return () =>
      document.removeEventListener(
        'pointerdown',
        handlePointerDown
      )
  }, [
    closeDropdown
  ])

  const emitSelection =
    useCallback(
      (
        nextValue: SelectValue,
        option: TOption | null
      ) => {
        if (!controlled) {
          setInternalValue(
            nextValue
          )
        }

        setIsEditing(false)

        setInputValue(
          option
            ? getLabel(option)
            : ''
        )

        /**
         * Keep keyboard typing ergonomic immediately after selecting
         * an option. The input stays focused, so selecting its text
         * makes the next character replace the selected label instead
         * of being appended to it. A subsequent click/focus starts a
         * fresh search session through startEditing().
         */
        if (option) {
          window.requestAnimationFrame(
            () => {
              const input =
                inputRef.current

              if (
                input &&
                document.activeElement ===
                  input
              ) {
                input.select()
              }
            }
          )
        }

        setHighlightedIndex(
          -1
        )

        highlightedValueRef.current =
          null

        if (option) {
          closeDropdown()
        }

        onValueChange?.(
          nextValue,
          option
        )

        onChange({
          target: {
            name,
            value: option
              ? nextValue
              : undefined,
            raw: option
          }
        })
      },
      [
        controlled,
        getLabel,
        closeDropdown,
        onValueChange,
        onChange,
        name
      ])

  const selectOption =
    useCallback(
      (
        option: TOption
      ) => {
        if (
          disabled ||
          getDisabled(option)
        ) {
          return
        }

        const nextValue =
          getValue(option)

        if (
          nextValue === null ||
          nextValue ===
            undefined
        ) {
          return
        }

        userInteractedRef.current =
          true

        emitSelection(
          nextValue,
          option
        )
      },
      [
        disabled,
        getDisabled,
        getValue,
        emitSelection
      ])

  const clearSelection =
    useCallback(() => {
      if (disabled) {
        return
      }

      userInteractedRef.current =
        true

      if (!controlled) {
        setInternalValue(
          null
        )
      }

      setInputValue('')
      setIsEditing(true)

      highlightedValueRef.current =
        null

      setHighlightedIndex(
        -1
      )

      handleClean({
        ...dataForm,
        [name]: undefined
      })

      onValueChange?.(
        null,
        null
      )

      onChange({
        target: {
          name,
          value: undefined,
          raw: null
        }
      })

      setOpenState(true)

      window.requestAnimationFrame(
        () => {
          inputRef.current?.focus()
        }
      )
    }, [
      disabled,
      controlled,
      handleClean,
      dataForm,
      name,
      onValueChange,
      onChange,
      setOpenState
    ])

  const findExactOption =
    useCallback(
      (
        query: string
      ): TOption | null => {
        if (!query) {
          return null
        }

        return (
          safeOptions.find(
            option =>
              normalizeText(
                getLabel(option)
              ) === query
          ) ?? null
        )
      },
      [
        safeOptions,
        getLabel
      ])

  const restoreOrCommitInput =
    useCallback(() => {
      if (
        allowFreeText ||
        !isEditing
      ) {
        return
      }

      const query =
        normalizeText(
          inputValue
        )

      if (!query) {
        setInputValue(
          displayValue
        )
        setIsEditing(false)
        return
      }

      const exact =
        findExactOption(
          query
        )

      if (
        exact &&
        !getDisabled(exact)
      ) {
        selectOption(
          exact
        )
        return
      }

      setInputValue(
        displayValue
      )

      setIsEditing(false)
    }, [
      allowFreeText,
      isEditing,
      inputValue,
      displayValue,
      findExactOption,
      getDisabled,
      selectOption
    ])

  const handleInputChange =
    useCallback(
      (
        event:
          React.ChangeEvent<HTMLInputElement>
      ) => {
        if (disabled) {
          return
        }

        userInteractedRef.current =
          true

        setIsEditing(true)

        setInputValue(
          event.target.value
        )

        setHighlightedIndex(
          -1
        )

        highlightedValueRef.current =
          null

        if (!open) {
          setOpenState(true)
        }
      },
      [
        disabled,
        open,
        setOpenState
      ])

  const updateHighlight =
    useCallback(
      (
        nextIndex: number
      ) => {
        if (
          nextIndex < 0 ||
          nextIndex >=
            filtered.length
        ) {
          setHighlightedIndex(
            -1
          )

          highlightedValueRef.current =
            null

          return
        }

        if (
          getDisabled(
            filtered[nextIndex]
          )
        ) {
          return
        }

        const nextValue =
          getValue(
            filtered[
              nextIndex
            ]
          )

        highlightedValueRef.current =
          nextValue

        setHighlightedIndex(
          nextIndex
        )
      },
      [
        filtered,
        getDisabled,
        getValue
      ])

  const executeAction =
    useCallback(() => {
      const query =
        inputValue.trim()

      if (
        !query ||
        actionLoading
      ) {
        return
      }

      if (onAction) {
        onAction(query)
        return
      }

      handleClickAction(
        query
      )
    }, [
      inputValue,
      actionLoading,
      onAction,
      handleClickAction
    ])

  const handleKeyDown =
    useCallback(
      (
        event:
          React.KeyboardEvent<HTMLInputElement>
      ) => {
        if (disabled) {
          return
        }

        switch (
          event.key
        ) {
          case 'ArrowDown': {
            event.preventDefault()

            if (!open) {
              openDropdown()
              return
            }

            updateHighlight(
              nextEnabledIndex(
                filtered,
                highlightedIndex,
                1,
                getDisabled
              )
            )

            return
          }

          case 'ArrowUp': {
            event.preventDefault()

            if (!open) {
              openDropdown()
              return
            }

            updateHighlight(
              nextEnabledIndex(
                filtered,
                highlightedIndex,
                -1,
                getDisabled
              )
            )

            return
          }

          case 'Home': {
            if (!open) {
              return
            }

            event.preventDefault()

            updateHighlight(
              firstEnabledIndex(
                filtered,
                getDisabled
              )
            )

            return
          }

          case 'End': {
            if (!open) {
              return
            }

            event.preventDefault()

            updateHighlight(
              lastEnabledIndex(
                filtered,
                getDisabled
              )
            )

            return
          }

          case 'PageDown': {
            if (!open) {
              return
            }

            event.preventDefault()

            let current =
              highlightedIndex

            for (
              let index = 0;
              index < 8;
              index += 1
            ) {
              current =
                nextEnabledIndex(
                  filtered,
                  current,
                  1,
                  getDisabled
                )

              if (
                current ===
                -1
              ) {
                break
              }
            }

            updateHighlight(
              current
            )

            return
          }

          case 'PageUp': {
            if (!open) {
              return
            }

            event.preventDefault()

            let current =
              highlightedIndex

            for (
              let index = 0;
              index < 8;
              index += 1
            ) {
              current =
                nextEnabledIndex(
                  filtered,
                  current,
                  -1,
                  getDisabled
                )

              if (
                current ===
                -1
              ) {
                break
              }
            }

            updateHighlight(
              current
            )

            return
          }

          case 'Enter': {
            /**
             * ==================================================
             * NUEVO COMPORTAMIENTO
             * ==================================================
             *
             * Si el select tiene tabIndex y está cerrado,
             * Enter avanza al siguiente elemento.
             *
             * Si NO tiene tabIndex, conservamos exactamente
             * el comportamiento anterior: abrir el dropdown.
             */
            if (!open) {
              if (
                tabIndex !==
                undefined
              ) {
                event.preventDefault()

                focusNextByTabIndex(
                  event.currentTarget
                )

                return
              }

              event.preventDefault()
              openDropdown()
              return
            }

            /**
             * ==================================================
             * COMPORTAMIENTO EXISTENTE
             * ==================================================
             *
             * Si el dropdown está abierto, Enter continúa
             * funcionando como selector.
             */
            event.preventDefault()

            const active =
              filtered[
                highlightedIndex
              ]

            if (
              active &&
              !getDisabled(
                active
              )
            ) {
              selectOption(
                active
              )
              return
            }

            if (
              showAction &&
              trimmedInputValue
            ) {
              executeAction()
              return
            }

            restoreOrCommitInput()

            return
          }

          case 'Escape': {
            if (!open) {
              return
            }

            event.preventDefault()

            setInputValue(
              displayValue
            )

            setIsEditing(
              false
            )

            highlightedValueRef.current =
              null

            setHighlightedIndex(
              -1
            )

            closeDropdown()

            /**
             * The input is already focused here. Re-focusing it would
             * trigger handleFocus again and immediately reopen the
             * dropdown with an empty query.
             */
            return
          }

          case 'Tab': {
            /**
             * Tab remains completely native.
             *
             * We only close/restore the dropdown; we DO NOT
             * preventDefault(), so the browser moves focus normally.
             */
            restoreOrCommitInput()
            closeDropdown()

            return
          }

          default:
            return
        }
      },
      [
        disabled,
        open,
        openDropdown,
        updateHighlight,
        filtered,
        highlightedIndex,
        getDisabled,
        selectOption,
        showAction,
        trimmedInputValue,
        executeAction,
        restoreOrCommitInput,
        displayValue,
        closeDropdown,
        tabIndex
      ])

  const handleFocus =
    useCallback(() => {
      if (disabled) {
        return
      }

      /**
       * Focusing the field starts a fresh search session.
       * We intentionally do NOT select the current display value.
       * Otherwise a selected label such as "Bogotá" becomes the
       * filter query and hides the rest of the available options.
       */
      startEditing()

      if (!open) {
        setOpenState(true)
      }
    }, [
      disabled,
      open,
      setOpenState,
      startEditing
    ])

  const handleInputClick =
    useCallback(() => {
      if (
        disabled ||
        open
      ) {
        return
      }

      /**
       * onFocus does not fire when the input is already focused.
       * This handler therefore covers the important case where the
       * user selects an option, the dropdown closes, and then clicks
       * the field again without first focusing something else.
       */
      openDropdown()
    }, [
      disabled,
      open,
      openDropdown
    ])

  const handleContentClick =
    useCallback(
      (
        event:
          React.MouseEvent<HTMLDivElement>
      ) => {
        if (disabled) {
          return
        }

        const target =
          event.target

        if (
          !(target instanceof HTMLElement)
        ) {
          return
        }

        /**
         * Buttons and the input already own their interaction.
         * The wrapper only handles the otherwise empty clickable
         * area, making the whole control feel like one field.
         */
        if (
          target.closest(
            'input, button'
          )
        ) {
          return
        }

        openDropdown()
      },
      [
        disabled,
        openDropdown
      ])

  const handleRootBlur =
    useCallback(
      (
        event:
          React.FocusEvent<HTMLDivElement>
      ) => {
        const relatedTarget =
          event.relatedTarget

        if (
          relatedTarget instanceof Node &&
          rootRef.current?.contains(
            relatedTarget
          )
        ) {
          return
        }

        restoreOrCommitInput()
        closeDropdown()
      },
      [
        restoreOrCommitInput,
        closeDropdown
      ])

  const handleOptionMouseEnter =
    useCallback(
      (
        index: number
      ) => {
        const option =
          filtered[index]

        if (
          !option ||
          getDisabled(option)
        ) {
          return
        }

        updateHighlight(
          index
        )
      },
      [
        filtered,
        getDisabled,
        updateHighlight
      ])

  const handleToggleDropdown =
    useCallback(() => {
      if (disabled) {
        return
      }

      if (open) {
        closeDropdown(true)
        return
      }

      openDropdown()
    }, [
      disabled,
      open,
      closeDropdown,
      openDropdown
    ])

  const renderedOptions =
    useMemo(
      () =>
        filtered.map(
          (
            option,
            index
          ) => {
            const optionValue =
              getValue(
                option
              )

            const optionId =
              `${baseId}-option-${index}`

            const optionSelected =
              valueEquals(
                optionValue,
                selectedValue
              )

            const optionHighlighted =
              index ===
              highlightedIndex

            const optionDisabled =
              getDisabled(
                option
              )

            return (
              <div
                key={optionId}
                id={optionId}
                ref={element => {
                  optionRefs.current[
                    index
                  ] =
                    element
                }}
                role="option"
                aria-selected={
                  optionSelected
                }
                aria-disabled={
                  optionDisabled
                }
                data-highlighted={
                  optionHighlighted
                }
                data-selected={
                  optionSelected
                }
                className={
                  styles[
                    'input-wrapper__list-option'
                  ]
                }
                onPointerDown={event => {
                  event.preventDefault()
                }}
                onMouseEnter={() => {
                  handleOptionMouseEnter(
                    index
                  )
                }}
                onClick={() => {
                  selectOption(
                    option
                  )
                }}
              >
                {renderOption
                  ? renderOption(
                      option,
                      {
                        selected:
                          optionSelected,
                        highlighted:
                          optionHighlighted
                      }
                    )
                  : (
                    <>
                      <span
                        style={{
                          paddingRight:
                            getGlobalStyle(
                              '--spacing-xs'
                            ),
                          color:
                            getGlobalStyle(
                              '--color-neutral-gray-dark'
                            )
                        }}
                      >
                        {
                          beforeLabel
                        }
                      </span>

                      {getLabel(
                        option
                      )}

                      {
                        sideLabel
                      }
                    </>
                  )}
              </div>
            )
          }
        ),
      [
        filtered,
        getValue,
        selectedValue,
        highlightedIndex,
        getDisabled,
        renderOption,
        beforeLabel,
        sideLabel,
        getLabel,
        selectOption,
        handleOptionMouseEnter,
        baseId
      ])

  return (
    <div
      ref={rootRef}
      className={
        styles['input-wrapper']
      }
      data-open={open}
      data-disabled={
        disabled
      }
      data-error={error}
      data-loading={
        loading
      }
      data-has-value={
        hasValue
      }
      data-editing={
        isEditing
      }
      onBlurCapture={
        handleRootBlur
      }
    >
      {title && (
        <label
          id={labelId}
          htmlFor={inputId}
          className={
            styles[
              'input-wrapper__title'
            ]
          }
        >
          <Text>
            {title}
          </Text>

          {required && (
            <span
              aria-hidden="true"
              className={
                styles[
                  'input-wrapper__required'
                ]
              }
            >
              *
            </span>
          )}
        </label>
      )}

      <div
        className={
          styles[
            'input-wrapper_content'
          ]
        }
        onClick={
          handleContentClick
        }
      >
        <input
          ref={inputRef}
          id={inputId}
          name={name}

          /**
           * NUEVO
           *
           * El tabIndex llega directamente al input real.
           */
          tabIndex={tabIndex}

          value={inputValue}
          disabled={disabled}
          placeholder={
            displayValue
              ? ''
              : placeholder
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          role="combobox"
          aria-expanded={open}
          aria-controls={
            listboxId
          }
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={
            activeOptionId
          }
          aria-labelledby={
            title
              ? labelId
              : undefined
          }
          aria-label={
            title
              ? undefined
              : accessibleLabel
          }
          aria-describedby={
            describedBy
          }
          aria-invalid={error}
          aria-required={
            required
          }
          aria-busy={loading}
          data-step={step}
          className={
            styles[
              'input-wrapper_content_input'
            ]
          }
          onFocus={
            handleFocus
          }
          onClick={
            handleInputClick
          }
          onChange={
            handleInputChange
          }
          onKeyDown={
            handleKeyDown
          }
        />

        <div
          className={
            styles[
              'input-wrapper__actions'
            ]
          }
        >
          {clearableEnabled &&
            !disabled &&
            hasValue && (
              <button
                type="button"
                tabIndex={-1}
                aria-label="Limpiar selección"
                className={
                  styles[
                    'input-wrapper__btn'
                  ]
                }
                onPointerDown={event => {
                  event.preventDefault()
                }}
                onClick={
                  clearSelection
                }
              >
                <Icon
                  icon="IconCancel"
                  color={getGlobalStyle(
                    '--color-icons-gray'
                  )}
                />
              </button>
            )}

          {icon && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={
                open
                  ? 'Cerrar opciones'
                  : 'Abrir opciones'
              }
              className={
                styles[
                  'input-wrapper__btn'
                ]
              }
              onPointerDown={event => {
                event.preventDefault()
              }}
              onClick={
                handleToggleDropdown
              }
            >
              {loading
                ? (
                  <LoadingButton />
                )
                : (
                  <Icon
                    color={getGlobalStyle(
                      '--color-icons-primary'
                    )}
                    icon={
                      open
                        ? 'IconArrowTop'
                        : 'IconArrowBottom'
                    }
                    size={20}
                  />
                )}
            </button>
          )}
        </div>
      </div>

      {open && (
        <div
          className={
            styles[
              'input-wrapper__list'
            ]
          }
          data-loading={
            loading
          }
        >
          {loading && (
            <div
              role="status"
              aria-live="polite"
              className={
                styles[
                  'input-wrapper__status'
                ]
              }
            >
              <LoadingButton />

              <span>
                {
                  loadingMessage
                }
              </span>
            </div>
          )}

          {!loading && (
            <div
              id={listboxId}
              role="listbox"
              aria-label={
                title
                  ? `${title} opciones`
                  : 'Opciones'
              }
              aria-busy={loading}
            >
              {renderedOptions}

              {filtered.length ===
                0 && (
                <div
                  role="presentation"
                  className={
                    styles[
                      'input-wrapper__empty'
                    ]
                  }
                >
                  <Text>
                    {
                      emptyMessage
                    }
                  </Text>
                </div>
              )}
            </div>
          )}

          {showAction && (
            <div
              className={
                styles[
                  'input-wrapper__action'
                ]
              }
            >
              <button
                type="button"
                disabled={
                  actionLoading
                }
                aria-label={
                  actionLabel
                    ? undefined
                    : `Agregar ${trimmedInputValue}`
                }
                onPointerDown={event => {
                  event.preventDefault()
                }}
                onClick={
                  executeAction
                }
              >
                {actionLoading
                  ? (
                    <LoadingButton />
                  )
                  : (
                    <Icon
                      icon="IconPlus"
                    />
                  )}

                {actionLabel
                  ? actionLabel(
                      trimmedInputValue
                    )
                  : `Agregar ${trimmedInputValue}`}
              </button>
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <div
          id={errorId}
          role="alert"
          aria-live="assertive"
          className={
            styles[
              'input-wrapper__error'
            ]
          }
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}