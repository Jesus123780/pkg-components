import React from 'react';
import styled, { css } from 'styled-components';

export * from './PositionTooltip';

interface TooltipProps {
  text: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  bottom?: string;
  left?: string;
  showArrow?: boolean;
  hover?: boolean;
  arrowOffset?: 'top' | 'bottom' | 'left' | 'right';
  rotate?: string;
  borderRadius?: string;
  children: React.ReactNode;
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.span<TooltipProps>`
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  padding: 5px;
  position: absolute;
  z-index: 99;
  opacity: ${({ hover }) => (hover ? 0 : 1)};
  transition: opacity 0.3s, visibility 0.3s;
  font-size: var(--font-size-base);
  line-height: 1.4;
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  border: 1px solid var(--color-primary-red);
  background-color: var(--color-primary-red);
  color: #fff;
  padding: 5px 10px;
  white-space: nowrap;

  ${({ position, left, bottom, rotate }) => {
    if (position === 'top') {
      return css`
        bottom: ${bottom || '90%'};
        left: ${left || '80%'};
        transform: rotate(${rotate || '35deg'});
      `;
    } else if (position === 'bottom') {
      return css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      `;
    } else if (position === 'left') {
      return css`
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
      `;
    } else if (position === 'right') {
      return css`
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
      `;
    }
  }};

  ${({ arrowOffset, showArrow, position }) =>
    showArrow &&
    css`
      &:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px;
        border-color: transparent;
        ${arrowOffset && `margin-${arrowOffset}: -6px;`}
        ${arrowOffset === 'top' || arrowOffset === 'bottom'
          ? 'border-bottom-color: var(--color-primary-red);'
          : 'border-right-color: var(--color-primary-red);'}
        ${position === 'top' && 'top: 100%;'}
        ${position === 'bottom' && 'bottom: 100%;'}
        ${position === 'left' && 'right: 100%;'}
        ${position === 'right' && 'left: 100%;'}
        transform: translate${arrowOffset === 'top' || arrowOffset === 'bottom'
          ? 'X'
          : 'Y'}(-50%);
      }
    `}

  ${({ hover }) =>
    hover &&
    css`
      ${TooltipContainer}:hover & {
        opacity: 1;
      }
    `}
`;

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  position,
  bottom,
  left,
  showArrow = true,
  hover = false,
  arrowOffset,
  rotate,
  borderRadius,
  children,
}) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipText
        arrowOffset={arrowOffset}
        borderRadius={borderRadius}
        bottom={bottom}
        hover={hover}
        left={left}
        position={position}
        rotate={rotate}
        showArrow={showArrow}
      >
        {text}
      </TooltipText>
    </TooltipContainer>
  );
};

