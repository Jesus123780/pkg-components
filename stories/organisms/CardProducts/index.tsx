import Image from 'next/image'
import React from 'react'
import { PColor } from './../../../assets/colors/index'
import { CardProductsContent, CtnBox, TooltipCardProduct, WrapperCard } from './styled'
import { IconEdit, IconDelete } from '../../../assets'
import { numberFormat } from '../../../utils'
import { type ProductFood } from '../../pages/GenerateSales/types'

interface CardProductsProps {
  isVisible?: boolean
  image?: string | React.ReactNode | null
  food?: ProductFood
  setRef?: any
  isEdit?: boolean
  showDiscount?: boolean
  loading?: boolean
  onClick?: () => void
  redirect?: () => void
  handleDelete?: (food: ProductFood) => ProductFood
}
export const CardProductsComponent: React.FC<CardProductsProps> = ({
  isVisible = false,
  image = null,
  food = {
    ProDescription: '',
    ProDescuento: 0,
    ProImage: '',
    ProPrice: 0,
    pName: '',
    pId: null
  },
  setRef = null,
  isEdit = true,
  showDiscount = true,
  loading = false,
  onClick = () => {

  },
  redirect = () => {

  },
  handleDelete = (food: ProductFood) => {
    return food
  }
}) => {
  const calculateDiscountPercentage = (price: number | string, discount: number | string): number => {
    const parsedPrice = typeof price === 'string' ? parseFloat(price.replace(/\./g, '')) : price
    const parsedDiscount = typeof discount === 'string' ? parseFloat(discount.replace(/\./g, '')) : discount

    if (parsedPrice > 0) {
      const percentage = (parsedDiscount / parsedPrice) * 100
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
                    return handleDelete(food as ProductFood)
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
                  <h3 className='card__description'>{food?.pName}</h3>
                  <h3 className='card__description'>{((food?.ProDescription).length > 0) || ''}</h3>
                  <div className='footer'>
                    <span className={Number(food?.ProPrice) > 0 ? 'card__price' : 'card__price free'}>
                      {Number(food?.ProPrice) > 0 ? `${numberFormat(food?.ProPrice)}` : 'Gratis'}
                    </span>

                    <span className='card__des'>
                      {food?.ProDescuento > 0 ? `${numberFormat(food?.ProDescuento)}` : null}
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
              {image === null && isVisible &&
                <Image
                  alt={food?.ProDescription?.length > 0 ? food.ProDescription : 'img'}
                  blurDataURL='/images/default-banner.png'
                  height={300}
                  layout='fill'
                  objectFit='cover'
                  src={typeof food.ProImage === 'string' && food.ProImage.trim() !== '' ? food.ProImage : '/images/default-banner.png'}
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

export const CardProducts = React.memo(CardProductsComponent)
