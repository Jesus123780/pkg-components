import Image from 'next/image'
import React from 'react'
import { PColor } from './../../../assets/colors/index'
import { CardProductsContent, CtnBox, TooltipCardProduct, WrapperCard } from './styled'
import { IconEdit, IconDelete } from '../../../assets'
import {
  getGlobalStyle,
  hasAvailabilitySchedule,
  isProductAvailableNow,
  numberFormat
} from '../../../utils'
import { type ProductFood } from '../../pages/GenerateSales/types'
import { Icon } from '../../atoms'
import { PercentBadge } from '../../molecules'
import styles from './styles.module.css'

interface CardProductsProps {
  isVisible?: boolean
  image?: string | React.ReactNode | null
  food?: ProductFood
  setRef?: any
  isEdit?: boolean
  showDiscount?: boolean
  /** Show the "available today / not available today" indicator. */
  showAvailability?: boolean
  loading?: boolean
  onClick?: () => void
  redirect?: () => void
  handleDelete?: (food?: ProductFood) => void
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
  showAvailability = true,
  loading = false,
  onClick = () => {

  },
  redirect = () => {

  },
  handleDelete = (food: ProductFood) => {
    return food
  }
}) => {
  // Availability indicator: reads the product weekly schedule (if any) and
  // reflects whether it is available right now. Falls back to either field
  // name used across queries (`product_availables` / `getAllAvailableProduct`).
  const availabilityRecords =
    food?.product_availables ?? food?.getAllAvailableProduct ?? []
  const hasSchedule = hasAvailabilitySchedule(availabilityRecords)
  const availableToday = isProductAvailableNow(availabilityRecords)

  return (
    <div ref={setRef} >
      {
        <WrapperCard loading={loading ? true : undefined}>
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
            {showAvailability && isVisible && (
              <span
                className={styles.availability_badge}
                data-available={availableToday ? 'true' : 'false'}
                title={
                  availableToday
                    ? 'Disponible hoy'
                    : 'No disponible hoy'
                }
              >
                <Icon
                  icon={availableToday ? 'IconSuccess' : 'time'}
                  size={14}
                  color={
                    availableToday
                      ? getGlobalStyle('--color-feedback-success-light')
                      : getGlobalStyle('--color-neutral-gray-dark')
                  }
                />
                <span className={styles.availability_badge_text}>
                  {availableToday
                    ? 'Hoy'
                    : (hasSchedule ? 'Hoy no' : 'Hoy')}
                </span>
              </span>
            )}
            <CtnBox>
              {isVisible && (
                <>
                  <h3 className='card__description'>{food?.pName}</h3>
                  <h3 className='card__description'>{((food?.ProDescription)?.length > 0) || ''}</h3>
                  <div className={styles['card__price-container']}>
                    <span className={Number(food?.ProPrice) > 0 ? 'card__price' : 'card__price free'}>
                      {Number(food?.ProPrice) > 0 ? `${numberFormat(food?.ProPrice)}` : 'Gratis'}
                    </span>

                    <span className='card__des'>
                      {food?.ProDescuento > 0 ? `${numberFormat(food?.ProDescuento)}` : null}
                    </span>
                    {showDiscount && food?.ProDescuento > 0 &&
                      (
                        <PercentBadge
                          baseValue={food?.ProDescuento}
                          compareValue={food?.ProPrice}
                          precision={0}
                          size='small'
                        />
                      )
                    }
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
