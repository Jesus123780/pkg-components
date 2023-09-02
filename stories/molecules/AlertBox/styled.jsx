import styled, { keyframes } from 'styled-components';
import { PColor, BGColor } from '../../../assets/colors';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0%);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

export const ContainerToast = styled.div`
  animation: ${({ error, closed }) => (error ? (closed ? slideOut : slideIn) : 'none')} 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) forwards;
  height: ${({ error }) => (error ? '89px' : 0)};
  padding: ${({ error }) => (error ? '15px' : 0)};
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
  background-color: ${({ color }) =>
    color === 'error'
      ? PColor
      : color === 'warning'
      ? '#ebbc26'
      : color === 'success'
      ? '#50a773'
      : 'rgba(0, 0, 0, 0.9)'};
`;

export const ContentToast = styled.div``;

export const ContainerText = styled.span``;
