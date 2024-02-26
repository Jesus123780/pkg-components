import React from 'react'
import { type MiniCardProductProps } from './type'
import { QuantityButtonFloat } from '../../molecules/QuantityButtonFloat'
import {
  Icon,
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
  ProQuantity = 0,
  comment = '',
  onClick = () => {},
  handleDecrement = () => {},
  handleIncrement = () => {},
  handleGetSubItems = () => {},
  handleComment = () => {},
  handleFreeProducts = () => {},
  dataExtra = [],
  dataOptional = []
}) => {
  const urlImage = '/images/DEFAULTBANNER.png'

  return (
    <div
      style={{
        position: 'relative',
        width: 'min-content',
        height: '270px'
      }}
      className={styles['product-card']}
    >
      {withQuantity && (
        <div className={styles.quantity_container}>
          <QuantityButtonFloat
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            open={openQuantity}
            quantity={ProQuantity}
          />
        </div>
      )}
      {hoverFree && (
        <div
          className={styles.productCardWrapperFree}
          onClick={handleFreeProducts}
        >
          <Text color="white" align="center" size="sm">
            {free ? 'Gratis' : 'Marcar gratis'}
          </Text>
        </div>
      )}
      <div className={styles.productCardWrapper} onClick={onClick}>
        <div
          className={styles['product-card-content']}
          data-test-id="product-card-test-id"
        >
          <div
            className={styles['product-card-image__container']}
            data-test-id="product-card-image"
          >
            <div className={styles['wrapper-image']}>
              <img className={styles['product-card-image']} src={urlImage} />
            </div>
            <div className={styles['product-card-image__overlay']}></div>
          </div>
          <div
            className={styles['product-card__price']}
            data-test-id="product-card-price"
          >
            {ProPrice}
          </div>
          <span className={styles['product-card__title']} title={pName}>
            {pName}
          </span>
          <span
            className={styles['product-card__description']}
            title={ProDescription}
          >
            {ProDescription}
          </span>
        </div>
        {Boolean(free) && <Tag label="Gratis" backgroundColor="green" />}
      </div>
      <div>
        {showDot && (
          <div className={styles.container_free}>
            <button
              className={styles.dots_sub_items}
              onClick={handleGetSubItems}
            >
              <Icon
                icon="IconBox"
                size={30}
                height={30}
                width={30}
                color={
                  Boolean(dataExtra?.length > 0) ||
                  Boolean(dataOptional?.length > 0)
                    ? getGlobalStyle('--color-icons-primary')
                    : getGlobalStyle('--color-icons-gray')
                }
              />
            </button>
          </div>
        )}
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
            const subItems = productItem?.ExtProductFoodsSubOptionalAll
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
      {showDot && (
        <div className={styles.suggestion}>
          <button onClick={handleComment}>
            <Icon
              icon="IconLines"
              size={25}
              height={25}
              width={25}
              color={comment !== '' ? getGlobalStyle('--color-icons-primary') : getGlobalStyle('--color-icons-gray')}
            />
          </button>
        </div>
      )}
    </div>
  )
}
