import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Icon } from '../../../../atoms'
import styles from './styles.module.css'

/** A selectable value inside a filter group. */
export interface FilterValueDef {
  id?: string
  description: string
  value?: string | number | boolean | null
  imageUrn?: string
}

/** A collection of filter values with a specific display mode. */
export interface FilterGroupDef {
  id: string
  description: string
  displayType: string
  values: FilterValueDef[]
}

/** A tab containing one or more filter groups. */
export interface FilterTabDef {
  id: string
  name: string
  filterGroups: FilterGroupDef[]
}

/**
 * Map of group IDs to selected value IDs.
 * Consumers receive this map through `onSelectionChange`.
 */
export type FilterSelection = Record<string, Set<string>>

export interface FilterConfigsViewerProps {
  className?: string
  showEmptyMessage?: boolean
  error?: Error | null
  loading?: boolean
  tabs?: FilterTabDef[]
  /** Controlled external selection. */
  selection?: FilterSelection
  /** Called whenever the user changes a filter selection. */
  onSelectionChange?: (selection: FilterSelection) => void
  /** Resets the internal selection when changed from false to true. */
  clearTrigger?: boolean
  refetch?: () => void
}

interface ValueItemProps {
  value: FilterValueDef
  selected: boolean
  onToggle: (id: string) => void
}

interface GroupSectionProps {
  group: FilterGroupDef
  selectedIds: Set<string>
  onToggle: (groupId: string, valueId: string, single: boolean) => void
}

const SINGLE_SELECT_TYPE = 'WORD_CLOUD_SINGLE'

/**
 * Determines whether a filter group allows only one selected value.
 * @param displayType - The group's display type.
 * @returns Whether the group is single-select.
 */
const isSingleSelect = (displayType: string): boolean =>
  displayType === SINGLE_SELECT_TYPE

/**
 * Creates the next selection state without mutating the previous state.
 * @param previous - Current selection map.
 * @param groupId - Target filter group ID.
 * @param valueId - Target value ID.
 * @param single - Whether the group allows only one selection.
 * @returns The updated selection map.
 */
const toggleValue = (
  previous: FilterSelection,
  groupId: string,
  valueId: string,
  single: boolean
): FilterSelection => {
  const current = new Set(previous[groupId] ?? [])

  if (single) {
    return {
      ...previous,
      [groupId]: current.has(valueId) ? new Set<string>() : new Set([valueId])
    }
  }

  if (current.has(valueId)) current.delete(valueId)
  else current.add(valueId)

  return { ...previous, [groupId]: current }
}

/** Renders one accessible selectable filter option. */
const ValueItem = memo(({ value, selected, onToggle }: ValueItemProps) => {
  const valueId = value.id ?? value.description

  return (
    <li className={styles.valueItemWrapper}>
      <button
        type='button'
        className={`${styles.valueItem} ${selected ? styles.valueItemSelected : ''}`}
        title={String(value.value ?? value.description)}
        aria-pressed={selected}
        onClick={() => onToggle(valueId)}
      >
        {value.imageUrn
          ? (
          <img
            src={value.imageUrn}
            alt=''
            className={styles.valueImage}
            loading='lazy'
          />
            )
          : null}

        <span className={styles.valueText}>{value.description}</span>

        {typeof value.value !== 'undefined' && value.value !== null
          ? (
          <small className={styles.valueBadge}>{String(value.value)}</small>
            )
          : null}

        <span className={styles.selectionMark} aria-hidden='true'>
          {selected
            ? (
            <Icon
              icon='MiniCheck'
              size={7}
              color='var(--color-base-white)'
              style={{ cursor: 'default' }}
            />
              )
            : null}
        </span>
      </button>
    </li>
  )
})

ValueItem.displayName = 'ValueItem'

/** Renders a filter group and its selectable values. */
const GroupSection = memo(({ group, selectedIds, onToggle }: GroupSectionProps) => {
  const single = isSingleSelect(group.displayType)
  const displayClass = styles[`displayType_${group.displayType}`] ?? ''

  return (
    <section className={styles.group} aria-labelledby={`filter-group-${group.id}`}>
      <div className={styles.groupHeader}>
        <h3 id={`filter-group-${group.id}`} className={styles.groupTitle}>
          {group.description}
        </h3>
        {selectedIds.size > 0
          ? (
          <span className={styles.groupCount}>
            {selectedIds.size} seleccionado{selectedIds.size === 1 ? '' : 's'}
          </span>
            )
          : null}
      </div>

      {group.values.length > 0
        ? (
        <ul className={`${styles.valuesList} ${displayClass}`}>
          {group.values.map((value) => {
            const valueId = value.id ?? value.description

            return (
              <ValueItem
                key={valueId}
                value={value}
                selected={selectedIds.has(valueId)}
                onToggle={(id) => onToggle(group.id, id, single)}
              />
            )
          })}
        </ul>
          )
        : (
        <p className={styles.noValues}>No hay opciones disponibles en este grupo.</p>
          )}
    </section>
  )
})

GroupSection.displayName = 'GroupSection'

/**
 * Renders filter tabs, groups and selectable values.
 *
 * Supports controlled and uncontrolled selection, single-select and
 * multi-select groups, loading/error/empty states, and reset notifications.
 */
export const FilterConfigsViewer = memo(({
  className = '',
  showEmptyMessage = true,
  error = null,
  loading = false,
  tabs = [],
  selection: externalSelection,
  onSelectionChange,
  clearTrigger = false,
  refetch
}: FilterConfigsViewerProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(() => tabs[0]?.id ?? null)
  const [internalSelection, setInternalSelection] = useState<FilterSelection>({})
  const previousClearTrigger = React.useRef(clearTrigger)

  const selection = externalSelection ?? internalSelection

  useEffect(() => {
    if (tabs.length === 0) {
      setActiveTab(null)
      return
    }

    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0].id)
    }
  }, [tabs, activeTab])

  useEffect(() => {
    const shouldClear = clearTrigger && !previousClearTrigger.current
    previousClearTrigger.current = clearTrigger

    if (shouldClear) {
      setInternalSelection({})
      onSelectionChange?.({})
    }
  }, [clearTrigger, onSelectionChange])

  const handleToggle = useCallback((
    groupId: string,
    valueId: string,
    single: boolean
  ) => {
    const nextSelection = toggleValue(selection, groupId, valueId, single)

    if (!externalSelection) setInternalSelection(nextSelection)
    onSelectionChange?.(nextSelection)
  }, [selection, externalSelection, onSelectionChange])

  const activeGroups = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.filterGroups ?? [],
    [tabs, activeTab]
  )

  const totalSelected = useMemo(
    () => Object.values(selection).reduce((total, values) => total + values.size, 0),
    [selection]
  )

  if (loading) {
    return (
      <div className={`${styles.root} ${className}`} aria-busy='true' aria-live='polite'>
        <div className={styles.skeleton} aria-hidden='true'>
          <span />
          <span />
          <span />
        </div>
        <span className={styles.statusText}>Cargando filtros…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${styles.root} ${className}`} role='alert'>
        <div className={styles.errorIcon} aria-hidden='true'>
          <Icon
            icon='IconError'
            size={18}
            color='var(--color-feedback-error-light)'
            style={{ cursor: 'default' }}
          />
        </div>
        <div className={styles.errorContent}>
          <p className={styles.stateTitle}>No pudimos cargar los filtros</p>
          <p className={styles.stateDescription}>
            Intenta nuevamente. Si el problema continúa, vuelve a intentarlo más tarde.
          </p>
          {refetch
            ? (
            <button
              className={styles.retryBtn}
              type='button'
              onClick={() => refetch()}
            >
              <Icon
                icon='IconReload'
                size={14}
                color='currentColor'
                style={{ cursor: 'default' }}
              />
              <span>Reintentar</span>
            </button>
              )
            : null}
        </div>
      </div>
    )
  }

  if (tabs.length === 0) {
    return (
      <div className={`${styles.root} ${className}`}>
        {showEmptyMessage
          ? (
          <div className={styles.emptyState}>
            <p className={styles.stateTitle}>Aún no hay filtros disponibles</p>
            <p className={styles.stateDescription}>
              Cuando se configuren filtros, aparecerán en esta sección.
            </p>
          </div>
            )
          : null}
      </div>
    )
  }

  return (
    <div
      className={`${styles.root} ${className}`}
      role='region'
      aria-label='Configuración de filtros'
    >
      <nav className={styles.tabs} role='tablist' aria-label='Categorías de filtros'>
        {tabs.map((tab, index) => {
          const tabSelectedCount = tab.filterGroups.reduce(
            (total, group) => total + (selection[group.id]?.size ?? 0),
            0
          )
          const selected = tab.id === activeTab
          const tabId = `filter-tab-${tab.id}`
          const panelId = `filter-panel-${tab.id}`

          return (
            <button
              key={tab.id}
              id={tabId}
              type='button'
              role='tab'
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tabBtn} ${selected ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => {
                let nextIndex = index

                if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length
                else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length
                else if (event.key === 'Home') nextIndex = 0
                else if (event.key === 'End') nextIndex = tabs.length - 1
                else return

                event.preventDefault()
                setActiveTab(tabs[nextIndex].id)
                document.getElementById(`filter-tab-${tabs[nextIndex].id}`)?.focus()
              }}
            >
              <span>{tab.name}</span>
              {tabSelectedCount > 0
                ? (
                <span className={styles.tabBadge} aria-label={`${tabSelectedCount} seleccionados`}>
                  {tabSelectedCount}
                </span>
                  )
                : null}
            </button>
          )
        })}
      </nav>

      <div
        id={`filter-panel-${activeTab}`}
        className={styles.groups}
        role='tabpanel'
        aria-labelledby={`filter-tab-${activeTab}`}
        tabIndex={0}
      >
        {activeGroups.length > 0
          ? (
              activeGroups.map((group) => (
            <GroupSection
              key={group.id}
              group={group}
              selectedIds={selection[group.id] ?? new Set<string>()}
              onToggle={handleToggle}
            />
              ))
            )
          : (
          <div className={styles.emptyState}>
            <p className={styles.stateTitle}>No hay grupos en esta categoría</p>
            <p className={styles.stateDescription}>
              Selecciona otra categoría para ver sus opciones.
            </p>
          </div>
            )}
      </div>

      {totalSelected > 0
        ? (
        <div className={styles.selectionSummary} aria-live='polite'>
          <span className={styles.summaryIndicator} aria-hidden='true'>✓</span>
          <span>
            {totalSelected} filtro{totalSelected === 1 ? '' : 's'} seleccionado{totalSelected === 1 ? '' : 's'}
          </span>
        </div>
          )
        : null}
    </div>
  )
})

FilterConfigsViewer.displayName = 'FilterConfigsViewer'
