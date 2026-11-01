import React from 'react'
import type { SortOption } from '../../../../molecules/Sorter'
import { Button, Column, Row } from '../../../../atoms'
import { getGlobalStyle } from '../../../../../helpers'
import { FilterConfigsViewer, type FilterSelection } from './FilterConfigsViewer'

export interface Sort {
  field: string
  direction: 'asc' | 'desc'
}

interface QueryProps {
  sort: Sort
  setSort: (value: Sort) => void
  fields: SortOption[]
  dataFilter?: Array<import('./FilterConfigsViewer').FilterTabDef>
  /** Controlled selection passed down from the parent. */
  selection?: FilterSelection
  onSelectionChange?: (selection: FilterSelection) => void
  /** Resets the viewer selection when changed from false to true. */
  clearTrigger?: boolean
  loadingFilter?: boolean
  errorFilter?: Error | null
  /** Applies the current selection and closes the filter modal. */
  onApplyFilters?: (selection: FilterSelection) => void
  /** Clears all selected filters and reloads the unfiltered product list. */
  onClearFilters?: () => void
  /** Number of filters currently applied. */
  totalActiveFilters?: number
}

/** Filter modal content with a scrollable body and persistent action footer. */
export const Query: React.FC<QueryProps> = ({
  dataFilter,
  selection = {},
  onSelectionChange,
  clearTrigger = false,
  loadingFilter = false,
  errorFilter = null,
  onApplyFilters,
  onClearFilters,
  totalActiveFilters = 0
}) => (
  <Column
    style={{
      padding: getGlobalStyle('--spacing-md'),
      height: '100%',
      minHeight: 0
    }}
  >
    <Column
      style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        flex: 1,
        minHeight: 0
      }}
    >
      <FilterConfigsViewer
        showEmptyMessage={false}
        error={errorFilter}
        loading={loadingFilter}
        tabs={dataFilter ?? []}
        selection={selection}
        onSelectionChange={onSelectionChange}
        clearTrigger={clearTrigger}
      />
    </Column>

    <Row
      style={{
        gap: getGlobalStyle('--spacing-md'),
        paddingTop: getGlobalStyle('--spacing-md'),
        marginTop: getGlobalStyle('--spacing-md'),
        borderTop: `1px solid ${getGlobalStyle('--color-neutral-gray-light')}`,
        flexShrink: 0
      }}
    >
      <Button
        type='button'
        primary={false}
        disabled={totalActiveFilters === 0}
        onClick={() => onClearFilters?.()}
        styles={{ flex: 1 }}
      >
        Limpiar
      </Button>
      <Button
        type='button'
        primary
        onClick={() => onApplyFilters?.(selection)}
        styles={{ flex: 2 }}
      >
        {totalActiveFilters > 0
          ? `Aplicar filtros (${totalActiveFilters})`
          : 'Aplicar filtros'}
      </Button>
    </Row>
  </Column>
)
