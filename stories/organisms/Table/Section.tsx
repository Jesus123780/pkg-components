import React, { forwardRef } from 'react'
import styles from './section.module.css'

interface SectionProps {
  columnWidth: Array<{ width: string }>
  bgRow?: number
  padding?: string
  odd?: boolean
  children: React.ReactNode
}

// eslint-disable-next-line react/display-name
export const Section = forwardRef<HTMLTableCellElement, SectionProps>(({
  children,
  columnWidth,
  bgRow,
  padding,
  odd,
  ...res
}, ref) => {
  const columnStyles = {
    gridTemplateColumns: columnWidth.length > 0 ? columnWidth.map(x => x.width).join(' ') : '1fr',
    padding
  }

  // Combine res styles with columnStyles
  const combinedStyles = {
    ...columnStyles,
    ...res.style
  }

  const bgClass = bgRow != null ? `sectionBg${bgRow}` : ''

  return (
    <th
      className={`${styles.section} ${styles.sectionHover} ${(odd ?? false) ? styles.sectionOdd : ''} ${styles[bgClass]}`}
      ref={ref}
      {...res}
      style={combinedStyles}
    >
      {children}
    </th>
  )
})
