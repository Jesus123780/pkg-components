import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from './../../../assets/colors'
import styles from './RippleButton.module.css'
import { getGlobalStyle } from '../../../utils'
import { IconLoading } from '../../../assets'

export const RippleButton = props => {
  const {
    label,
    onClick,
    loading,
    style,
    family,
    standard,
    active,
    type,
    widthButton
  } = props
  const button = useRef(null)
  const handleRippleEffect = (e) => {
    const button = e?.currentTarget

    const ripple = document.createElement('span')
    const rect = button?.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const left = e.pageX - rect.left - size / 2 - window.pageXOffset
    const top = e.pageY - rect.top - size / 2 - window.pageYOffset

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${left}px`
    ripple.style.top = `${top}px`
    ripple.classList.add(styles.ripple)

    const currentRipple = button.querySelector(`.${styles.ripple}`)
    if (currentRipple) {
      currentRipple.remove()
    }

    button.appendChild(ripple)

    ripple.addEventListener('animationend', function() {
      ripple.remove()
    })

    if (onClick) {
      onClick(e)
    }
  }

  if (!button) return <></>
  return (
    <Button
      active={active}
      bgColor={ props.bgColor}
      className={`ripple-button`}
      color={ props.color }
      family={family}
      margin={ props.margin }
      onClick={handleRippleEffect}
      padding={ props.padding }
      radius={props.radius}
      ref={button}
      standard={standard}
      style={style}
      type={type}
      widthButton={widthButton}
      {...props}
    >
      <span id='ripple-button-label'>{label}</span>
      {loading &&
        <LoadingWrapper>
          <IconLoading color={getGlobalStyle('--color-base-white')} size={20} />
        </LoadingWrapper>
      }
       <span style={loading ? { opacity: 0 } : {}} >
        {props.children}
      </span>
    </Button>
  )
}

RippleButton.propTypes = {
  active: PropTypes.any,
  bgColor: PropTypes.any,
  children: PropTypes.any,
  color: PropTypes.any,
  family: PropTypes.any,
  label: PropTypes.any,
  margin: PropTypes.any,
  onClick: PropTypes.any,
  padding: PropTypes.any,
  radius: PropTypes.any,
  standard: PropTypes.any,
  style: PropTypes.any,
  type: PropTypes.any,
  widthButton: PropTypes.any

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
  animation: rotator 1.4s linear infinite;
  fill: #fff;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

const Button = styled.button`
&:disabled {
  background-color: ${`${PColor}69`} !important;
}

 padding: ${ ({ padding }) => {return padding ? padding : '1em'} };
 background-color: ${ ({ bgColor }) => {return bgColor ? bgColor : 'red'} };
 color: ${ ({ color }) => {return color ? color : BGColor} };
 font-family: ${ ({ family }) => {return family ? family : 'PFont-Light'} };
 width: ${ ({ widthButton }) => {return widthButton ? widthButton : '100%'} };
 ${ ({ margin }) => {return margin && css`margin: ${ margin };`} }
 ${ ({ border }) => {return border && css`border: ${ border };`}}
 ${ ({ radius }) => {return radius && css`border-radius: ${ radius };`}}
 ${ ({ height }) => {return height && css`height: ${ height };`}}
`