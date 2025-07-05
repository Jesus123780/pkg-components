'use client'

import React from 'react'
import styles from './styles.module.css'

export interface ImageProps {
  src: string
  alt?: string
  width?: string
  height?: string
  className?: string
}

export const Image: React.FC<ImageProps> = ({ src, alt, width, height, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${styles.image} ${className ?? ''}`}
    />
  )
}
