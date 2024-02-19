import PropTypes from 'prop-types'
import React from 'react'
import { AwesomeModal } from '../../organisms/AwesomeModal'
import { Button, Icon, Row, Text } from '../../atoms'
import { Skeleton } from '../../molecules'
import type { Data, Product, ProductFood } from './types'
import { MiniCardProduct } from '../../organisms/MiniCardProduct'
import { getGlobalStyle } from '../../../helpers'
import { AsideSales } from './AsideSales'
import { CategorieProducts } from '../../organisms'
import styles from './styles.module.css'

interface IpropsSliderCategory {
  data: number[]
  checkedItems: Set<string>
  disabledItems: Set<string>
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  breakpoints: Record<
  string,
  {
    slidesPerView: number
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
  handleDecrement?: (product: Product) => void
  handleIncrement?: (product: Product) => void
  handleSave?: () => void
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
}
export const GenerateSales: React.FC<GenerateSalesProps> = ({
  productsFood = [],
  dataClientes = [],
  propsSliderCategory = {},
  data = {
    PRODUCT: [],
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
                  tag={producto?.getOneTags && tag}
                />
              )
            })}
        </div>
        <div className={styles.content__action_product}>
          <Button primary={true} onClick={fetchMoreProducts}>
            ver mas productos
          </Button>
        </div>
        <div className={styles.content__scrolling}>
          {!isLoading &&
            data.PRODUCT?.map((producto) => {
              const tag = {
                tag: producto?.getOneTags?.nameTag ?? ''
              }
              const ProQuantity = producto.ProQuantity
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
                  openQuantity={ProQuantity}
                  handleDecrement={() => {
                    handleDecrement(producto)
                  }}
                  handleIncrement={() => {
                    handleIncrement(producto)
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
            })}
        </div>
        <div className={styles.content__action}>
          <Text align='center' size='2xl' color='default' lineHeight='2xl' styles={{ margin: '0 20px 0 0' }}>
          {totalProductPrice}
          </Text>
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
        </div>
      </div>
    </AwesomeModal>
  )
}

GenerateSales.propTypes = {
  show: PropTypes.bool.isRequired
}
