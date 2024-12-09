import React from 'react'
import styles from './styles.module.css'

interface OverlineProps {
  zIndex?: string
  bgColor?: string
  show?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export const Overline: React.FC<OverlineProps> = ({ 
  zIndex,
  bgColor,
  show,
  onClick,
  style
}) => {
  const inlineStyles = {
    zIndex: zIndex ?? '99',
    backgroundColor: bgColor ?? 'transparent',
    ...style
  }

  const classNames = [
    styles.overline,
    (show ?? false) && styles.show,
    (onClick != null) && styles.clickable
  ]
    .filter(Boolean)
    .join(' ')

  return <div
    className={classNames}
    style={inlineStyles}
    onClick={onClick}>

  </div>
}
