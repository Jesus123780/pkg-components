import styled, { css, keyframes } from 'styled-components'
import { PColor } from '../../../assets/colors'

interface ProgressBarProps {
  progress?: boolean
}

export const width = keyframes`
  0% {
    width: 0%;
    visibility: visible;
  }
  50% {
    width: 40%;
  }
  100% {
    width: 100%;
    visibility: hidden; /* Ocultar al final */
  }
`

export const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${PColor};
  height: 5px;
  transition: .2s;
  z-index: var(--z-index-99999);
  
  ${props => props.progress && css`
    animation: ${width} 2s forwards;
    z-index: 9999;
  `}

  ${props => !props.progress && css`
    visibility: hidden;
  `}
`

ProgressBar.displayName = 'ProgressBar'
ProgressBar.defaultProps = {
  'data-testid': 'progress-bar'
}

