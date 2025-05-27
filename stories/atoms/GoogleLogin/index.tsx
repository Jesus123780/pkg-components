import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useGoogleLogin } from '../../../hooks/useGoogleLogin'
import { ButtonContent } from './ButtonContent'

type GoogleLoginRenderProps = {
  onClick: () => void;
  disabled: boolean;
};

type GoogleLoginProps = {
  onSuccess?: (...args: any[]) => void;
  onAutoLoadFinished?: (...args: any[]) => void;
  onFailure?: (...args: any[]) => void;
  onScriptLoadFailure?: (...args: any[]) => void;
  tag?: keyof JSX.IntrinsicElements;
  type?: string;
  className?: string;
  disabledStyle?: React.CSSProperties;
  buttonText?: React.ReactNode;
  children?: React.ReactNode;
  render?: (props: GoogleLoginRenderProps) => JSX.Element;
  theme?: 'light' | 'dark';
  icon?: boolean;
  disabled?: boolean;
  clientId?: string;
  autoLoad?: boolean;
  prompt?: string;
};

export const GoogleLogin = ({
  onSuccess = () => { },
  onAutoLoadFinished = () => { },
  onFailure = () => { },
  onScriptLoadFailure = () => { },
  tag = 'button',
  type = 'button',
  className = '',
  disabledStyle = {},
  buttonText = 'Sign in with Google',
  children = null,
  render = undefined,
  theme = 'light',
  icon = true,
  disabled: disabledProp = false,
  clientId = '',
  autoLoad = false,
  prompt = ''
}: GoogleLoginProps = {}): JSX.Element => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    onAutoLoadFinished,
    onFailure,
    onScriptLoadFailure,
    clientId,
    autoLoad,
    prompt
  })
  const disabled = disabledProp || !loaded

  if (typeof render === 'function') {
    return render({ onClick: signIn, disabled })
  }

  const initialStyle = {
    backgroundColor: theme === 'dark' ? 'rgb(66, 133, 244)' : '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
    padding: 0,
    borderRadius: 2,
    border: '1px solid transparent',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto, sans-serif'
  }

  const hoveredStyle = {
    cursor: 'pointer',
    opacity: 0.9
  }

  const activeStyle = {
    cursor: 'pointer',
    backgroundColor: theme === 'dark' ? '#3367D6' : '#eee',
    color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
    opacity: 1
  }

  const defaultStyle = (() => {
    if (disabled) {
      return Object.assign({}, initialStyle, disabledStyle)
    }

    if (active) {
      if (theme === 'dark') {
        return Object.assign({}, initialStyle, activeStyle)
      }

      return Object.assign({}, initialStyle, activeStyle)
    }

    if (hovered) {
      return Object.assign({}, initialStyle, hoveredStyle)
    }

    return initialStyle
  })()
  const googleLoginButton = React.createElement(
    tag,
    {
      onMouseEnter: () => { return setHovered(true) },
      onMouseLeave: () => {
        setHovered(false)
        setActive(false)
      },
      onMouseDown: () => { return setActive(true) },
      onMouseUp: () => { return setActive(false) },
      onClick: signIn,
      style: defaultStyle,
      type,
      disabled,
      className
    },
    [
      icon && <div key={1} />,
      <ButtonContent icon={icon} key={2}>
        {children ?? buttonText}
      </ButtonContent>
    ]
  )

  return googleLoginButton
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func,
  onAutoLoadFinished: PropTypes.func,
  onFailure: PropTypes.func,
  onScriptLoadFailure: PropTypes.func,
  tag: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  disabledStyle: PropTypes.object,
  buttonText: PropTypes.node,
  children: PropTypes.node,
  render: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark']),
  icon: PropTypes.bool,
  disabled: PropTypes.bool,
  clientId: PropTypes.string.isRequired,
  autoLoad: PropTypes.bool,
  prompt: PropTypes.string
}

GoogleLogin.defaultProps = {
  type: 'button',
  tag: 'button',
  buttonText: 'Sign in with Google',
  scope: 'profile email',
  accessType: 'online',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  disabledStyle: {
    opacity: 0.6
  },
  icon: true,
  theme: 'light',
  onRequest: () => { }
}
