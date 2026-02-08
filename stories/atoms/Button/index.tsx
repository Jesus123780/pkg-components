'use client'

import { getGlobalStyle } from '../../../helpers'
import classNames from 'classnames'
import { Icon } from '../Icon'
import style from './button.module.css'
import { Column } from '../Column'
import type { ButtonProps } from 'typesdefs'

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
  iconSize,
  styles = {},
  className = '', // Default vacío
  type = '',
  onClick = () => { },
  iconPosition = 'left',
  iconName,
  title = '',
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

  const renderIcon = typeof iconName === 'string' && iconName.trim() !== '' && !loading
    ? (
      <Column
        justifyContent='center'
        alignItems='center'
        style={{
          width: 'min-content',
          margin: iconPosition === 'left' ? '0 8px 0 0' : '0 0 0 8px'
        }}>
        <Icon
          icon={iconName}
          size={iconSize ?? 18}
          color={primary ? '#fff' : getGlobalStyle('--color-primary-red')}

        />
      </Column>
      )
    : null
  return (
    <button
      title={title}
      aria-label={title}
      type={type as 'submit' | 'reset' | 'button'}
      disabled={disabled}
      className={classNames(
        style.button as string,
        {
          [style[`button--${border}`]]: border !== undefined,
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
        <div className={style.loadingWrapper} id='loading'>
          <Icon
            icon='IconLoading'
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
        {iconPosition === 'left' && renderIcon}
        {children}
        {iconPosition === 'right' && renderIcon}
      </span>
    </button>
  )
}
