
import React, { useMemo } from 'react'
import Link from 'next/link'

import { type MiniCardProductProps } from './type'
import { QuantityButtonFloat } from '../../molecules/QuantityButtonFloat'
import {
  Button,
  Divider,
  Icon,
  Row,
  Tag,
  Text
} from '../../atoms'
import { getGlobalStyle } from '../../../utils'
import { PercentBadge } from '../../molecules'
import styles from './styles.module.css'

// Nombre del placeholder que administra el backend.
const defaultImage = 'placeholder-image.webp'

/**
 * Normaliza el nombre de la imagen para consumir correctamente
 * el endpoint /api/images/[...filename].
 *
 * Ejemplos:
 * producto.png                    -> producto.png
 * /producto.png                   -> producto.png
 * /images/producto.png            -> producto.png
 * images/producto.png             -> producto.png
 * /images/placeholder-image.webp  -> placeholder-image.webp
 */
const normalizeImageName = (value?: string | null): string => {
  const image = String(value ?? '').trim()

  if (
    !image ||
    image === 'null' ||
    image === 'undefined'
  ) {
    return defaultImage
  }

  const normalizedImage = image
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/^(?:images\/)+/i, '')

  return normalizedImage || defaultImage
}

/**
 * Helper: shallow compare arrays by a key.
 */
const shallowEqualArrayByKey = (
  a?: any[],
  b?: any[],
  key?: string
): boolean => {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false

  if (!key) {
    return a.every((value, index) => value === b[index])
  }

  return a.every((value, index) => value?.[key] === b[index]?.[key])
}

/**
 * MiniCardProduct
 */
const MiniCardProductComponent: React.FC<MiniCardProductProps> = ({
  pId = '',
  ProPrice = 0,
  ProDescription = '',
  ProImage = defaultImage,
  pName = '',
  withQuantity = false,
  showDot = false,
  hoverFree = false,
  openQuantity = false,
  free = false,
  editable = false,
  editing = false,
  withStock = false,
  canDelete = false,
  manageStock = false,
  showDiscount = true,
  ProQuantity = 0,
  plainPrice = 0,
  ProDescuento = 0,
  discount = 0,
  stock = 0,
  height = 250,
  comment = '',
  style = {},
  shadow = '',
  onClick = () => { },
  handleDecrement = () => { },
  handleIncrement = () => { },
  handleGetSubItems = () => { },
  handleDelete = () => { },
  handleComment = () => { },
  handleToggleEditingStatus = () => { },
  handleFreeProducts = () => { },
  handleCancelUpdateQuantity = () => { },
  handleSuccessUpdateQuantity = () => { },
  handleChangeQuantity = () => { },
  dataExtra = [],
  dataOptional = []
}) => {
  // Normalizar la imagen antes de consumir el endpoint.
  const urlImage = useMemo(
    () => normalizeImageName(ProImage),
    [ProImage]
  )

  const hasDiscount = showDiscount && Boolean(ProDescuento)

  const formattedDiscount = useMemo(() => discount, [discount])

  const extrasText = useMemo(() => {
    if (!dataExtra || dataExtra.length === 0) return ''

    return dataExtra
      .map((subItem) => `${subItem?.quantity}x ${subItem?.extraName}`)
      .join(', ')
  }, [dataExtra])

  const optionalText = useMemo(() => {
    if (!dataOptional || dataOptional.length === 0) return ''

    return dataOptional
      .flatMap((productItem) => {
        const subs = productItem?.ExtProductFoodsSubOptionalAll ?? []

        return subs
          .map((subItem: any) => (
            subItem?.OptionalSubProName
              ? `1x ${subItem.OptionalSubProName}`
              : ''
          ))
          .filter(Boolean)
      })
      .join(', ')
  }, [dataOptional])

  return (
    <div
      style={{
        position: 'relative',
        width: 'min-content',
        height: '270px',
        filter: stock === 0 ? 'grayscale(1)' : 'none'
      }}
      className={styles.product}
    >
      <div
        style={{
          position: 'relative',
          width: 'min-content'
        }}
        className={styles['product-card']}
      >
        {withStock && manageStock && (
          <div className={styles.stock_container}>
            <div className={styles.stock_row} style={{
              justifyContent: 'center'
            }}>
              <span className={styles.stock_label}>
                {stock <= 0 ? 'Agotado' : `${stock} Disponibles`}
              </span>

              {stock <= 0 && (
                <Link
                  href={`/products/edit?pId=${encodeURIComponent(String(pId))}`}
                  className={styles.product_edit_link}
                  title={`Editar ${pName}`}
                  aria-label={`Editar producto ${pName}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Icon icon='IconEdit' size={13} />
                  <span>Editar</span>
                </Link>
              )}
            </div>
          </div>
        )}

        {withQuantity && (
          <div
            className={styles.quantity_container}
            style={{ ...(style as any).quantity_container }}
          >
            <QuantityButtonFloat
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleToggleEditingStatus={handleToggleEditingStatus}
              handleSuccessUpdateQuantity={handleSuccessUpdateQuantity}
              handleCancelUpdateQuantity={handleCancelUpdateQuantity}
              handleChangeQuantity={handleChangeQuantity}
              open={openQuantity}
              editable={editable}
              editing={editing}
              quantity={ProQuantity}
            />
          </div>
        )}

        {hoverFree && (
          <div
            className={styles.productCardWrapperFree}
            onClick={() => handleFreeProducts()}
          >
            <Text align='center' color='white' size='sm'>
              {free ? 'Gratis' : 'Marcar gratis'}
            </Text>

            {free && (
              <Icon
                icon='IconSuccess'
                size={15}
                color={getGlobalStyle('--color-icons-white')}
              />
            )}
          </div>
        )}

        <div
          className={styles.productCardWrapper}
          onClick={onClick}
          data-test-id='mini-card-product-container'
          style={{ height, boxShadow: shadow }}
        >
          <div
            className={styles['product-card-content']}
            data-test-id='product-card-test-id'
          >
            <div
              className={styles['product-card-image__container']}
              data-test-id='product-card-image'
            >
              <div className={styles['wrapper-image']}>
                <img
                  className={styles['product-card-image']}
                  alt={`${pName ?? ''}-product`}
                  src={`/api/images/${urlImage}`}
                  data-test-id='product-card-image-img'
                  onLoad={(event) => {
                    const target = event.target as HTMLImageElement

                    if (target.complete) {
                      target.style.opacity = '1'
                    }

                    target.onload = null
                  }}
                />
              </div>

              <div className={styles['product-card-image__overlay']} />
            </div>

            <div className={styles['product-card__container_actions']}>
              {Boolean(canDelete && editable) && (
                <Row justifyContent='space-between' alignItems='center'>
                  <Button
                    border='none'
                    styles={{
                      borderRadius: getGlobalStyle('--border-radius-2xs'),
                      backgroundColor: getGlobalStyle('--color-primary-pink-light'),
                      padding: '2px 6px'
                    }}
                    data-test-id='mini-card-product-delete'
                    onClick={(event) => {
                      event.stopPropagation()
                      handleDelete()
                    }}
                  >
                    <Icon icon='IconDelete' size={18} />
                  </Button>

                  <Button
                    data-test-id='mini-card-product-comment'
                    padding='none'
                    border='none'
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      event.stopPropagation()
                      handleComment()
                    }}
                  >
                    <Tag
                      backgroundColor='green'
                      className={styles.comment_tag}
                      as='div'
                    >
                      <Icon
                        color={getGlobalStyle('--color-icons-white')}
                        icon={comment !== '' ? 'IconEditComment' : 'IconAddComment'}
                        size={20}
                      />
                    </Tag>
                  </Button>
                </Row>
              )}
            </div>

            <div
              className={styles['product-card__price-container']}
              data-test-id='product-card__price-container'
            >
              {Boolean(formattedDiscount) && (
                <Text
                  className={styles['product-card-discount']}
                  data-test-id='product-card-discount'
                >
                  {formattedDiscount}
                </Text>
              )}

              <div className={styles['product-card__price-row']}>
                <div className={styles['product-card__price-value']}>
                  <Text
                    color='gray-dark'
                    size='md'
                    weight='bold'
                    lineHeight='md'
                    styles={{
                      color: getGlobalStyle(
                        hasDiscount
                          ? '--color-text-success'
                          : '--color-text-gray-light'
                      )
                    }}
                  >
                    {ProPrice}
                  </Text>
                </div>

                {Boolean(free) && (
                  <div className={styles['product-card_action_free']}>
                    <Tag label='Gratis' backgroundColor='green' />
                  </div>
                )}
              </div>
            </div>

            {hasDiscount && (
              <PercentBadge
                baseValue={ProDescuento}
                compareValue={plainPrice}
                precision={0}
                size='small'
              />
            )}

            <span
              className={styles['product-card__title']}
              title={pName}
              data-test-id='product-card-name'
            >
              {pName}
            </span>

            <span
              className={styles['product-card__description']}
              title={ProDescription}
              data-test-id='product-card-description'
            >
              {ProDescription}
            </span>
          </div>

          {showDot && (
            <>
              <Divider
                borderBottom={true}
                marginBottom={getGlobalStyle('--spacing-xs')}
                marginTop={getGlobalStyle('--spacing-xs')}
              />

              <div
                data-test-id='mini-card-product-sub-items'
                className={styles.container_free}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  event.stopPropagation()
                  handleGetSubItems()
                }}
              >
                <button className={styles.dots_sub_items}>
                  <Icon
                    icon='IconBox'
                    size={20}
                    color={
                      Boolean(dataExtra?.length > 0) || Boolean(dataOptional?.length > 0)
                        ? getGlobalStyle('--color-icons-primary')
                        : getGlobalStyle('--color-icons-gray')
                    }
                  />
                </button>

                <div className={styles.card_sub_items}>
                  {extrasText}
                  {Boolean(optionalText && extrasText) && ' - '}
                  {optionalText}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Custom comparator for React.memo.
 */
const areEqual = (
  prev: Readonly<MiniCardProductProps>,
  next: Readonly<MiniCardProductProps>
): boolean => {
  if (prev === next) return true

  const keysToCompare: Array<keyof MiniCardProductProps> = [
    'pName',
    'ProPrice',
    'ProDescription',
    'ProImage',
    'ProQuantity',
    'plainPrice',
    'ProDescuento',
    'discount',
    'stock',
    'height',
    'free',
    'editable',
    'editing',
    'withQuantity',
    'openQuantity',
    'showDot',
    'canDelete',
    'withStock',
    'manageStock',
    'showDiscount',
    'comment',
    'hoverFree',
    'shadow',
    'style'
  ]

  for (const key of keysToCompare) {
    if (prev[key] !== next[key]) return false
  }

  if (!shallowEqualArrayByKey(prev.dataExtra, next.dataExtra, 'exPid')) {
    return false
  }

  if (!shallowEqualArrayByKey(prev.dataOptional, next.dataOptional)) {
    return false
  }

  return true
}

export const MiniCardProduct = React.memo(MiniCardProductComponent, areEqual)