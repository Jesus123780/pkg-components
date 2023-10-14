import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from '../../../assets/icons'
import { getGlobalStyle } from '../../../utils'
import { CustomButton } from './styled'
import styles from './button.module.css'

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
      width={width}
      loading={loading}
      padding={padding}
      type="button"
      className={
        [styles['storybook-button'], styles[`storybook-button--${size}`], styles[`storybook-button--${loading && 'loading'}`], mode].join(' ')
      }
      style={{
        backgroundColor: disabled ? '#ff000069' : backgroundColor,
        color,
        fontWeight,
        borderRadius,
        fontFamily,
        ...props
      }}
      {...props}
    >
      {loading  ? <Loading color={getGlobalStyle('--color-base-white')}  size={20} /> : label }
      {child}
      {props.children}
    </CustomButton>
  )
}

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
}

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
}
