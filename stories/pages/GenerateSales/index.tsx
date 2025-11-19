import React from 'react'
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
  Skeleton
} from '../../molecules'
import type { Data, ProductFood } from './types'
import { MiniCardProduct } from '../../organisms/MiniCardProduct'
import { getGlobalStyle } from '../../../helpers'
import { AsideSales } from './AsideSales'
import { CategoriesProducts } from '../../organisms'
import type { MiniCardProductProps } from '../../organisms/MiniCardProduct/type'
import type { Root } from '../../organisms/CategorieProducts/types'
import { HeaderInfo } from './HeaderInfo'
import styles from './styles.module.css'
import { SwipeableCard } from '../../molecules/SwipeableCard'

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
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  dispatch?: React.Dispatch<any>
  fetchMoreProducts?: () => void
  handlePageChange?: (pageNumber: number | string) => void
  handleDecrement?: (product: ProductFood) => void
  handleIncrement?: (product: ProductFood) => void
  handleFreeProducts?: (product: ProductFood) => void
  handleSave?: () => void
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
  handleChangeDiscount = () => { },
  setShow = () => { },
  handleDecrement = () => { },
  handleIncrement = () => { },
  handleSave = () => { },
  handleComment = () => { },
  handleOpenAside = () => { },
  numberFormat = (number) => {
    return number
  }
}) => {
  const findChecked = propsSliderCategory.data?.some((item) =>
    Boolean(item?.checked)
  )
  return (
    <AwesomeModal
      title='Crea una venta'
      show={show}
      size='large'
      header
      footer={false}
      borderRadius='0'
      onHide={() => {
        setShow(false)
      }}
      zIndex={getGlobalStyle('--z-index-high')}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <Column>
            <CategoriesProducts {...propsSliderCategory} />
          </Column>
        </div>
        <div className={styles.filter}>
          <Icon
            height={20}
            width={20}
            icon='IconFilter'
            size={20}
            color={getGlobalStyle(findChecked ? '--color-icons-primary' : '--color-icons-gray')}
          />
        </div>
        <div
          className={styles.content__products}
          style={{ display: productsFood?.length > 0 ? 'grid' : 'block' }}
        >
          <button
            className={styles.content__categorie__aside}
            onClick={() => {
              handleOpenAside()
            }}
          >
            <span />
          </button>
          {isLoading
            ? (
              <Skeleton
                height={200}
                numberObject={20}
                margin='0 0 20px 0'
                width='100%'
              />
            )
            : null}
          {!isLoading && Boolean(productsFood.length > 0)
            ? (
              productsFood?.map((product) => {
                const tag = {
                  tag: product?.getOneTags?.nameTag
                }
                const isExistInSale = Boolean(product?.existsInSale)
                const manageStock = Boolean(product?.manageStock)
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
                      })
                    }}
                    handleDecrement={() => {
                      handleDecrement(product)
                    }}
                    handleIncrement={() => {
                      dispatch({
                        type: 'ADD_TO_CART',
                        payload: product
                      })
                    }}
                    pName={product.pName}
                    tag={product?.getOneTags?.nameTag !== null && tag}
                    withStock={true}
                    showInfo={true}
                  />
                )
              })
            )
            : (
              <EmptyData height={200} width={200} />
            )}
        </div>
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
          {!isLoading && data.PRODUCT.length > 0
            ? (
              data.PRODUCT.map((product, index) => {
                const tag = {
                  tag: product?.getOneTags?.nameTag ?? ''
                }
                const ProQuantity = product?.ProQuantity ?? 0

                return (
                  <SwipeableCard
                    key={product.pId}
                    swipeWidth={30}
                    autoClose={true}
                    sticky={false}
                    shake={true}
                    gradientAnimation={false}
                    onDelete={() => {
                      dispatch({ type: 'REMOVE_PRODUCT_TO_CART', payload: product })
                    }}
                    onSwipeUp={() => { 
                      onClick(product)
                    }}
                    rightActions={
                      <Column
                        style={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation() // evita que se propague al card
                            dispatch({ type: 'REMOVE_PRODUCT_TO_CART', payload: product })
                          }}
                          style={{
                            all: 'unset',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 30,
                            height: 30
                          }}
                        >
                          <Icon icon='IconDelete' color={getGlobalStyle('--color-icons-primary')} size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation() // evita que se propague al card
                            handleComment(product)
                          }}
                          style={{
                            all: 'unset',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 30,
                            height: 30,
                            backgroundColor: getGlobalStyle('--color-neutral-gray-dark'),
                          }}
                        >
                          <Icon icon='IconComment' color={getGlobalStyle('--color-icons-white')} size={16} />
                        </button>

                        {/* sub productos  */}
                          <button
                          onClick={(e) => {
                            e.stopPropagation() // evita que se propague al card
                            onClick(product)
                          }}
                          >
                            <Icon size={20} icon='IconBox' />
                          </button>
                      </Column>
                    }
                  >
                    <MiniCardProduct
                      {...product}
                      editing={product.editing}
                      editable={true}
                      canDelete={true}
                      handleDelete={() => {
                        dispatch({ type: 'REMOVE_PRODUCT_TO_CART', payload: product })
                      }}
                      handleChangeQuantity={(event) => {
                        const { value } = event.target
                        return dispatch({
                          type: 'ON_CHANGE',
                          payload: {
                            id: product.pId,
                            index,
                            value
                          }
                        })
                      }}
                      ProDescription={product.ProDescription}
                      ProDescuento={product.ProDescuento}
                      ProImage={product.ProImage}
                      ProPrice={numberFormat(product.ProPrice)}
                      ProQuantity={ProQuantity}
                      handleToggleEditingStatus={() => {
                        dispatch({
                          type: 'TOGGLE_EDITING_PRODUCT',
                          payload: product
                        })
                      }}
                      handleCancelUpdateQuantity={() => {
                        dispatch({
                          type: 'CANCEL_UPDATE_QUANTITY_EDITING_PRODUCT',
                          payload: product
                        })
                      }}
                      handleSuccessUpdateQuantity={() => {
                        dispatch({
                          type: 'UPDATE_SUCCESS_QUANTITY_EDITING_PRODUCT',
                          payload: product
                        })
                      }}
                      ValueDelivery={product.ValueDelivery}
                      withQuantity={true}
                      hoverFree={true}
                      handleComment={() => {
                        handleComment(product)
                      }}
                      showDot={true}
                      openQuantity={Boolean(ProQuantity)}
                      handleDecrement={() => {
                        handleDecrement(product)
                      }}
                      handleIncrement={() => {
                        dispatch({
                          type: 'ADD_TO_CART',
                          payload: product
                        })
                      }}
                      handleFreeProducts={() => {
                        handleFreeProducts(product)
                      }}
                      handleGetSubItems={() => {
                        onClick(product)
                      }}
                      edit={false}
                      onClick={() => {
                        dispatch({
                          type: 'ADD_TO_CART',
                          payload: product
                        })
                      }}
                      pName={product.pName}
                      render={<Icon size={20} icon='IconSales' />}
                      tag={product?.getOneTags?.nameTag !== null && tag}
                    />
                  </SwipeableCard>
                )
              })
            )
            : (
              <EmptyData height={200} width={200} />
            )
          }

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
              disabled={Boolean(data.PRODUCT.length === 0)}
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
