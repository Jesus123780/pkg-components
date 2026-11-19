import React, { forwardRef, useMemo } from 'react'
import styles from './section.module.css'

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  columnWidth: Array<{ width?: string }>
  bgRow?: number | string
  padding?: string
  odd?: boolean
  children: React.ReactNode
}

/**
 * Fila de tabla. Table y Section comparten las mismas medidas.
 * Funciona además fuera de Table, usando columnWidth como fallback.
 */
export const Section = forwardRef<HTMLDivElement, SectionProps>(({
  columnWidth,
  children,
  padding = '0',
  odd = false,
  bgRow,
  className,
  style,
  role = 'row',
  ...rest
}, ref) => {
  const template = useMemo(() => (
    columnWidth.length > 0
      ? columnWidth.map(col => col.width ?? 'minmax(0, 1fr)').join(' ')
      : 'minmax(0, 1fr)'
  ), [columnWidth])

  const backgroundClass = typeof bgRow === 'number'
    ? (styles[`sectionBg${bgRow}`] ?? '')
    : ''

  return (
    <div
      {...rest}
      ref={ref}
      role={role}
      className={[
        styles.section,
        odd ? styles.sectionOdd : '',
        backgroundClass,
        className ?? ''
      ].filter(Boolean).join(' ')}
      style={{
        gridTemplateColumns: `var(--table-grid-template, ${template})`,
        padding,
        ...style
      }}
    >
      {children}
    </div>
  )
})

Section.displayName = 'Section'
export default Section
