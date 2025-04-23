import React, { type FC } from 'react'
import PropTypes from 'prop-types'
import styles from './ContentQueryCard.module.css'
import {
  IconStore,
  IconLogo,
  PColor
} from '../../../assets'

interface ContentQueryCardProps {
  day?: string
  delivery?: number
  restaurant?: number
  totalSales?: number
  numberFormat?: (value: number) => string
}

export const ContentQueryCard: FC<ContentQueryCardProps> = ({
  day = 'hoy',
  delivery = 0,
  restaurant = 0,
  totalSales = 0,
  numberFormat = (number) => {
    return number
  }
}) => {
  return (
    <div className={styles.ContentQuery}>
      <div className={styles.containerCard}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Total Pedidos de {day}</div>
          </div>
          <div className={styles.cardContentPrice}>
            <div
              className={styles.cardPrice}
              style={{
                marginBottom: '5px',
                borderBottom: '1px solid var(--color-neutral-gray)',
                paddingBottom: '5px'
              }}
              title={process.env.BUSINESS_TITLE}
            >
              <IconLogo color={PColor} size='25px' />
              {numberFormat(delivery) || '0.00'}
            </div>
            <div className={styles.cardPrice} title={process.env.BUSINESS_TITLE}>
              <IconStore color={PColor} size='35px' />
              {numberFormat(restaurant) || '0.00'}
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Total</div>
          </div>
          <div className={styles.cardTitle}>
            <span style={{ fontSize: '30px' }}>{numberFormat(totalSales) || '0.00'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

ContentQueryCard.propTypes = {
  day: PropTypes.string,
  delivery: PropTypes.number,
  numberFormat: PropTypes.func,
  restaurant: PropTypes.number,
  totalSales: PropTypes.number
}
