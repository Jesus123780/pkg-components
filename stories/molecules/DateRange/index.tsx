import PropTypes from 'prop-types'
import React from 'react'
import { IconArrowRight } from '../../../assets/icons'
import { getGlobalStyle } from '../../../utils'
import styles from './DateRange.module.css'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = date.toLocaleString('default', { month: 'short' })
  return `${day} de ${month}`
}
  

export const DateRange = ({ startDate, endDate }) => {
  const formattedStartDate = formatDate(startDate)
  const formattedEndDate = formatDate(endDate)

  return (
    <div className={styles.dateRange}>
      <div className={styles.boxRange}>
        <span className={styles.label}>Desde</span>
        <span className={styles.date}>{formattedStartDate}</span>
      </div>
      <span className={styles.separator}>
        <IconArrowRight
          color={getGlobalStyle('--color-icons-black')}
          size={30}
        />
      </span>
      <div className={styles.boxRange} style={{ marginLeft: '5px' }}>
        <span className={styles.label}>Hasta</span>
        <span className={styles.date}>{formattedEndDate}</span>
      </div>
    </div>
  )
}

DateRange.propTypes = {
  endDate: PropTypes.string,
  startDate: PropTypes.string
}
