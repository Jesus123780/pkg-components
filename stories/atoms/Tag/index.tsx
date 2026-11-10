'use client'

import React, { type JSX } from 'react'
import { classNames } from '../../../helpers'
import styles from './styles.module.css'

type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type TagVariant = 'solid' | 'soft' | 'outline' | 'subtle'

type TagColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'black'
  | 'white'
  | 'gray'

type TagBackgroundColor =
  | 'primary'
  | 'primary-light'
  | 'secondary'
  | 'secondary-light'
  | 'green'
  | 'success'
  | 'success-light'
  | 'error'
  | 'error-light'
  | 'warning'
  | 'warning-light'
  | 'black'
  | 'white'
  | 'gray'
  | 'gray-light'
  | 'transparent'

type TagRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full'

type TagWeight = 'normal' | 'medium' | 'semibold' | 'bold'

type TagTextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'

interface TagProps {
  // Existing props
  align?: 'start' | 'center' | 'end'
  backgroundColor?: TagBackgroundColor
  children?: React.ReactNode
  className?: string
  color?: TagColor
  label?: string
  lineHeight?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '9xl' | '10xl'
  style?: React.CSSProperties
  as?: keyof JSX.IntrinsicElements

  // New props
  size?: TagSize
  variant?: TagVariant
  rounded?: TagRounded
  weight?: TagWeight
  borderColor?: TagColor
  textTransform?: TagTextTransform
  fullWidth?: boolean
  disabled?: boolean
  bordered?: boolean
  uppercase?: boolean
}

export const Tag: React.FC<TagProps> = ({
  label = '',
  children,
  className = '',
  color,
  backgroundColor = 'gray',
  align,
  lineHeight,
  as = 'span',
  style = {},

  // New props
  size = 'md',
  variant = 'solid',
  rounded = 'xs',
  weight = 'medium',
  borderColor,
  textTransform,
  fullWidth = false,
  disabled = false,
  bordered = false,
  uppercase = false
}) => {
  const combinedClasses = Array.isArray(className)
    ? className.filter(Boolean).join(' ')
    : String(className)

  const Component = as

  const combinedStyles = {
    ...style
  }

  return (
    <Component
      style={combinedStyles}
      aria-disabled={disabled || undefined}
      className={classNames('marmita-minitag', {
        [styles['marmita-minitag']]: true,

        // Existing classes
        [combinedClasses]: Boolean(combinedClasses),
        [styles[`color-${color}`]]: Boolean(color),
        [styles[`align-${align}`]]: Boolean(align),
        [styles[`background-${backgroundColor}`]]: Boolean(backgroundColor),
        [styles[`line-height-${lineHeight}`]]: Boolean(lineHeight),

        // New classes
        [styles[`size-${size}`]]: Boolean(size),
        [styles[`variant-${variant}`]]: Boolean(variant),
        [styles[`rounded-${rounded}`]]: Boolean(rounded),
        [styles[`weight-${weight}`]]: Boolean(weight),
        [styles[`border-${borderColor}`]]: Boolean(borderColor),
        [styles[`text-transform-${uppercase ? 'uppercase' : textTransform}`]]:
          Boolean(uppercase || textTransform),
        [styles['full-width']]: fullWidth,
        [styles['is-disabled']]: disabled,
        [styles['is-bordered']]: bordered
      })}
    >
      {label}
      {children}
    </Component>
  )
}

export type { TagProps }
