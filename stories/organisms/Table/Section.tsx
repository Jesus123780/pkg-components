import React, { forwardRef } from 'react'
import styles from './section.module.css'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  columnWidth: Array<{ width: string }>
  bgRow?: number
  padding?: string
  odd?: boolean
  children: React.ReactNode
}
export const Section = forwardRef<HTMLDivElement, SectionProps>(({
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

  const combinedStyles = {
    ...columnStyles,
    ...res.style
  }

  const bgClass = bgRow != null ? `sectionBg${bgRow}` : ''

  return (
    <div
      className={`${styles.section} ${styles.sectionHover} ${(odd ?? false) ? styles.sectionOdd : ''} ${styles[bgClass]}`}
      ref={ref}
      {...res}
      style={combinedStyles}
    >
      {children}
    </div>
  )
})

Section.displayName = 'Section'
