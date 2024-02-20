import PropTypes from 'prop-types'
import React from 'react'
import { AwesomeModal } from '../../organisms/AwesomeModal'
import {
  Button,
  Icon,
  Row,
  Text
} from '../../atoms'
import { EmptyData, Skeleton } from '../../molecules'
import type {
  Data,
  ProductFood
} from './types'
import { MiniCardProduct } from '../../organisms/MiniCardProduct'
import { getGlobalStyle } from '../../../helpers'
import { AsideSales } from './AsideSales'
import { CategorieProducts } from '../../organisms'
import type { MiniCardProductProps } from '../../organisms/MiniCardProduct/type'
import styles from './styles.module.css'

interface IpropsSliderCategory {
  data: number[]
  checkedItems: Set<string>
  disabledItems: Set<string>
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  breakpoints: Record<
  string,
  {
    slidesPerView: number | string
    spaceBetween: number | string
  }
  >
}
interface GenerateSalesProps {
  productsFood?: ProductFood[]
  show: boolean
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
  onClick?: () => void
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
}
export const GenerateSales: React.FC<GenerateSalesProps> = ({
  productsFood = [],
  dataClientes = [],
  propsSliderCategory = {},
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
  loadingClients = false,
  dispatch = () => {},
  handleClickAction = () => {},
  handleFreeProducts = () => {},
  onClick = (product: MiniCardProductProps) => {
    return product
  },
  fetchMoreProducts = () => {},
  handleChange = () => {},
  setShow = () => {},
  handleDecrement = () => {},
  handleIncrement = () => {},
  handleSave = () => {}
}) => {
  console.log(data)
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
          <Row>
            <CategorieProducts {...propsSliderCategory} />
          </Row>
        </div>
        <div className={styles.content__products}>
          <AsideSales
            values={values}
            errors={errors}
            dataClientes={dataClientes}
            loadingClients={loadingClients}
            openAside={openAside}
          />
          <button className={styles.content__categorie__aside}>
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
          {!isLoading &&
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
                  ProPrice={producto.ProPrice}
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
                  tag={(producto?.getOneTags?.nameTag !== null) && tag}
                />
              )
            })}
        </div>
        <div className={styles.content__action_product} >
          <Button primary={true} onClick={fetchMoreProducts}>
            ver más
          </Button>
        </div>
        <div className={styles.content__scrolling} style={{ display: data?.PRODUCT?.length > 0 ? 'grid' : 'block' }}>
          {!isLoading &&
            (data.PRODUCT.length > 0)
            ? data.PRODUCT?.map((producto) => {
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
                  ProPrice={producto.ProPrice}
                  ProQuantity={ProQuantity}
                  ValueDelivery={producto.ValueDelivery}
                  comment={false}
                  withQuantity={true}
                  hoverFree={true}
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
            : <EmptyData height={200} width={200} />}
        </div>
        <div className={styles.content__action}>
          <Row style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
            <div className={styles.content__counter} >
              <span className={styles.counter} >{data?.counter > 99 ? '+99' : (data?.counter ?? 0)}</span>
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
            <Button onClick={handleSave} primary={true}>
              Guardar
            </Button>
          </Row>
        </div>
      </div>
    </AwesomeModal>
  )
}

GenerateSales.propTypes = {
  show: PropTypes.bool.isRequired
}
