import Image from 'next/image'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  IconComment,
  IconDelete,
  IconEdit
} from '../../../assets/icons'
import { Tag } from '../../atoms'
import { RippleButton } from '../../atoms/Ripple'
import { BGColor, PColor } from './../../../assets/colors/index'
import { numberFormat } from './../../../utils/index'
import {
  ActionName,
  Button,
  ButtonCard,
  Card,
  ContainerActions,
  InputCounter,
  ItemProQuantity,
  OverlineCategory,
  OverlineFree,
  WrapperButton,
  WrapperCard
} from './styled'

export const MemoCardProductSimple = ({
  del,
  edit,
  fileInputRef,
  free = false,
  buttonComment = false,
  asComment = false,
  decrement = true,
  increment = true,
  handleFree,
  height,
  index = 0,
  pId,
  pName = '',
  ProDescription = '',
  ProDescuento = 0,
  ProPrice = 0,
  ProQuantity = 0,
  render = null,
  sum,
  margin,
  tag,
  ValueDelivery,
  widthButton,
  activeComment,
  dataExtra = [],
  dataOptional = [],
  dispatch = () => { return },
  handleComment = () => { return },
  handleDecrement = () => { return },
  handleDelete = () => { return },
  handleFreeProducts = () => { return },
  handleIncrement = () => { return },
  onClick = () => { return },
  onFileInputChange = () => { return },
  onTargetClick = () => { return }
}) => {
  const router = useRouter()
  const [startAnimateUp, setStartAnimateUp] = useState('')
  const [animateType, setAnimateType] = useState('')
  const [show, setShow] = useState(false)

  const handle = () => {
    setTimeout(() => {
      setAnimateType('move-up')
      setStartAnimateUp('')
    }, 250)
  }
  const handleDown = (event) => {
    handleDecrement(event)
    setStartAnimateUp('')
    setAnimateType('')
    setTimeout(() => {
      setStartAnimateUp('start-animate-down')
      setTimeout(() => {
        setAnimateType('move-down')
        setStartAnimateUp('')
      }, 150)
    }, 0)
  }

  const handleUp = (event) => {
    handleIncrement(event)
    setStartAnimateUp('')
    setAnimateType('')
    setTimeout(() => {
      setStartAnimateUp('start-animate-up')
      handle()
    }, 0)
  }

  const urlImage = '/images/DEFAULTBANNER.png'

  // Determina si mostrar las categorías
  const showCategories = dataExtra.length > 0 || dataOptional.length > 0

  // Crea los formateados
  const conjunctionFormatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' })
  const unitFormatter = new Intl.ListFormat('es', { style: 'narrow', type: 'unit' })
  // Formatea los datos extras
  const formattedExtraData = dataExtra
    .slice(0, 4)
    .map(product => {return `$ ${numberFormat(product?.extraPrice)}, ${product.extraName}`})
  const finalExtraFormat = conjunctionFormatter.format(formattedExtraData)
  // Formatea los datos opcionales
  const formattedOptionalData = dataOptional
    .slice(0, 4)
    .map(product => {return product?.ExtProductFoodsSubOptionalAll?.map(subProduct => {return subProduct.OptionalSubProName}).join(', ')})
  const finalOptionalFormat = unitFormatter.format(formattedOptionalData)
  // Une las dos listas
  const listCategories = `${finalExtraFormat}, ${finalOptionalFormat}`

  const priceOrFree = ProPrice > 0 ? `$ ${numberFormat(ProPrice)}` : 'Gratis'

  return (
    <>
      <input
        accept='.jpg, .png .jpeg'
        id='iFile'
        onChange={onFileInputChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type='file'
      />
      <WrapperCard margin={margin}>
        {handleFree && (
          <OverlineFree
            free={free}
            onClick={handleFreeProducts}
          >
            <span>Gratis</span>
          </OverlineFree>
        )}
        <Card
          free={free}
          height={height}
          radius='15px'
        >
          {del && (
            <ButtonCard grid={false} onClick={handleDelete}>
              <IconDelete color={PColor} size={20} />
              <ActionName>Eliminar</ActionName>
            </ButtonCard>
          )}
          {buttonComment && (
            <ButtonCard
              delay='.1s'
              grid={false}
              onClick={handleComment}
              right={buttonComment && activeComment}
              tooltip={asComment}
              top='90px'
            >
              <IconComment
                color={asComment ? PColor : 'var(--color-neutral-gray-dark)'}
                size={20}
              />
              <ActionName>Comentar</ActionName>
            </ButtonCard>
          )}
          {edit && (
            <ButtonCard
              delay='.1s'
              grid={false}
              onClick={() => {
                return router.push(`/update/products/editar/${pId}`)
              }}
              top={'80px'}
            >
              <IconEdit color={PColor} size={20} />
              <ActionName>Editar</ActionName>
            </ButtonCard>
          )}

          <div className='dish-card__info'>
            {ValueDelivery > 0 && (
              <span className='description'>
                Domicilio ${' '}
                {ValueDelivery > 0 ? numberFormat(ValueDelivery) : 'Gratis'}
              </span>
            )}

            <div className='flex-wrap'>
              <span className='price'>
                { free === 1 ? 'Gratis' : priceOrFree }
              </span>
              {ProDescuento > 0 && (
                <span className='price discount'>{` $ ${numberFormat(
                  ProDescuento
                )}`}</span>
              )}
            </div>
          </div>
          {sum && (
            <WrapperButton>
              {decrement && (
                <Button
                  delay='.1s'
                  grid={false}
                  onClick={handleDown}
                  top={'80px'}
                >
                  <svg
                    height='24'
                    viewBox='0 0 24 24'
                    width='24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M17.993 11c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1h11.986z'
                      fill={'#ffff'}
                      fillRule='evenodd'
                    >
                      {' '}
                    </path>
                  </svg>
                </Button>
              )}

              <ItemProQuantity className='ProQuantity'>
                <div
                  className='counts--container'
                  onClick={() => {
                    return setShow(index)
                  }}
                >
                  <div className={`count ${startAnimateUp}${animateType}`}>
                    {ProQuantity}
                  </div>
                </div>
                {show === index && (
                  <InputCounter
                    max={999}
                    min={1}
                    onBlur={() => {
                      return setShow(false)
                    }}
                    onChange={(event) => {
                      return dispatch({
                        type: 'ON_CHANGE',
                        payload: {
                          value: event.target.value,
                          name: 'name',
                          index: index,
                          id: pId
                        }
                      })
                    }}
                    onFocus={(event) => {
                      return dispatch({
                        type: 'ON_CHANGE',
                        payload: {
                          value: event.target.value,
                          name: 'name',
                          index: index,
                          id: pId
                        }
                      })
                    }}
                    onKeyDown={(event) => {
                      return event.key === 'Enter' ? setShow(false) : null
                    }}
                    show={show}
                    type='number'
                    value={ProQuantity}
                  />
                )}
              </ItemProQuantity>
              {increment && (
                <Button
                  delay='.1s'
                  grid={false}
                  onClick={handleUp}
                  top={'80px'}
                >
                  <svg
                    height='24'
                    viewBox='0 0 24 24'
                    width='24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13 11h4.993c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H13v4.993C13 18.55 12.556 19 12 19c-.552 0-1-.45-1-1.007V13H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1H11V6.007C11 5.45 11.444 5 12 5c.552 0 1 .45 1 1.007V11z'
                      fill='#ffffff'
                      fillRule='evenodd'
                    ></path>
                  </svg>
                </Button>
              )}
            </WrapperButton>
          )}
          <div className='info-price'>
            <span>
              <h3 className='dish-card__description'>{pName}</h3>
              <span className='description'>{ProDescription}</span>
            </span>
            <ContainerActions>
              {render && (
                <RippleButton
                  bgColor={BGColor}
                  margin='5px auto'
                  onClick={() => {
                    return onClick()
                  }}
                  padding='0'
                  widthButton={widthButton}
                >
                  {render}
                </RippleButton>
              )}
            </ContainerActions>
          </div>
          <div
            className='dish-card__container-image'
            onClick={() => {
              return onTargetClick()
            }}
          >
            <Image
              alt={pName || ''}
              blurDataURL={urlImage}
              className='store_image'
              layout='fill'
              objectFit='cover'
              placeholder='empty'
              src={urlImage}
              unoptimized
            />
          </div>
          {!!tag?.tag && (
            <div className='tag'>
              <Tag label={tag?.tag} />
            </div>
          )}
        </Card>
        {showCategories && (
          <OverlineCategory
            onClick={handleFreeProducts}
          >
            <span>{listCategories}</span>
          </OverlineCategory>
        )}
        {showCategories && (
          <div className='content-dots'>
            <div className='menu-icon'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </WrapperCard>
    </>
  )
}
export const CardProductSimple = React.memo(MemoCardProductSimple)

MemoCardProductSimple.propTypes = {
  ProDescription: PropTypes.any,
  ProDescuento: PropTypes.number,
  ProImage: PropTypes.string,
  ProPrice: PropTypes.any,
  ProQuantity: PropTypes.any,
  ValueDelivery: PropTypes.number,
  activeComment: PropTypes.any,
  asComment: PropTypes.bool,
  buttonComment: PropTypes.bool,
  dataExtra: PropTypes.array,
  dataOptional: PropTypes.array,
  decrement: PropTypes.bool,
  del: PropTypes.any,
  dispatch: PropTypes.func,
  edit: PropTypes.any,
  fileInputRef: PropTypes.any,
  free: PropTypes.number,
  handleComment: PropTypes.func,
  handleDecrement: PropTypes.func,
  handleDelete: PropTypes.func,
  handleFree: PropTypes.any,
  handleFreeProducts: PropTypes.func,
  handleIncrement: PropTypes.func,
  height: PropTypes.any,
  increment: PropTypes.bool,
  index: PropTypes.any,
  key: PropTypes.any,
  margin: PropTypes.any,
  onClick: PropTypes.func,
  onFileInputChange: PropTypes.any,
  onTargetClick: PropTypes.func,
  pId: PropTypes.any,
  pName: PropTypes.string,
  render: PropTypes.any,
  src: PropTypes.any,
  sum: PropTypes.any,
  tag: PropTypes.shape({
    tag: PropTypes.any
  }),
  widthButton: PropTypes.any
}
