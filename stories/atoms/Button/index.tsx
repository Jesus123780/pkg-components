import React from 'react'
import { getGlobalStyle } from '../../../helpers'
import classNames from 'classnames'
import { Icon } from '../Icon'
import style from './button.module.css'

export interface ButtonProps {
  width?: string
  borderRadius?: string
  loading?: boolean
  fontSize?: string
  padding?: string
  type?: string | 'secundary' | 'primary'
  border?: 'gray' | 'primary'
  color?: 'default' | 'white' | 'black'
  primary?: boolean
  disabled?: boolean
  children?: React.ReactNode
  styles?: React.CSSProperties
  className?: string // Nuevo prop para className
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
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
  loading = false,
  styles = {},
  className = '', // Default vacío
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
      className={classNames(
        style.button,
        {
          [style[`button--${type}`]]: border !== undefined,
          [style[`button--${color}`]]: border !== undefined,
          [style['button--primary']]: primary,
          [style[`button--border-${border}`]]: border !== undefined,
          [style['button--secondary']]: !primary
        },
        className // Se añade aquí el className externo
      )}
      style={buttonStyle}
      onClick={onClick}
      {...res}
    >
      {loading && (
        <div className={style.loadingWrapper} id="loading">
          <Icon
            icon="IconLoading"
            size={30}
            color={getGlobalStyle('--color-base-white')}
          />
        </div>
      )}
      <span
        style={
          loading
            ? { opacity: 0 }
            : {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
                display: 'flex'
              }
        }
      >
        {children}
      </span>
    </button>
  )
}
