import React from 'react';
import styled from 'styled-components';

interface SkeletonProps {
  height?: number | string;
  width?: string;
  margin?: string;
  className?: string;
  borderRadius?: string;
  numberObject?: number;
}

const SkeletonComponent: React.FC<SkeletonProps> = ({
  height,
  width = '100%',
  margin,
  className,
  borderRadius,
  numberObject = 1,
}) => {
  return (
    <>
      {Array.from(Array(numberObject).keys()).map((value) => {
        return (
          <Container
            className={className}
            borderRadius={borderRadius}
            height={`${height}px`}
            key={value + 1}
            margin={margin || ''}
            width={width || ''}
          >
            <div className='card-loader'></div>
          </Container>
        );
      })}
    </>
  );
};

export const Skeleton = React.memo(SkeletonComponent);

const Container = styled.div<SkeletonProps>`
  .card-loader {
    background-color: #fff;
    position: relative;
    margin: ${({ margin }) => margin || '0'};
    border-radius: ${({ borderRadius }) => borderRadius || '2px'};
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || '150px'};
    overflow: hidden;
    padding: 0;
    &:after {
      content: '';
      background-color: #636363;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      animation-duration: 0.8s;
      animation-iteration-count: infinite;
      animation-name: loader-animate;
      animation-timing-function: linear;
      background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0) 81%);
    }
    &:before {
      content: '';
      display: block;
      background-color: #ededed;
      border-radius: 6px;
      box-shadow: -48px 78px 0 -48px #ededed, -51px 102px 0 -51px #ededed;
      height: ${({ height }) => height || '150px'};
    }
  }

  @keyframes loader-animate {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
`;
