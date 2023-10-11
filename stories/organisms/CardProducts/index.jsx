import React from 'react'
import {
  CardProductsContent,
  CtnBox,
  TooltipCardProduct,
  WrapperCard
} from "./styled"
import { IconDelete, IconEdit } from '../..'
import { PColor } from './../../../assets/colors/index'
import Image from 'next/image'

export const CardProductsComponent = ({
  isVisible,
  image,
  food,
  setRef,
  isEdit = true,
  onClick = () => { return },
  redirect = () => { return },
  handleDelete = () => { return },
}) => {
  return (
    <div ref={setRef}>
      {
        <WrapperCard>
          {isEdit &&
            <>
              <TooltipCardProduct>
                <button
                  onClick={redirect}
                >
                  <IconEdit color={PColor} size={20} />
                </button>
              </TooltipCardProduct>
              <TooltipCardProduct left="50px">
                <button
                  onClick={() => {
                    return handleDelete(food)
                  }}
                >
                  <IconDelete color={PColor} size={20} />
                </button>
              </TooltipCardProduct>
            </>
          }
          <CardProductsContent onClick={onClick}>
            <CtnBox>
              {isVisible && (
                <>
                  <h3 className="card__description">{food?.pName ||''}</h3>
                  <h3 className="card__description">{food?.ProDescription || ''}</h3>
                  <div className="footer">
                    <span className="card__price">$ {food?.ProPrice || 0}</span>
                    <span className="card__des">$ {food?.ProDescuento}</span>
                  </div>
                </>
              )}
            </CtnBox>
            <CtnBox>
              {(!image && isVisible) && (
                <Image
                  alt={food?.ProDescription || "img"}
                  blurDataURL="/images/DEFAULTBANNER.png"
                  layout="fill"
                  width={300}
                  height={300}
                  objectFit="cover"
                  src={"/images/DEFAULTBANNER.png" || food.ProImage}
                />
              )}
              {image}
            </CtnBox>
          </CardProductsContent>
        </WrapperCard>
      }
    </div>
  )
}
export const CardProducts = React.memo(CardProductsComponent)
