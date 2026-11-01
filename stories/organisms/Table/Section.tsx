import React, { forwardRef, useMemo } from 'react'
import styles from './section.module.css'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  columnWidth: Array<{ width?: string }>
  bgRow?: number
  padding?: string
  odd?: boolean
  children: React.ReactNode
}

/**
 * Section (row) that uses the `columnWidth` widths provided by Table.
 * It renders a CSS grid with the same template columns the header uses,
 * ensuring header/body stay in sync (important for resize).
 */
export const Section = forwardRef<HTMLDivElement, SectionProps>(({
  children,
  columnWidth,
  padding = '0',
  odd,
  ...res
}, ref) => {
  const template = useMemo(() => {
    // we prefer explicit px widths where available to keep perfect sync with header
    return (columnWidth && columnWidth.length > 0)
      ? columnWidth.map(col => col.width ?? '1fr').join(' ')
      : '1fr'
  }, [columnWidth])

  const combinedStyles: React.CSSProperties = {
    gridTemplateColumns: template,
    padding,
    display: 'grid',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    ...res.style
  }

  const bgClass = (res as any).bgRow != null ? `sectionBg${(res as any).bgRow}` : ''

  return (
    <div
      className={`${styles.section} ${(odd ?? false) ? styles.sectionOdd : ''} ${styles.sectionHover} ${(styles as any)[bgClass] ?? ''}`}
      ref={ref}
      {...res}
      style={combinedStyles}
    >
      {children}
    </div>
  )
})

Section.displayName = 'Section'

export default Section
