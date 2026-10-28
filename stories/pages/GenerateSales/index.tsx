'use client'

import React, { useState } from 'react'
import { AwesomeModal } from '../../organisms/AwesomeModal'
import {
  Button,
  Icon,
  Row,
  Text
} from '../../atoms'
import {
  LayoutSwitcher,
  type Methods,
  Pagination,
  SearchBar
} from '../../molecules'
import type { Data, ProductFood } from './types'
import { getGlobalStyle } from '../../../helpers'
import { AsideSales } from './AsideSales'
import { CategoriesProducts } from '../../organisms'
import type { MiniCardProductProps } from '../../organisms/MiniCardProduct/type'
import type { Root } from '../../organisms/CategorieProducts/types'
import { HeaderInfo } from './HeaderInfo'
import styles from './styles.module.css'
import { ProductsSales } from './components/products-sales'
import { type SortOption } from '../../molecules/Sorter'
import { MODAL_SIZES } from '../../molecules/Modal/helpers'
import { Query, type Sort } from './components/querys'
import { LAYOUT_TYPES } from './constants'
import { ProductsView } from './components/ProductsView'
import { PendingOrdersManager } from '../../organisms/PendingOrdersManager/PendingOrdersManager'

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
  pagination: {
    currentPage: number
    totalPages: number
  }
  storeTables: any[]
  show: boolean
  loadingProduct: boolean
  client: Client
  propsSliderCategory?: IpropsSliderCategory
  openAside: boolean
  loadingClients: boolean
  totalProductPrice: string
  isLoading: boolean
  data?: Data
  values?: {
    cliId: string
    change: string
    ValueDelivery: string
    tableId: string
  }
  errors?: {
    change: boolean
    ValueDelivery: boolean
  }
  paymentMethods?: Methods[]
  dataClientes?: any[]
  handleClickAction?: () => void
  handleAddProduct?: (product: ProductFood) => void
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  dispatch?: React.Dispatch<any>
  fetchMoreProducts?: () => void
  handlePageChange?: (pageNumber: number | string) => void
  handleDecrement?: (product: ProductFood) => void
  handleFreeProducts?: (product: ProductFood) => void
  handleSave?: () => void
  handleChangeFilter: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void
  handleOpenAside?: () => void
  handleComment?: (product: ProductFood) => void
  onClick?: () => void
  numberFormat?: (number: string | number) => number
  sendNotification: (props: any) => void
  setActiveFilter: (props: any) => void
  activeFilter: (props: any) => void
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  dataFilter: any
}
export const GenerateSales: React.FC<GenerateSalesProps> = ({
  productsFood = [],
  dataClientes = [],
  storeTables = [],
  paymentMethods = [],
  propsSliderCategory = {
    data: []
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
    ValueDelivery: '',
    tableId: ''
  },
  totalProductPrice = 0,
  errors = {
    change: false,
    ValueDelivery: false
  },
  pagination = {
    currentPage: 1,
    totalPages: 0
  },
  show = false,
  openAside = false,
  isLoading = false,
  loadingClients = false,
  dataFilter,
  client = {
    clientName: '',
    ccClient: '',
    ClientAddress: '',
    clientNumber: ''
  },
  dispatch = () => { },
  setActiveFilter = () => { },
  activeFilter = () => { },
  handleFreeProducts = () => { },
  onClick = (product: MiniCardProductProps) => {
    return product
  },
  handlePageChange = () => { },
  handleChange = () => { },
  setShow = () => { },
  handleDecrement = () => { },
  handleSave = () => { },
  handleComment = () => { },
  handleOpenAside = () => { },
  handleChangeFilter = () => { },
  sendNotification = () => { },
  numberFormat = (number) => {
    return number
  },
  handleAddProduct = (product: ProductFood) => {
    return product
  },
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
}) => {
  const fields = [
    { key: 'name', label: 'Nombre', defaultDirection: 'asc' },
    { key: 'created_at', label: 'Fecha de creación', defaultDirection: 'desc' },
    { key: 'price', label: 'Precio', defaultDirection: 'asc' }
  ] as SortOption[]

  const [sort, setSort] = useState<Sort>({ field: 'name', direction: 'asc' })
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [layout, setLayout] = useState<LAYOUT_TYPES>(LAYOUT_TYPES.COLUMN)
  const [showPendingOrders, setShowPendingOrders] = useState(false)

  return (
    <AwesomeModal
      title='Crea una venta'
      show={show}
      size={MODAL_SIZES.large}
      header
      footer={false}
      animationDuration={420}
      height='100vh'
      borderRadius='0'
      onHide={() => {
        setShow(false)
      }}
      zIndex={getGlobalStyle('--z-index-high')}
    >
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
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </AwesomeModal>
      <div className={styles.container}>
        <div className={styles.header}>
          <CategoriesProducts {...propsSliderCategory} />
        </div>
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
            className={`${styles['header-query__action']} ${showFilter
              ? styles['header-query__action--active']
              : ''
              }`}
            onClick={() => setShowFilter(true)}
            data-test-id='filter-advanced'
            aria-label='Abrir filtros avanzados'
            aria-expanded={showFilter}
          >
            <Text color='primary'>
              Filtros
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

        <ProductsView
          layout={layout}
          productsFood={productsFood}
          dispatch={dispatch}
          handleDecrement={handleDecrement}
          handleAddProduct={handleAddProduct}
          handleComment={handleComment}
          sendNotification={sendNotification}
        />

        <Pagination
          size='md'
          currentPage={pagination.currentPage}
          handleNextPage={() => { return handlePageChange(pagination.currentPage + 1) }}
          handleOnClick={(pageNumber) => { return handlePageChange(pageNumber) }}
          handlePrevPage={() => { return handlePageChange(pagination.currentPage - 1) }}
          isVisableButtonLeft={pagination.currentPage > 1}
          isVisableButtonRight={pagination.currentPage < pagination.totalPages}
          isVisableButtons={Boolean(pagination?.totalPages ?? 0 > 1)}
          items={Array.from({ length: pagination.totalPages ?? 0 }, (_, index) => { return index + 1 })}
        />
        <HeaderInfo
          client={{
            ...client,
            clientName:
              dataClientes.find((c: any) => c?.cliId === values?.cliId)?.clientName ??
              client?.clientName ??
              ''
          }}
          handleOpenAside={handleOpenAside}
          totalProductPrice={totalProductPrice}
          productCount={data?.PRODUCT?.length ?? 0}
          discountPercent={data.discountPercent ?? 0}
          discountAmount={data?.discountAmount ?? 0}
          payId={paymentMethods[Number(data?.payId) - 1]?.name ?? paymentMethods[0]?.name}
        />
        <div
          className={styles.content__scrolling}
          style={{ display: data?.PRODUCT?.length > 0 ? 'grid' : 'block' }}
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
          />

          <button
            style={{ right: '0.3125rem', left: 'unset' }}
            className={styles.content__categorie__aside}
            onClick={() => {
              handleOpenAside()
            }}
          >
            <span />
          </button>
        </div>
        <div className={styles.content__action}>
          {/* Cart summary */}
          <div className={styles['content__action-summary']}>
            <div className={styles.content__counter}>
              <span className={styles.counter}>
                {data?.counter > 99 ? '+99' : data?.counter ?? 0}
              </span>

              <Icon
                size={20}
                icon='IconInformationProduct'
                height={20}
                width={20}
                color={getGlobalStyle('--color-icons-primary')}
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
                styles={{ margin: 0 }}
              >
                {totalProductPrice}
              </Text>
            </div>
          </div>

          {/* Sale actions */}
          <div
            className={styles['content__action-buttons']}
            role='group'
            aria-label='Acciones de la venta'
          >
            <div className={styles['content__action-button']}>
              <Button
                primary={false}
                disabled={!isPendingOrdersReady || !data?.PRODUCT?.length}
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
                onClick={() => setShowPendingOrders(true)}
              >
                Lista de espera ({pendingOrdersCount})
              </Button>
            </div>

            <div className={styles['content__action-button']}>
              <Button
                onClick={() => {
                  dispatch({ type: 'REMOVE_ALL_PRODUCTS' })
                }}
              >
                Eliminar
              </Button>
            </div>

            <div className={styles['content__action-button']}>
              <Button
                primary={true}
                disabled={!data?.PRODUCT?.length}
                onClick={handleOpenAside}
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AsideSales
        values={values}
        paymentMethods={paymentMethods}
        handleChange={handleChange as any}
        errors={errors}
        dispatch={dispatch}
        handleSave={handleSave}
        client={client}
        totalProductPrice={totalProductPrice}
        discountPercent={data.discountPercent ?? 0}
        discountAmount={data?.discountAmount ?? 0}
        discountResetKey={data?.PRODUCT?.length ?? 0}
        storeTables={storeTables.storeTables as any}
        overline={true}
        payId={data?.payId}
        handleOpenAside={handleOpenAside}
        dataClientes={dataClientes}
        loadingClients={loadingClients}
        openAside={openAside}
      />
      <PendingOrdersManager
        show={showPendingOrders}
        onHide={() => setShowPendingOrders(false)}
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
    </AwesomeModal >
  )
}
