import React from 'react';
import styled from 'styled-components';

export type ImageProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
};

const StyledImage = styled.img<Pick<ImageProps, 'width' | 'height'>>`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
`;

export const Image: React.FC<ImageProps> = ({ src, alt, width, height, className }) => {
  return <StyledImage src={src} alt={alt} width={width} height={height} className={className} />;
}
