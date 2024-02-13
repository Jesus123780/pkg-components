import PropTypes from 'prop-types'
import React from 'react'
import styles from './Button.module.css'

export const ButtonHeader = ({ primary, children, onClick }) => {
  const buttonStyle = primary ? styles.primary : styles.secondary

  return (
    <button className={`${styles.button} ${buttonStyle}`} onClick={onClick}>
      {children}
    </button>
  )
}

ButtonHeader.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.any,
  primary: PropTypes.any
}

