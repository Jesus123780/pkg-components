import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {
  Button,
  Column,
  Icon,
  Row,
  Tag,
  Text
} from '../../atoms'
import { getGlobalStyle, numberFormat } from './../../../utils/index'
import type { IButton, CardProductSimpleProps } from './types'
import {
  accepts,
  handleAnimation,
  formatProductData
} from './utils'
import { QuantityButtonFloat } from '../../molecules/QuantityButtonFloat'
import styles from './styles.module.css'

export const MemoCardProductSimple: React.FC<CardProductSimpleProps> = ({
  del = false,
  edit = false,
  fileInputRef = null,
  free = false,
  index = 0,
  decrement = true,
  increment = true,
  handleFree,
  height,
  pId,
  pName = '',
  ProDescription = '',
  ProDescuento = 0,
  ProPrice = 0,
  ProQuantity = 0,
  sum = false,
  tag = { tag: '' },
  ValueDelivery = 0,
  ProImage = '/images/placeholder-image.webp',
  dataExtra = [] as Array<{ extraPrice: number, extraName: string }>,
  dataOptional = [] as Array<{ ExtProductFoodsSubOptionalAll: Array<{ OptionalSubProName: string }> }>,
  dispatch = (_p0: { type: string, payload: { value: string, name: string, index: number, id: any } }) => { },
  handleDecrement = () => { },
  handleDelete = () => { },
  handleFreeProducts = () => { },
  handleIncrement = () => { },
  onClick = () => { },
  onFileInputChange = () => { },
  onTargetClick = () => { }
}) => {
  // HOOKS
  const router = useRouter()
  const [startAnimateUp, setStartAnimateUp] = useState('')
  const [animateType, setAnimateType] = useState('')

  // HANDLERS
  const handleEdit = (): void => {
    void router.push(`/update/products/editar/${pId}`)
  }
  const handleDown = (event?: React.MouseEvent<HTMLButtonElement>): void => {
    if (event != null) handleDecrement(event)
    handleAnimation('down', setStartAnimateUp, setAnimateType)
  }

  const handleUp = (event?: React.MouseEvent<HTMLButtonElement>): void => {
    if (event != null) handleIncrement(event)
    handleAnimation('up', setStartAnimateUp, setAnimateType)
  }

  const urlImage = ProImage
  // Determina si mostrar las categorías
  const showCategories = dataExtra.length > 0 || dataOptional.length > 0

  const listCategories = formatProductData(dataExtra ?? [], dataOptional ?? [])

  const priceOrFree = ProPrice > 0 ? `${numberFormat(ProPrice as number)}` : 'Gratis'
  const delivery = `Domicilio: ${ValueDelivery > 0 ? numberFormat(ValueDelivery) : 'Gratis'}`

  const actions = [
    (del) && {
      icon: 'IconDelete',
      onClick: handleDelete,
      className: styles['delete-button']
    },
    (edit) && {
      icon: 'IconEdit',
      onClick: handleEdit,
      className: styles['edit-button']
    }
  ].filter(Boolean) as IButton[]

  return (
    <>
      <input
        accept={accepts}
        id='iFile'
        onChange={onFileInputChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type='file'
      />
      <div style={{ position: 'relative' }} className={styles.card_container_list_categories}>
        {handleFree != null && (
          <button
            className={styles.overlineFree}
            style={{ top: free ? '-30px' : '0px' }} // Ajuste dinámico
            onClick={onClick}
          >
            <Text>
              Gratis
            </Text>
          </button>
        )}
        <div className={`${styles.card} ${free ? styles.free : ''}`} style={{ height }}>
          {actions.map((action, index) => Boolean(action) && (
            <Button
              key={index}
              className={action?.className}
              onClick={action?.onClick}
              styles={{
                padding: 0,
                position: 'absolute',
                top: `${index * 50 + 10}px`
              }}
            >
              <Icon
                icon={action.icon}
                size={20}
                color={getGlobalStyle('--color-icons-primary')}
              />
            </Button>
          ))}
          <Column className={styles['dish-card__info']}>
            {ValueDelivery > 0 && (
              <span className={styles.description}>
                {delivery}
              </span>
            )}

            <Row justifyContent='space-between'>
              <span className={styles.price}>
                {free ? 'Gratis' : priceOrFree}
              </span>
              {ProDescuento > 0 && (
                <span className={styles.price_discount}>
                  {numberFormat(ProDescuento)}
                </span>
              )}
            </Row>
          </Column>
          {sum && (
            <div className={styles.quantity_container}>
              <QuantityButtonFloat
                handleIncrement={(event) => {
                  if (event != null) return handleUp(event)
                }}
                handleDecrement={(event) => {
                  if (event != null) return handleDown(event)
                }}
                handleChangeQuantity={(event) => {
                  return dispatch({
                    type: 'ON_CHANGE',
                    payload: {
                      value: String(event.target.value),
                      name: 'name',
                      index,
                      id: pId
                    }
                  })
                }}
                increment={increment}
                decrement={decrement}
                open={true}
                editable={false}
                editing={true}
                quantity={ProQuantity}
              />
            </div>
          )}
          <Row style={{ padding: '0 1.25rem', marginTop: getGlobalStyle('--spacing-xl') }}>
            <Column>
              <Text as='h3' className={styles['dish-card__description']}>
                {pName}
              </Text>
              <Text className={styles.description}>
                {ProDescription}
              </Text>
            </Column>
          </Row>
          <div
            className={styles['dish-card__container-image']}
            onClick={() => {
              return onTargetClick()
            }}
          >
            <Image
              alt={pName !== '' ? pName : ''}
              blurDataURL={urlImage}
              className='store_image'
              height={200}
              objectFit='cover'
              width={450}
              src={urlImage}
              unoptimized
            />
          </div>
          {Boolean(tag?.tag) &&
            (
              <div className='tag'>
                <Tag label={tag?.tag} />
              </div>
            )}
        </div>
        {showCategories && (
          <button
            className={styles.overline_categories}
            onClick={handleFreeProducts}
          >
            <Text className={styles.overline_categories_list} >
              {listCategories}
            </Text>
          </button>
        )}
      </div>
    </>
  )
}
export const CardProductSimple = React.memo(MemoCardProductSimple)
