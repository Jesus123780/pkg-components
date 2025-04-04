import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useGoogleLogin } from '../../../hooks/useGoogleLogin'
import { ButtonContent } from './ButtonContent'

export const GoogleLogin = ({
  onSuccess = () => {},
  onAutoLoadFinished = () => {},
  onRequest = () => {},
  onFailure = () => {},
  onScriptLoadFailure = () => {},
  tag = 'button',
  type = 'button',
  className = '',
  disabledStyle = {},
  buttonText = 'Sign in with Google',
  children = null,
  // render = null,
  theme = 'light',
  icon = true,
  disabled: disabledProp = false,
  clientId = '',
  cookiePolicy = 'single_host_origin',
  loginHint = '',
  hostedDomain = '',
  autoLoad = false,
  isSignedIn = false,
  fetchBasicProfile = true,
  redirectUri = '',
  discoveryDocs = [],
  uxMode = 'popup',
  scope = 'profile email',
  accessType = 'online',
  responseType = '',
  jsSrc = 'https://apis.google.com/js/api.js',
  prompt = ''
} = {}): JSX.Element => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    onAutoLoadFinished,
    onRequest,
    onFailure,
    onScriptLoadFailure,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    autoLoad,
    isSignedIn,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    uxMode,
    scope,
    accessType,
    responseType,
    jsSrc,
    prompt
  })
  const disabled = disabledProp || !loaded

  // if (render !== null) {
  //   return render({ onClick: signIn, disabled })
  // }

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
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onScriptLoadFailure: PropTypes.func,
  clientId: PropTypes.string.isRequired,
  jsSrc: PropTypes.string,
  onRequest: PropTypes.func,
  buttonText: PropTypes.node,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  disabledStyle: PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  isSignedIn: PropTypes.bool,
  responseType: PropTypes.string,
  type: PropTypes.string,
  accessType: PropTypes.string,
  render: PropTypes.func,
  theme: PropTypes.string,
  icon: PropTypes.bool
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
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6
  },
  icon: true,
  theme: 'light',
  onRequest: () => {}
}
