// PercentBadge.tsx
import React from 'react'
import styles from './styles.module.css'
import { percentChange } from './helpers'

/**
 * Props for PercentBadge component
 */
export type PercentBadgeProps = {
    /** Original/base value (e.g. previous price) */
    baseValue?: number | string
    /** New/compare value (e.g. current price). If percent is provided, this can be omitted. */
    compareValue?: number | string
    /** If you already have percent, you can pass it and avoid calculation. */
    percentOverride?: number | string
    /** Number of decimals to show in percentage */
    precision?: number
    /** Whether to show the plus/minus sign (default true) */
    showSign?: boolean
    /** Show arrow glyph */
    showArrow?: boolean
    /** CSS variant: small | medium | large */
    size?: 'small' | 'medium' | 'large'
    /** Custom className */
    className?: string
    /** Colors: positive (increase), negative (decrease), neutral */
    positiveClass?: string
    negativeClass?: string
    neutralClass?: string
    /** Optional callback for calculation errors */
    onError?: (err: Error) => void
}

/**
 * PercentBadge
 *
 * Computes percentage change between baseValue and compareValue (or uses percentOverride),
 * formats it according to precision and displays a colored pill.
 *
 * Uses integer-safe decimal math under the hood for accurate results.
 */
export const PercentBadge: React.FC<PercentBadgeProps> = ({
    baseValue,
    compareValue,
    percentOverride,
    precision = 0,
    showSign = true,
    showArrow = false,
    size = 'medium',
    className = '',
    positiveClass,
    negativeClass,
    neutralClass,
    onError
}) => {
    // Determine percent string
    let percentStr: string | null = null
    let error: Error | null = null

    try {
        if (percentOverride !== undefined && percentOverride !== null) {
            // accept numeric or string percent like '-12.3' or '12.3'
            percentStr = String(percentOverride)
            // normalize formatting to desired precision
            const num = Number(percentStr)
            if (!Number.isFinite(num)) throw new Error('percentOverride is not a finite number')
            percentStr = (Math.round(num * (10 ** precision)) / (10 ** precision)).toFixed(precision)
        } else {
            if (baseValue === undefined || baseValue === null || compareValue === undefined || compareValue === null) {
                throw new Error('baseValue and compareValue are required when percentOverride is not provided')
            }
            percentStr = percentChange(baseValue, compareValue, precision)
        }
    } catch (err: any) {
        error = err
        percentStr = null
        if (onError) onError(err)
        // eslint-disable-next-line no-console
        console.warn('PercentBadge error:', err)
    }

    // If calculation failed, render neutral placeholder
    if (!percentStr) {
        return (
            <div className={`${styles.root} ${className}`}>
                <div className={`${styles.pill} ${styles.neutral} ${styles[size]}`}>
                    —{/* neutral dash */}
                </div>
            </div>
        )
    }

    // convert to numeric sign and absolute text
    const negative = percentStr.startsWith('-')
    const absText = negative ? percentStr.slice(1) : percentStr
    const showPlus = showSign && !negative

    const pillClass = negative
        ? `${styles.pill} ${styles.negative} ${styles[size]} ${negativeClass ?? ''}`
        : `${styles.pill} ${styles.positive} ${styles[size]} ${positiveClass ?? ''}`

    const arrow = negative ? '▼' : '▲' // simple glyphs, you can swap to icons

    return (
        <div
            aria-live='polite'
            className={`${styles.root} ${className}`}
            role='status'
        >
            <div className={pillClass.trim()}>
                {showArrow && <span className={styles.arrow} aria-hidden='true'>
                    {arrow}
                </span>
                }
                <span>
                    {showPlus ? '+' : ''}{negative ? '-' : ''}{absText}%
                </span>
            </div>
        </div>
    )
}

export default PercentBadge
