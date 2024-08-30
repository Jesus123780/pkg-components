import React from 'react'
import PropTypes from 'prop-types'
import styles from './Divider.module.css'

export interface DividerProps {
  borderTop?: boolean
  borderBottom?: boolean
  margin?: number
  marginBottom?: string
  marginTop?: string
  style: object
}

export const Divider: React.FC<DividerProps> = ({
  borderTop,
  borderBottom,
  marginTop,
  marginBottom,
  margin,
  style
}) => {
  const dividerStyle: React.CSSProperties = {
    borderTop: (borderTop === true) ? '1px solid var(--color-neutral-gray)' : 'none',
    borderBottom: (borderBottom === true) ? '1px solid var(--color-neutral-gray)' : 'none',
    margin: (margin != null) ? `${margin}px` : '0',
    marginBottom: (marginBottom != null) ? `${marginBottom}` : '0',
    marginTop: (marginTop != null) ? `${marginTop}` : '0',
    ...style
  }

  return <div className={styles.divider} style={dividerStyle}></div>
}

Divider.propTypes = {
  borderTop: PropTypes.bool,
  borderBottom: PropTypes.bool,
  margin: PropTypes.number
}
