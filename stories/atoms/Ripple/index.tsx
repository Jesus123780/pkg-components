'use client'

import { useRef, type ReactNode, type CSSProperties } from 'react'
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
    active,
    type = 'button',
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
    ref={button}
    type={type}
    disabled={disabled}
    onClick={loading ? () => {} : handleRippleEffect}
    className='ripple-button'
    active={active}
    bgColor={bgColor}
    color={color}
    family={family}
    padding={padding}
    margin={margin}
    border={props.border}
    radius={radius}
    height={props.height}
    style={{
      ...style,
      cursor: loading ? 'not-allowed' : 'pointer'
    }}
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

const Button = styled.button<{
  padding?: string
  bgColor?: string
  color?: string
  family?: string
  margin?: string
  border?: string
  radius?: string
  height?: string
}>`
  &:disabled {
    background-color: ${`${PColor}69`} !important;
  }
  position: relative;
  max-width: 100%;
  min-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: ${({ padding }) => padding ?? '1em'};
  background-color: ${({ bgColor }) => bgColor ?? 'var(--color-primary-red)'};
  color: ${({ color }) => color ?? BGColor};
  font-family: ${({ family }) => family ?? 'PFont-Light'};
  margin: ${({ margin }) => margin ?? '0'};
  border: ${({ border }) => border ?? 'none'};
  border-radius: ${({ radius }) => radius ?? '0'};
  height: ${({ height }) => height ?? 'auto'};
`
