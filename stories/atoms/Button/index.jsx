import PropTypes from 'prop-types'
import React from 'react'
import { IconLoading } from '../../../assets/icons'
import { getGlobalStyle } from '../../../utils'
import styles from './button.module.css'
import { CustomButton, LoadingWrapper } from './styled'

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = true,
  backgroundColor = '',
  size,
  label,
  borderRadius,
  color,
  width,
  padding,
  ripple,
  fontFamily,
  loading,
  child,
  fontWeight,
  disabled,
  ...props
}) => {
  const primitiveMode = primary ? styles['storybook-button--primary'] : styles['storybook-button--secondary']
  const mode = ripple ? styles['ripple-mode'] : primitiveMode
  return (
    <CustomButton
      c={loading || disabled}
      className={
        [styles['storybook-button'], styles[`storybook-button--${size}`], styles[`storybook-button--${loading && 'loading'}`], mode].join(' ')
      }
      loading={loading}
      padding={padding}
      style={{
        backgroundColor: disabled ? '#ff000069' : backgroundColor,
        color,
        fontWeight,
        borderRadius,
        fontFamily,
        ...props
      }}
      type='button'
      width={width}
      {...props}
    >
      {loading ?
        <LoadingWrapper>
          <IconLoading color={getGlobalStyle('--color-base-white')} size={20} />
        </LoadingWrapper>
        : label
      }
      {child}
      <div className={loading ? styles['hidden-while-loading'] : styles['children-align']}>
        {props.children}
      </div>
    </CustomButton>
  )
}

Button.propTypes = {
  backgroundColor: PropTypes.string, //*
  borderRadius: PropTypes.any,
  child: PropTypes.any,
  color: PropTypes.any,
  disabled: PropTypes.any,
  fontFamily: PropTypes.any,
  fontWeight: PropTypes.any,
  label: PropTypes.string.isRequired, //*
  loading: PropTypes.string,
  onClick: PropTypes.func,
  padding: PropTypes.any,
  children: PropTypes.any,
  primary: PropTypes.bool, //*
  ripple: PropTypes.any,
  size: PropTypes.oneOf(['small', 'medium', 'large']), //*
  width: PropTypes.any
}

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined
}
