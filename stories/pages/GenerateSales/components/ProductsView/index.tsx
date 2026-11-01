'use client'

import React, {
  useEffect,
  useRef,
  useState
} from 'react'

import {
  EmptyData
} from '../../../../molecules'

import {
  Button,
  CopyToClipboard,
  Icon,
  Image,
  Row,
  Text
} from '../../../../atoms'

import {
  Section,
  Table,
  TableCell,
  VirtualizedList
} from '../../../../organisms'

import { MiniCardProduct } from '../../../../organisms/MiniCardProduct'

import type { ProductFood } from '../../types'
import { LAYOUT_TYPES } from '../../constants'

import styles from './styles.module.css'
import { QuantityButtonFloat } from '../../../../molecules/QuantityButtonFloat'
import { numberFormat } from '../../../../../utils'
import { getGlobalStyle } from '../../../../../helpers'

type SendNotificationFn = (params: {
  description: string
  title: string
  backgroundColor: string
}) => void

export interface ProductsViewProps {
  layout: LAYOUT_TYPES
  productsFood: ProductFood[]
  dispatch: React.Dispatch<any>
  handleDecrement: (
    product: ProductFood
  ) => void
  handleAddProduct: (
    product: ProductFood
  ) => void
  sendNotification: SendNotificationFn
  handleComment: (
    ProductFood: ProductFood
  ) => void
}

export const ProductsView: React.FC<
ProductsViewProps
> = ({
  layout,
  productsFood,
  dispatch,
  handleDecrement,
  handleAddProduct,
  sendNotification,
  handleComment
}) => {
  /**
   * Índice del único producto seleccionado.
   *
   * IMPORTANTE:
   * La selección visual NO depende de pId.
   * Esto garantiza que únicamente un producto
   * pueda tener focus/selection al mismo tiempo.
   */
  const [
    selectedProductIndex,
    setSelectedProductIndex
  ] = useState<number | null>(null)

  const productsViewRef =
    useRef<HTMLDivElement>(null)

  /**
   * Valida estrictamente que un índice pertenezca
   * al array actual.
   */
  const isValidProductIndex = (
    index: number | null | undefined
  ): index is number => {
    return (
      typeof index === 'number' &&
      Number.isInteger(index) &&
      index >= 0 &&
      index < productsFood.length
    )
  }

  /**
   * Devuelve un índice válido únicamente cuando
   * existe una posición real dentro del listado.
   *
   * NO se utiliza pId como fallback porque varios
   * productos pueden compartirlo.
   */
  const resolveProductIndex = (
    product: ProductFood,
    productIndex?: number
  ): number => {
    /**
     * La fuente principal y segura es el índice
     * enviado directamente por el render.
     */
    if (
      isValidProductIndex(
        productIndex
      )
    ) {
      return productIndex
    }

    /**
     * Fallback solamente por referencia de objeto.
     *
     * No usamos pId para evitar seleccionar
     * múltiples productos simultáneamente.
     */
    return productsFood.findIndex(
      (item) => item === product
    )
  }

  /**
   * Determina EXCLUSIVAMENTE si el producto
   * ocupa el índice actualmente seleccionado.
   */
  const isSelectedProduct = (
    product: ProductFood,
    productIndex?: number
  ) => {
    /**
     * Sin selección activa.
     */
    if (
      selectedProductIndex === null
    ) {
      return false
    }

    /**
     * Índice inválido = nunca seleccionado.
     */
    const index =
      resolveProductIndex(
        product,
        productIndex
      )

    if (
      !isValidProductIndex(index)
    ) {
      return false
    }

    /**
     * ÚNICA condición que permite mostrar
     * el estado seleccionado.
     *
     * Esto garantiza que solamente un índice
     * pueda retornar true.
     */
    return (
      index ===
      selectedProductIndex
    )
  }

  /**
   * Selecciona un único producto.
   */
  const handleSelectProduct = (
    product: ProductFood,
    productIndex?: number
  ) => {
    const index =
      resolveProductIndex(
        product,
        productIndex
      )

    /**
     * Nunca permitimos seleccionar un índice
     * que no exista dentro del listado.
     */
    if (
      !isValidProductIndex(index)
    ) {
      return
    }

    /**
     * Sobrescribe completamente la selección
     * anterior. Nunca acumulamos selecciones.
     */
    setSelectedProductIndex(index)

    window.requestAnimationFrame(() => {
      productsViewRef.current?.focus({
        preventScroll: true
      })
    })
  }

  /**
   * Agrega un producto al carrito.
   */
  const handleProductClick = (
    product: ProductFood,
    productIndex?: number
  ) => {
    handleSelectProduct(
      product,
      productIndex
    )

    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    })
  }

  /**
   * Incrementa la cantidad.
   */
  const handleIncrement = (
    product: ProductFood,
    productIndex?: number
  ) => {
    handleSelectProduct(
      product,
      productIndex
    )

    return handleAddProduct(
      product
    )
  }

  /**
   * Decrementa la cantidad.
   */
  const handleProductDecrement = (
    product: ProductFood,
    productIndex?: number
  ) => {
    handleSelectProduct(
      product,
      productIndex
    )

    return handleDecrement(
      product
    )
  }

  /**
   * Navegación Enter / Space.
   */
  const handleProductKeyDown = (
    event: React.KeyboardEvent,
    product: ProductFood,
    productIndex?: number
  ) => {
    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()

      handleProductClick(
        product,
        productIndex
      )
    }
  }

  /**
   * Si cambia el listado y el índice seleccionado
   * deja de existir, limpiamos la selección.
   */
  useEffect(() => {
    if (
      selectedProductIndex === null
    ) {
      return
    }

    if (
      !isValidProductIndex(
        selectedProductIndex
      )
    ) {
      setSelectedProductIndex(null)
    }
  }, [
    productsFood.length,
    selectedProductIndex
  ])

  /**
   * Navegación global de cantidades.
   */
  useEffect(() => {
    const handleKeyboardQuantity = (
      event: KeyboardEvent
    ) => {
      /**
       * No existe producto seleccionado.
       */
      if (
        selectedProductIndex === null
      ) {
        return
      }

      /**
       * Validación defensiva del índice.
       */
      if (
        !isValidProductIndex(
          selectedProductIndex
        )
      ) {
        return
      }

      /**
       * Ignorar combinaciones especiales.
       */
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return
      }

      /**
       * Ignorar campos editables.
       */
      const target =
        event.target as HTMLElement | null

      const isInput =
        target instanceof HTMLInputElement

      const isTextArea =
        target instanceof HTMLTextAreaElement

      const isSelect =
        target instanceof HTMLSelectElement

      const isContentEditable =
        target?.isContentEditable === true

      if (
        isInput ||
        isTextArea ||
        isSelect ||
        isContentEditable
      ) {
        return
      }

      if (
        event.key !== 'ArrowUp' &&
        event.key !== 'ArrowDown'
      ) {
        return
      }

      const selectedProduct =
        productsFood[
          selectedProductIndex
        ]

      if (!selectedProduct) {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      if (
        event.key === 'ArrowUp'
      ) {
        handleAddProduct(
          selectedProduct
        )

        return
      }

      handleDecrement(
        selectedProduct
      )
    }

    document.addEventListener(
      'keydown',
      handleKeyboardQuantity
    )

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyboardQuantity
      )
    }
  }, [
    selectedProductIndex,
    productsFood,
    handleAddProduct,
    handleDecrement
  ])

  /**
   * Render de tarjeta.
   *
   * El segundo parámetro es CRÍTICO:
   * debe ser el índice real dentro de productsFood.
   */
  const renderProductCard = (
    product: ProductFood,
    productIndex?: number
  ) => {
    /**
     * Validamos el índice antes de utilizarlo.
     */
    const validIndex =
      isValidProductIndex(
        productIndex
      )
        ? productIndex
        : null

    const tag = {
      tag:
        product?.getOneTags?.nameTag
    }

    const isExistInSale =
      Boolean(
        product?.existsInSale
      )

    const manageStock =
      Boolean(
        product?.manageStock
      )

    const productPrice =
      product.ProPrice

    /**
     * El estado seleccionado depende
     * únicamente del índice.
     */
    const isSelected =
      validIndex !== null &&
      selectedProductIndex !== null &&
      validIndex ===
        selectedProductIndex

    return (
      <div
        className={
          styles.product__cardWrapper
        }
        data-selected={
          isSelected
        }
        aria-selected={
          isSelected
        }
        onClick={() => {
          handleSelectProduct(
            product,
            validIndex ?? undefined
          )
        }}
      >
        <MiniCardProduct
          {...product}

          openQuantity={
            isExistInSale
          }

          withQuantity

          style={
            manageStock
              ? {
                  quantity_container: {
                    top: 35
                  }
                }
              : {}
          }

          /**
           * SHADOW EXCLUSIVO:
           * solamente true para el índice
           * seleccionado.
           */
          shadow={
            isSelected
              ? `inset ${getGlobalStyle(
                  '--box-shadow-red-rose'
                )}`
              : 'none'
          }

          ProDescription={
            product.ProDescription
          }

          ProDescuento={
            product.ProDescuento
          }

          discount={
            numberFormat(
              product.ProDescuento
            ) ?? 0
          }

          ProImage={
            product.ProImage
          }

          ProPrice={
            numberFormat(
              productPrice
            ) ?? 0
          }

          plainPrice={
            productPrice
          }

          ProQuantity={
            product.ProQuantity
          }

          ValueDelivery={
            product.ValueDelivery
          }

          comment={false}

          edit={false}

          free={
            Number(
              productPrice
            ) === 0
          }

          onClick={() => {
            handleProductClick(
              product,
              validIndex ?? undefined
            )
          }}

          handleDecrement={() => {
            handleProductDecrement(
              product,
              validIndex ?? undefined
            )
          }}

          handleIncrement={() => {
            handleIncrement(
              product,
              validIndex ?? undefined
            )
          }}

          pName={
            product.pName
          }

          tag={
            product?.getOneTags?.nameTag !==
            null
              ? tag
              : undefined
          }

          withStock
        />
      </div>
    )
  }

  const renderProductActions = (
    product: ProductFood,
    rowIndex: number
  ) => {
    const isExistInSale =
      Boolean(
        product?.existsInSale
      )

    const quantity =
      Math.max(
        0,
        Number(
          product?.ProQuantity ?? 0
        )
      )

    if (!isExistInSale) {
      return (
        <Button
          type='button'
          className={
            styles.product__add
          }
          onClick={(event) => {
            event.stopPropagation()

            handleProductClick(
              product,
              rowIndex
            )
          }}
        >
          <Icon
            icon='IconPlus'
            size={15}
          />

          <Text>
            Agregar
          </Text>
        </Button>
      )
    }

    return (
      <div
        className={
          styles.product__quantity
        }
        onClick={(event) => {
          event.stopPropagation()

          handleSelectProduct(
            product,
            rowIndex
          )
        }}
      >
        <Row
          style={{
            position: 'relative',
            width: 'fit-content'
          }}
        >
          <QuantityButtonFloat
            handleSuccessUpdateQuantity={() => {
              dispatch({
                type:
                  'UPDATE_SUCCESS_QUANTITY_EDITING_PRODUCT',
                payload:
                  product
              })
            }}

            handleCancelUpdateQuantity={() => {
              dispatch({
                type:
                  'CANCEL_UPDATE_QUANTITY_EDITING_PRODUCT',
                payload:
                  product
              })
            }}

            handleChangeQuantity={(event) => {
              return dispatch({
                type: 'ON_CHANGE',
                payload: {
                  value:
                    String(
                      event.target.value
                    ),
                  name: 'name',
                  index:
                    rowIndex,
                  id:
                    product.pId
                }
              })
            }}

            handleDecrement={() => {
              handleProductDecrement(
                product,
                rowIndex
              )
            }}

            handleIncrement={() => {
              return handleIncrement(
                product,
                rowIndex
              )
            }}

            handleToggleEditingStatus={() => {
              dispatch({
                type:
                  'TOGGLE_EDITING_PRODUCT',
                payload:
                  product
              })
            }}

            open={true}
            editable={true}
            editing={
              product.editing
            }
            quantity={quantity}
          />

          <Button
            padding='0 0 10px 10px'
            border='none'
            onClick={(event) => {
              event.stopPropagation()

              handleSelectProduct(
                product,
                rowIndex
              )

              return dispatch({
                type:
                  'REMOVE_PRODUCT_TO_CART',
                payload:
                  product
              })
            }}
          >
            <Icon
              icon='IconDelete'
              size={20}
            />
          </Button>

          <Button
            border='none'
            onClick={(event) => {
              event.stopPropagation()

              handleSelectProduct(
                product,
                rowIndex
              )

              return handleComment(
                product
              )
            }}
          >
            <Icon
              icon='IconComment'
              size={30}
              color='red'
            />
          </Button>
        </Row>
      </div>
    )
  }

  /**
   * Render del body de la tabla.
   */
  const renderTableBody = (
    data: ProductFood[],
    titles: any[]
  ) => {
    return data.map(
      (
        product,
        rowIndex
      ) => {
        const {
          pId,
          pName,
          ProPrice,
          stock,
          manageStock,
          createdAt
        } = product

        const formattedPrice =
          numberFormat(
            ProPrice
          ) ?? 0

        const formattedDate =
          createdAt !== ''
            ? createdAt
            : '-'

        const isExistInSale =
          Boolean(
            product?.existsInSale
          )

        const quantity =
          Math.max(
            0,
            Number(
              product?.ProQuantity ??
                0
            )
          )

        const discount =
          numberFormat(
            product.ProDescuento
          ) ?? 0

        const isSelected =
          isSelectedProduct(
            product,
            rowIndex
          )

        return (
          <Section
            key={`${pId}-${rowIndex}`}
            columnWidth={titles}
            style={{
              height: '80px',

              transition:
                'background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',

              borderRadius: '10px',

              /**
               * Solamente la fila cuyo índice
               * coincide con selectedProductIndex
               * puede tener shadow.
               */
              boxShadow:
                isSelected
                  ? `inset ${getGlobalStyle(
                      '--box-shadow-red-rose'
                    )}`
                  : 'none'
            }}
          >
            {/* Producto */}
            <TableCell
              row={rowIndex}
              col={1}
            >
              <div
                className={
                  `${styles.product__info} ${
                    isSelected
                      ? styles.product__info_selected
                      : ''
                  }`
                }
                role='button'
                tabIndex={0}
                aria-selected={
                  isSelected
                }
                onClick={() => {
                  handleProductClick(
                    product,
                    rowIndex
                  )
                }}
                onFocus={() => {
                  handleSelectProduct(
                    product,
                    rowIndex
                  )
                }}
                onKeyDown={(event) => {
                  handleProductKeyDown(
                    event,
                    product,
                    rowIndex
                  )
                }}
                aria-label={`Agregar ${
                  pName !== ''
                    ? pName
                    : 'producto'
                } al carrito`}
              >
                <Image
                  src={
                    product.ProImage
                  }
                  className={
                    styles.product__image
                  }
                />

                <div
                  className={
                    styles.product__content
                  }
                >
                  <div
                    className={
                      styles.product__nameRow
                  }
                  >
                    <Text
                      size='xl'
                      color='black'
                      weight='medium'
                      font='regular'
                    >
                      {pName}
                    </Text>
                  </div>

                  <Row
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <CopyToClipboard
                      showText={true}
                      text={String(
                        pId
                      )}
                      onCopySuccess={() => {
                        sendNotification({
                          backgroundColor:
                            'success',
                          description:
                            `El ID ${pId} ha sido copiado al portapapeles.`,
                          title:
                            'Éxito'
                        })
                      }}
                    />
                  </Row>
                </div>
              </div>
            </TableCell>

            {/* Precio */}
            <TableCell
              row={rowIndex}
              col={2}
            >
              <div
                className={
                  styles.product__price
                }
              >
                <Text>
                  {
                    formattedPrice
                  }
                </Text>

                {Number(
                  discount
                ) > 0 && (
                  <Text
                    color='gray-dark'
                  >
                    Descuento:{' '}
                    {discount}
                  </Text>
                )}
              </div>
            </TableCell>

            {/* Stock */}
            <TableCell
              row={rowIndex}
              col={3}
            >
              <Text>
                {(
                  manageStock ??
                  false
                )
                  ? stock ?? 0
                  : 'No aplica'}
              </Text>
            </TableCell>

            {/* Fecha */}
            <TableCell
              row={rowIndex}
              col={5}
            >
              <Text>
                {
                  formattedDate
                }
              </Text>
            </TableCell>

            {/* Acciones */}
            <TableCell
              row={rowIndex}
              col={6}
            >
              {renderProductActions(
                product,
                rowIndex
              )}
            </TableCell>
          </Section>
        )
      }
    )
  }

  return (
    <div
      className={
        styles[
          'content__products-container'
        ]
      }
    >
      <div
        ref={
          productsViewRef
        }
        className={
          styles[
            'content__products-view'
          ]
        }
        tabIndex={0}
        aria-label='Listado de productos. Usa las flechas arriba y abajo para modificar la cantidad del producto seleccionado.'
        onClick={() => {
          productsViewRef.current?.focus({
            preventScroll: true
          })
        }}
        onKeyDown={(event) => {
          if (
            event.key ===
              'ArrowUp' ||
            event.key ===
              'ArrowDown'
          ) {
            event.preventDefault()
          }
        }}
      >
        {layout ===
        LAYOUT_TYPES.COLUMN
          ? (
            <VirtualizedList
              items={
                productsFood
              }
              viewHeight='auto'
              grid
              columns={15}
              minColumnWidth={130}
              columnGap={15}
              itemHeight={250}
              observeResize
              className={
                styles
                  .content__products
              }
              emptyComponent={
                <EmptyData
                  height={250}
                  width={250}
                />
              }
              render={
                renderProductCard
              }
            />
          )
          : (
            <div
              className={
                styles[
                  'content__table-wrapper'
                ]
              }
            >
              <Table
                pointer
                data={
                  productsFood
                }
                enableKeyboardNav
                enableColumnResize
                enableColumnDrag
                titles={[
                  {
                    justify:
                      'flex-start',
                    name:
                      'Producto',
                    key:
                      'pName',
                    width:
                      '1.8fr',
                    arrow: true
                  },
                  {
                    justify:
                      'flex-end',
                    name:
                      'Precio',
                    key:
                      'ProPrice',
                    width:
                      '1fr',
                    arrow: true
                  },
                  {
                    justify:
                      'center',
                    name:
                      'Stock',
                    key:
                      'stock',
                    width:
                      '0.8fr',
                    arrow: true
                  },
                  {
                    justify:
                      'flex-start',
                    name:
                      'Creado',
                    key:
                      'createdAt',
                    width:
                      '1.2fr',
                    dataType:
                      'datetime',
                    displayFormat:
                      'dateTimeMinutes',
                    arrow: true
                  },
                  {
                    justify:
                      'center',
                    name:
                      'Acciones',
                    key:
                      'actions',
                    width:
                      '1fr'
                  }
                ]}
                renderBody={
                  renderTableBody
                }
              />
            </div>
          )}
      </div>
    </div>
  )
}