import Image from 'next/image'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import React, { useState } from 'react'
import {
  IconComment,
  IconDelete,
  IconEdit,
  IconPlus,
} from '../../../assets/icons'
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
  WrapperCard,
} from './styled'
import { RippleButton } from '../../atoms/Ripple'
import { numberFormat } from './../../../utils/index'
import { PColor, BGColor } from './../../../assets/colors/index'
import { Tag } from '../../atoms'

export const MemoCardProductSimple = ({
  del,
  edit,
  fileInputRef,
  free,
  buttonComment = false,
  asComment = false,
  decrement = true,
  increment = true,
  handleDecrement,
  handleFree,
  handleIncrement,
  height,
  index,
  onFileInputChange,
  pId,
  pName,
  ProDescription,
  ProDescuento = 0,
  ProImage,
  ProPrice,
  ProQuantity,
  render = null,
  src,
  sum,
  margin,
  tag,
  ValueDelivery,
  widthButton,
  activeComment,
  dataExtra = [],
  dataOptional = [],
  dispatch = () => {
    return
  },
  handleComment = () => {
    return
  },
  handleDelete = () => {
    return
  },
  handleFreeProducts = () => {
    return
  },
  onClick = () => {
    return
  },
  onTargetClick = () => {
    return
  },
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
  const showCategories = dataExtra.length > 0 || dataOptional.length > 0
  const formatter = new Intl.ListFormat('es', {
    style: 'long',
    type: 'conjunction',
  })
  const formatterOptional = new Intl.ListFormat('es', {
    style: 'narrow',
    type: 'unit',
  })
  const ListFormat = dataExtra
    .map((product) => {
      return `$ ${numberFormat(product?.extraPrice)}, ${product.extraName}`
    })
    .slice(0, 4)
  const ListFormatOptional = dataOptional
    ?.map((product) => {
      return product?.ExtProductFoodsSubOptionalAll?.map((subProduct) => {
        return `${subProduct.OptionalSubProName}` || ''
      })
    })
    .slice(0, 4)
  const finalListFormat = formatter?.format(ListFormat) || ''
  const finalOptional = [...ListFormatOptional]
  const finalListFormatOptional =
    formatterOptional?.format(finalOptional[0]) || ''
  const listCategories = `${finalListFormat}, ${finalListFormatOptional}`

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
        <Card free={free} height={height} radius='15px'>
          {del && (
            <ButtonCard grid={false} onClick={handleDelete}>
              <IconDelete color={PColor} size={20} />
              <ActionName>Eliminar</ActionName>
            </ButtonCard>
          )}
          {buttonComment && (
            <ButtonCard
              tooltip={asComment}
              delay='.1s'
              grid={false}
              onClick={handleComment}
              right={buttonComment && activeComment}
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
                $ {ProPrice ? numberFormat(ProPrice) || free === 1 : 'Gratis'}
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
                          id: pId,
                        },
                      })
                    }}
                    onFocus={(event) => {
                      return dispatch({
                        type: 'ON_CHANGE',
                        payload: {
                          value: event.target.value,
                          name: 'name',
                          index: index,
                          id: pId,
                        },
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
              unoptimized
              layout='fill'
              placeholder='empty'
              objectFit='cover'
              src={urlImage}
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
  ProDescuento: PropTypes.number || PropTypes.string,
  ProImage: PropTypes.string,
  ProPrice: PropTypes.any,
  ValueDelivery: PropTypes.number,
  del: PropTypes.any,
  edit: PropTypes.any,
  handleDelete: PropTypes.func,
  key: PropTypes.any,
  onClick: PropTypes.func,
  pId: PropTypes.any,
  pName: PropTypes.any,
  render: PropTypes.any,
  widthButton: PropTypes.any,
}
