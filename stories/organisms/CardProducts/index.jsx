import React from 'react';
import {
  CardProductsContent,
  CtnBox,
  TooltipCardProduct,
  WrapperCard
} from "./styled";

export const CardProductsComponent = ({
  router,
  onClick,
  isVisible,
  image,
  food,
  setRef,
  redirect = () => { return },
  handleDelete = () => { return },
}) => {
  return (
    <div ref={setRef}>
      {
        <WrapperCard>
          <TooltipCardProduct>
            <button
              onClick={redirect}
            >
              {/* <dispatchEvent color={PColor} size={20} /> */}
            </button>
          </TooltipCardProduct>
          <TooltipCardProduct left="50px">
            <button
              onClick={() => {
                return handleDelete(food);
              }}
            >
              <div color={"PColor"} size={20} />
            </button>
          </TooltipCardProduct>
          <CardProductsContent onClick={onClick}>
            <CtnBox>
              {isVisible && (
                <>
                  <h3 className="card__description">{food.pName}</h3>
                  <h3 className="card__description">{food.ProDescription}</h3>
                  <div className="footer">
                    <span className="card__price">$ {food.ProPrice}</span>
                    <span className="card__des">$ {food.ProDescuento}</span>
                  </div>
                </>
              )}
            </CtnBox>
            <CtnBox>
              {(!image && isVisible) && (
                <img
                  alt={food.ProDescription || "img"}
                  blurDataURL="/images/DEFAULTBANNER.png"
                  layout="fill"
                  objectFit="cover"
                  src={food.ProImage}
                />
              )}
              {image}
            </CtnBox>
          </CardProductsContent>
        </WrapperCard>
      }
    </div>
  );
};
export const CardProducts = React.memo(CardProductsComponent)
