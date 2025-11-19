/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import clsx from 'clsx'
import styles from './styles.module.css'
import { JSX } from 'react'

/**
 * Props for the Column component
 */
interface ColumnProps {
  /** Align items vertically */
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  /** Justify content horizontally */
  justifyContent?: 'center' | 'flex-start' | 'flex-end'
  /** Children to be rendered inside the column */
  children: React.ReactNode
  /** Optional width */
  width?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Additional class names */
  className?: string
  /** Element type to render as */
  as?: React.ElementType
  /** Optional click handler */
  onClick?: () => void
  /** Gap between children */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Additional props */
}

const GAP_SIZES: Record<NonNullable<ColumnProps['gap']>, string> = {
  xs: '4px',   // Extra pequeño
  sm: '8px',   // Pequeño
  md: '12px',  // Mediano
  lg: '16px',  // Grande
  xl: '24px',  // Extra grande
}

/**
 * Column layout component
 * @param {ColumnProps} props - Column props
 * @returns {JSX.Element}
 */
export const Column = ({
  alignItems,
  justifyContent,
  children,
  className,
  style,
  onClick,
  as: Component = 'div',
  gap,
  ...props
}: ColumnProps): JSX.Element => {
  const columnClasses = clsx(
    styles.column,
    alignItems !== undefined ? styles[`align-items-${alignItems}` as keyof typeof styles] : undefined,
    justifyContent !== undefined ? styles[`justify-content-${justifyContent}` as keyof typeof styles] : undefined,
    className
  )
  const gapValue = gap ? GAP_SIZES[gap] : undefined
  return (
    <Component
      className={columnClasses}
      style={{ ...style, gap: gapValue }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  )
}
