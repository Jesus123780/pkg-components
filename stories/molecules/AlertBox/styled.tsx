import styled, { keyframes } from 'styled-components'
import { BGColor, PColor } from '../../../assets/colors'
import { ContainerToastProps } from './types'

interface ColorMap {
  [key: string]: string;
}

const colorMap: ColorMap  = {
  error: PColor,
  warning: '#ebbc26',
  success: '#50a773',
  default: 'rgba(0, 0, 0, 0.9)',
};


const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateY(0%);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`

export const ContainerToast = styled.div<ContainerToastProps>`
  animation: ${({ error, closed }) => {return (error ? (closed ? slideOut : slideIn) : 'none')}} 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) forwards;
  height: ${({ error }) => {return (error ? '89px' : 0)}};
  padding: ${({ error }) => {return (error ? '15px' : 0)}};
  display: flex;
  justify-content: space-between;
  position: fixed;
  align-items: center;
  width: 100%;
  margin: auto;
  z-index: 999999999;
  transition: 400ms;
  box-shadow: 0px 0px 6px #00000052;
  color: ${BGColor};
  background-color: ${({ color = '' }) => colorMap[color] || colorMap.default};
`

export const ContentToast = styled.div``

export const ContainerText = styled.span``
