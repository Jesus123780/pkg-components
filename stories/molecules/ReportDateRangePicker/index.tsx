'use client'

import { format, subMonths } from 'date-fns'
import { es } from 'date-fns/locale'
import { useCallback, useEffect, useId, useMemo, useRef, useState, type FC } from 'react'
import { DateRange, type Range } from 'react-date-range'

import { getGlobalStyle } from '../../../helpers'
import { Icon, Text } from '../../atoms'
import styles from './styles.module.css'

/** Identifier for a date-range preset. */
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

/** A resolved date range using inclusive local calendar dates. */
export interface ReportDateRangeValue {
  startDate: Date
  endDate: Date
  preset: ReportDatePresetKey
}

export interface ReportDateRangePickerProps {
  /** Controlled date range. */
  value: ReportDateRangeValue
  /** Called only after the user confirms the selection. */
  onChange: (value: ReportDateRangeValue) => void
  /** Earliest selectable calendar date. */
  minDate?: Date
  /** Latest selectable calendar date. Defaults to today. */
  maxDate?: Date
  /** Optional validation message displayed below the trigger. */
  error?: string
  /** Prevents opening and changing the picker. */
  disabled?: boolean
  /** Optional field label. */
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

const PRESET_LABELS = PRESETS.reduce<Record<ReportDatePresetKey, string>>(
  (labels, preset) => {
    labels[preset.key] = preset.label
    return labels
  },
  {} as Record<ReportDatePresetKey, string>
)

/** Returns true when the provided value is a valid JavaScript Date. */
const isValidDate = (value: unknown): value is Date =>
  value instanceof Date && Number.isFinite(value.getTime())

/** Removes the time portion while preserving the local calendar date. */
const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

/** Adds calendar days without relying on fixed millisecond durations. */
const addDays = (date: Date, amount: number): Date => {
  const result = startOfDay(date)
  result.setDate(result.getDate() + amount)
  return result
}

/** Returns the Monday that starts the date's local calendar week. */
const startOfWeekMonday = (date: Date): Date => {
  const dayOffset = (date.getDay() + 6) % 7
  return addDays(date, -dayOffset)
}

/**
 * Resolves a preset into an inclusive local calendar range.
 *
 * @param preset - Preset identifier to resolve.
 * @param referenceDate - Date used as the current day; defaults to now.
 * @returns The resolved start and end dates.
 */
export const resolvePreset = (
  preset: ReportDatePresetKey,
  referenceDate: Date = new Date()
): Pick<ReportDateRangeValue, 'startDate' | 'endDate'> => {
  const today = startOfDay(isValidDate(referenceDate) ? referenceDate : new Date())

  switch (preset) {
    case 'today':
      return { startDate: today, endDate: today }
    case 'yesterday': {
      const yesterday = addDays(today, -1)
      return { startDate: yesterday, endDate: yesterday }
    }
    case 'last7':
      return { startDate: addDays(today, -6), endDate: today }
    case 'last15':
      return { startDate: addDays(today, -14), endDate: today }
    case 'last30':
      return { startDate: addDays(today, -29), endDate: today }
    case 'thisWeek':
      return { startDate: startOfWeekMonday(today), endDate: today }
    case 'lastWeek': {
      const startDate = addDays(startOfWeekMonday(today), -7)
      return { startDate, endDate: addDays(startDate, 6) }
    }
    case 'thisMonth':
      return {
        startDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: today
      }
    case 'lastMonth': {
      const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const endDate = new Date(today.getFullYear(), today.getMonth(), 0)
      return { startDate, endDate }
    }
    case 'last3Months':
      return { startDate: startOfDay(subMonths(today, 3)), endDate: today }
    case 'last6Months':
      return { startDate: startOfDay(subMonths(today, 6)), endDate: today }
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
 * Normalizes values received from controlled props to safe local calendar dates.
 * Invalid or reversed ranges fall back to a valid 30-day range.
 */
const normalizeValue = (value: ReportDateRangeValue): ReportDateRangeValue => {
  const fallback = resolvePreset('last30')
  const startDate = isValidDate(value?.startDate)
    ? startOfDay(value.startDate)
    : fallback.startDate
  const endDate = isValidDate(value?.endDate)
    ? startOfDay(value.endDate)
    : fallback.endDate
  const isKnownPreset = PRESETS.some((preset) => preset.key === value?.preset)

  if (startDate > endDate) {
    return {
      startDate: endDate,
      endDate: startDate,
      preset: isKnownPreset ? value.preset : 'custom'
    }
  }

  return {
    startDate,
    endDate,
    preset: isKnownPreset ? value.preset : 'custom'
  }
}

/**
 * Intersects a range with the selectable date bounds.
 * Returns null when the range does not overlap the allowed interval.
 */
const fitRangeToBounds = (
  range: Pick<ReportDateRangeValue, 'startDate' | 'endDate'>,
  minDate?: Date,
  maxDate?: Date
): Pick<ReportDateRangeValue, 'startDate' | 'endDate'> | null => {
  let startDate = startOfDay(range.startDate)
  let endDate = startOfDay(range.endDate)

  if (minDate != null && endDate < minDate) return null
  if (maxDate != null && startDate > maxDate) return null

  if (minDate != null && startDate < minDate) startDate = minDate
  if (maxDate != null && endDate > maxDate) endDate = maxDate

  return startDate <= endDate ? { startDate, endDate } : null
}

/** Reusable date-range selector with presets and a staged custom calendar range. */
export const ReportDateRangePicker: FC<ReportDateRangePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  error,
  disabled = false,
  label = 'Periodo'
}) => {
  const [open, setOpen] = useState(false)
  const [draftValue, setDraftValue] = useState<ReportDateRangeValue>(() => normalizeValue(value))
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogId = useId()
  const dialogTitleId = useId()
  const presetListId = useId()

  const normalizedValue = useMemo(() => normalizeValue(value), [value])
  const normalizedMinDate = useMemo(
    () => (isValidDate(minDate) ? startOfDay(minDate) : undefined),
    [minDate]
  )
  const normalizedMaxDate = useMemo(
    () => (isValidDate(maxDate) ? startOfDay(maxDate) : startOfDay(new Date())),
    [maxDate]
  )

  const hasInvalidBounds =
    normalizedMinDate != null && normalizedMinDate > normalizedMaxDate
  const canInteract = !disabled && !hasInvalidBounds
  const displayError = error?.trim() || (
    hasInvalidBounds ? 'El rango de fechas permitido no es válido.' : ''
  )

  const isRangeValid = useCallback((range: ReportDateRangeValue): boolean => {
    if (!isValidDate(range.startDate) || !isValidDate(range.endDate)) return false
    if (range.startDate > range.endDate) return false
    if (normalizedMinDate != null && range.startDate < normalizedMinDate) return false
    if (normalizedMaxDate != null && range.endDate > normalizedMaxDate) return false
    return true
  }, [normalizedMaxDate, normalizedMinDate])

  const ranges: Range[] = useMemo(
    () => [{
      startDate: draftValue.startDate,
      endDate: draftValue.endDate,
      key: 'selection'
    }],
    [draftValue.startDate, draftValue.endDate]
  )

  const rangeLabel = useMemo(() => {
    const start = format(normalizedValue.startDate, 'dd MMM yyyy', { locale: es })
    const end = format(normalizedValue.endDate, 'dd MMM yyyy', { locale: es })
    return `${start} — ${end}`
  }, [normalizedValue.startDate, normalizedValue.endDate])

  const draftRangeLabel = useMemo(() => {
    const start = format(draftValue.startDate, 'dd MMM yyyy', { locale: es })
    const end = format(draftValue.endDate, 'dd MMM yyyy', { locale: es })
    return `${start} — ${end}`
  }, [draftValue.startDate, draftValue.endDate])

  const closePicker = useCallback((restoreFocus = false): void => {
    setOpen(false)
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const cancelSelection = useCallback((): void => {
    setDraftValue(normalizedValue)
    closePicker(true)
  }, [closePicker, normalizedValue])

  const openPicker = (): void => {
    if (!canInteract) return
    setDraftValue(normalizedValue)
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent): void => {
      const target = event.target
      if (
        target instanceof Node &&
        containerRef.current != null &&
        !containerRef.current.contains(target)
      ) {
        closePicker()
      }
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') cancelSelection()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [cancelSelection, closePicker, open])

  const isPresetAvailable = (preset: ReportDatePresetKey): boolean => {
    if (preset === 'custom') return true
    return fitRangeToBounds(
      resolvePreset(preset),
      normalizedMinDate,
      normalizedMaxDate
    ) != null
  }

  const handlePreset = (preset: ReportDatePresetKey): void => {
    if (!canInteract) return

    if (preset === 'custom') {
      setDraftValue((current) => ({ ...current, preset: 'custom' }))
      return
    }

    const resolvedRange = fitRangeToBounds(
      resolvePreset(preset),
      normalizedMinDate,
      normalizedMaxDate
    )

    if (resolvedRange == null) return

    setDraftValue({ ...resolvedRange, preset })
  }

  const handleCalendar = (rangesByKey: Record<string, Range>): void => {
    const selection = rangesByKey.selection
    if (selection == null) return

    const selectedStart = isValidDate(selection.startDate)
      ? startOfDay(selection.startDate)
      : draftValue.startDate
    const selectedEnd = isValidDate(selection.endDate)
      ? startOfDay(selection.endDate)
      : selectedStart
    const startDate = selectedStart <= selectedEnd ? selectedStart : selectedEnd
    const endDate = selectedStart <= selectedEnd ? selectedEnd : selectedStart

    setDraftValue({ startDate, endDate, preset: 'custom' })
  }

  const applySelection = (): void => {
    if (!canInteract || !isRangeValid(draftValue)) return
    onChange({
      startDate: startOfDay(draftValue.startDate),
      endDate: startOfDay(draftValue.endDate),
      preset: draftValue.preset
    })
    closePicker(true)
  }

  const presetLabel = PRESET_LABELS[normalizedValue.preset] ?? 'Personalizado'
  const isApplyDisabled = !isRangeValid(draftValue)

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {label != null && label !== '' && (
        <Text
          as='span'
          className={styles.label}
          font='semibold'
          weight={600}
          customSize='0.875rem'
          customColor='var(--color-text-black)'
        >
          {label}
        </Text>
      )}

      <button
        ref={triggerRef}
        type='button'
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''} ${displayError ? styles.triggerError : ''}`}
        onClick={open ? cancelSelection : openPicker}
        disabled={!canInteract}
        aria-haspopup='dialog'
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-label={`${label || 'Periodo'}: ${rangeLabel}. ${open ? 'Cerrar selector' : 'Cambiar periodo'}`}
      >
        <span className={styles.calendarIcon} aria-hidden='true'>
          <Icon
            icon='IconCalendar'
            color='var(--color-icons-primary)'
            size={19}
          />
        </span>

        <span className={styles.triggerContent}>
          <Text
            as='span'
            className={styles.triggerRange}
            customSize='0.875rem'
            customColor='var(--color-text-black)'
            font='semibold'
            weight={600}
            truncate
          >
            {rangeLabel}
          </Text>
          <Text
            as='span'
            className={styles.triggerPreset}
            customSize='0.75rem'
            customColor='var(--color-text-gray-light)'
          >
            {presetLabel}
          </Text>
        </span>

        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} aria-hidden='true'>
          <Icon icon='IconArrowBottom' color='var(--color-icons-gray)' size={16} />
        </span>
      </button>

      {displayError !== '' && (
        <Text
          as='span'
          className={styles.error}
          customSize='0.75rem'
          customColor='var(--color-text-error)'
          role='alert'
        >
          {displayError}
        </Text>
      )}

      {open && (
        <>
          <button
            type='button'
            className={styles.backdrop}
            aria-label='Cerrar selector de fechas'
            onClick={cancelSelection}
            tabIndex={-1}
          />

          <section
            id={dialogId}
            className={styles.popover}
            role='dialog'
            aria-modal='false'
            aria-labelledby={dialogTitleId}
          >
            <header className={styles.popoverHeader}>
              <div className={styles.headerCopy}>
                <Text
                  as='h3'
                  id={dialogTitleId}
                  className={styles.popoverTitle}
                  customSize='1rem'
                  customColor='var(--color-text-black)'
                  font='bold'
                  weight={700}
                >
                  Selecciona un periodo
                </Text>
                <Text
                  as='p'
                  className={styles.popoverDescription}
                  customSize='0.75rem'
                  customColor='var(--color-text-gray-light)'
                >
                  Elige un rango rápido o define las fechas en el calendario.
                </Text>
              </div>
              <button
                type='button'
                className={styles.closeButton}
                onClick={cancelSelection}
                aria-label='Cerrar selector'
              >
                <Icon icon='IconClose' color='var(--color-icons-gray)' size={16} />
              </button>
            </header>

            <div className={styles.popoverContent}>
              <aside className={styles.presetsPanel} aria-labelledby={presetListId}>
                <Text
                  as='span'
                  id={presetListId}
                  className={styles.sectionLabel}
                  customSize='0.6875rem'
                  customColor='var(--color-text-gray-light)'
                  font='bold'
                  weight={700}
                >
                  PERIODOS RÁPIDOS
                </Text>

                <div className={styles.presets}>
                  {PRESETS.map((preset) => {
                    const active = draftValue.preset === preset.key
                    const unavailable = !isPresetAvailable(preset.key)

                    return (
                      <button
                        key={preset.key}
                        type='button'
                        className={`${styles.presetButton} ${active ? styles.presetActive : ''}`}
                        onClick={() => handlePreset(preset.key)}
                        disabled={unavailable}
                        aria-pressed={active}
                      >
                        <span className={styles.presetLabel}>{preset.label}</span>
                        {active && (
                          <span className={styles.presetIndicator} aria-hidden='true'>
                            <Icon icon='MiniCheck' color='var(--color-icons-primary)' size={14} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </aside>

              <div className={styles.calendarPanel}>
                <div className={styles.calendarSummary}>
                  <div>
                    <Text
                      as='span'
                      className={styles.sectionLabel}
                      customSize='0.6875rem'
                      customColor='var(--color-text-gray-light)'
                      font='bold'
                      weight={700}
                    >
                      RANGO SELECCIONADO
                    </Text>
                    <Text
                      as='p'
                      className={styles.summaryRange}
                      customSize='0.875rem'
                      customColor='var(--color-text-black)'
                      font='semibold'
                      weight={600}
                    >
                      {draftRangeLabel}
                    </Text>
                  </div>
                  <span className={styles.summaryBadge}>
                    <Icon icon='IconCalendar' color='var(--color-icons-primary)' size={13} />
                    <Text
                      as='span'
                      customSize='0.6875rem'
                      customColor='var(--color-text-primary)'
                      font='semibold'
                      weight={600}
                    >
                      {draftValue.preset === 'custom' ? 'A medida' : PRESET_LABELS[draftValue.preset]}
                    </Text>
                  </span>
                </div>

                <div className={styles.calendar}>
                  <DateRange
                    ranges={ranges}
                    onChange={handleCalendar}
                    rangeColors={[getGlobalStyle('--color-icons-primary') || '#ff0000']}
                    minDate={normalizedMinDate}
                    maxDate={normalizedMaxDate}
                    shownDate={draftValue.startDate}
                    months={2}
                    direction='horizontal'
                    showDateDisplay={false}
                    showMonthAndYearPickers
                    editableDateInputs
                    moveRangeOnFirstSelection={false}
                    locale={es}
                  />
                </div>
              </div>
            </div>

            <footer className={styles.actions}>
              <Text
                as='span'
                className={styles.footerHint}
                customSize='0.75rem'
                customColor='var(--color-text-gray-light)'
              >
                Los cambios se guardan al aplicar.
              </Text>
              <div className={styles.actionButtons}>
                <button
                  type='button'
                  className={styles.cancelButton}
                  onClick={cancelSelection}
                >
                  Cancelar
                </button>
                <button
                  type='button'
                  className={styles.applyButton}
                  onClick={applySelection}
                  disabled={isApplyDisabled}
                >
                  Aplicar periodo
                  <Icon icon='IconArrowRight' color='var(--color-icons-white)' size={15} />
                </button>
              </div>
            </footer>
          </section>
        </>
      )}
    </div>
  )
}

export default ReportDateRangePicker
