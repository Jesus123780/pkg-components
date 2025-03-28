import React, { useRef, type ReactNode, type CSSProperties } from 'react'
import styled from 'styled-components'
import { IconLoading } from '../../../assets'
import { getGlobalStyle } from '../../../utils'
import { BGColor, PColor } from '../../../assets/colors'
import styles from './RippleButton.module.css'

export interface RippleButtonProps {
  label?: any
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  loading?: boolean
  style?: CSSProperties
  family?: string
  border?: string
  height?: string
  disabled?: boolean
  standard?: boolean
  active?: any
  type?: 'button' | 'submit' | 'reset'
  widthButton?: string
  bgColor?: string
  color?: string
  margin?: string
  padding?: string
  radius?: string
  children?: ReactNode
  onKeyPress?: (e: React.KeyboardEvent<HTMLButtonElement>) => void

}

export const RippleButton: React.FC<RippleButtonProps> = (props) => {
  const {
    label = '',
    onClick = () => {},
    loading = false,
    style = {},
    family = 'PFont-Light',
    disabled = false,
    standard = false,
    active,
    type = 'button',
    widthButton = '100%',
    bgColor,
    color,
    margin,
    padding,
    radius
  } = props
  const button = useRef<HTMLButtonElement>(null)

  const handleRippleEffect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (loading) return
    const buttonElement = button.current
    if (buttonElement == null) return

    const ripple = document.createElement('span')
    const rect = buttonElement.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const left = e.pageX - rect.left - size / 2 - window.pageXOffset
    const top = e.pageY - rect.top - size / 2 - window.pageYOffset

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${left}px`
    ripple.style.top = `${top}px`
    ripple.classList.add(styles.ripple as string)

    const currentRipple = buttonElement.querySelector(`.${styles.ripple}`)
    if (currentRipple !== null) {
      currentRipple.remove()
    }

    buttonElement.appendChild(ripple)

    ripple.addEventListener('animationend', function () {
      ripple.remove()
    })

    if (typeof onClick === 'function' && !loading) {
      onClick(e)
    }
  }

  if (button === null || button === undefined) return <></>

  return (
    <Button
      active={active}
      bgColor={bgColor}
      className={'ripple-button'}
      color={color}
      disabled={disabled}
      family={family}
      margin={margin}
      onClick={loading ? () => { } : handleRippleEffect}
      padding={padding}
      radius={radius}
      ref={button}
      standard={standard}
      style={{
        ...style,
        cursor: loading ? 'not-allowed' : 'pointer',
        overflow: 'hidden'
      }}
      type={type}
      widthButton={widthButton}
      {...props}
    >
      <span id='ripple-button-label'>{label}</span>
      {loading && (
        <LoadingWrapper id='loading'>
          <IconLoading color={getGlobalStyle('--color-base-white')} size={30} />
        </LoadingWrapper>
      )}
      <span style={loading ? { opacity: 0 } : {}}>{props.children}</span>
    </Button>
  )
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: -5px;
  padding: 1em;
  bottom: 0;
  position: absolute;

  svg {
    animation: rotator 1s linear infinite;
    fill: #fff;
  }

  @keyframes rotator {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Button = styled.button.attrs<{
  padding?: string
  bgColor?: string
  color?: string
  family?: string
  margin?: string
  border?: string
  radius?: string
  height?: string
}>(({ padding, bgColor, color, family, margin, border, radius, height }) => ({
  style: {
    padding: padding ?? '1em',
    backgroundColor: bgColor ?? 'var(--color-primary-red)',
    color: color ?? BGColor,
    fontFamily: family ?? 'PFont-Light',
    margin: margin ?? undefined,
    border: border ?? undefined,
    borderRadius: radius ?? undefined,
    height: height ?? undefined
  }
}))`
  &:disabled {
    background-color: ${`${PColor}69`} !important;
  }
  position: relative;
  width: 100%; /* Se usa en lugar de widthButton para evitar errores */
  max-width: 100%;
  min-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
