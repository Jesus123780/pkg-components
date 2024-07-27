// Row.tsx
import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface RowProps {
  alignItems?: 'center' | 'flex-start'
  justifyContent?: 'center' | 'flex-start' | 'space-between'
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export const Row: React.FC<RowProps> = ({ alignItems, justifyContent, children, style, className }) => {
  const rowClasses = clsx(
    styles.row,
    alignItems && styles[`align-items-${alignItems}`],
    justifyContent && styles[`justify-content-${justifyContent}`],
    className
  );

  return <div className={rowClasses} style={style}>{children}</div>
}
