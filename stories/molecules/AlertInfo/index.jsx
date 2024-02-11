import React from 'react'
import PropTypes from 'prop-types'
import { IconInfo } from '../../../assets/icons'
import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'

export const AlertInfo = ({ type, message }) => {

  const sizeBorder = '1px solid'
  const borders = {
    warning: sizeBorder,
    error: sizeBorder,
    info: sizeBorder
  }

  const colors = {
    warning: '#FFC107',
    error: getGlobalStyle('--color-primary-red'),
    info: '#0D6EFD'
  }

  const borderStyle = borders[type] || `${sizeBorder} transparent`
  const color = colors[type] || getGlobalStyle('--color-icons-gray')

  return (
    <div
      className={`${styles.alert} ${styles[type]}`}
      style={{ border: `${borderStyle} ${color}` }}
    >
      <div>
        <span className={styles.dot} style={{ backgroundColor: `${color}` }} />
        <div className={styles.icon}>
          <IconInfo color={color} size={25} />
        </div>
      </div>
      <div className={styles.message} style={{ color: `${color}` }}>{message}</div>
    </div>
  )
}

AlertInfo.propTypes = {
  type: PropTypes.oneOf(['warning', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired
}
