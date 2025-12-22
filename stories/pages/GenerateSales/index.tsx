import React, { useState } from 'react'
import { AwesomeModal } from '../../organisms/AwesomeModal'
import {
  Button,
  Column,
  Icon,
  Row,
  Text
} from '../../atoms'
import {
  EmptyData,
  type Methods,
  Pagination,
  SearchBar,
  Skeleton,
  Stepper
} from '../../molecules'
import type { Data, ProductFood } from './types'
import { MiniCardProduct } from '../../organisms/MiniCardProduct'
import { getGlobalStyle } from '../../../helpers'
import { AsideSales } from './AsideSales'
import { CategoriesProducts, VirtualizedList } from '../../organisms'
import type { MiniCardProductProps } from '../../organisms/MiniCardProduct/type'
import type { Root } from '../../organisms/CategorieProducts/types'
import { HeaderInfo } from './HeaderInfo'
import styles from './styles.module.css'
import { SwipeableCard } from '../../molecules/SwipeableCard'
import { ProductsSales } from './components/products-sales'
import InputHooks from '../../molecules/Inputs/InputHooks/InputHooks'
import Sorter, { SortOption } from '../../molecules/Sorter'
import { MODAL_SIZES } from '../../molecules/Modal/helpers'
import { Query, Sort } from './components/querys'

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
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
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
  client = {
    clientName: '',
    ccClient: '',
    ClientAddress: '',
    clientNumber: ''
  },
  dispatch = () => { },
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
  numberFormat = (number) => {
    return number
  },
  handleAddProduct = (product: ProductFood) => {
    return product
  }
}) => {
  const findChecked = propsSliderCategory.data?.some((item) =>
    Boolean(item?.checked)
  )
  const fields = [
    { key: 'name', label: 'Nombre', defaultDirection: 'asc' },
    { key: 'created_at', label: 'Fecha de creación', defaultDirection: 'desc' },
    { key: 'price', label: 'Precio', defaultDirection: 'asc' }
  ] as SortOption[]
  
  const [sort, setSort] = useState<Sort>({ field: 'name', direction: 'asc' })
 const [showFilter, setShowFilter] = useState<boolean>(false)
  return (
    <AwesomeModal
      title='Crea una venta'
      show={show}
      size={MODAL_SIZES.large}
      header
      footer={false}
      height='100vh'
      borderRadius='0'
      onHide={() => {
        setShow(false)
      }}
      zIndex={getGlobalStyle('--z-index-high')}
    >
      <AwesomeModal
        title='Realiza filtrado avanzado'
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
        />
      </AwesomeModal>
      <div className={styles.container}>
        <div className={styles.header}>
          <CategoriesProducts {...propsSliderCategory} />
        </div>
        <div className={styles['header-query']}>
          <SearchBar
            handleChange={(value, event) => {
              return handleChangeFilter(value, event)
            }}
            padding='0px 20px'
            placeholder='Buscar producto por nombre o código'
          />
          <div className={styles.header__actions_filter} onClick={() => setShowFilter(true)}>
            <Row alignItems='center'>
              <Text color='primary'>
                Filtros
              </Text>
              <Icon
                size={60}
                icon='IconLinesFilter'
                color={getGlobalStyle('--color-icons-primary')}
              />
            </Row>
          </div>
        </div>
        <VirtualizedList
          items={productsFood}
          viewHeight="auto"
          grid={true}
          columns={15}  // Si no quieres calcular columnas automáticamente, mantén esto.
          minColumnWidth={120} // Esto asegura un ancho mínimo para las tarjetas.
          columnGap={15}  // Espacio entre columnas
          itemHeight={300}  // Fijo o dinámico si se requiere.
          observeResize={true}  // Autoajuste del grid con ResizeObserver
          className={styles.content__products}
          emptyComponent={<EmptyData />}
          render={(product) => {
            const tag = {
              tag: product?.getOneTags?.nameTag
            };
            const isExistInSale = Boolean(product?.existsInSale);
            const manageStock = Boolean(product?.manageStock);

            return (
              <MiniCardProduct
                {...product}
                openQuantity={isExistInSale}
                withQuantity={true}
                style={manageStock ? { quantity_container: { top: 35 } } : {}}
                ProDescription={product.ProDescription}
                ProDescuento={product.ProDescuento}
                ProImage={product.ProImage}
                ProPrice={numberFormat(product.ProPrice)}
                ProQuantity={product.ProQuantity}
                ValueDelivery={product.ValueDelivery}
                comment={false}
                edit={false}
                key={product.pId}
                onClick={() => {
                  dispatch({
                    type: 'ADD_TO_CART',
                    payload: product
                  });
                }}
                handleDecrement={() => {
                  handleDecrement(product)
                }}
                handleIncrement={() => {
                  handleAddProduct(product)
                }}
                pName={product.pName}
                tag={product?.getOneTags?.nameTag !== null && tag}
                withStock={true}
                showInfo={true}
              />
            );
          }}
        />

        <Pagination
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
          client={client}
          handleOpenAside={handleOpenAside}
          totalProductPrice={totalProductPrice}
          payId={paymentMethods[data?.payId - 1]?.name ?? paymentMethods[0]?.name}
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
          <Row style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
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
            <Text
              align='center'
              size='2xl'
              color='gray-dark'
              lineHeight='2xl'
              styles={{ margin: '0 20px 0 20px' }}
            >
              {totalProductPrice}
            </Text>
          </Row>
          <Row style={{ width: 'min-content', display: 'flex' }}>
            <Button
              onClick={() => {
                dispatch({ type: 'REMOVE_ALL_PRODUCTS' })
              }}
            >
              Eliminar
            </Button>
            <Button
              disabled={Boolean(data?.PRODUCT?.length === 0)}
              onClick={handleSave}
              primary={true}
            >
              Guardar
            </Button>
          </Row>
        </div>
      </div>
      <AsideSales
        values={values}
        paymentMethods={paymentMethods}
        handleChange={handleChange as any}
        errors={errors}
        dispatch={dispatch}
        discount={0}
        storeTables={storeTables as any}
        overline={true}
        payId={data?.payId}
        handleOpenAside={handleOpenAside}
        dataClientes={dataClientes}
        loadingClients={loadingClients}
        openAside={openAside}
      />
    </AwesomeModal >
  )
}
