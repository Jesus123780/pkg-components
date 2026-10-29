import React from 'react'
import type { SortOption } from '../../../../molecules/Sorter'
import { Button, Column, Row } from '../../../../atoms'
import { getGlobalStyle } from '../../../../../helpers'
import { FilterConfigsViewer, type FilterSelection } from './FilterConfigsViewer'

export type Sort = {
  field: string
  direction: 'asc' | 'desc'
}

interface QueryProps {
  sort: Sort
  setSort: (v: { field: string; direction: 'asc' | 'desc' }) => void
  fields: SortOption[]
  dataFilter?: any[]
  /** Controlled selection passed down from parent */
  selection?: FilterSelection
  onSelectionChange?: (selection: FilterSelection) => void
  /** Flipping this to true resets all selections inside the viewer */
  clearTrigger?: boolean
  loadingFilter?: boolean
  errorFilter?: Error | null
  /** Runs the real product search with the current selection, then closes the modal. */
  onApplyFilters?: (selection: FilterSelection) => void
  /** Clears every selected filter and reloads the full product list. */
  onClearFilters?: () => void
  /** Number of filters currently applied (for the Apply button label). */
  totalActiveFilters?: number
}

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
}) => {
  return (
    <Column
      style={{
        padding: getGlobalStyle('--spacing-md'),
        height: '100%'
      }}
    >
      <Column
        style={{
          overflowY: 'auto',
          flex: 1,
          minHeight: 0
        }}
      >
        <FilterConfigsViewer
          className=''
          showEmptyMessage={false}
          error={errorFilter}
          loading={loadingFilter}
          tabs={dataFilter ?? []}
          selection={selection}
          onSelectionChange={onSelectionChange}
          clearTrigger={clearTrigger}
        />
      </Column>

      {/* Footer de acciones */}
      <Row
        style={{
          gap: getGlobalStyle('--spacing-md'),
          paddingTop: getGlobalStyle('--spacing-md'),
          borderTop: `1px solid ${getGlobalStyle('--color-neutral-gray-light')}`,
          marginTop: getGlobalStyle('--spacing-md')
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
}
