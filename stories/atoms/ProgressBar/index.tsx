'use client'

import React from 'react'
import styles from './styles.module.css'

interface ProgressBarProps {
  progress: number
  hidden: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  hidden
}) => {
  return (
    <div
    className={`${styles.progressBar} ${hidden ? styles.hidden : ''}`}
    style={{ width: `${progress}%` }}
  />
  )
}
