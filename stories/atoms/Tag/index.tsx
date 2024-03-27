import PropTypes from 'prop-types'
import React from 'react'
import { classNames } from '../../../helpers'
import styles from './styles.module.css'

interface TagProps {
  align?: 'start' | 'center' | 'end'
  backgroundColor?: 'primary' | 'green'
  children?: React.ReactNode
  className?: string
  color?: 'primary' | 'secondary'
  label?: string
  lineHeight?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '9xl' | '10xl'
  style?: object
}

export const Tag: React.FC<TagProps> = ({
  label = 'OBLIGATORIO',
  children,
  className = '',
  color,
  backgroundColor,
  align,
  lineHeight,
  style
}) => {
  const combinedClasses = Array.isArray(className)
    ? className.filter(Boolean).join(' ')
    : String(className)

  return (
    <span
      style={style}
      className={classNames('marmita-minitag', {
        [`${combinedClasses}`]: combinedClasses,
        [styles[`color-${color}`]]: color,
        [styles['marmita-minitag']]: true,
        [styles[`align-${align}`]]: align,
        [styles[`background-${backgroundColor}`]]: backgroundColor,
        [styles[`line-height-${lineHeight}`]]: lineHeight
      })}
    >
      {label}
      {children}
    </span>
  )
}

Tag.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
  className: PropTypes.string // Validación del tipo de className
}
