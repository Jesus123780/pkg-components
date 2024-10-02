import React from 'react'
import styles from './LabelInput.module.css'

export const LabelInput = ({ error, noLabel, topTitle, value, title }) => {
  const topClass = value ? styles.topNegative : (topTitle ? '' : styles.topDefault)
  const leftClass = value ? styles.leftNegative : styles.leftDefault
  const fontSizeClass = value ? styles.fontSizeLarge : styles.fontSizeSmall
  const colorClass = value ? styles.colorDefault : (error ? styles.colorError : styles.colorSFV)
  const bgColorClass = value ? styles.bgColor : styles.bgTransparent
  const paddingClass = value ? styles.paddingLeft : styles.paddingNone
  const responsiveClass = value ? styles.topResponsive : styles.topResponsiveDefault

  return (
    <label
      className={`${styles.labelInput} ${topClass} ${leftClass} ${fontSizeClass} ${colorClass} ${bgColorClass} ${paddingClass} ${responsiveClass} ${noLabel ? styles.noLabel : ''}`}
    >
      {(title?.includes('*'))
        ? (
          <>
            {title?.replace('*', '')}
            <span style={{ color: 'var(--color-feedback-error-dark)' }}>*</span>
          </>
          )
        : title
    }
    </label>
  )
}
