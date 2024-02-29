import PropTypes from 'prop-types'
import React from 'react'
import { AwesomeModal } from '../../organisms/AwesomeModal'
import { Button, Column, Icon, Row, Text } from '../../atoms'
import { EmptyData, Skeleton } from '../../molecules'
import type { Data, ProductFood } from './types'
import { MiniCardProduct } from '../../organisms/MiniCardProduct'
import { getGlobalStyle } from '../../../helpers'
import { AsideSales } from './AsideSales'
import { CategorieProducts } from '../../organisms'
import type { MiniCardProductProps } from '../../organisms/MiniCardProduct/type'
import type { Root } from '../../organisms/CategorieProducts/types'
import { HeaderInfo } from './HeaderInfo'
import styles from './styles.module.css'

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
    valueDelivery: string
  }
  errors?: {
    change: boolean
    valueDelivery: boolean
  }
  dataClientes?: any[]
  handleClickAction?: () => void
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  dispatch?: React.Dispatch<any>
  fetchMoreProducts?: () => void
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
  propsSliderCategory = {
    data: []
  },
  data = {
    PRODUCT: [],
    counter: 0,
    getOneTags: {
      nameTag: ''
    }
  },
  values = {
    cliId: '',
    change: '',
    valueDelivery: ''
  },
  totalProductPrice = 0,
  errors = {
    change: false,
    valueDelivery: false
  },
  show = false,
  openAside = false,
  isLoading = false,
  loadingProduct = false,
  loadingClients = false,
  client = {
    clientName: '',
    ccClient: '',
    ClientAddress: '',
    clientNumber: ''
  },
  dispatch = () => {},
  handleFreeProducts = () => {},
  onClick = (product: MiniCardProductProps) => {
    return product
  },
  fetchMoreProducts = () => {},
  handleChange = () => {},
  setShow = () => {},
  handleDecrement = () => {},
  handleIncrement = () => {},
  handleSave = () => {},
  handleComment = () => {},
  handleOpenAside = () => {},
  numberFormat = (number) => {
    return number
  }
}) => {
  const findChecked = propsSliderCategory.data?.some((item) =>
    Boolean(item?.checked)
  )

  return (
    <AwesomeModal
      title="Crea una venta"
      show={show}
      size="large"
      header
      footer={false}
      borderRadius="0"
      onHide={() => {
        setShow(false)
      }}
      zIndex={getGlobalStyle('--z-index-99999')}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <Column>
            <CategorieProducts {...propsSliderCategory} />
          </Column>
        </div>
        <div className={styles.filter}>
          <Icon
            height={20}
            width={20}
            icon="IconFilter"
            size={20}
            color={
              findChecked
                ? getGlobalStyle('--color-icons-primary')
                : getGlobalStyle('--color-icons-gray')
            }
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
              margin="0 0 20px 0"
              width="100%"
            />
              )
            : null}
          {!isLoading && Boolean(productsFood.length > 0)
            ? (
                productsFood?.map((producto) => {
                  const tag = {
                    tag: producto?.getOneTags?.nameTag
                  }
                  return (
                <MiniCardProduct
                  {...producto}
                  ProDescription={producto.ProDescription}
                  ProDescuento={producto.ProDescuento}
                  ProImage={producto.ProImage}
                  ProPrice={numberFormat(producto.ProPrice)}
                  ProQuantity={producto.ProQuantity}
                  ValueDelivery={producto.ValueDelivery}
                  comment={false}
                  edit={false}
                  key={producto.pId}
                  onClick={() => {
                    dispatch({
                      type: 'ADD_TO_CART',
                      payload: producto
                    })
                  }}
                  pName={producto.pName}
                  render={<Icon size={20} icon="IconSales" />}
                  tag={producto?.getOneTags?.nameTag !== null && tag}
                />
                  )
                })
              )
            : (
            <EmptyData height={200} width={200} />
              )}
        </div>
        <div className={styles.content__action_product}>
          <Button primary={true} onClick={fetchMoreProducts}>
            ver más
          </Button>
        </div>
        <HeaderInfo
          client={client}
          handleOpenAside={handleOpenAside}
          totalProductPrice={totalProductPrice}
          payMethodPState={
            data?.payMethodPState === 1 ? 'TRANSFERENCIA' : 'EFECTIVO'
          }
        />
        <div
          className={styles.content__scrolling}
          style={{ display: data?.PRODUCT?.length > 0 ? 'grid' : 'block' }}
        >
          {!isLoading && data.PRODUCT.length > 0
            ? (
                data.PRODUCT?.map((producto) => {
                  const tag = {
                    tag: producto?.getOneTags?.nameTag ?? ''
                  }
                  const ProQuantity = producto?.ProQuantity ?? 0
                  return (
                <MiniCardProduct
                  {...producto}
                  ProDescription={producto.ProDescription}
                  ProDescuento={producto.ProDescuento}
                  ProImage={producto.ProImage}
                  ProPrice={numberFormat(producto.ProPrice)}
                  ProQuantity={ProQuantity}
                  ValueDelivery={producto.ValueDelivery}
                  withQuantity={true}
                  hoverFree={true}
                  handleComment={() => {
                    handleComment(producto)
                  }}
                  showDot={true}
                  openQuantity={Boolean(ProQuantity)}
                  handleDecrement={() => {
                    handleDecrement(producto)
                  }}
                  handleIncrement={() => {
                    handleIncrement(producto)
                  }}
                  handleFreeProducts={() => {
                    handleFreeProducts(producto)
                  }}
                  handleGetSubItems={() => {
                    onClick(producto)
                  }}
                  edit={false}
                  key={producto.pId}
                  onClick={() => {
                    dispatch({
                      type: 'ADD_TO_CART',
                      payload: producto
                    })
                  }}
                  pName={producto.pName}
                  render={<Icon size={20} icon="IconSales" />}
                  tag={producto?.getOneTags?.nameTag !== null && tag}
                />
                  )
                })
              )
            : (
            <EmptyData height={200} width={200} />
              )}
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
                icon="IconInformationProduct"
                height={20}
                width={20}
                color={getGlobalStyle('--color-icons-primary')}
              />
            </div>
            <Text
              align="center"
              size="2xl"
              color="gray-dark"
              lineHeight="2xl"
              styles={{ margin: '0 20px 0 20px' }}
            >
              {totalProductPrice}
            </Text>
          </Row>
          <Row style={{ width: 'min-content' }}>
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
        handleChange={handleChange}
        errors={errors}
        dispatch={dispatch}
        overline={true}
        paymentMethodTransfer={data?.payMethodPState === 1}
        handleOpenAside={handleOpenAside}
        dataClientes={dataClientes}
        loadingClients={loadingClients}
        openAside={openAside}
      />
    </AwesomeModal>
  )
}

GenerateSales.propTypes = {
  show: PropTypes.bool.isRequired
}
