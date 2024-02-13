import styled, { css } from 'styled-components';

interface OverlineProps {
  zIndex?: string;
  bgColor?: string;
  show?: boolean;
  onClick?: () => void;
}

export const Overline = styled.div<OverlineProps>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: ${({ zIndex }) => zIndex || '99'};
    background-color: ${({ bgColor }) => bgColor || 'transparent'};
    ${({ show }) => show ? css`display: block` : css`display: none;`};
    cursor: ${({ onClick }) => onClick ? 'pointer' : 'auto'};
    @media only screen and (min-width: 960px){
    }
`;
