import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { BGColor, PColor } from './../../../assets/colors/index'

export const onPulses = keyframes`
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
}
`
interface CircleDayProps {
  pulse: boolean
}
export const CircleDay: CircleDayProps = styled.div`
  border: 2px solid #cccccc;
  border-radius: 50%;
  height: 50px;
  cursor: pointer;
  background-color: ${BGColor};
  width: 50px;
  min-height: 50px;
  text-align: center;
  display: grid;
  place-content: center;
  min-width: 50px;
  ${(props) => {
    return props.pulse
      ? css`
          animation: ${onPulses} 2s infinite;
          background-color: ${`${PColor}`};
          color: ${BGColor};
        `
      : css``
  }}
`
