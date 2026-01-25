'use client'

import React from 'react'
import styles from './Loader.module.css'

interface LoadingButtonProps {
  color?: string
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ color }) => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} style={{ backgroundColor: color }}></div>
    </div>
  )
}
