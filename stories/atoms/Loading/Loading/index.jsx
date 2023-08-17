import React from 'react'
import styled, { keyframes } from 'styled-components'
import { PColor } from '../../../../assets/colors'

export const Loading = () => {
  return (
    <Container>
      <span className='loader'></span>
    </Container>
  )
}


export const SpinnerColor = () => {
  return (
    <Container>
      <LsRipple>
        <svg
          className='spinner'
          height='65px'
          viewBox='0 0 66 66'
          width='65px'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            className='path'
            cx='33'
            cy='33'
            fill='none'
            r='30'
            strokeLinecap='round'
            strokeWidth='6'
          ></circle>
        </svg>
      </LsRipple>
    </Container>
  )
}

export const SpinnerColorJust = () => {
  return (
    <Container>
      <LsRipple>
        <svg
          className='spinner'
          height='50px'
          viewBox='0 0 66 66'
          width='50px'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            className='path'
            cx='33'
            cy='33'
            fill='none'
            r='30'
            strokeLinecap='round'
            strokeWidth='6'
          ></circle>
        </svg>
      </LsRipple>
    </Container>
  )
}

const AnimationRipple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`
/// Estilos loading
const Container = styled.div`
    align-items: center;
    background-color: #7777774e;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999999;
    z-index: 99999999;
    .loader {
      animation: shadowPulse 1s linear infinite;
      background: #FFF;
      border-radius: 50%;
      box-shadow: -24px 0 #FFF, 24px 0 #FFF;
      box-sizing: border-box;
      display: block;
      height: 10px;
      margin: 0px auto;
      position: relative;
      width: 10px;
      z-index: 99999999;
}

@keyframes shadowPulse {
  33% {
    background: #FFF;
    box-shadow: -24px 0 ${PColor}, 24px 0 #FFF;
  }
  66% {
    background: ${PColor};
    box-shadow: -24px 0 #FFF, 24px 0 #FFF;
  }
  100% {
    background: #FFF;
    box-shadow: -24px 0 #FFF, 24px 0 ${PColor};
  }
}
`
const LsRipple = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    & > div {
        position: absolute;
        border: 4px solid ${PColor};
        opacity: 1;
        border-radius: 50%;
        animation: ${AnimationRipple} .1s cubic-bezier(0, 0.2, 0.8, 1)
            infinite;
    }
    & div:nth-child(2) {
        animation-delay: -0.5s;
    }
`