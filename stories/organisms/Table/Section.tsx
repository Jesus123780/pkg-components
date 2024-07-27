import React from 'react'
import styles from './section.module.css'

interface SectionProps {
  columnWidth: Array<{ width: string }>
  bgRow?: number
  padding?: string
  odd?: boolean
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({
  children,
  columnWidth,
  bgRow,
  padding,
  odd
}) => {
  const columnStyles = {
    gridTemplateColumns: columnWidth.length > 0 ? columnWidth.map(x => x.width).join(' ') : '1fr',
    padding
  }

  const bgClass = (bgRow != null) ? `sectionBg${bgRow}` : ''

  return (
        <th
            className={`${styles.section} ${styles.sectionHover} ${(odd ?? false) ? styles.sectionOdd : ''} ${styles[bgClass]}`}
            style={columnStyles}
        >
            {children}
        </th>
  )
}
