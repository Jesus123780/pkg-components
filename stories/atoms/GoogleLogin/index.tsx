'use client'

import React, { JSX, useEffect, useState } from 'react'
import { useGoogleLogin } from '../../../hooks/useGoogleLogin'

interface GoogleLoginRenderProps {
  onClick: () => void
  disabled: boolean
}

interface GoogleLoginProps {
  onSuccess?: (...args: any[]) => void
  onAutoLoadFinished?: (...args: any[]) => void
  onFailure?: (...args: any[]) => void
  onPopupClosed?: (...args: any) => void
  onScriptLoadFailure?: (...args: any[]) => void
  tag?: keyof JSX.IntrinsicElements
  type?: string
  className?: string
  disabledStyle?: React.CSSProperties
  buttonText?: React.ReactNode
  children?: React.ReactNode
  render?: (props: GoogleLoginRenderProps) => JSX.Element
  theme?: 'light' | 'dark'
  icon?: boolean
  disabled?: boolean
  clientId?: string
  autoLoad?: boolean
  prompt?: string
  popupTimeoutMs?: number
}

export const GoogleLogin = ({
  onSuccess = () => {},
  onAutoLoadFinished = () => {},
  onFailure = () => {},
  onScriptLoadFailure = () => {},
  onPopupClosed = () => {},
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
  prompt = '',
  popupTimeoutMs = 10000
}: GoogleLoginProps = {}) => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const { signIn, loaded, popupClosed, resetPopupClosed } = useGoogleLogin({
    onSuccess,
    onAutoLoadFinished,
    onFailure,
    onScriptLoadFailure,
    onPopupClosed,
    clientId,
    autoLoad,
    prompt,
    popupTimeoutMs
  })
  const disabled = disabledProp || !loaded

  // If consumer passed onPopupClosed we still call it (hook calls it),
  // here we also expose the event via prop as a convenience (keeps compatibility).
  useEffect(() => {
    if (!popupClosed) return
    try {
      // consumer already got callback via hook options, but ensure reset hook state after a short delay
      setTimeout(() => {
        resetPopupClosed()
      }, 300)
    } catch (e) {
      // noop
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupClosed])

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
      return Object.assign({}, initialStyle, activeStyle)
    }

    if (hovered) {
      return Object.assign({}, initialStyle, hoveredStyle)
    }

    return initialStyle
  })()

  const googleLoginButton = React.createElement(
    tag as string,
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
      <div key={2} style={{ display: 'inline-flex', alignItems: 'center', padding: '10px 16px' }}>
        {children ?? buttonText}
      </div>
    ]
  )

  return googleLoginButton
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
  onRequest: () => { },
  popupTimeoutMs: 10000
}
