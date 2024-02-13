import Image from 'next/image'
import PropTypes from 'prop-types'
import React from 'react'
import { PColor } from './../../../assets/colors/index'
import { CardProductsContent, CtnBox, TooltipCardProduct, WrapperCard } from './styled'
import { IconEdit, IconDelete } from '../../../assets'

export const CardProductsComponent = ({
  isVisible,
  image,
  food = {
    ProDescription: '',
    ProDescuento: 0,
    ProImage: '',
    ProPrice: 0,
    pName: '',
    pId: null
  },
  setRef,
  isEdit = true,
  showDiscount = true,
  loading = false,
  onClick = () => {
    return
  },
  redirect = () => {
    return
  },
  handleDelete = (food) => {
    return food
  }
}) => {
  const calculateDiscountPercentage = (price, discount) => {
    if (!price || !discount) return 0

    const value = typeof price === 'string' ? parseFloat(price.replace(/\./g, '')) : parseFloat(price)
    const valueDiscount = typeof discount === 'string' ? parseFloat(discount.replace(/\./g, '')) : parseFloat(discount)

    if (value && value > 0) {
      const percentage = (valueDiscount / value) * 100
      return Math.round(percentage)
    }
    return 0
  }


  const discountPercentage = calculateDiscountPercentage(food?.ProPrice, food?.ProDescuento)

  return (
    <div ref={setRef} >
      {
        <WrapperCard loading={loading}>
          {isEdit && (
            <>
              <TooltipCardProduct>
                <button onClick={redirect}>
                  <IconEdit color={PColor} size={20} />
                </button>
              </TooltipCardProduct>
              <TooltipCardProduct left='50px'>
                <button
                  onClick={() => {
                    return handleDelete(food)
                  }}
                >
                  <IconDelete color={PColor} size={20} />
                </button>
              </TooltipCardProduct>
            </>
          )}
          <CardProductsContent onClick={onClick}>
            <CtnBox>
              {isVisible && (
                <>
                  <h3 className='card__description'>{food?.pName || ''}</h3>
                  <h3 className='card__description'>{food?.ProDescription || ''}</h3>
                  <div className='footer'>
                    <span className={food?.ProPrice > 0 ? 'card__price' : 'card__price free'}>
                      {food?.ProPrice > 0 ? `$ ${food?.ProPrice}` : 'Gratis'}
                    </span>

                    <span className='card__des'>
                      {food?.ProDescuento > 0 ? `$ ${food?.ProDescuento}` : null}
                    </span>
                    {showDiscount && food?.ProDescuento > 0 && (
                      <span className={discountPercentage > 100 ? 'discount red' : 'discount green'}>
                        {discountPercentage > 100 ? '+100' : discountPercentage}%
                      </span>
                    )}
                  </div>
                </>
              )}
            </CtnBox>
            <CtnBox>
              {!image && isVisible && <Image
                alt={food?.ProDescription || 'img'}
                blurDataURL='/images/DEFAULTBANNER.png'
                height={300}
                layout='fill'
                objectFit='cover'
                src={'/images/DEFAULTBANNER.png' || food.ProImage}
                width={300}
              />}
              {image}
            </CtnBox>
          </CardProductsContent>
        </WrapperCard>
      }
    </div>
  )
}

CardProductsComponent.propTypes = {
  food: PropTypes.shape({
    ProDescription: PropTypes.string,
    ProDescuento: PropTypes.number,
    ProImage: PropTypes.any,
    ProPrice: PropTypes.number,
    pName: PropTypes.string
  }),
  handleDelete: PropTypes.func,
  image: PropTypes.string,
  isEdit: PropTypes.bool,
  isVisible: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  redirect: PropTypes.func,
  setRef: PropTypes.any,
  showDiscount: PropTypes.bool
}
export const CardProducts = React.memo(CardProductsComponent)
