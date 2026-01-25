'use client'

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Icon, LoadingButton, Text } from '../../../atoms'
import { getGlobalStyle } from '../../../../helpers'
import styles from './styles.module.css'

/**
 * Generic option shape
 */
export type Option = Record<string, any>

/** Keys to try when resolving an id from an option object */
const ID_KEYS = ['id', 'ID', 'idKey', 'value', '_id', 'key'] as const

/**
 * Safely get an id-like value from an option (stringify-tolerant).
 * Heuristics (in order):
 * 1. preferredKey (usually the `name` prop passed to the component)
 * 2. well-known ID_KEYS
 * 3. any key that endsWith 'Id' (case-insensitive) — covers `cliId`, `userId`, etc.
 * @param opt option object
 * @param preferredKey optional preferred key to try first (e.g. input `name`)
 */
const getOptionId = (opt: Option | null | undefined, preferredKey?: string): string | null => {
  if (!opt) return null

  // 1) preferredKey (e.g. 'cliId')
  if (preferredKey && Object.prototype.hasOwnProperty.call(opt, preferredKey)) {
    const v = opt[preferredKey]
    if (v !== undefined && v !== null) return String(v)
  }

  // 2) known id keys
  for (const key of ID_KEYS) {
    if (Object.prototype.hasOwnProperty.call(opt, key)) {
      const v = opt[key]
      if (v !== undefined && v !== null) return String(v)
    }
  }

  // 3) flexible heuristic: any key that ends with 'id' (case-insensitive)
  const keys = Object.keys(opt)
  for (const k of keys) {
    if (/id$/i.test(k) && Object.prototype.hasOwnProperty.call(opt, k)) {
      const v = opt[k]
      if (v !== undefined && v !== null) return String(v)
    }
  }

  return null
}

/**
 * Render label safely from option using either string or array of keys.
 * @param data option object
 * @param optionName key or keys to render label
 * @param accessor optional accessor for nested objects
 * @returns label string
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
 * Find option by id-like keys (robust to backend shape differences).
 * Uses the same getOptionId heuristics and compares stringified values.
 * @param options array of options
 * @param value value to match
 * @param preferredKey optional preferred key (e.g. input `name`)
 */
const findOptionById = (options: Option[] | undefined, value: any = null, preferredKey?: string): Option | null => {
  if (!Array.isArray(options) || value == null) return null
  const target = String(value)
  for (const o of options) {
    if (!o) continue
    const oid = getOptionId(o, preferredKey)
    if (oid !== null && oid === target) return o
  }
  return null
}

/**
 * Safe filter function. Case-insensitive, stable order.
 * @param options options list
 * @param optionName key(s) for label
 * @param accessor optional accessor for nested objects
 * @param query search string
 * @param maxResults optional cap
 */
const filterOptions = (options: Option[], optionName: string | string[] | undefined, accessor: string | undefined, query: string, maxResults?: number) => {
  const q = (query ?? '').trim().toLowerCase()
  if (!q) return maxResults ? options.slice(0, maxResults) : options.slice()
  const out: Option[] = []
  for (const opt of options) {
    const label = (renderVal(opt, optionName, accessor) ?? '').toString().toLowerCase()
    if (label.includes(q)) {
      out.push(opt)
      if (maxResults && out.length >= maxResults) break
    }
  }
  return out
}

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
 * NewSelect - improved, accessible, debounced, controlled/uncontrolled compatible.
 *
 * Behaviors preserved:
 * - Auto-select default option when parent didn't provide value and user hasn't interacted
 * - Debounced search + keyboard navigation + action + clear
 */
export const NewSelect: React.FC<NewSelectProps> = ({
  options = [],
  beforeLabel = null,
  disabled = false,
  id,
  icon = true,
  loading = false,
  sideLabel = null,
  title = '',
  name = '',
  action = false,
  optionName = 'name',
  value,
  error = false,
  canDelete = false,
  required = false,
  accessor,
  dataForm = {},
  handleClean = () => { },
  onChange = () => { },
  handleClickAction = () => { },
  placeholder = 'Buscar',
  debounceMs = 250,
  maxResults
}: NewSelectProps) => {
  // refs
  const rootRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<Array<HTMLDivElement | null>>([])
  const userInteracted = useRef<boolean>(false)

  // local state
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState<number>(-1)
  const [internalValue, setInternalValue] = useState<any>(value ?? null)
  const [localOptions, setLocalOptions] = useState<Option[]>(Array.isArray(options) ? options : [])

  // Sync props -> state (options)
  useEffect(() => setLocalOptions(Array.isArray(options) ? options : []), [options])

  // Normalize incoming value:
  // - If parent omitted value (undefined) => treat as uncontrolled (do not override internalValue)
  // - If parent explicitly sets '' or null => treat as no selection (internal null)
  useEffect(() => {
    const normalized = value === '' || value === null ? null : value === undefined ? undefined : value
    if (normalized === undefined) return // uncontrolled mode, don't overwrite
    if (internalValue !== normalized) setInternalValue(normalized)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  // derive selectedLabel
  const selectedLabel = useMemo(() => {
    if (internalValue == null) return ''
    const opt = findOptionById(localOptions, internalValue, name)
    return opt ? renderVal(opt, optionName, accessor) : ''
  }, [localOptions, internalValue, optionName, accessor, name])

  // reflect selected label into input when selection changes
  useEffect(() => {
    if (internalValue != null) {
      setQuery(selectedLabel)
    } else {
      // only clear query when it is empty already (do not override user typing)
      if (!query) setQuery('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue, selectedLabel])

  // Auto-select default option only when:
  // - parent didn't provide meaningful value
  // - no internalValue
  // - user hasn't interacted
  useEffect(() => {
    const parentHasMeaningfulValue = !(value === undefined || value === '' || value === null)
    if (parentHasMeaningfulValue) return
    if (internalValue != null) return
    if ((query ?? '').trim().length > 0) return
    if (userInteracted.current) return
    if (!Array.isArray(localOptions) || localOptions.length === 0) return

    const defaultOpt = localOptions.find((o) => o?.default === true) ?? null
    if (!defaultOpt) return

    const idVal = getOptionId(defaultOpt, name)
    setInternalValue(idVal)
    setQuery(renderVal(defaultOpt, optionName, accessor))
    try {
      onChange({ target: { name, value: idVal, raw: defaultOpt } })
    } catch {
      // parent onChange may throw; swallow to avoid breaking component
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localOptions, value, internalValue, query, optionName, accessor, name])

  // close on outside click
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [])

  // debounce query
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  useEffect(() => {
    const t = globalThis.setTimeout(() => setDebouncedQuery(query.trim()), debounceMs)
    return () => globalThis.clearTimeout(t)
  }, [query, debounceMs])

  // filtered list (memo)
  const filtered = useMemo(
    () => filterOptions(localOptions, optionName, accessor, debouncedQuery, maxResults),
    [localOptions, optionName, accessor, debouncedQuery, maxResults]
  )

  // open -> focus input and reset highlight
  useEffect(() => {
    if (open) {
      setHighlight(filtered.length > 0 ? 0 : -1)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open, filtered.length])

  // scroll highlighted into view
  useEffect(() => {
    if (highlight >= 0) {
      const el = optionRefs.current[highlight]
      if (el) {
        try {
          el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        } catch {
          // ignore scroll errors
        }
      }
    }
  }, [highlight, filtered.length])

  /**
   * Select an option or clear selection
   * @param opt option or null to clear
   */
  const selectOption = useCallback((opt: Option | null) => {
    try {
      if (!opt) {
        setInternalValue(null)
        setQuery('')
        onChange({ target: { name, value: undefined, raw: null } })
        return
      }
      const idVal = getOptionId(opt, name)
      setInternalValue(idVal)
      setQuery(renderVal(opt, optionName, accessor))
      setOpen(false)
      onChange({ target: { name, value: idVal, raw: opt } })
    } catch {
      onChange({ target: { name, value: null, raw: null } })
    }
  }, [name, onChange, optionName, accessor])

  // handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    userInteracted.current = true
    setQuery(e.target.value)
    setOpen(true)
  }, [disabled])

  // clear selection
  const handleClear = useCallback(() => {
    userInteracted.current = true
    setQuery('')
    setInternalValue(null)
    handleClean({ ...dataForm, [name]: undefined })
    onChange({ target: { name, value: undefined, raw: null } })
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [dataForm, handleClean, name, onChange])

  // keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setHighlight((h) => {
        if (filtered.length === 0) return -1
        const next = h + 1
        return next >= filtered.length ? 0 : next // ciclo al primero si está en el último
      })
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => {
        if (filtered.length === 0) return -1
        const prev = h - 1
        return prev < 0 ? filtered.length - 1 : prev // ciclo al último si está en el primero
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
    }
  }, [disabled, filtered, highlight, selectOption])

  const onOptionClick = useCallback((opt: Option) => selectOption(opt), [selectOption])

  const showNoResults = debouncedQuery.length > 0 && filtered.length === 0

  return (
    <div
      ref={rootRef}
      id={id}
      data-testid='newselect-root'
      className={styles['input-wrapper']}
      style={{ outline: `2px solid var(${error ? '--color-text-error' : '--color-base-transparent'})`, cursor: disabled ? 'not-allowed' : 'pointer' }}
      aria-disabled={disabled}
    >
      {title && (
        <>
          <span
            aria-disabled={disabled}
            className={`${styles['input-wrapper__title']} ${styles['input-wrapper__title--animated']} ${open || query.length > 0 || selectedLabel ? styles['input-wrapper__title--active'] : ''}`}
            data-testid='title'
          >
            {title}{required ? ' *' : ''}
          </span>
          <span className={styles['input-wrapper__title--disabled']}>
            {disabled ? ' (Deshabilitado)' : ''}
          </span>
        </>
      )}

      <div
        className={styles['input-wrapper_content']}
        role='combobox'
        aria-expanded={open}
        aria-haspopup='listbox'
        aria-owns={`${id ?? 'newselect'}-list`}
      >
        <input
          ref={inputRef}
          data-testid='newselect-input'
          id={id}
          name={name}
          role='searchbox'
          aria-autocomplete='list'
          aria-controls={`${id ?? 'newselect'}-list`}
          aria-activedescendant={highlight >= 0 ? `newselect-option-${highlight}` : undefined}
          placeholder={placeholder}
          autoComplete='off'
          className={styles['input-wrapper_content_input']}
          value={query}
          disabled={disabled}
          onFocus={() => {
            if (!disabled) {
              userInteracted.current = true
              setOpen(true)
            }
          }}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <div className={styles['input-wrapper__actions']}>
          {canDelete && !disabled && (internalValue != null) && (
            <button
              type='button'
              data-testid='newselect-clear'
              aria-label='clear selection'
              onClick={handleClear}
              disabled={disabled}
              className={styles['input-wrapper__btn']}
            >
              <Icon icon='IconCancel' color={getGlobalStyle('--color-icons-gray')} />
            </button>
          )}

          {icon && (
            <button
              type='button'
              aria-label='toggle list'
              onClick={() => { if (!disabled) setOpen((s) => !s) }}
              disabled={disabled}
              className={styles['input-wrapper__btn']}
              title='toggle'
              style={{
                backgroundColor: getGlobalStyle('--color-base-transparent')
              }}
            >
              {loading
                ? <LoadingButton />
                : <Icon
                  color={getGlobalStyle('--color-icons-primary')}
                  icon={open ? 'IconArrowTop' : 'IconArrowBottom'}
                  size={20}
                />
              }
            </button>
          )}
        </div>
      </div>

      <div
        ref={listRef}
        id={`${id ?? 'newselect'}-list`}
        data-testid='newselect-list'
        className={styles['input-wrapper__list']}
        role='listbox'
        style={{ display: open ? 'block' : 'none' }}
      >
        {action && (
          <button
            data-testid='newselect-action'
            className={styles['input-wrapper__list-option_action']}
            key='select_action'
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
          const key = String(getOptionId(opt, name) ?? idx)
          const label = renderVal(opt, optionName, accessor)
          const isActive = idx === highlight
          return (
            <div
              id={`newselect-option-${idx}`}
              ref={(el) => (optionRefs.current[idx] = el) as any}
              key={key}
              role='option'
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
          <Text>
            No hay resultados.
          </Text>
        ) : null)}
      </div>
    </div>
  )
}
