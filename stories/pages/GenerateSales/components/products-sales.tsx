'use client'

import { getGlobalStyle } from '../../../../helpers'
import { Column, Icon } from '../../../atoms'
import { EmptyData } from '../../../molecules'
import { SwipeableCard } from '../../../molecules/SwipeableCard'
import { MiniCardProduct } from '../../../organisms'
import styles from './products-sales.module.css'

interface ProductsSalesProps {
  isLoading: boolean
  data: any
  dispatch: React.Dispatch<any>
  onClick: (product: any) => void
  handleAddProduct: (product: any) => void
  handleComment: (product: any) => void
  handleDecrement: (product: any) => void
  handleFreeProducts: (product: any) => void
  numberFormat: (value: string | number) => string | number
  /**
   * `pId` del producto que debe resaltarse con la animación "pop" (p. ej. el
   * recién agregado por escaneo). Cuando coincide con el `pId` de un item del
   * carrito, se le aplica la clase de animación. Vacío = sin resaltado.
   */
  highlightedPid?: string
}

export const ProductsSales: React.FC<ProductsSalesProps> = ({
  isLoading,
  data,
  dispatch,
  onClick,
  handleComment,
  handleDecrement,
  handleFreeProducts,
  handleAddProduct,
  numberFormat,
  highlightedPid = ''
}) => {
  return <>

{Array.isArray(data?.PRODUCT) && data.PRODUCT.length > 0
  ? (
      data.PRODUCT.map((product: any, index: number) => {
        const tag = {
          tag: product?.getOneTags?.nameTag ?? ''
        }

        const ProQuantity = product?.ProQuantity ?? 0
        const ProPrice = product.ProPrice

        const isHighlighted =
        Boolean(highlightedPid) &&
        String(product.pId) === String(highlightedPid)

        const removeProduct = () => {
          dispatch({
            type: 'REMOVE_PRODUCT_TO_CART',
            payload: product
          })
        }

        return (
        <div
          key={product.pId}
          className={`${styles.item} ${isHighlighted ? styles.pop : ''}`}
        >
          <SwipeableCard
            ariaLabel={`Acciones del producto ${product.pName}`}

            // Dimensiones
            swipeWidth={52}
            leftSwipeWidth={52}
            swipeHeight={80}

            // Gestos horizontales
            swipeDirections='both'
            deleteDirections='both'
            allowFullSwipe={true}

            // Umbrales
            activationDistance={10}
            openThreshold={0.35}
            fullSwipeThreshold={1.6}
            minFullSwipeDistance={130}
            resistance={0.2}

            // Shake antes de eliminar
            shake={true}
            shakeThreshold={0.85}

            // Gestos verticales
            verticalSwipe='up'
            verticalThreshold={1.2}
            verticalBounceDuration={440}
            enableVerticalTouch={false}

            // Animaciones
            motion='spring'
            animationDuration={380}
            exitDuration={240}
            rotateOnSwipe={0}
            scaleOnSwipe={0}
            gradientAnimation={false}
            sticky={false}

            // Protección de controles
            ignoreInteractiveElements={true}

            // Cierre automático
            autoClose={true}
            autoCloseDelay={4000}
            closeOnActionClick={true}
            closeOnOutsideClick={true}

            // Eliminación por swipe izquierdo o derecho
            onDelete={(_direction) => {
              removeProduct()
            }}

            // Elevación vertical con rebote
            onSwipeUp={() => {
              onClick(product)
            }}

            rightActions={
              <Column
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '8px 0',
                  boxSizing: 'border-box'
                }}
              >
                {/* Eliminar */}
                <button
                  type='button'
                  aria-label={`Eliminar ${product.pName}`}
                  title='Eliminar producto'
                  onClick={(event) => {
                    event.stopPropagation()
                    removeProduct()
                  }}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    borderRadius: 12,
                    backgroundColor: getGlobalStyle(
                      '--color-primary-red-bg'
                    )
                  }}
                >
                  <Icon
                    icon='IconDelete'
                    color={getGlobalStyle(
                      '--color-icons-primary'
                    )}
                    size={18}
                  />
                </button>

                {/* Comentario */}
                <button
                  type='button'
                  aria-label={`Agregar comentario a ${product.pName}`}
                  title='Agregar comentario'
                  onClick={(event) => {
                    event.stopPropagation()
                    handleComment(product)
                  }}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    borderRadius: 12,
                    backgroundColor: getGlobalStyle(
                      '--color-feedback-success-dark'
                    )
                  }}
                >
                  <Icon
                    icon='IconComment'
                    color={getGlobalStyle(
                      '--color-icons-white'
                    )}
                    size={18}
                  />
                </button>

                {/* Complementos */}
                <button
                  type='button'
                  aria-label={`Configurar complementos de ${product.pName}`}
                  title='Configurar complementos'
                  onClick={(event) => {
                    event.stopPropagation()
                    onClick(product)
                  }}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    borderRadius: 12,
                    backgroundColor: getGlobalStyle(
                      '--color-neutral-gray-white'
                    )
                  }}
                >
                  <Icon
                    size={20}
                    icon='IconBox'
                  />
                </button>
              </Column>
            }
          >
            <MiniCardProduct
              {...product}
              editing={product.editing}
              editable={true}
              canDelete={true}
              showDiscount={false}
              height={300}
              handleDelete={removeProduct}
              handleChangeQuantity={(event) => {
                const { value } = event.target

                return dispatch({
                  type: 'ON_CHANGE',
                  payload: {
                    id: product.pId,
                    index,
                    value
                  }
                })
              }}
              ProDescription={product.ProDescription}
              plainPrice={ProPrice}
              ProDescuento={product.ProDescuento}
              ProImage={product.ProImage}
              ProPrice={numberFormat(ProPrice)}
              discount={
                numberFormat(product.ProDescuento) ?? 0
              }
              ProQuantity={ProQuantity}
              handleToggleEditingStatus={() => {
                dispatch({
                  type: 'TOGGLE_EDITING_PRODUCT',
                  payload: product
                })
              }}
              handleCancelUpdateQuantity={() => {
                dispatch({
                  type: 'CANCEL_UPDATE_QUANTITY_EDITING_PRODUCT',
                  payload: product
                })
              }}
              handleSuccessUpdateQuantity={() => {
                dispatch({
                  type: 'UPDATE_SUCCESS_QUANTITY_EDITING_PRODUCT',
                  payload: product
                })
              }}
              ValueDelivery={product.ValueDelivery}
              withQuantity={true}
              hoverFree={true}
              free={product.free === true}
              handleComment={() => {
                handleComment(product)
              }}
              showDot={true}
              hasDiscount={true}
              openQuantity={Boolean(ProQuantity)}
              handleDecrement={() => {
                handleDecrement(product)
              }}
              handleIncrement={() => {
                handleAddProduct(product)
              }}
              handleFreeProducts={() => {
                handleFreeProducts(product)
              }}
              handleGetSubItems={() => {
                onClick(product)
              }}
              edit={false}
              onClick={() => {
                handleAddProduct(product)
              }}
              pName={product.pName}
              render={
                <Icon size={20} icon='IconSales' />
              }
              tag={
                product?.getOneTags?.nameTag !== null &&
                tag
              }
            />
          </SwipeableCard>
        </div>
        )
      })
    )
  : (
    <EmptyData height={200} width={200} />
    )
}

  </>
}
