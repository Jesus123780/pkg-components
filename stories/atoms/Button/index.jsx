import PropTypes from 'prop-types';
import { Loading } from '../../../assets/icons';
import { getGlobalStyle } from '../../../utils';
import './button.css';
import { CustomButton } from './styled';

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  backgroundColor,
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
  const primitiveMode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const mode = ripple ? 'ripple-mode' : primitiveMode
  return (
    <CustomButton
      disabled={loading || disabled}
      width={width}
      loading={loading}
      padding={padding}
      type="button"
      className={
        ['storybook-button', `storybook-button--${size}`, `storybook-button--${loading && 'loading'}`, mode].join(' ')
      }
      style={{
        backgroundColor,
        color,
        fontWeight,
        borderRadius,
        fontFamily
      }}
      {...props}
    >
      {loading  ? <Loading color={getGlobalStyle('--color-base-white')}  size={20} /> : label }
      {child}
    </CustomButton>
  );
};

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
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
