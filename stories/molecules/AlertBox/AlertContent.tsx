'use client'

import React from 'react'
import { BGColor, PColor } from '../../../assets/colors'
import { type AlertContentProps } from './types'
import styles from './AlertContent.module.css'

type ColorMap = Record<string, string>

const colorMap: ColorMap = {
  error: PColor,
  warning: '#ebbc26',
  success: '#50a773',
  default: 'rgba(0, 0, 0, 0.9)'
}

export const AlertContent: React.FC<AlertContentProps> = ({ err, closed }) => {
  const message = typeof err?.message === 'string' ? err.message : ''
  const hasMessage = message.length > 0
  const colorKey = typeof err?.color === 'string' ? err.color : ''
  const backgroundColor = colorMap[colorKey] ?? colorMap.default

  const containerClassName = [
    styles.containerToast,
    hasMessage ? styles.visible : styles.hidden,
    hasMessage && closed ? styles.closed : ''
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={containerClassName}
      style={{ backgroundColor, color: BGColor }}
      role={hasMessage ? 'alert' : undefined}
      aria-hidden={!hasMessage || Boolean(closed)}
    >
      <div className={styles.contentToast}>
        <div>{message}</div>
      </div>
    </div>
  )
}
