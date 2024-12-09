import React from 'react'
import { type MiniCardProductProps } from './type'
import { QuantityButtonFloat } from '../../molecules/QuantityButtonFloat'
import {
  Icon,
  Row,
  Tag,
  Text
} from '../../atoms'
import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'

export const MiniCardProduct: React.FC<MiniCardProductProps> = ({
  ProPrice,
  ProDescription = '',
  pName = '',
  withQuantity = false,
  showDot = false,
  hoverFree = false,
  openQuantity = false,
  free = false,
  editable = false,
  editing = false,
  canDelete = false,
  ProQuantity = 0,
  comment = '',
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
  const urlImage = '/images/DEFAULTBANNER.png'
  return (
    <div style={{
      position: 'relative',
      width: 'min-content',
      height: '270px'
    }} className={styles.product}>

      <div
        style={{
          position: 'relative',
          width: 'min-content'
        }}
        className={styles['product-card']}
      >
        {withQuantity && (
          <div className={styles.quantity_container}>
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
            onClick={handleFreeProducts}
          >
            <Text
              align='center'
              color='white'
              size='sm'
            >
              {free ? 'Gratis' : 'Marcar gratis'}
            </Text>
          </div>
        )}
        <div className={`${styles.productCardWrapper}`} onClick={onClick}>
          <div
            className={styles['product-card-content']}
            data-test-id='product-card-test-id'
          >
            <div
              className={styles['product-card-image__container']}
              data-test-id='product-card-image'
            >
              <div className={styles['wrapper-image']}>
                <img className={styles['product-card-image']} src={urlImage} />
              </div>
              <div className={styles['product-card-image__overlay']}></div>
            </div>
            <div
              className={styles['product-card__price']}
              data-test-id='product-card-price'
            >
              {ProPrice}
            </div>
            <span className={styles['product-card__title']} title={pName}>
              {pName}
            </span>
            <span className={styles['product-card__description']} title={ProDescription}>
              {ProDescription}
            </span>
          </div>
          {Boolean(canDelete && editable) &&
            (
              <>
                <div className={styles.product_slide_action_bottom} onClick={(event) => {
                  event.stopPropagation()
                  handleDelete()
                }}>
                  <button>
                    <Icon icon='IconDelete' size={15} />
                  </button>
                </div>
                <div className={styles.suggestion} onClick={handleComment}>
                  <Tag label={comment !== '' ? 'EDITAR' : 'COMENTAR'} backgroundColor='green' />
                </div>
              </>
            )
          }
          <Row justifyContent='space-between' className={styles['product-card_action_free']}>
            {Boolean(free) && <Tag label='Gratis' backgroundColor='green' />}
          </Row>
          <>
            {showDot && (
              <div className={styles.container_free} onClick={handleGetSubItems}>
                <button className={styles.dots_sub_items}>
                  <Icon
                    icon='IconBox'
                    size={20}
                    color={
                      Boolean(dataExtra?.length > 0) ||
                        Boolean(dataOptional?.length > 0)
                        ? getGlobalStyle('--color-icons-primary')
                        : getGlobalStyle('--color-icons-gray')
                    }
                  />
                </button>
                <div className={styles.card_sub_items}>
                  {dataExtra?.map((subItem, idx) => {
                    const subItemName = `${subItem?.quantity}x ${subItem?.extraName}`
                    const isLastItem = idx === dataExtra.length - 1
                    return (
                      <span key={subItem.exPid}>
                        {subItemName}
                        {isLastItem ? '' : ', '}
                      </span>
                    )
                  })}
                  {Boolean(dataOptional?.length > 0) && ' - '}
                  {dataOptional?.map((productItem, idx) => {
                    const subItems = productItem?.ExtProductFoodsSubOptionalAll ?? []
                    const isLastItem = idx === subItems?.length - 1
                    return subItems?.map((subItem, index) => {
                      return (
                        <span key={index}>
                          {subItem?.OptionalSubProName !== null
                            ? `1x ${subItem?.OptionalSubProName}`
                            : ''}
                          {isLastItem ? '' : ', '}
                        </span>
                      )
                    })
                  })}
                </div>
              </div>
            )}

          </>
        </div>
      </div>
    </div>
  )
}
