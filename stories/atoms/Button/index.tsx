import React from 'react'
import { classNames, getGlobalStyle } from '../../../helpers'
import style from './button.module.css'

export interface ButtonProps {
  width?: string
  borderRadius?: string
  fontSize?: string
  padding?: string
  type?: string | 'secundary' | 'primary'
  border?: 'gray' | 'primary'
  color?: 'default' | 'white' | 'black'
  primary?: boolean
  disabled?: boolean
  children?: React.ReactNode
  styles?: React.CSSProperties
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  borderRadius,
  fontSize,
  width,
  padding,
  disabled,
  border,
  color,
  primary = false,
  styles = {},
  type = '',
  onClick = () => {},
  ...res
}) => {
  const buttonStyle = {
    padding: padding ?? '10px 20px',
    borderRadius: borderRadius ?? '',
    cursor: 'pointer',
    outline: 'none',
    width,
    fontSize,
    color: primary ? 'white' : getGlobalStyle('--color-primary-red'),
    ...styles
  }

  return (
    <button
      disabled={disabled}
      className={classNames(style.button, {
        [style[`button--${type}`]]: type,
        [style[`button--${color}`]]: color,
        [style['button--primary']]: primary,
        [style[`button--border-${border}`]]: border,
        [style['button--secondary']]: !primary
      })}
      style={buttonStyle}
      onClick={onClick}
      {...res}
    >
      {children}
    </button>
  )
}
