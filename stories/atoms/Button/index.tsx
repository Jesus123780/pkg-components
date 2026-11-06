'use client'

import React from 'react'
import classNames from 'classnames'

import { getGlobalStyle } from '../../../helpers'
import type { ButtonProps } from 'typesdefs'

import { Icon } from '../Icon'

import style from './button.module.css'

export const Button: React.FC<ButtonProps> = ({
  children,
  borderRadius,
  fontSize,
  width,
  padding,
  disabled = false,
  border,
  color,
  primary = false,
  loading = false,
  iconSize,
  size,
  styles = {},
  className = '',
  type = 'button',
  onClick = () => {},
  iconPosition = 'left',
  iconName,
  title = '',
  tabIndex,
  ...res
}) => {
  const defaultIconSize = {
    small: 20,
    medium: 30,
    large: 40
  }

  const buttonStyle: React.CSSProperties = {
    width,
    fontSize,
    borderRadius,
    padding,
    ...styles,
    ...(disabled
      ? {
          cursor: 'not-allowed'
        }
      : {})
  }

  const iconColor = disabled
    ? getGlobalStyle('--color-text-disabled')
    : color === 'white'
      ? getGlobalStyle('--color-icons-white')
      : color === 'black'
        ? getGlobalStyle('--color-icons-black')
        : primary
          ? getGlobalStyle('--color-icons-white')
          : getGlobalStyle('--color-icons-primary')

  const resolvedIconSize =
    iconSize ??
    (size
      ? defaultIconSize[size]
      : 18)

  const renderIcon =
    typeof iconName === 'string' &&
    iconName.trim() !== '' &&
    !loading
      ? (
          <span className={style.icon}>
            <Icon
              icon={iconName}
              size={resolvedIconSize}
              color={iconColor}
            />
          </span>
        )
      : null

  return (
    <button
      {...res}
      tabIndex={tabIndex}
      title={title || undefined}
      aria-label={title || undefined}
      aria-busy={loading || undefined}
      type={type as 'submit' | 'reset' | 'button'}
      disabled={disabled}
      className={classNames(
        style.button,
        primary
          ? style['button--primary']
          : style['button--secondary'],
        border !== undefined &&
          style[`button--border-${border}`],
        color !== undefined &&
          style[`button--${color}`],
        size !== undefined &&
          style[`button--${size}`],
        {
          [style['button--loading']]: loading
        },
        className
      )}
      style={buttonStyle}
      onClick={onClick}
    >
      {loading && (
        <span className={style.loadingWrapper}>
          <Icon
            icon='IconLoading'
            size={resolvedIconSize}
            color={iconColor}
          />
        </span>
      )}

      <span
        className={classNames(
          style.content,
          {
            [style['content--loading']]: loading
          }
        )}
      >
        {iconPosition === 'left' && renderIcon}

        {children}

        {iconPosition === 'right' && renderIcon}
      </span>
    </button>
  )
}