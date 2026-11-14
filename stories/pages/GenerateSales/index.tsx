'use client'

import React, {
  useCallback,
  useMemo,
  useState
} from 'react'

import { AwesomeModal } from '../../organisms/AwesomeModal'

import {
  Button,
  Icon,
  Text
} from '../../atoms'

import {
  LayoutSwitcher,
  type Methods,
  Pagination,
  SearchBar
} from '../../molecules'

import type {
  Data,
  ProductFood
} from './types'

import { getGlobalStyle } from '../../../helpers'
import { AsideSales } from './AsideSales'
import type { CashCheckoutView } from './CashPaymentFields'
export { CashPaymentFields } from './CashPaymentFields'
export type { CashCheckoutView } from './CashPaymentFields'

import {
  CategoriesProducts,
  ResisesColumns
} from '../../organisms'

import type {
  MiniCardProductProps
} from '../../organisms/MiniCardProduct/type'

import type {
  Root
} from '../../organisms/CategorieProducts/types'

import { HeaderInfo } from './HeaderInfo'
import styles from './styles.module.css'

import { ProductsSales } from './components/products-sales'

import { type SortOption } from '../../molecules/Sorter'
import { MODAL_SIZES } from '../../molecules/Modal/helpers'

import {
  Query,
  type Sort
} from './components/querys'

import type {
  FilterSelection
} from './components/querys/FilterConfigsViewer'

import { LAYOUT_TYPES } from './constants'
import { ProductsView } from './components/ProductsView'

import {
  PendingOrdersManager
} from '../../organisms/PendingOrdersManager/PendingOrdersManager'

/* =========================================================
   TYPES
========================================================= */

type SalesDividerPositions = Record<string, number>

interface IpropsSliderCategory {
  data: Root[]

  handleChangeCheck: (id: string) => void

  breakpoints: Record<
  string,
  {
    slidesPerView: number | string
    spaceBetween: number | string
  }
  >
}

interface Client {
  clientName: string
  ccClient: string
  ClientAddress: string
  clientNumber: string
}

interface GenerateSalesProps {
  productsFood?: ProductFood[]

  pagination?: {
    currentPage: number
    totalPages: number
  }

  storeTables?:
  | any[]
  | {
    storeTables?: any[]
  }
  | null

  show?: boolean

  loadingProduct?: boolean

  client?: Client

  propsSliderCategory?: IpropsSliderCategory

  openAside?: boolean

  loadingClients?: boolean

  totalProductPrice?: string | number

  /** Unformatted pre-discount eligible subtotal from useSales. */
  discountableSubtotal?: number

  isLoading?: boolean

  /** Checkout is being submitted; independent from catalog loading. */
  isSubmittingSale?: boolean

  data?: Data

  values?: {
    cliId: string
    change: string
    valueDelivery: string
    tableId: string
  }

  errors?: {
    change: boolean
    valueDelivery: boolean
  }

  paymentMethods?: Methods[]

  paymentKind?: 'cash' | 'non-cash' | 'unknown'
  cashCheckout?: CashCheckoutView
  onCashReceivedChange?: (value: string) => void

  dataClientes?: any[]

  handleClickAction?: () => void
  handleRedirectCreateProduct?: () => void
  handleAddProduct?: (
    product: ProductFood
  ) => void

  handleChange?: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void

  dispatch?: React.Dispatch<any>

  fetchMoreProducts?: () => void

  handlePageChange?: (
    pageNumber: number | string
  ) => void

  handleDecrement?: (
    product: ProductFood
  ) => void

  handleFreeProducts?: (
    product: ProductFood
  ) => void

  handleSave?: () => void

  handleChangeFilter?: (
    value: string,
    event?: React.ChangeEvent<HTMLSelectElement>
  ) => void

  handleOpenAside?: () => void

  handleComment?: (
    product: ProductFood
  ) => void

  onClick?: (
    product: MiniCardProductProps
  ) => void

  numberFormat?: (
    value: string | number
  ) => number

  sendNotification?: (
    props: any
  ) => void

  setActiveFilter?: (
    props: any
  ) => void

  activeFilter?: (
    props: any
  ) => void

  setShow?: React.Dispatch<
  React.SetStateAction<boolean>
  >

  dataFilter?: any

  onApplyFilters?: (
    selection: Record<string, Set<string>>
  ) => void

  onClearFilters?: () => void

  highlightedPid?: string

  /* PENDING ORDERS */

  pendingOrders?: any[]

  pendingOrdersCount?: number

  totalStoredOrdersCount?: number

  isPendingOrdersReady?: boolean

  canPersistPendingOrders?: boolean

  handleSavePendingOrder?: (
    payload?: {
      name?: string
      document?: string
      phone?: string
      address?: string
    }
  ) => any

  handleResumePendingOrder?: (...args: any[]) => any

  handleRemovePendingOrder?: (...args: any[]) => any

  handleUpdatePendingOrder?: (...args: any[]) => any

  handleUpdatePendingStatus?: (...args: any[]) => any

  handleClearPendingOrders?: (...args: any[]) => any

  handlePersistPendingOrder?: (...args: any[]) => any

  searchPendingOrders?: any

  /**
   * Initial column positions received from the application.
   *
   * pkg-components does not query Apollo or access the database.
   */
  dividerPosition?: SalesDividerPositions

  /**
   * Indicates whether the application is loading
   * the saved column configuration.
   */
  dividerPositionLoading?: boolean

  /**
   * Notifies the application when the user resizes columns.
   */
  onDividerPositionChange?: (
    positions: SalesDividerPositions
  ) => void
}

/* =========================================================
   RESIZABLE COLUMNS CONFIGURATION
========================================================= */

const INITIAL_SALES_DIVIDER_POSITION: SalesDividerPositions = {
  __0: 66.6667,
  __1: 33.3333
}

/**
 * Validates the positions received from the application.
 */
const normalizeDividerPositions = (
  value: unknown
): SalesDividerPositions | null => {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return null
  }

  const entries = Object.entries(
    value as Record<string, unknown>
  )

  if (entries.length === 0) {
    return null
  }

  const normalized: SalesDividerPositions = {}

  for (const [key, position] of entries) {
    if (
      typeof position !== 'number' ||
      !Number.isFinite(position) ||
      position < 0 ||
      position > 100
    ) {
      return null
    }

    normalized[key] = position
  }

  return normalized
}

/* =========================================================
   COMPONENT
========================================================= */

export const GenerateSales: React.FC<GenerateSalesProps> = ({
  productsFood = [],
  dataClientes = [],
  storeTables = [],
  paymentMethods = [],
  paymentKind,
  cashCheckout,
  onCashReceivedChange,

  propsSliderCategory = {
    data: [],
    handleChangeCheck: () => { },
    breakpoints: {}
  },

  data = {
    PRODUCT: [],
    counter: 0,
    getOneTags: {
      nameTag: ''
    },
    payId: ''
  },

  values = {
    cliId: '',
    change: '',
    valueDelivery: '',
    tableId: ''
  },

  totalProductPrice = '0',
  discountableSubtotal,

  errors = {
    change: false,
    valueDelivery: false
  },

  pagination = {
    currentPage: 1,
    totalPages: 0
  },

  show = false,
  openAside = false,
  isLoading = false,
  isSubmittingSale = false,
  loadingClients = false,

  dataFilter,

  client = {
    clientName: '',
    ccClient: '',
    ClientAddress: '',
    clientNumber: ''
  },

  dispatch = () => { },

  handleFreeProducts = () => { },
  onClick = () => { },
  handlePageChange = () => { },
  handleChange = () => { },
  setShow = () => { },
  handleDecrement = () => { },
  handleSave = () => { },
  handleComment = () => { },
  handleOpenAside = () => { },
  handleChangeFilter = () => { },
  sendNotification = () => { },
  numberFormat = value => Number(value),
  handleAddProduct = () => { },

  pendingOrders = [],
  pendingOrdersCount = 0,
  totalStoredOrdersCount = 0,
  isPendingOrdersReady = true,
  canPersistPendingOrders = false,

  handleSavePendingOrder = () => null,
  handleResumePendingOrder = () => false,
  handleRemovePendingOrder = () => false,
  handleUpdatePendingOrder = () => undefined,
  handleUpdatePendingStatus = () => undefined,
  handleClearPendingOrders = () => false,
  handlePersistPendingOrder = async () => false,

  searchPendingOrders = undefined,

  onApplyFilters = () => undefined,
  onClearFilters = () => undefined,

  highlightedPid = '',

  /**
   * Configuration received from the Next.js application.
   */
  dividerPosition = INITIAL_SALES_DIVIDER_POSITION,
  dividerPositionLoading = false,
  onDividerPositionChange = () => { },
  handleRedirectCreateProduct = () => { }
}) => {
  /* =====================================================
     RESIZABLE COLUMNS
  ====================================================== */

  const normalizedDividerPosition = useMemo(() => {
    const normalized = normalizeDividerPositions(
      dividerPosition
    )

    return normalized ?? {
      ...INITIAL_SALES_DIVIDER_POSITION
    }
  }, [dividerPosition])

  const dividerPositionKey = dividerPositionLoading
    ? 'sales-divider-loading'
    : `sales-divider-${JSON.stringify(normalizedDividerPosition)}`

  const handleSalesColumnsResize = useCallback(
    (positions: unknown) => {
      const normalized = normalizeDividerPositions(
        positions
      )

      if (!normalized) {
        console.warn(
          '[GenerateSales] Posiciones de columnas inválidas:',
          positions
        )

        return
      }

      onDividerPositionChange(normalized)
    },
    [onDividerPositionChange]
  )

  /* =====================================================
     SORT
  ====================================================== */

  const fields: SortOption[] = useMemo(
    () => [
      {
        key: 'name',
        label: 'Nombre',
        defaultDirection: 'asc'
      },
      {
        key: 'created_at',
        label: 'Fecha de creación',
        defaultDirection: 'desc'
      },
      {
        key: 'price',
        label: 'Precio',
        defaultDirection: 'asc'
      }
    ] as SortOption[],
    []
  )

  const [sort, setSort] = useState<Sort>({
    field: 'name',
    direction: 'asc'
  })

  /* =====================================================
     GENERAL STATE
  ====================================================== */

  const [showFilter, setShowFilter] = useState(false)

  const [layout, setLayout] = useState<LAYOUT_TYPES>(
    LAYOUT_TYPES.COLUMN
  )

  const [showPendingOrders, setShowPendingOrders] =
    useState(false)

  /* =====================================================
     FILTER STATE
  ====================================================== */

  const [filterSelection, setFilterSelection] =
    useState<FilterSelection>({})

  const [clearTrigger, setClearTrigger] =
    useState(false)

  const totalActiveFilters = useMemo(
    () => {
      return Object.values(filterSelection).reduce(
        (acc, selection) => acc + selection.size,
        0
      )
    },
    [filterSelection]
  )

  /* =====================================================
     FILTER HANDLERS
  ====================================================== */

  const handleSelectionChange = useCallback(
    (next: FilterSelection) => {
      setFilterSelection(next)
      setClearTrigger(false)
    },
    []
  )

  const handleClearFilters = useCallback(
    () => {
      setFilterSelection({})
      setClearTrigger(true)

      window.requestAnimationFrame(() => {
        setClearTrigger(false)
      })

      onClearFilters()
    },
    [onClearFilters]
  )

  const handleApplyFilters = useCallback(
    (selection: FilterSelection) => {
      onApplyFilters(selection)
      setShowFilter(false)
    },
    [onApplyFilters]
  )

  /* =====================================================
     CLIENT INFORMATION
  ====================================================== */

  const selectedClient = useMemo(
    () => {
      return dataClientes.find(
        (customer: any) =>
          customer?.cliId === values?.cliId
      )
    },
    [dataClientes, values?.cliId]
  )

  const clientInformation = useMemo(
    () => ({
      ...client,
      clientName:
        selectedClient?.clientName ??
        client?.clientName ??
        ''
    }),
    [client, selectedClient]
  )

  /* =====================================================
     STORE TABLES NORMALIZATION
  ====================================================== */

  const normalizedStoreTables = useMemo(() => {
    if (Array.isArray(storeTables)) {
      return storeTables
    }

    if (
      storeTables &&
      Array.isArray(storeTables.storeTables)
    ) {
      return storeTables.storeTables
    }

    return []
  }, [storeTables])

  /* =====================================================
     PAGINATION
  ====================================================== */

  const paginationItems = useMemo(
    () => {
      const totalPages = Math.max(
        0,
        pagination.totalPages
      )

      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      )
    },
    [pagination.totalPages]
  )

  const handleNextPage = useCallback(
    () => {
      const nextPage = Math.min(
        pagination.currentPage + 1,
        pagination.totalPages
      )

      if (nextPage !== pagination.currentPage) {
        handlePageChange(nextPage)
      }
    },
    [
      pagination.currentPage,
      pagination.totalPages,
      handlePageChange
    ]
  )

  const handlePreviousPage = useCallback(
    () => {
      const previousPage = Math.max(
        1,
        pagination.currentPage - 1
      )

      if (previousPage !== pagination.currentPage) {
        handlePageChange(previousPage)
      }
    },
    [
      pagination.currentPage,
      handlePageChange
    ]
  )

  /* =====================================================
     SALE ACTIONS
  ====================================================== */

  const handleCloseSales = useCallback(
    () => {
      setShow(false)
    },
    [setShow]
  )

  const handleRemoveAllProducts = useCallback(
    () => {
      dispatch({
        type: 'REMOVE_ALL_PRODUCTS'
      })
    },
    [dispatch]
  )

  const handleOpenPendingOrders = useCallback(
    () => {
      setShowPendingOrders(true)
    },
    []
  )

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <AwesomeModal
      title='Crea una venta'
      show={show}
      useScroll
      size={MODAL_SIZES.large}
      header
      footer={false}
      height='100vh'
      borderRadius='0'
      onHide={handleCloseSales}
      zIndex={getGlobalStyle('--z-index-high')}
    >

      {/* =================================================
          ADVANCED FILTER MODAL
      ================================================== */}

      <AwesomeModal
        show={showFilter}
        size={MODAL_SIZES.small}
        header
        footer={false}
        customHeight='60vh'
        height='min-content'
        borderRadius={getGlobalStyle('--border-radius-xs')}
        onHide={() => {
          setShowFilter(false)
        }}
        zIndex={getGlobalStyle('--z-index-high')}
      >
        <Query
          fields={fields}
          sort={sort}
          setSort={setSort}
          dataFilter={dataFilter}
          selection={filterSelection}
          onSelectionChange={handleSelectionChange}
          clearTrigger={clearTrigger}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          totalActiveFilters={totalActiveFilters}
        />
      </AwesomeModal>

      {/* =================================================
          MAIN SALES LAYOUT
      ================================================== */}

      <div className={styles.container}>
        {!dividerPositionLoading &&
          <ResisesColumns
            key={dividerPositionKey}
            lastMinWidth='440px'
            padding='0'
            height='100%'
            backgroundColor='transparent'

            initialDividerPosition={
              normalizedDividerPosition
            }
            resizeStep={2}
            disabled={dividerPositionLoading}
            className={styles.sales_resizer}
            onResize={handleSalesColumnsResize}
          >

            {/* =============================================
              LEFT COLUMN
              PRODUCT CATALOG
          ============================================== */}

            <section
              className={styles['products-pane']}
              aria-label='Catálogo de productos'
            >

              {/* ROW 1: CATEGORIES */}

              <div className={styles.header}>
                <CategoriesProducts
                  {...propsSliderCategory}
                />
              </div>

              {/* ROW 2: SEARCH / FILTER / LAYOUT */}

              <div className={styles['header-query']}>

                <div className={styles['header-query__search']}>
                  <SearchBar
                    handleChange={(value, event) => {
                      return handleChangeFilter(
                        value,
                        event
                      )
                    }}
                    padding='0 20px'
                    placeholder='Buscar producto por nombre o código'
                  />
                </div>

                <button
                  type='button'
                  className={`
                  ${styles['header-query__action']}
                  ${showFilter
                      ? styles['header-query__action--active']
                      : ''
                    }
                `}
                  onClick={() => {
                    setShowFilter(true)
                  }}
                  data-test-id='filter-advanced'
                  aria-label='Abrir filtros avanzados'
                  aria-expanded={showFilter}
                >
                  <Text color='primary'>
                    Filtros
                    {totalActiveFilters > 0
                      ? ` (${totalActiveFilters})`
                      : ''}
                  </Text>

                  <Icon
                    size={24}
                    icon='IconLinesFilter'
                    color={getGlobalStyle(
                      '--color-icons-primary'
                    )}
                  />
                </button>

                <button
                  type='button'
                  className={styles['header-query__action--clear']}
                  data-test-id='clear-filters'
                  disabled={totalActiveFilters === 0}
                  onClick={handleClearFilters}
                >
                  <Text
                    color='gray-dark'
                    align='center'
                  >
                    Limpiar
                  </Text>
                </button>

                <div className={styles['header-query__layout']}>
                  <LayoutSwitcher
                    layout={layout}
                    setLayout={setLayout}
                    disabled={false}
                    ariaLabel='Seleccionar tipo de visualización'
                    size='md'
                  />
                </div>

              </div>

              {/* ROW 3: PRODUCTS */}

              <div className={styles['products-view']}>
                <ProductsView
                  layout={layout}
                  productsFood={productsFood}
                  dispatch={dispatch}
                  handleDecrement={handleDecrement}
                  handleAddProduct={handleAddProduct}
                  handleComment={handleComment}
                  sendNotification={sendNotification}
                  handleRedirectCreateProduct={handleRedirectCreateProduct}
                />
              </div>

              {/* ROW 4: PAGINATION */}

              <div className={styles['products-pagination']}>
                <Pagination
                  size='md'
                  currentPage={pagination.currentPage}
                  handleNextPage={handleNextPage}
                  handleOnClick={handlePageChange}
                  handlePrevPage={handlePreviousPage}
                  isVisableButtonLeft={
                    pagination.currentPage > 1
                  }
                  isVisableButtonRight={
                    pagination.currentPage < pagination.totalPages
                  }
                  isVisableButtons={
                    pagination.totalPages > 1
                  }
                  items={paginationItems}
                />
              </div>

            </section>

            {/* =============================================
              RIGHT COLUMN
              SALES CART
          ============================================== */}

            <section
              className={styles['cart-pane']}
              aria-label='Carrito de ventas'
            >

              {/* ROWS 1 + 2: HEADER INFO */}

              <div className={styles['cart-header-info']}>
                <HeaderInfo
                  client={clientInformation}
                  handleOpenAside={handleOpenAside}
                  totalProductPrice={String(totalProductPrice)}
                  productCount={data?.PRODUCT?.length ?? 0}
                  discountPercent={data.discountPercent ?? 0}
                  discountAmount={data?.discountAmount ?? 0}
                  payId={
                    paymentMethods.find(
                      method => method.id === data?.payId
                    )?.name ?? 'Sin seleccionar'
                  }
                />
              </div>

              {/* ROW 3: CART PRODUCTS */}

              <div
                className={styles.content__scrolling}
                style={{
                  display: data?.PRODUCT?.length > 0
                    ? 'grid'
                    : 'block'
                }}
              >
                <ProductsSales
                  onClick={onClick}
                  isLoading={isLoading}
                  data={data}
                  dispatch={dispatch}
                  handleComment={handleComment}
                  handleDecrement={handleDecrement}
                  handleFreeProducts={handleFreeProducts}
                  numberFormat={numberFormat}
                  handleAddProduct={handleAddProduct}
                  highlightedPid={highlightedPid}
                />

                <button
                  type='button'
                  style={{
                    right: '0.3125rem',
                    left: 'unset'
                  }}
                  className={styles.content__categorie__aside}
                  onClick={handleOpenAside}
                  aria-label='Abrir panel lateral'
                >
                  <span />
                </button>

              </div>

              {/* ROW 4: TOTAL + SALE ACTIONS */}

              <div className={styles.content__action}>

                <div className={styles['content__action-summary']}>

                  <div className={styles.content__counter}>
                    <span className={styles.counter}>
                      {data?.counter > 99
                        ? '+99'
                        : data?.counter ?? 0}
                    </span>

                    <Icon
                      size={20}
                      icon='IconInformationProduct'
                      height={20}
                      width={20}
                      color={getGlobalStyle(
                        '--color-icons-primary'
                      )}
                    />
                  </div>

                  <div className={styles['content__action-total']}>
                    <span className={styles['content__action-label']}>
                      Total de la venta
                    </span>

                    <Text
                      align='left'
                      size='2xl'
                      color='gray-dark'
                      lineHeight='2xl'
                      styles={{
                        margin: 0
                      }}
                    >
                      {totalProductPrice}
                    </Text>
                  </div>

                </div>

                <div
                  className={styles['content__action-buttons']}
                  role='group'
                  aria-label='Acciones de la venta'
                >

                  <div className={styles['content__action-button']}>
                    <Button
                      primary={false}
                      disabled={
                        !isPendingOrdersReady ||
                        !data?.PRODUCT?.length
                      }
                      onClick={() => {
                        handleSavePendingOrder({
                          name: client?.clientName,
                          document: client?.ccClient,
                          phone: client?.clientNumber,
                          address: client?.ClientAddress
                        })
                      }}
                    >
                      Enviar a espera
                    </Button>
                  </div>

                  <div className={styles['content__action-button']}>
                    <Button
                      primary={false}
                      disabled={!isPendingOrdersReady}
                      onClick={handleOpenPendingOrders}
                    >
                      Lista de espera ({pendingOrdersCount})
                    </Button>
                  </div>

                  <div className={styles['content__action-button']}>
                    <Button
                      onClick={handleRemoveAllProducts}
                    >
                      Eliminar
                    </Button>
                  </div>

                  <div className={styles['content__action-button']}>
                    <Button
                      primary
                      disabled={!data?.PRODUCT?.length || isSubmittingSale}
                      onClick={handleOpenAside}
                    >
                      Continuar
                    </Button>
                  </div>

                </div>

              </div>

            </section>

          </ResisesColumns>
        }
      </div>

      {/* =================================================
          ASIDE SALES / PAYMENT
      ================================================== */}

      <AsideSales
        values={values}
        paymentMethods={paymentMethods}
        paymentKind={paymentKind}
        cashCheckout={cashCheckout}
        onCashReceivedChange={onCashReceivedChange}
        handleChange={handleChange as any}
        errors={errors}
        dispatch={dispatch}
        handleSave={handleSave}
        client={client}
        disabled={!data?.PRODUCT?.length}
        isSubmittingSale={isSubmittingSale}
        totalProductPrice={String(totalProductPrice)}
        discountableSubtotal={discountableSubtotal}
        discountType={data?.discountType ?? 'PERCENT'}
        discountPercent={data.discountPercent ?? 0}
        discountAmount={data?.discountAmount ?? 0}
        storeTables={normalizedStoreTables as any}
        overline
        payId={data?.payId}
        handleOpenAside={handleOpenAside}
        dataClientes={dataClientes}
        loadingClients={loadingClients}
        openAside={openAside}
      />

      {/* =================================================
          PENDING ORDERS MANAGER
      ================================================== */}

      <PendingOrdersManager
        show={showPendingOrders}
        onHide={() => {
          setShowPendingOrders(false)
        }}
        orders={pendingOrders}
        pendingOrdersCount={pendingOrdersCount}
        totalStoredOrdersCount={totalStoredOrdersCount}
        hasCurrentCart={Boolean(data?.PRODUCT?.length)}
        canPersistPendingOrders={canPersistPendingOrders}
        onResumePendingOrder={handleResumePendingOrder}
        onRemovePendingOrder={handleRemovePendingOrder}
        onUpdatePendingOrder={handleUpdatePendingOrder}
        onUpdatePendingStatus={handleUpdatePendingStatus}
        onClearPendingOrders={handleClearPendingOrders}
        onPersistPendingOrder={handlePersistPendingOrder}
        searchPendingOrders={searchPendingOrders}
      />

    </AwesomeModal>
  )
}
