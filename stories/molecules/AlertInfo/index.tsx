import React from 'react'
import { IconInfo } from '../../../assets/icons'
import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'

interface AlertInfoProps {
  type: 'warning' | 'error' | 'info'
  message: string
}

export const AlertInfo: React.FC<AlertInfoProps> = ({ type, message }) => {
  const sizeBorder = '1px solid'
  const borders: { [key in AlertInfoProps['type']]: string } = {
    warning: sizeBorder,
    error: sizeBorder,
    info: sizeBorder
  }

  const colors: { [key in AlertInfoProps['type']]: string } = {
    warning: '#FFC107',
    error: getGlobalStyle('--color-primary-red'),
    info: '#0D6EFD'
  }

  const borderStyle = borders[type] || `${sizeBorder} transparent`
  const color = colors[type] || getGlobalStyle('--color-icons-gray')

  return (
    <div className={`${styles.alert} ${styles[type]}`} style={{ border: `${borderStyle} ${color}` }}>
      <div>
        <span className={styles.dot} style={{ backgroundColor: color }} />
        <div className={styles.icon}>
          <IconInfo color={color} size={25} />
        </div>
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  )
}
