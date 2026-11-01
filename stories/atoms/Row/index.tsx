'use client'

import clsx from 'clsx'
import styles from './styles.module.css'

interface RowProps {
  alignItems?: 'center' | 'flex-start'
  justifyContent?: 'center' | 'flex-start' | 'space-between' | 'flex-end'
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  as?: React.ElementType
  onClick?: () => void
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const GAP_SIZES: Record<NonNullable<RowProps['gap']>, string> = {
  xs: '4px',   // Extra pequeño
  sm: '8px',   // Pequeño
  md: '12px',  // Mediano
  lg: '16px',  // Grande
  xl: '24px',  // Extra grande
}

export const Row: React.FC<RowProps> = ({
  alignItems,
  justifyContent,
  children,
  style,
  className,
  as = 'div',
  onClick,
  gap,
}) => {
  const Component = as

  const rowClasses = clsx(
    styles.row,
    alignItems ? styles[`align-items-${alignItems}`] : '',
    justifyContent ? styles[`justify-content-${justifyContent}`] : '',
    className
  )

  const gapValue = gap ? GAP_SIZES[gap] : undefined

  return (
    <Component
      className={rowClasses}
      style={{ ...style, gap: gapValue }}
      onClick={onClick}
    >
      {children}
    </Component>
  )
}
