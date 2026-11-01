'use client'

import React, { JSX } from 'react'
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
  as?: keyof JSX.IntrinsicElements
}

export const Tag: React.FC<TagProps> = ({
  label = '',
  children,
  className = '',
  color,
  backgroundColor,
  align,
  lineHeight,
  as = 'span',
  style = {}
}) => {
  const combinedClasses = Array.isArray(className)
    ? className.filter(Boolean).join(' ')
    : String(className)

  const Component = as

  return (
    <Component
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
    </Component>
  )
}
