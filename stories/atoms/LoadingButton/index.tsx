'use client'

import React from 'react'
import PropTypes from 'prop-types'
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

LoadingButton.propTypes = {
  color: PropTypes.string
}
