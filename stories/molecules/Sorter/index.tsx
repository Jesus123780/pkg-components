'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './Sorter.module.css'

/**
 * One sortable field option
 */
export type SortOption = {
  /** field name used on backend / DB */
  key: string
  /** human friendly label */
  label?: string
  /** initial direction for this field if chosen */
  defaultDirection?: 'asc' | 'desc'
}

/**
 * Sort value shape
 */
export type SortValue = {
  field: string
  direction: 'asc' | 'desc'
}

/**
 * Component props
 */
export interface SorterProps {
  /** list of sortable fields (required) */
  options: SortOption[]
  /** controlled value (if provided component becomes controlled) */
  value?: SortValue
  /** default value for uncontrolled mode */
  defaultValue?: SortValue
  /** callback called when selection or direction changes */
  onChange?: (v: SortValue) => void
  /** optional css class for root node */
  className?: string
  /** aria-label for the control */
  ariaLabel?: string
  /** compact layout for tight spaces */
  compact?: boolean
  /**
   * custom SQL formatter (field, direction) => SQL fragment.
   * default: `"field" DIRECTION`
   */
  sqlFormatter?: (field: string, direction: 'asc' | 'desc') => string
}

/**
 * Build SQL ORDER BY fragment
 * @param field database field name
 * @param direction 'asc' | 'desc'
 * @param formatter optional formatter
 * @returns ORDER BY fragment (without leading semicolon)
 */
export const buildOrderBy = (
  field: string,
  direction: 'asc' | 'desc',
  formatter?: (field: string, direction: 'asc' | 'desc') => string
): string => {
  if (!field) return ''
  if (formatter) return formatter(field, direction)
  // default safe-ish formatting (escape using double quotes for most SQL engines)
  return `"${field}" ${direction.toUpperCase()}`
}

/**
 * Sorter component
 */
export const Sorter: React.FC<SorterProps> = ({
  options,
  value,
  defaultValue,
  onChange = () => undefined,
  className = '',
  ariaLabel = 'Sort results',
  compact = false,
  sqlFormatter
}) => {
  // validate options
  if (!Array.isArray(options) || options.length === 0) {
    // fail silently visually but warn developer
    // returning null avoids breaking the UI where it's used
    // caller should provide valid options
    // eslint-disable-next-line no-console
    console.error('Sorter: "options" must be a non-empty array.')
    return null
  }

  // derive initial uncontrolled value (prioritize defaultValue, else options[0])
  const initial = useMemo<SortValue>(() => {
    if (defaultValue && defaultValue.field) return defaultValue
    const first = options[0]
    return { field: first.key, direction: first.defaultDirection ?? 'asc' }
  }, [defaultValue, options])

  const isControlled = typeof value !== 'undefined'

  const [internal, setInternal] = useState<SortValue>(initial)

  // keep internal in sync if controlled value changes
  useEffect(() => {
    if (isControlled && value) setInternal(value)
  }, [isControlled, value])

  // current value (from props if controlled, otherwise internal)
  const current = useMemo(() => (isControlled && value ? value : internal), [isControlled, value, internal])

  // handlers
  const handleFieldChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = e.target.value
    // find defaultDirection of chosen field
    const opt = options.find((o) => o.key === newField)
    const newDirection = (opt && opt.defaultDirection) ? opt.defaultDirection : 'asc'
    const next: SortValue = { field: newField, direction: newDirection }
    if (!isControlled) setInternal(next)
    onChange(next)
  }, [isControlled, onChange, options])

  const toggleDirection = useCallback(() => {
    const nextDir: 'asc' | 'desc' = current.direction === 'asc' ? 'desc' : 'asc'
    const next: SortValue = { field: current.field, direction: nextDir }
    if (!isControlled) setInternal(next)
    onChange(next)
  }, [current, isControlled, onChange])

  // keyboard on direction toggle
  const handleKeyToggle = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleDirection()
    }
  }, [toggleDirection])

  // SQL fragment memoized
  const sqlFragment = useMemo(() => buildOrderBy(current.field, current.direction, sqlFormatter), [current, sqlFormatter])

  return (
    <div
      className={`${styles.root} ${compact ? styles.compact : ''} ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      <label className={styles.label} htmlFor="sorter-field">
        <select
          id="sorter-field"
          className={styles.select}
          value={current.field}
          onChange={handleFieldChange}
          aria-label="Choose field to sort by"
        >
          {options.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label ?? opt.key}
            </option>
          ))}
        </select>
      </label>

      <div
        role="button"
        tabIndex={0}
        aria-pressed={current.direction === 'desc'}
        aria-label={`Sort direction ${current.direction === 'asc' ? 'A to Z' : 'Z to A'}`}
        onClick={toggleDirection}
        onKeyDown={handleKeyToggle}
        className={styles.toggle}
        title={current.direction === 'asc' ? 'A → Z' : 'Z → A'}
      >
        <span className={styles.iconWrap} aria-hidden>
          {/* simple SVG arrow that flips based on direction */}
          <svg className={`${styles.arrow} ${current.direction === 'desc' ? styles.arrowDesc : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 6L20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>

        <span className={styles.directionLabel}>
          {current.direction === 'asc' ? 'A → Z' : 'Z → A'}
        </span>
      </div>

      <div className={styles.hint}>
        <span className={styles.sqlLabel}>ORDER BY</span>
        <code className={styles.sqlCode}>{sqlFragment}</code>
      </div>
    </div>
  )
}

export default React.memo(Sorter)
