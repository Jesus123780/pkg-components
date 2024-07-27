// Column.tsx
import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface ColumnProps {
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  justifyContent?: 'center' | 'flex-start' | 'flex-end'
  children: React.ReactNode
  width?: string
  style?: React.CSSProperties
  className?: string
  as?: React.ElementType
}

export const Column: React.FC<ColumnProps> = ({
  alignItems,
  justifyContent,
  children,
  className,
  style,
  as: Component = 'div',
  ...props
}) => {
  const columnClasses = clsx(
    styles.column,
    alignItems && styles[`align-items-${alignItems}`],
    justifyContent && styles[`justify-content-${justifyContent}`],
    className
  )

  return <Component
    className={columnClasses}
    style={style}
    {...props}
  >
    {children}
  </Component>
}
