'use client'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DateRange, type Range } from 'react-date-range'

import { getGlobalStyle } from '../../../helpers'
import { Icon } from '../../atoms'
import styles from './styles.module.css'

/**
 * Identifier for a date-range preset.
 */
export type ReportDatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last15'
  | 'last30'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'last3Months'
  | 'last6Months'
  | 'thisYear'
  | 'lastYear'
  | 'custom'

/**
 * A resolved date range (local calendar dates).
 */
export interface ReportDateRangeValue {
  startDate: Date
  endDate: Date
  preset: ReportDatePresetKey
}

export interface ReportDateRangePickerProps {
  /** Controlled value. */
  value: ReportDateRangeValue
  /** Change callback with the new resolved range. */
  onChange: (value: ReportDateRangeValue) => void
  /** Earliest selectable date. */
  minDate?: Date
  /** Latest selectable date (defaults to today). */
  maxDate?: Date
  /** Error message rendered under the control. */
  error?: string
  /** Disables interaction. */
  disabled?: boolean
  /** Field label. */
  label?: string
}

interface PresetDef {
  key: ReportDatePresetKey
  label: string
}

const PRESETS: PresetDef[] = [
  { key: 'today', label: 'Hoy' },
  { key: 'yesterday', label: 'Ayer' },
  { key: 'last7', label: 'Últimos 7 días' },
  { key: 'last15', label: 'Últimos 15 días' },
  { key: 'last30', label: 'Últimos 30 días' },
  { key: 'thisWeek', label: 'Esta semana' },
  { key: 'lastWeek', label: 'Semana anterior' },
  { key: 'thisMonth', label: 'Este mes' },
  { key: 'lastMonth', label: 'Mes anterior' },
  { key: 'last3Months', label: 'Últimos 3 meses' },
  { key: 'last6Months', label: 'Últimos 6 meses' },
  { key: 'thisYear', label: 'Este año' },
  { key: 'lastYear', label: 'Año anterior' },
  { key: 'custom', label: 'Personalizado' }
]

const startOfDay = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number): Date => startOfDay(new Date(d.getFullYear(), d.getMonth(), d.getDate() + n))
const startOfWeekMon = (d: Date): Date => {
  const day = (d.getDay() + 6) % 7
  return addDays(d, -day)
}

/**
 * Resolves a preset into an explicit inclusive start/end calendar range,
 * anchored to "today" in the local timezone.
 *
 * @param preset - The preset key.
 * @returns The resolved start and end dates (inclusive).
 */
export const resolvePreset = (preset: ReportDatePresetKey): { startDate: Date, endDate: Date } => {
  const today = startOfDay(new Date())
  switch (preset) {
    case 'today':
      return { startDate: today, endDate: today }
    case 'yesterday':
      return { startDate: addDays(today, -1), endDate: addDays(today, -1) }
    case 'last7':
      return { startDate: addDays(today, -6), endDate: today }
    case 'last15':
      return { startDate: addDays(today, -14), endDate: today }
    case 'last30':
      return { startDate: addDays(today, -29), endDate: today }
    case 'thisWeek':
      return { startDate: startOfWeekMon(today), endDate: today }
    case 'lastWeek': {
      const start = addDays(startOfWeekMon(today), -7)
      return { startDate: start, endDate: addDays(start, 6) }
    }
    case 'thisMonth':
      return { startDate: new Date(today.getFullYear(), today.getMonth(), 1), endDate: today }
    case 'lastMonth': {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const end = new Date(today.getFullYear(), today.getMonth(), 0)
      return { startDate: start, endDate: end }
    }
    case 'last3Months':
      return { startDate: new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()), endDate: today }
    case 'last6Months':
      return { startDate: new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()), endDate: today }
    case 'thisYear':
      return { startDate: new Date(today.getFullYear(), 0, 1), endDate: today }
    case 'lastYear':
      return {
        startDate: new Date(today.getFullYear() - 1, 0, 1),
        endDate: new Date(today.getFullYear() - 1, 11, 31)
      }
    case 'custom':
    default:
      return { startDate: addDays(today, -29), endDate: today }
  }
}

/**
 * Reusable date-range selector with presets and a custom calendar range.
 *
 * Designed for the reporting module but usable across the POS: controlled
 * value, preset shortcuts, custom range via react-date-range, min/max bounds,
 * an error state and design-token styling. Responsive down to small screens.
 *
 * @param props - Component props.
 * @returns The rendered picker.
 */
export const ReportDateRangePicker: React.FC<ReportDateRangePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  error,
  disabled = false,
  label = 'Periodo'
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const effectiveMax = maxDate ?? startOfDay(new Date())

  useEffect(() => {
    const onClickOutside = (event: MouseEvent): void => {
      if (containerRef.current != null && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const ranges: Range[] = useMemo(
    () => [{ startDate: value.startDate, endDate: value.endDate, key: 'selection' }],
    [value.startDate, value.endDate]
  )

  const handlePreset = (preset: ReportDatePresetKey): void => {
    if (disabled) return
    if (preset === 'custom') {
      onChange({ ...value, preset: 'custom' })
      return
    }
    const { startDate, endDate } = resolvePreset(preset)
    onChange({ startDate, endDate, preset })
  }

  const handleCalendar = (rangesByKey: Record<string, Range>): void => {
    const sel = rangesByKey.selection
    if (sel == null) return
    onChange({
      startDate: sel.startDate ?? value.startDate,
      endDate: sel.endDate ?? value.endDate,
      preset: 'custom'
    })
  }

  const rangeLabel = `${format(value.startDate, 'dd MMM yyyy', { locale: es })} — ${format(
    value.endDate,
    'dd MMM yyyy',
    { locale: es }
  )}`

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {label != null && label !== '' && <span className={styles.label}>{label}</span>}

      <button
        type='button'
        className={`${styles.trigger} ${error != null && error !== '' ? styles.triggerError : ''}`}
        onClick={() => !disabled && setOpen((p) => !p)}
        disabled={disabled}
        aria-haspopup='dialog'
        aria-expanded={open}
      >
        <Icon icon='IconCalendar' color={getGlobalStyle('--color-icons-primary')} size={20} />
        <span className={styles.triggerText}>{rangeLabel}</span>
        <Icon icon='IconArrowBottom' color={getGlobalStyle('--color-icons-black')} size={16} />
      </button>

      {error != null && error !== '' && <span className={styles.error}>{error}</span>}

      {open && (
        <div className={styles.popover} role='dialog'>
          <div className={styles.presets}>
            {PRESETS.map((p) => (
              <button
                key={p.key}
                type='button'
                className={`${styles.presetButton} ${value.preset === p.key ? styles.presetActive : ''}`}
                onClick={() => handlePreset(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className={styles.calendar}>
            <DateRange
              ranges={ranges}
              onChange={handleCalendar}
              rangeColors={[getGlobalStyle('--color-icons-primary')]}
              minDate={minDate}
              maxDate={effectiveMax}
              editableDateInputs
              moveRangeOnFirstSelection={false}
              locale={es}
            />
            <div className={styles.actions}>
              <button type='button' className={styles.applyButton} onClick={() => setOpen(false)}>
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
