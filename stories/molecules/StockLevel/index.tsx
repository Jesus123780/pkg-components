
'use client'

import React, { type CSSProperties } from 'react'
import styles from './StockLevel.module.css'

export interface StockLevelProps {
  stock: number
  minStock: number
  maxStock: number
  unit?: string
  showStatus?: boolean
  className?: string
}

type StockStatus = 'empty' | 'low' | 'normal' | 'exceeded'

const formatNumber = (value: number): string =>
  new Intl.NumberFormat('es-CO').format(value)

const normalize = (value: number): number =>
  Number.isFinite(value) ? Math.max(0, value) : 0

export const StockLevel: React.FC<StockLevelProps> = ({
  stock,
  minStock,
  maxStock,
  unit = 'unidades',
  showStatus = true,
  className = ''
}) => {
  const current = normalize(stock)
  const minimum = normalize(minStock)
  const maximum = normalize(maxStock)

  const validRange = maximum > 0 && minimum <= maximum

  const percentage = validRange
    ? Math.min(100, (current / maximum) * 100)
    : 0

  const minimumPercentage = validRange
    ? Math.min(100, (minimum / maximum) * 100)
    : 0

  const status: StockStatus =
    current === 0
      ? 'empty'
      : current < minimum
        ? 'low'
        : current > maximum
          ? 'exceeded'
          : 'normal'

  const statusLabels: Record<StockStatus, string> = {
    empty: 'Agotado',
    low: 'Stock bajo',
    normal: 'Disponible',
    exceeded: 'Sobre el máximo'
  }

  const style = {
    '--stock-percentage': `${percentage}%`,
    '--stock-minimum': `${minimumPercentage}%`
  } as CSSProperties

  return (
    <div
      className={[
        styles.stockLevel,
        styles[status],
        className
      ].filter(Boolean).join(' ')}
      style={style}
      role='group'
      aria-label={`Inventario: ${formatNumber(current)} ${unit}. Mínimo: ${formatNumber(minimum)}. Máximo: ${formatNumber(maximum)}. Estado: ${statusLabels[status]}.`}
    >
      <div className={styles.header}>
        <span className={styles.quantity}>
          <strong>{formatNumber(current)}</strong>
          <span>{unit}</span>
        </span>

        <span className={styles.minimumLabel}>
          Mín: {formatNumber(minimum)}
        </span>
      </div>

      <div className={styles.track} aria-hidden='true'>
        <div className={styles.progress} />

        {validRange && minimum > 0 && minimum < maximum && (
          <span
            className={styles.minimumMarker}
            title={`Stock mínimo: ${formatNumber(minimum)}`}
          />
        )}
      </div>

      <div className={styles.footer}>
        {showStatus ? (
          <span className={styles.status}>
            <span className={styles.statusDot} />
            {statusLabels[status]}
          </span>
        ) : (
          <span />
        )}

        <span className={styles.maximumLabel}>
          Máx: {formatNumber(maximum)}
        </span>
      </div>
    </div>
  )
}
