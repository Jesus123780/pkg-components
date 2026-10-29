// FilterConfigsViewer.tsx
import React, { memo, useState, useMemo, useCallback, useEffect } from 'react'
import styles from './styles.module.css'

// ─── Types ───────────────────────────────────────────────────────────────────

export type FilterValueDef = {
  id?: string
  description: string
  value?: string | number | boolean | null
  imageUrn?: string
}

export type FilterGroupDef = {
  id: string
  description: string
  displayType: string
  values: FilterValueDef[]
}

export type FilterTabDef = {
  id: string
  name: string
  filterGroups: FilterGroupDef[]
}

/**
 * Map of groupId → Set of selected value IDs.
 * Consumers receive this map on every change via `onSelectionChange`.
 */
export type FilterSelection = Record<string, Set<string>>

export type FilterConfigsViewerProps = {
  className?: string
  showEmptyMessage?: boolean
  error?: any
  loading?: boolean
  tabs?: FilterTabDef[]
  /** Controlled external selection — merged with internal state when provided. */
  selection?: FilterSelection
  /** Called whenever the user toggles a filter value. */
  onSelectionChange?: (selection: FilterSelection) => void
  /** When true, resets the entire internal selection. */
  clearTrigger?: boolean
  refetch?: () => void
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns `true` for single-select groups (WORD_CLOUD_SINGLE).
 */
const isSingleSelect = (displayType: string) =>
  displayType === 'WORD_CLOUD_SINGLE'

/**
 * Toggles a value inside a selection map respecting single/multi-select logic.
 */
function toggleValue(
  prev: FilterSelection,
  groupId: string,
  valueId: string,
  single: boolean
): FilterSelection {
  const current = new Set(prev[groupId] ?? [])

  if (single) {
    // Single-select: deselect if already chosen, otherwise replace
    const next = current.has(valueId) ? new Set<string>() : new Set([valueId])
    return { ...prev, [groupId]: next }
  }

  // Multi-select: toggle
  if (current.has(valueId)) {
    current.delete(valueId)
  } else {
    current.add(valueId)
  }
  return { ...prev, [groupId]: current }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

type ValueItemProps = {
  v: FilterValueDef
  selected: boolean
  onToggle: (id: string) => void
}

const ValueItem = memo(({ v, selected, onToggle }: ValueItemProps) => {
  const id = v.id ?? v.description
  return (
    <li
      key={id}
      className={`${styles.valueItem} ${selected ? styles.valueItemSelected : ''}`}
      title={String(v.value ?? '')}
      role='button'
      tabIndex={0}
      aria-pressed={selected}
      onClick={() => onToggle(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle(id)
        }
      }}
    >
      {v.imageUrn && (
        <img src={v.imageUrn} alt={v.description} className={styles.valueImage} />
      )}
      <span className={styles.valueText}>{v.description}</span>
      {typeof v.value !== 'undefined' && v.value !== null && (
        <small className={styles.valueBadge}>{String(v.value)}</small>
      )}
    </li>
  )
})

ValueItem.displayName = 'ValueItem'

type GroupSectionProps = {
  group: FilterGroupDef
  selectedIds: Set<string>
  onToggle: (groupId: string, valueId: string, single: boolean) => void
}

const GroupSection = memo(({ group, selectedIds, onToggle }: GroupSectionProps) => {
  const single = isSingleSelect(group.displayType)
  return (
    <section className={styles.group}>
      <h4 className={styles.groupTitle}>{group.description}</h4>
      <ul className={`${styles.valuesList} ${styles[`displayType_${group.displayType}`] ?? ''}`}>
        {group.values.length > 0
          ? group.values.map((v) => (
              <ValueItem
                key={v.id ?? v.description}
                v={v}
                selected={selectedIds.has(v.id ?? v.description)}
                onToggle={(vid) => onToggle(group.id, vid, single)}
              />
            ))
          : <li className={styles.noValues}>Sin opciones</li>
        }
      </ul>
    </section>
  )
})

GroupSection.displayName = 'GroupSection'

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * FilterConfigsViewer
 * Renders dynamic tabs → filter groups → selectable values.
 *
 * - Supports single-select (WORD_CLOUD_SINGLE) and multi-select groups.
 * - Exposes `onSelectionChange` so the parent can apply filters.
 * - Responds to `clearTrigger` to reset all selections.
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
  refetch = () => {},
}: FilterConfigsViewerProps) => {

  const [activeTab, setActiveTab] = useState<string | null>(() => tabs[0]?.id ?? null)
  const [internalSelection, setInternalSelection] = useState<FilterSelection>({})

  // Merge external selection if provided (controlled mode)
  const selection: FilterSelection = externalSelection ?? internalSelection

  // Sync activeTab when tabs change
  useEffect(() => {
    if (!tabs || tabs.length === 0) {
      setActiveTab(null)
    } else if (!tabs.find(t => t.id === activeTab)) {
      setActiveTab(tabs[0].id)
    }
  }, [tabs, activeTab])

  // Reset all selections when clearTrigger flips to true
  useEffect(() => {
    if (clearTrigger) {
      setInternalSelection({})
      onSelectionChange?.({})
    }
  }, [clearTrigger, onSelectionChange])

  const handleToggle = useCallback(
    (groupId: string, valueId: string, single: boolean) => {
      const next = toggleValue(selection, groupId, valueId, single)
      setInternalSelection(next)
      onSelectionChange?.(next)
    },
    [selection, onSelectionChange]
  )

  const activeGroups = useMemo(
    () => tabs.find(t => t.id === activeTab)?.filterGroups ?? [],
    [tabs, activeTab]
  )

  // Count total active selections for badge
  const totalSelected = useMemo(
    () => Object.values(selection).reduce((acc, s) => acc + s.size, 0),
    [selection]
  )

  // ── Render states ──────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={`${styles.root} ${className}`} aria-busy='true'>
        Cargando filtros…
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${styles.root} ${className}`}>
        <div className={styles.error}>
          Error al cargar filtros{error?.message ? `: ${error.message}` : ''}
        </div>
        <button className={styles.retryBtn} type='button' onClick={() => void refetch()}>
          Reintentar
        </button>
      </div>
    )
  }

  if (!tabs || tabs.length === 0) {
    return (
      <div className={`${styles.root} ${className}`}>
        {showEmptyMessage ? <div className={styles.noGroups}>Sin filtros configurados.</div> : null}
      </div>
    )
  }

  return (
    <div
      className={`${styles.root} ${className}`}
      role='region'
      aria-label='Configuración de filtros'
    >
      {/* Tab bar */}
      <nav className={styles.tabs} role='tablist'>
        {tabs.map(tab => {
          const tabSelectedCount = tab.filterGroups.reduce((acc, g) => {
            return acc + (selection[g.id]?.size ?? 0)
          }, 0)
          return (
            <button
              key={tab.id}
              role='tab'
              aria-selected={tab.id === activeTab}
              className={`${styles.tabBtn} ${tab.id === activeTab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
              {tabSelectedCount > 0 && (
                <span className={styles.tabBadge}>{tabSelectedCount}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Filter groups for active tab */}
      <div className={styles.groups} role='tabpanel'>
        {activeGroups.length > 0
          ? activeGroups.map(group => (
              <GroupSection
                key={group.id}
                group={group}
                selectedIds={selection[group.id] ?? new Set()}
                onToggle={handleToggle}
              />
            ))
          : <div className={styles.noGroups}>Sin grupos</div>
        }
      </div>

      {/* Selection summary */}
      {totalSelected > 0 && (
        <div className={styles.selectionSummary}>
          {totalSelected} filtro{totalSelected !== 1 ? 's' : ''} selecionado{totalSelected !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
})

FilterConfigsViewer.displayName = 'FilterConfigsViewer'
