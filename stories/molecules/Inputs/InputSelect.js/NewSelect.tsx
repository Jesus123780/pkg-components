'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import { Icon } from '../../../atoms'

/**
 * Option generic shape
 */
type Option = Record<string, any>

/**
 * Props for NewSelect component
 */
export interface NewSelectProps {
  options?: Option[]
  beforeLabel?: React.ReactNode
  disabled?: boolean
  id?: string
  icon?: boolean
  loading?: boolean
  sideLabel?: React.ReactNode
  title?: string
  name?: string
  action?: boolean
  optionName?: string | string[]
  value?: string | number | null
  error?: boolean
  canDelete?: boolean
  required?: boolean
  accessor?: string
  dataForm?: Record<string, any>
  handleClean?: (dataForm: any) => void
  onChange?: (event: { target: { name?: string; value: any; raw?: Option | null } }) => void
  handleClickAction?: (inputValue: string) => void
  placeholder?: string
  debounceMs?: number
  maxResults?: number
}

/**
 * Safe renderer for labels. Supports optionName as string | string[] and an optional accessor
 * @param data Option object
 * @param optionName key or keys to render
 * @param accessor optional nested accessor
 * @returns rendered label string
 */
export const renderVal = (data: Option | null | undefined, optionName: string | string[] | undefined, accessor?: string): string => {
  if (data == null || optionName == null) return ''
  if (Array.isArray(optionName)) {
    return optionName
      .map((k) => (accessor && data[accessor] ? data[accessor][k] : data[k]) ?? '')
      .filter(Boolean)
      .join(' ')
  }
  return (accessor && data[accessor] ? data[accessor][optionName] : data[optionName]) ?? ''
}

/**
 * Finds an option by idKey (default 'id')
 */
const findOptionById = (options: Option[] = [], idKey: string, value: any): Option | null => {
  if (!Array.isArray(options)) return null
  return options.find((o) => o?.[idKey] === value) ?? null
}

/**
 * Debounced, case-insensitive filter of options. Stable result order from original array.
 */
const filterOptions = (options: Option[], optionName: string | string[] | undefined, accessor: string | undefined, query: string, maxResults?: number) => {
  const q = (query ?? '').trim().toLowerCase()
  if (q.length === 0) return maxResults ? options.slice(0, maxResults) : options.slice()
  const res: Option[] = []
  for (let i = 0; i < options.length; i++) {
    const opt = options[i]
    const label = (renderVal(opt, optionName, accessor) ?? '').toString().toLowerCase()
    if (label.includes(q)) {
      res.push(opt)
      if (maxResults && res.length >= maxResults) break
    }
  }
  return res
}

/**
 * NewSelect - improved, accessible, debounced, controlled/uncontrolled compatible
 */
export const NewSelect: React.FC<NewSelectProps> = ({
  options = [],
  beforeLabel = null,
  disabled = false,
  id = undefined,
  icon = true,
  loading = false,
  sideLabel = null,
  title = '',
  name = '',
  action = false,
  optionName = 'name',
  value = undefined,
  error = false,
  canDelete = false,
  required = false,
  accessor = undefined,
  dataForm = {},
  handleClean = () => {},
  onChange = () => {},
  handleClickAction = () => {},
  placeholder = 'Buscar',
  debounceMs = 250,
  maxResults = undefined
}: NewSelectProps) => {
  // refs
  const rootRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<Array<HTMLDivElement | null>>([])

  // local state
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState<number>(-1)
  const [internalValue, setInternalValue] = useState<any>(value ?? null)
  const [localOptions, setLocalOptions] = useState<Option[]>(options)

  // sync options and controlled value
  useEffect(() => setLocalOptions(Array.isArray(options) ? options : []), [options])
  useEffect(() => setInternalValue(value ?? null), [value])

  // when internalValue changes (controlled), set visible query to selected label
  const selectedLabel = useMemo(() => {
    const opt = findOptionById(localOptions, 'id', internalValue)
    return opt ? renderVal(opt, optionName, accessor) : ''
  }, [localOptions, internalValue, optionName, accessor])

  useEffect(() => {
    // if external value provided, reflect label in input
    if (internalValue != null) {
      setQuery(selectedLabel)
    }
  }, [internalValue, selectedLabel])

  // outside click closes list
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [])

  // debounce query using timeout
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(query.trim()), debounceMs)
    return () => window.clearTimeout(t)
  }, [query, debounceMs])

  // filtered options memoized
  const filtered = useMemo(() => filterOptions(localOptions, optionName, accessor, debouncedQuery, maxResults), [localOptions, optionName, accessor, debouncedQuery, maxResults])

  // when opening, try to set highlight to first item
  useEffect(() => {
    if (open) {
      setHighlight(filtered.length > 0 ? 0 : -1)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open, filtered.length])

  // ensure highlight element is scrolled into view
  useEffect(() => {
    if (highlight >= 0 && optionRefs.current[highlight]) {
      try {
        optionRefs.current[highlight]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      } catch (e) {
        // ignore scroll errors on old browsers
      }
    }
  }, [highlight, filtered.length])

  // selection helper
  const selectOption = useCallback((opt: Option | null) => {
    try {
      if (!opt) {
        setInternalValue(null)
        setQuery('')
        onChange({ target: { name, value: undefined, raw: null } })
        return
      }
      const idVal = opt.id ?? opt['ID'] ?? opt['idKey'] ?? opt['value'] ?? null
      setInternalValue(idVal)
      setQuery(renderVal(opt, optionName, accessor))
      setOpen(false)
      onChange({ target: { name, value: idVal, raw: opt } })
    } catch (e) {
      onChange({ target: { name, value: null, raw: null } })
    }
  }, [name, onChange, optionName, accessor])

  // change handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    setQuery(e.target.value)
    setOpen(true)
  }, [disabled])

  const handleClear = useCallback(() => {
    setQuery('')
    setInternalValue(null)
    handleClean({ ...dataForm, [name]: undefined })
    onChange({ target: { name, value: undefined, raw: null } })
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [dataForm, handleClean, name, onChange])

  // keyboard nav
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setHighlight((h) => {
        const next = h + 1
        return next >= filtered.length ? filtered.length - 1 : next
      })
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => {
        const prev = h - 1
        return prev < 0 ? 0 : prev
      })
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const opt = filtered[highlight] ?? null
      if (opt) selectOption(opt)
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      return
    }
  }, [disabled, filtered, highlight, selectOption])

  // click option
  const onOptionClick = useCallback((opt: Option) => selectOption(opt), [selectOption])

  // show no results when user typed something and filtered is empty
  const showNoResults = debouncedQuery.length > 0 && filtered.length === 0

  return (
    <div
      ref={rootRef}
      id={id}
      data-testid="newselect-root"
      className={styles['input-wrapper']}
      style={{ outline: `2px solid var(${error ? '--color-text-error' : '--color-base-transparent'})`, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {title && (
        <span className={`${styles['input-wrapper__title']} ${styles['input-wrapper__title--animated']} ${open || query.length > 0 || selectedLabel ? styles['input-wrapper__title--active'] : ''}`}>
          {title}{required ? ' *' : ''}
        </span>
      )}

      <div className={styles['input-wrapper_content']} role="combobox" aria-expanded={open} aria-haspopup="listbox" aria-owns={`${id ?? 'newselect'}-list`}>
        <input
          ref={inputRef}
          data-testid="newselect-input"
          id={id}
          name={name}
          role="searchbox"
          aria-autocomplete="list"
          aria-controls={`${id ?? 'newselect'}-list`}
          aria-activedescendant={highlight >= 0 ? `newselect-option-${highlight}` : undefined}
          placeholder={placeholder}
          className={styles['input-wrapper_content_input']}
          value={query}
          disabled={disabled}
          onFocus={() => { if (!disabled) setOpen(true) }}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <div className={styles['input-wrapper__actions']}>
          {canDelete && (internalValue != null) && (
            <button
              type="button"
              data-testid="newselect-clear"
              aria-label="clear selection"
              onClick={handleClear}
              disabled={disabled}
              className={styles['input-wrapper__btn']}
            >
              <Icon icon='IconCancel' />
            </button>
          )}

          {icon && (
            <button
              type="button"
              aria-label="toggle list"
              onClick={() => { if (!disabled) setOpen((s) => !s) }}
              disabled={disabled}
              className={styles['input-wrapper__btn']}
              title="toggle"
            >
              {loading ? '⏳' : (open ? '▴' : '▾')}
            </button>
          )}
        </div>
      </div>

      <div
        ref={listRef}
        id={`${id ?? 'newselect'}-list`}
        data-testid="newselect-list"
        className={styles['input-wrapper__list']}
        role="listbox"
        style={{ display: open ? 'block' : 'none' }}
      >
        {action && (
          <button
            data-testid="newselect-action"
            className={styles['input-wrapper__list-option_action']}
            key="select_action"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              try {
                handleClickAction(query.trim())
              } catch (err) {
                onChange({ target: { name, value: undefined, raw: { __error: String(err) } } })
              }
            }}
          >
            <Icon icon='IconPlus' /> 
            {query ? `Agregar ${query}` : 'Agregar'}
          </button>
        )}

        {filtered.length > 0 ? filtered.map((opt, idx) => {
          const key = String(opt['id'] ?? idx)
          const label = renderVal(opt, optionName, accessor)
          const isActive = idx === highlight
          return (
            <div
              id={`newselect-option-${idx}`}
              ref={(el) => (optionRefs.current[idx] = el)}
              key={key}
              role="option"
              aria-selected={isActive}
              data-testid={`newselect-option-${idx}`}
              className={`${styles['input-wrapper__list-option']} ${isActive ? styles['input-wrapper__list-option--active'] : ''}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onOptionClick(opt)}
            >
              {beforeLabel} {label} {sideLabel}
            </div>
          )
        }) : (showNoResults ? (
          <div className={styles['input-wrapper__list-empty']}>No hay resultados.</div>
        ) : null)}
      </div>
    </div>
  )
}
