import Image from 'next/image'
import PropTypes from 'prop-types'
import React from 'react'
import { IconDelete, IconEdit } from '../..'
import { PColor } from './../../../assets/colors/index'
import { CardProductsContent, CtnBox, TooltipCardProduct, WrapperCard } from './styled'

export const CardProductsComponent = ({
  isVisible,
  image,
  food,
  setRef,
  isEdit = true,
  onClick = () => {
    return
  },
  redirect = () => {
    return
  },
  handleDelete = () => {
    return
  }
}) => {
  return (
    <div ref={setRef}>
      {
        <WrapperCard>
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
                    <span className='card__price'>$ {food?.ProPrice || 0}</span>
                    <span className='card__des'>$ {food?.ProDescuento}</span>
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
    ProDescuento: PropTypes.any,
    ProImage: PropTypes.any,
    ProPrice: PropTypes.number,
    pName: PropTypes.string
  }),
  handleDelete: PropTypes.func,
  image: PropTypes.any,
  isEdit: PropTypes.bool,
  isVisible: PropTypes.any,
  onClick: PropTypes.func,
  redirect: PropTypes.func,
  setRef: PropTypes.any
}
export const CardProducts = React.memo(CardProductsComponent)
