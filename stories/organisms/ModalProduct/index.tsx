import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { BGColor, PColor, PLColor } from '../../../assets/colors'
import {
  IconArrowBottom,
  IconMiniCheck
} from '../../../assets/icons'
import { numberFormat } from '../../../utils'
import { Checkbox, Overline, RippleButton, Tag, Text } from '../../atoms'
import { InputHooks, QuantityButton } from '../../molecules'
import {
  CardsComponent,
  ContainerModal,
  DisRestaurant,
  GarnishChoicesHeader
} from './styled'
import styles from './ModalProduct.module.css'
import React from 'react'

/**
 * Represents a modal displaying product information and options.
 * @param {Object} props - The props object.
 * @param {Object} [props.dataOneProduct={ pId: null }] - The data for one product.
 * @param {Array} [props.dataOptional=[]] - Optional data for additional product options.
 * @param {boolean} [props.show=false] - Flag indicating whether the modal should be shown.
 * @param {string} [props.comments=''] - Comments related to the product.
 * @param {number} [props.quantity=1] - The quantity of the product.
 * @param {boolean} [props.disabled=true] - Flag indicating whether the product is disabled.
 * @param {boolean} [props.loading=false] - Flag indicating whether the product is in a loading state.
 * @param {Array} [props.dataExtra=[]] - Extra data related to the product.
 * @param {Function} [props.handleShowModalProduct=()=>{}] - Function to handle showing/hiding the modal.
 * @param {Function} [props.setComments=(comment)=>comment] - Function to set comments related to the product.
 * @param {Function} [props.handleDecrementExtra=()=>{}] - Function to handle decrementing extra product options.
 * @param {Function} [props.handleIncrementExtra=()=>{}] - Function to handle incrementing extra product options.
 * @param {Function} [props.handleDecrease=()=>{}] - Function to handle decreasing the quantity of the product.
 * @param {Function} [props.handleIncrease=()=>{}] - Function to handle increasing the quantity of the product.
 * @param {Function} [props.handleAddOptional=({ exOptional, codeCategory })=>({ exOptional, codeCategory })] - Function to handle adding optional product options.
 * @param {Function} [props.useEvents=(args)=>args] - Function to use events related to the product.
 * @param {Function} [props.handleAddProducts=()=>{}] - Function to handle adding products.
 * @param {Function} [props.handleCountProducts=({ ProPrice, quantity })=>({ ProPrice, quantity })] - Function to handle counting products.
 * @returns {JSX.Element} JSX element representing the modal.
 */
export const ModalProduct = ({
  dataOneProduct = {
    pId: null
  },
  dataOptional = [],
  show = false,
  loadingButton = false,
  comments = '',
  quantity = 1,
  disabled = true,
  loading = false,
  dataExtra = [],
  handleShowModalProduct = () => {

  },
  setComments = (comment) => {
    return comment
  },
  handleDecrementExtra = () => {

  },
  handleIncrementExtra = () => {

  },
  handleDecrease = () => {

  },
  handleIncrease = () => {

  },
  handleAddOptional = ({ exOptional, codeCategory }) => {
    return {
      exOptional,
      codeCategory
    }
  },
  useEvents = (args) => {
    return args
  },
  handleAddProducts = () => {

  },
  handleCountProducts = ({
    ProPrice,
    quantity
  }) => {
    return {
      ProPrice,
      quantity
    }
  }
}) => {
  const {
    ProDescription,
    ProDescuento,
    ProPrice,
    getStore,
    pName
  } =
    dataOneProduct || {
      ProDescription: '',
      ProDescuento: 0,
      ProPrice: 0,
      getStore: {},
      pName: ''
    }

  useEvents({
    eventType: 'app.cart',
    callBack: ({ detail: { items } }) => {
      // handleMutate(items)
    }
  })
  const storeUrl = `/delivery/${getStore?.city?.cName?.toLocaleLowerCase()}-${getStore?.department?.dName?.toLocaleLowerCase()}/${
    getStore?.storeName
  }/${getStore?.idStore}`
  return (
    <ContainerModal showModal={show}>
      <Overline
        bgColor='rgba(0, 0, 0, 0.322)'
        onClick={handleShowModalProduct}
        show={show}
        zIndex='99999'
      />
      <div className={`${styles.content_modal} ${show && styles.show}`} >
        <div className={styles['content__img-container']}>
          <Image
            alt='Picture'
            blurDataURL='data:...'
            height={450}
            objectFit='contain'
            placeholder='blur'
            src={'/images/hamb.jpg'}
            width={450}
          />
        </div>
        <header className={styles.content_header}>
          <Text className={styles['nav-header__title']} color={PLColor}>
            {pName}
          </Text>
          <button
            className={styles.button_close}
            onClick={handleShowModalProduct}
            onMouseDown={handleShowModalProduct}
          >
            <IconArrowBottom color={PColor} size={20} />
          </button>
        </header>
        <div className={styles.content__scrolling}>
          <div className={styles['content__img-container_mobile']}>
            <Image
              alt='Picture'
              blurDataURL='data:...'
              height={450}
              objectFit='contain'
              placeholder='blur'
              src={'/images/hamb.jpg'}
              width={450}
            />
          </div>
          <p className={styles.description} color={PLColor}>
            {ProDescription}
          </p>
          {ProDescuento && <Text
            className={styles.description}
            color={PLColor}
            margin='12px 0 0 5px'
            size='14px'
            style={{ textDecoration: 'line-through' }}
          >
                    $ {numberFormat(ProDescuento)}
          </Text>}
          <DisRestaurant>
            <Link href={storeUrl}>
              <a>
                <Text
                  className='dish-restaurant__header'
                  margin='12px 0'
                  size='14px'
                >
                  {' '}
                  {getStore?.storeName}
                </Text>
              </a>
            </Link>
            <div className='dish-restaurant__divisor'></div>
            <label className='dish-observation-form__label'>
              ¿Algún comentario?
            </label>
          </DisRestaurant>
          <InputHooks
            name='comments'
            onChange={(e) => {
              return setComments(e.target.value)
            }}
            typeTextarea
            value={comments}
          />
          {!!dataExtra?.length && (
            <GarnishChoicesHeader>
              <div>
                <p className='garnish-choices__title'>Adicionales</p>
                <p className='garnish-choices__title-desc'>
                  Escoge las opciones.
                </p>
              </div>
              <IconMiniCheck color='#009b3a' size={'15px'} />
            </GarnishChoicesHeader>
          )}
          {dataExtra?.length > 0 &&
            dataExtra?.map((extra, index) => {
              const contentPrice =
                extra.extraPrice === 0 && extra.quantity == 0
              return (
                <CardsComponent key={extra.exPid}>
                  <div>
                    <h3 className='title_card'>{extra.extraName}</h3>
                    <h3
                      className={`price ${!contentPrice ?? 'price'}`}
                    >
                      {' '}
                      {!contentPrice
                        ? `$ ${numberFormat(
                          (extra?.newExtraPrice ?? extra.extraPrice) || 0
                        )}`
                        : 'Gratis'}
                    </h3>
                    {extra.exState === 1 && <Tag label='OBLIGATORIO' />}
                  </div>
                  <QuantityButton
                    border='none'
                    disabled={false}
                    handleDecrement={() => {
                      return handleDecrementExtra({ extra, index })
                    }}
                    handleIncrement={() => {
                      return handleIncrementExtra({ extra, index })
                    }}
                    padding='5px'
                    quantity={extra.quantity}
                    showNegativeButton={extra.quantity === 0}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    validationZero={false}
                    width='min-content'
                  />
                </CardsComponent>
              )
            })}
          {dataOptional?.map((itemOptional) => {
            return (
              <div key={itemOptional.opExPid}>
                <GarnishChoicesHeader>
                  <div>
                    <p className='garnish-choices__title'>
                      {itemOptional.OptionalProName}
                    </p>
                    <p className='garnish-choices__title-desc'>
                      Escoge hasta {itemOptional.numbersOptionalOnly} opciones.
                    </p>
                  </div>
                  <IconMiniCheck color={'#009b3a'} size={'15px'} />
                </GarnishChoicesHeader>
                {itemOptional?.ExtProductFoodsSubOptionalAll?.map((x) => {
                  return (
                    <CardsComponent key={x.opSubExPid}>
                      <div>
                        <h3 className='title_card'>{x.OptionalSubProName}</h3>
                      </div>
                      <Checkbox
                        checked={x?.check}
                        id={`subOptional_${x?.opSubExPid}`}
                        name='subOptional'
                        onChange={() => {
                          return handleAddOptional({
                            exOptional: x.opSubExPid,
                            codeCategory: itemOptional?.code
                          })
                        }}
                        type='checkbox'
                        value={x?.check}
                      />
                    </CardsComponent>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className={styles.content__action}>
          <QuantityButton
            disabled={false}
            handleDecrement={handleDecrease}
            handleIncrement={handleIncrease}
            padding='5px'
            quantity={handleCountProducts(ProPrice, quantity)}
            style={{ margin: '0 20px 0 0', width: '60%' }}
            validationOne={quantity === 1}
          />
          <RippleButton
            color={BGColor}
            disabled={disabled && loading}
            onClick={() => {
              return handleAddProducts(dataOneProduct)
            }}
            loading={loadingButton}
            padding='5px'
            size='12px'
          >
            Agregar Hola
          </RippleButton>
        </div>
      </div>
    </ContainerModal>
  )
}

ModalProduct.propTypes = {
  comments: PropTypes.string,
  dataExtra: PropTypes.array,
  dataOneProduct: PropTypes.object,
  dataOptional: PropTypes.array,
  disabled: PropTypes.bool,
  handleAddOptional: PropTypes.func,
  handleAddProducts: PropTypes.func,
  handleCountProducts: PropTypes.func,
  handleDecrease: PropTypes.func,
  handleDecrementExtra: PropTypes.func,
  handleIncrease: PropTypes.func,
  handleIncrementExtra: PropTypes.func,
  handleShowModalProduct: PropTypes.func,
  loading: PropTypes.bool,
  quantity: PropTypes.number,
  setComments: PropTypes.func,
  show: PropTypes.bool,
  useEvents: PropTypes.func
}
