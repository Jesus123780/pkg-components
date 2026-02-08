'use client'

import React from 'react'
import styles from './Loader.module.css'

interface LoadingButtonProps {
  /** Spinner color */
  color?: string
  /** Spinner size in px */
  size?: number
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  color = '#1a73e8', // Google blue
  size = 24,
}) => {
  return (
    <div
      className={styles.loader}
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
    >
      <svg
        className={styles.spinner}
        viewBox="25 25 50 50"
      >
        <circle
          className={styles.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="4"
        />
      </svg>
    </div>
  )
}
