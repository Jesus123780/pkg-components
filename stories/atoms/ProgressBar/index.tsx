import styled, { css, keyframes } from 'styled-components';
import { EColor, PColor } from '../../../assets/colors';

interface ProgressBarProps {
  progress?: number;
  final?: number;
}

export const width = keyframes`
  0% {
    width: 0%;
    opacity: 100%;
  }
  50% {
    width: 40%;
  }
  70% {
    opacity: 90%;
  }
  100% {
    width: 100%;
    opacity: 9%;
    visibility: hidden;
  }
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${PColor};
  height: 5px;
  transition: .2s;

  ${props => props.progress && css`
    transition: .2s;
    animation-name: ${width};
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-delay: 1s;
    z-index: 9999;
  `}

  ${props => (props.final || 0) <= (props.progress || 0) && css`
    background-color: ${EColor};
  `}
`;

ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = {
  'data-testid': 'progress-bar',
};
