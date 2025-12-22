'use client'

import React from 'react'
import styles from './styles.module.css'

export interface SkeletonProps {
  height?: number | string
  width?: number | string
  margin?: string
  className?: string
  borderRadius?: string
  numberObject?: number
}

/**
 * Skeleton
 * Reusable skeleton loader component
 *
 * @param {number | string} height - Height of the skeleton
 * @param {number | string} width - Width of the skeleton
 * @param {string} margin - CSS margin
 * @param {string} borderRadius - CSS border-radius
 * @param {number} numberObject - Number of skeleton items to render
 */
const SkeletonComponent: React.FC<SkeletonProps> = ({
  height = 150,
  width = '100%',
  margin = '0',
  className = '',
  borderRadius = '4px',
  numberObject = 1
}) => {
  const safeCount = Math.max(1, Number(numberObject) || 1)

  return (
    <>
      {Array.from({ length: safeCount }).map((_, index) => (
        <div
          key={index}
          className={`${styles.container} ${className}`}
          style={{
            margin,
            width,
            height,
            borderRadius
          }}
        >
          <div className={styles.cardLoader} />
        </div>
      ))}
    </>
  )
}

export const Skeleton = React.memo(SkeletonComponent)
