import PropTypes from 'prop-types'
import Link from 'next/link'
import React from 'react'
import { Text } from '../../atoms'
import { APColor, PColor } from '../../../assets'
import Image from 'next/image'
import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'

export const ProductCheckout = ({
  product = {
    ExtProductFoodsAll: [],
    salesExtProductFoodOptional: [],
    ShoppingCard: '',
    cantProducts: 0,
    productFood: {
      ProDescuento: 0,
      ProPrice: 0,
      ValueDelivery: 0,
      pName: ''
    }
  },
  url = '',
  nameStore,
  comment = '',
  handleEditProduct = (product) => { return product},
  numberFormat = (number) => { return number },
  handleDeleteItemShopping = (product) => { return product},
  sumProduct = (ProPrice, ValueDelivery, quantity ) => { return ProPrice, ValueDelivery, quantity }
}) => {
  const salesExtProductFoodOptional = product?.salesExtProductFoodOptional
  return (
    <div>
      <Link href={url}>
        <a>
          <Text
            color={PColor}
            margin={'10px 0'}
            size='1.325rem'
          >
            {nameStore}
          </Text>
        </a>
      </Link>

      <div>
        <Image
          alt=''
          blurDataURL='/images/cat1.png'
          className='store_image'
          height={100}
          objectFit='cover'
          placeholder='blur'
          src={'/images/cat1.png'}
          width={100}
        />
      </div>
      <div className='item-line'>
        <Text
          color={getGlobalStyle('--color-neutral-black')}
          margin={'10px 0'}
          size={getGlobalStyle('--font-size-2xl')}
        >
          {product.productFood?.pName ?? ''}
        </Text>
        {comment && (
          <Text
            color='#717171'
            margin={'2px 0'}
            size={getGlobalStyle('--font-size-md')}
          >
        Obs: {comment}
          </Text>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '15px 0'
          }}
        >
          <Text color={APColor}>
        ${' '}
            {numberFormat(product.productFood?.ProPrice)}
          </Text>
          <Text color={APColor}>
        Cantidad {numberFormat(product.cantProducts)}
          </Text>
          <Text
            line
            margin='0 0 0 10px'
            size={getGlobalStyle('--font-size-md')}
          >
        ${' '}
            {numberFormat(
              product.productFood?.ProDescuento || 0
            )}
          </Text>
        </div>
        <div className={styles.card_sub_items}>
          {product?.ExtProductFoodsAll?.map((subItem, idx) => {
            const subItemName = `${subItem?.quantity}x ${subItem?.extraName}`
            const isLastItem = idx === product.ExtProductFoodsAll.length - 1
            return (
              <span key={subItem.exPid}>
                {subItemName}
                {isLastItem ? '' : ', '}
              </span>
            )
          })}
          {Boolean(salesExtProductFoodOptional?.length > 0) && ' - '}
          {salesExtProductFoodOptional?.map((productItem, idx) => {
            const subItems = productItem?.ExtProductFoodsSubOptionalAll
            const isLastItem = idx === subItems?.length - 1
            return subItems?.map((subItem, index) => {return (
              <span key={index}>
                {subItem?.OptionalSubProName ? `1x ${subItem?.OptionalSubProName}` : ''}
                {isLastItem ? '' : ', '}
              </span>
            )})
          })}

        </div>

        <div
          className='footer'
          style={{ display: 'flex' }}
        >
          <button
            onClick={() => {
              return handleEditProduct(product)
            }}
            style={{
              backgroundColor: getGlobalStyle(
                '--color-base-transparent'
              )
            }}
          >
            <Text
              color={PColor}
              size={getGlobalStyle('--font-size-md')}
            >
          Editar
            </Text>
          </button>
      &nbsp; &nbsp;
          <button
            onClick={() => {
              return handleDeleteItemShopping(product)
            }}
            style={{
              backgroundColor: getGlobalStyle(
                '--color-base-transparent'
              )
            }}
          >
            <Text
              color={getGlobalStyle(
                '--color-alvi-neutral-gray-dark'
              )}
              margin='0 0 0 10px'
              size={getGlobalStyle('--font-size-md')}
            >
          Eliminar
            </Text>
          </button>
        </div>
      </div>
      <div className={styles.contentTotal}>
        <Text margin='0 0 0 10px'> Subtotal</Text>
        <Text margin='0 0 0 10px'>
      $ {numberFormat(product.productFood?.ProPrice)}
        </Text>
      </div>
      <div className={styles.contentTotal}>
        <Text margin='0 0 0 10px'>Costo de envío</Text>
        {product.productFood?.ValueDelivery !== null ||
    0
          ? (
            <Text margin='0 0 0 10px'>
        ${' '}
              {numberFormat(
                product.productFood?.ValueDelivery
              )}
            </Text>
          )
          : (
            <Text color={APColor}>Gratis</Text>
          )}
      </div>
      <div className={styles.contentTotal}>
        <Text margin='0 0 0 10px'>Costo Final</Text>
        <Text margin='0 0 0 10px'>
      ${' '}
          {numberFormat(
            sumProduct(
              product.productFood?.ProPrice,
              product.productFood?.ValueDelivery,
              product.cantProducts
            )
          )}
        </Text>
      </div>
    </div>
  )
}

ProductCheckout.propTypes = {
  comment: PropTypes.string,
  handleDeleteItemShopping: PropTypes.func,
  handleEditProduct: PropTypes.func,
  nameStore: PropTypes.any,
  numberFormat: PropTypes.func,
  product: PropTypes.shape({
    ExtProductFoodsAll: PropTypes.shape({
      length: PropTypes.number,
      map: PropTypes.func
    }),
    ShoppingCard: PropTypes.any,
    cantProducts: PropTypes.any,
    productFood: PropTypes.shape({
      ProDescuento: PropTypes.number,
      ProPrice: PropTypes.any,
      ValueDelivery: PropTypes.any,
      pName: PropTypes.string
    })
  }),
  sumProduct: PropTypes.func,
  url: PropTypes.any
}
