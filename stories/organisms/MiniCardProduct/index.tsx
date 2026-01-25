// MiniCardProduct.tsx
import React, { useMemo } from 'react'
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

const defaultImage = '/images/placeholder-image.webp'

/**
 * Helper: shallow compare arrays by a key (fast, avoids deep serialization)
 * @param a first array
 * @param b second array
 * @param key property to compare (optional)
 */
const shallowEqualArrayByKey = (a?: any[], b?: any[], key?: string) => {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  if (!key) return a.every((v, i) => v === b[i])
  return a.every((v, i) => (v && b[i] && v[key]) === (b[i] && a[i] && a[i][key]))
}

/**
 * MiniCardProduct - memoized for virtualization heavy lists
 *
 * @param props MiniCardProductProps - see ./type
 * @returns React.FC
 */
const MiniCardProductComponent: React.FC<MiniCardProductProps> = ({
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
  ProQuantity = 0,
  plainPrice = 0,
  ProDescuento = 0,
  discount = 0,
  stock = 0,
  height = 250,
  comment = '',
  style = {},
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
  // memoize computed values so re-render cost is minimal
  const urlImage = useMemo(() => ProImage || defaultImage, [ProImage])
  const hasDiscount = Boolean(ProDescuento)
  const formattedDiscount = useMemo(() => discount, [discount])

  const extrasText = useMemo(() => {
    if (!dataExtra || dataExtra.length === 0) return ''
    return dataExtra.map((subItem) => `${subItem?.quantity}x ${subItem?.extraName}`).join(', ')
  }, [dataExtra])

  const optionalText = useMemo(() => {
    if (!dataOptional || dataOptional.length === 0) return ''
    return dataOptional.flatMap((productItem) => {
      const subs = productItem?.ExtProductFoodsSubOptionalAll ?? []
      return subs.map((s: any) => (s?.OptionalSubProName ? `1x ${s.OptionalSubProName}` : '')).filter(Boolean)
    }).join(', ')
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
      <div style={{ position: 'relative', width: 'min-content' }} className={styles['product-card']}>
        {(withStock && manageStock) && (
          <div className={styles.stock_container}>
            <Text align='center' color='default' size='sm'>
              <span style={{ marginLeft: getGlobalStyle('--spacing-xs'), color: getGlobalStyle('--color-neutral-black') }}>
                {stock <= 0 ? 'Agotado' : `${stock} Disponibles`}
              </span>
            </Text>
          </div>
        )}
        {withQuantity && (
          <div className={styles.quantity_container} style={{ ...(style as any).quantity_container }}>
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
          <div className={styles.productCardWrapperFree} onClick={() => {
            handleFreeProducts()
          }}>
            <Text align='center' color='white' size='sm'>
              {free ? 'Gratis' : 'Marcar gratis'}
            </Text>
            {free
              && <Icon
                icon='IconSuccess'
                size={15}
                color={getGlobalStyle('--color-icons-white')}
              />
            }
          </div>
        )}
        <div
          className={`${styles.productCardWrapper}`}
          onClick={onClick}
          data-test-id='mini-card-product-container'
          style={{ height }}
        >
          <div className={styles['product-card-content']} data-test-id='product-card-test-id'>
            <div className={styles['product-card-image__container']} data-test-id='product-card-image'>
              <div className={styles['wrapper-image']}>
                <img
                  className={styles['product-card-image']}
                  alt={`${pName ?? ''}-product`}
                  src={`/api/images/${urlImage}`}
                  data-test-id='product-card-image-img'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = defaultImage
                  }}
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement
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
                      padding: '2px 6px',
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
            <div className={styles['product-card__price-container']} data-test-id='product-card__price-container'>
              {Boolean(formattedDiscount) && (
                <Text className={styles['product-card-discount']} data-test-id='product-card-discount'>
                  {formattedDiscount}
                </Text>
              )}
              <Row alignItems='center' gap='xs'>
                <Text
                  color='gray-dark'
                  size='md'
                  weight='bold'
                  lineHeight='md'
                  styles={{ color: getGlobalStyle(hasDiscount ? '--color-text-success' : '--color-text-gray-light') }}
                >
                  {ProPrice}
                </Text>
                <Row justifyContent='space-between' className={styles['product-card_action_free']}>
                  {Boolean(free) && <Tag label='Gratis' backgroundColor='green' />}
                </Row>
              </Row>
            </div>

            {hasDiscount && (
              <PercentBadge
                baseValue={ProDescuento}
                compareValue={plainPrice}
                precision={0}
                size='small'
              />
            )}

            <span className={styles['product-card__title']} title={pName} data-test-id='product-card-name'>
              {pName}
            </span>

            <span className={styles['product-card__description']} title={ProDescription} data-test-id='product-card-description'>
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
 * Custom comparator for React.memo
 * Only compare props that truly affect DOM output.
 */
const areEqual = (prev: Readonly<MiniCardProductProps>, next: Readonly<MiniCardProductProps>) => {
  // fast path: same reference
  if (prev === next) return true

  const keysToCompare: (keyof MiniCardProductProps)[] = [
    'pName', 'ProPrice', 'ProImage', 'ProQuantity', 'plainPrice',
    'ProDescuento', 'discount', 'stock', 'height', 'free',
    'editable', 'editing', 'withQuantity', 'openQuantity', 'showDot', 'canDelete', 'withStock', 'comment', 'hoverFree'
  ]

  for (const k of keysToCompare) {
    // @ts-ignore
    if (prev[k] !== next[k]) return false
  }

  // shallow compare arrays by lengths / ids
  if (!shallowEqualArrayByKey(prev.dataExtra, next.dataExtra, 'exPid')) return false
  if (!shallowEqualArrayByKey(prev.dataOptional, next.dataOptional)) return false

  // If the parent changed only handlers (functions), we still want to skip re-render,
  // so DO NOT compare handler function references here.
  return true
}

export const MiniCardProduct = React.memo(MiniCardProductComponent, areEqual)
