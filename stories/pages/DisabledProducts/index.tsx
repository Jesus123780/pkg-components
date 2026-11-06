'use client'

import React, { useCallback, useState } from 'react'
import { AwesomeModal } from '../../organisms/AwesomeModal'
import {
  Section,
  Table,
  TableCell,
  VirtualizedList
} from '../../organisms'
import { Button, CopyToClipboard, Icon, Image, Text } from '../../atoms'
import {
  EmptyData,
  LayoutSwitcher,
  Pagination,
  SearchBar
} from '../../molecules'
import { MODAL_SIZES } from '../../molecules/Modal/helpers'
import type { SortOption } from '../../molecules/Sorter'
import { getGlobalStyle } from '../../../helpers'
import { numberFormat } from '../../../utils'
import { LAYOUT_TYPES } from '../GenerateSales/constants'
import type { ProductFood } from '../GenerateSales/types'
import { Query, type Sort } from '../GenerateSales/components/querys'
import type {
  FilterSelection,
  FilterTabDef
} from '../GenerateSales/components/querys/FilterConfigsViewer'
import styles from './styles.module.css'

export interface DisabledProductsProps {
  /** Disabled products returned by the hook (pState = 0). */
  products?: ProductFood[]
  /** Server pagination info. */
  pagination?: {
    currentPage: number
    totalPages: number
  }
  loading?: boolean
  /** Product id currently being restored (disables its button). */
  restoringId?: string | null
  /** Filter tabs coming from useFilterConfigs. */
  dataFilter?: FilterTabDef[]
  loadingFilter?: boolean
  errorFilter?: Error | null
  /** Changes the page (1-based). */
  handlePageChange?: (pageNumber: number) => void
  /** Search text changed. */
  handleSearch?: (value: string) => void
  /** Applies the raw selection (groupId → Set of value ids). */
  onApplyFilters?: (selection: FilterSelection) => void
  /** Clears every applied filter. */
  onClearFilters?: () => void
  /** Restores (re-enables) a product. */
  handleRestore?: (product: ProductFood) => void
  sendNotification?: (params: {
    description: string
    title: string
    backgroundColor: string
  }) => void
}

const SORT_FIELDS = [
  { key: 'name', label: 'Nombre', defaultDirection: 'asc' },
  { key: 'price', label: 'Precio', defaultDirection: 'asc' }
] as SortOption[]

const TABLE_TITLES = [
  { justify: 'flex-start', name: 'Producto', key: 'pName', width: '2fr', arrow: true },
  { justify: 'flex-end', name: 'Precio', key: 'ProPrice', width: '1fr', arrow: true },
  { justify: 'center', name: 'Stock', key: 'stock', width: '0.8fr', arrow: true },
  {
    justify: 'flex-start',
    name: 'Creado',
    key: 'createdAt',
    width: '1.2fr',
    dataType: 'datetime',
    displayFormat: 'dateTimeMinutes',
    arrow: true
  },
  { justify: 'center', name: 'Acciones', key: 'actions', width: '1fr' }
]

/**
 * Page that lists disabled products with search, advanced filters, a
 * list/columns switcher (Table or virtualized grid) and pagination.
 */
export const DisabledProducts: React.FC<DisabledProductsProps> = ({
  products = [],
  pagination = { currentPage: 1, totalPages: 0 },
  loading = false,
  restoringId = null,
  dataFilter = [],
  loadingFilter = false,
  errorFilter = null,
  handlePageChange = () => { },
  handleSearch = () => { },
  onApplyFilters = () => { },
  onClearFilters = () => { },
  handleRestore = () => { },
  sendNotification = () => { }
}) => {
  const [layout, setLayout] = useState<LAYOUT_TYPES>(LAYOUT_TYPES.LIST)
  const [showFilter, setShowFilter] = useState(false)
  const [sort, setSort] = useState<Sort>({ field: 'name', direction: 'asc' })
  const [filterSelection, setFilterSelection] = useState<FilterSelection>({})
  const [clearTrigger, setClearTrigger] = useState(false)

  const totalActiveFilters = Object.values(filterSelection).reduce(
    (acc, selected) => acc + selected.size,
    0
  )

  const handleSelectionChange = useCallback((next: FilterSelection) => {
    setFilterSelection(next)
    setClearTrigger(false)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilterSelection({})
    setClearTrigger(true)
    requestAnimationFrame(() => setClearTrigger(false))
    onClearFilters()
  }, [onClearFilters])

  const handleApplyFilters = useCallback((selection: FilterSelection) => {
    onApplyFilters(selection)
    setShowFilter(false)
  }, [onApplyFilters])

  const totalPages = pagination?.totalPages ?? 0
  const currentPage = pagination?.currentPage ?? 1

  const renderRestoreButton = (product: ProductFood) => (
    <Button
      type='button'
      primary={false}
      disabled={restoringId === product.pId}
      onClick={(event: React.MouseEvent) => {
        event.stopPropagation()
        handleRestore(product)
      }}
    >
      <Icon icon='IconReload' size={15} />
      <Text>Restaurar</Text>
    </Button>
  )

  const renderCard = (product: ProductFood) => (
    <div className={styles.card}>
      <Image src={product.ProImage} className={styles.card__image} />
      <Text
        size='md'
        color='black'
        weight='medium'
        styles={{ margin: 0 }}
        className={styles.card__name}
      >
        {product.pName}
      </Text>
      <Text color='gray-dark'>{numberFormat(product.ProPrice) ?? 0}</Text>
      {renderRestoreButton(product)}
    </div>
  )

  const renderTableBody = (data: ProductFood[], titles: any[]) =>
    data.map((product, rowIndex) => (
      <Section
        key={`${product.pId}-${rowIndex}`}
        columnWidth={titles}
        style={{ height: '80px', borderRadius: '10px' }}
      >
        <TableCell row={rowIndex} col={1}>
          <div className={styles.product}>
            <Image src={product.ProImage} className={styles.product__image} />
            <div className={styles.product__content}>
              <Text size='xl' color='black' weight='medium' font='regular'>
                {product.pName}
              </Text>
              <CopyToClipboard
                showText
                text={String(product.pId)}
                onCopySuccess={() => {
                  sendNotification({
                    backgroundColor: 'success',
                    description: `El ID ${product.pId} ha sido copiado al portapapeles.`,
                    title: 'Éxito'
                  })
                }}
              />
            </div>
          </div>
        </TableCell>
        <TableCell row={rowIndex} col={2}>
          <Text>{numberFormat(product.ProPrice) ?? 0}</Text>
        </TableCell>
        <TableCell row={rowIndex} col={3}>
          <Text>{product.manageStock === true ? product.stock ?? 0 : 'No aplica'}</Text>
        </TableCell>
        <TableCell row={rowIndex} col={4}>
          <Text>{product.createdAt ? product.createdAt : '-'}</Text>
        </TableCell>
        <TableCell row={rowIndex} col={5}>
          {renderRestoreButton(product)}
        </TableCell>
      </Section>
    ))

  return (
    <div className={styles.container}>
      <AwesomeModal
        show={showFilter}
        size={MODAL_SIZES.small}
        header
        footer={false}
        customHeight='60vh'
        height='min-content'
        borderRadius={getGlobalStyle('--border-radius-xs')}
        onHide={() => setShowFilter(false)}
        zIndex={getGlobalStyle('--z-index-high')}
      >
        <Query
          fields={SORT_FIELDS}
          sort={sort}
          setSort={setSort}
          dataFilter={dataFilter}
          loadingFilter={loadingFilter}
          errorFilter={errorFilter}
          selection={filterSelection}
          onSelectionChange={handleSelectionChange}
          clearTrigger={clearTrigger}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          totalActiveFilters={totalActiveFilters}
        />
      </AwesomeModal>

      <div className={styles.header}>
        <Text as='h1' size='2xl' color='black' weight='medium'>
          Productos deshabilitados
        </Text>
        <Text color='gray-dark'>
          Restaura los productos que dejaste de ofrecer.
        </Text>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.toolbar__search}>
          <SearchBar
            handleChange={(value) => handleSearch(value)}
            padding='0 20px'
            placeholder='Buscar producto por nombre o código'
          />
        </div>
        <button
          type='button'
          className={`${styles.toolbar__action} ${showFilter ? styles['toolbar__action--active'] : ''}`}
          onClick={() => setShowFilter(true)}
          aria-label='Abrir filtros avanzados'
          aria-expanded={showFilter}
        >
          <Text color='primary'>
            Filtros{totalActiveFilters > 0 ? ` (${totalActiveFilters})` : ''}
          </Text>
          <Icon
            size={24}
            icon='IconLinesFilter'
            color={getGlobalStyle('--color-icons-primary')}
          />
        </button>
        <button
          type='button'
          className={styles.toolbar__clear}
          disabled={totalActiveFilters === 0}
          onClick={handleClearFilters}
        >
          <Text color='gray-dark' align='center'>Limpiar</Text>
        </button>
        <LayoutSwitcher
          layout={layout}
          setLayout={(value) => setLayout(value as LAYOUT_TYPES)}
          ariaLabel='Seleccionar tipo de visualización'
          size='md'
        />
      </div>

      <div className={styles.content} aria-busy={loading}>
        {layout === LAYOUT_TYPES.COLUMN
          ? (
            <VirtualizedList
              items={products}
              viewHeight='auto'
              grid
              columns={15}
              minColumnWidth={180}
              columnGap={15}
              itemHeight={250}
              observeResize
              className={styles.grid}
              itemKey={(item: ProductFood, index: number) => `${item.pId}-${index}`}
              emptyComponent={<EmptyData height={250} width={250} />}
              render={renderCard}
            />
            )
          : (
            <div className={styles.content__table}>
              <Table
                pointer
                data={products}
                loading={loading}
                enableKeyboardNav
                enableColumnResize
                enableColumnDrag
                titles={TABLE_TITLES as any}
                renderBody={renderTableBody}
              />
            </div>
            )}
      </div>

      <Pagination
        size='md'
        loading={loading}
        currentPage={currentPage}
        handleNextPage={() => handlePageChange(currentPage + 1)}
        handleOnClick={(pageNumber) => handlePageChange(pageNumber)}
        handlePrevPage={() => handlePageChange(currentPage - 1)}
        isVisableButtonLeft={currentPage > 1}
        isVisableButtonRight={currentPage < totalPages}
        isVisableButtons={totalPages > 1}
        items={Array.from({ length: totalPages }, (_, index) => index + 1)}
      />
    </div>
  )
}
