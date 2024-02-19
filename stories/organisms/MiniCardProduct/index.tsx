import React from 'react'
import styles from './styles.module.css'
import { type MiniCardProductProps } from './type'
import { QuantityButtonFloat } from '../../molecules/QuantityButtonFloat'

export const MiniCardProduct: React.FC<MiniCardProductProps> = ({
  ProPrice,
  ProDescription = '',
  pName = '',
  withQuantity = false,
  openQuantity = false,
  ProQuantity = 0,
  onClick = () => {},
  handleDecrement = () => {},
  handleIncrement = () => {},
  ...props
}) => {
  const urlImage = '/images/DEFAULTBANNER.png'

  return (
    <div style={{ position: 'relative', width: 'min-content' }} >
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
      </div>
    </div>
  )
}
