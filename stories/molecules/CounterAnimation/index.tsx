'use client'

import React, { forwardRef, memo, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Disk } from './Disk'
import styles from './CounterAnimation.module.css'
import {
  formatCounterValue,
  getDecimalSeparator,
  resolveDiskDirection,
  tokenizeCounterValue
} from './utils'
import type { CounterAnimationProps, CounterToken, DiskDirection } from './types'

export type { CounterAnimationProps, CounterToken, DiskDirection } from './types'
export { formatCounterValue, getDecimalSeparator, tokenizeCounterValue } from './utils'
export { Disk } from './Disk'
export type { DiskProps } from './Disk'

interface Snapshot { from: number, to: number, revision: number }

const classNames = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(' ')
const colorClass: Record<NonNullable<CounterAnimationProps['tone']>, string> = {
  inherit: '',
  primary: styles.tonePrimary,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
  neutral: styles.toneNeutral
}
const variantClass: Record<NonNullable<CounterAnimationProps['variant']>, string> = {
  plain: styles.plain,
  soft: styles.soft,
  card: styles.card,
  outline: styles.outline,
  glass: styles.glass,
  minimal: styles.minimal
}

const CounterAnimationImpl = forwardRef<HTMLOutputElement, CounterAnimationProps>(
  function MemoCounterAnimation ({
    number,
    size,
    numberformat = true,
    locale = 'de-DE',
    formatStyle = 'decimal',
    currency = 'COP',
    minimumFractionDigits,
    maximumFractionDigits,
    minimumIntegerDigits,
    useGrouping = true,
    formatter,
    decimalSeparator,
    invalidValue = '—',
    animation = 'reel',
    animated = true,
    animateOnMount = true,
    duration = 720,
    delay = 0,
    stagger = 45,
    staggerOrder = 'auto',
    easing = 'cubic-bezier(.22,1,.36,1)',
    direction = 'auto',
    onAnimationStart,
    onAnimationComplete,
    onValueChange,
    variant = 'plain',
    tone = 'inherit',
    weight = 700,
    fontFamily,
    letterSpacing,
    lineHeight = 1.12,
    digitWidth = 0.64,
    gap = 0,
    align = 'center',
    color,
    backgroundColor,
    borderColor,
    borderRadius,
    padding,
    prefix,
    suffix,
    label,
    description,
    showTrend = false,
    trendFormatter,
    announceChanges = false,
    ariaLabel,
    ariaValueText,
    title,
    id,
    className,
    digitClassName,
    separatorClassName,
    valueClassName,
    style,
    valueStyle,
    'data-testid': testId
  }, forwardedRef) {
    if (!size?.trim()) {
      throw new Error('CounterAnimation: missing required size (e.g. "32px").')
    }

    // React procesa un cambio de props antes de pintar, sin mutar refs durante render.
    const [snapshot, setSnapshot] = useState<Snapshot>(() => ({
      from: animateOnMount ? 0 : number,
      to: number,
      revision: 0
    }))
    if (!Object.is(snapshot.to, number)) {
      setSnapshot({ from: snapshot.to, to: number, revision: snapshot.revision + 1 })
    }

    const [reducedMotion, setReducedMotion] = useState(false)
    useEffect(() => {
      if (typeof window === 'undefined' || !window.matchMedia) return
      const query = window.matchMedia('(prefers-reduced-motion: reduce)')
      const update = () => setReducedMotion(query.matches)
      update()
      query.addEventListener?.('change', update)
      return () => query.removeEventListener?.('change', update)
    }, [])

    const formatted = useMemo(() => formatCounterValue({
      number: snapshot.to,
      size,
      numberformat,
      locale,
      formatStyle,
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
      minimumIntegerDigits,
      useGrouping,
      formatter,
      invalidValue
    }), [snapshot.to, size, numberformat, locale, formatStyle, currency,
      minimumFractionDigits, maximumFractionDigits, minimumIntegerDigits,
      useGrouping, formatter, invalidValue])

    const oldFormatted = useMemo(() => formatCounterValue({
      number: snapshot.from,
      size,
      numberformat,
      locale,
      formatStyle,
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
      minimumIntegerDigits,
      useGrouping,
      formatter,
      invalidValue
    }), [snapshot.from, size, numberformat, locale, formatStyle, currency,
      minimumFractionDigits, maximumFractionDigits, minimumIntegerDigits,
      useGrouping, formatter, invalidValue])

    const decimal = decimalSeparator ?? getDecimalSeparator(locale, numberformat)
    const tokens = useMemo(() => tokenizeCounterValue(formatted, decimal), [formatted, decimal])
    const previousTokens = useMemo(() => tokenizeCounterValue(oldFormatted, decimal), [oldFormatted, decimal])
    const previousDigits = useMemo(() => new Map(
      previousTokens.filter(token => token.type === 'digit').map(token => [token.key, token.char])
    ), [previousTokens])

    const canAnimate = animated && animation !== 'none' && !reducedMotion &&
      duration > 0 && Number.isFinite(snapshot.to) && Number.isFinite(snapshot.from)
    // La opción de dirección explícita prevalece incluso con animation='compact'.
    const changeDirection: DiskDirection = direction !== 'auto'
      ? direction
      : animation === 'compact'
        ? 'shortest'
        : snapshot.to >= snapshot.from ? 'increase' : 'decrease'

    const callbacks = useRef({ onAnimationStart, onAnimationComplete, onValueChange })
    useEffect(() => {
      callbacks.current = { onAnimationStart, onAnimationComplete, onValueChange }
    }, [onAnimationStart, onAnimationComplete, onValueChange])
    const previousNotifiedValue = useRef(number)
    useEffect(() => {
      if (!Object.is(previousNotifiedValue.current, number)) {
        callbacks.current.onValueChange?.(number, previousNotifiedValue.current)
        previousNotifiedValue.current = number
      }
    }, [number])

    useEffect(() => {
      if (snapshot.revision === 0 && !animateOnMount) return
      if (Object.is(snapshot.from, snapshot.to)) return
      if (!canAnimate) {
        callbacks.current.onAnimationComplete?.(snapshot.to)
        return
      }
      callbacks.current.onAnimationStart?.(snapshot.to)
      // Un único temporizador global: no rAF ni setState por cada frame.
      const digitCount = tokens.filter(token => token.type === 'digit').length
      const total = Math.max(0, delay) + Math.max(0, duration) +
        Math.max(0, digitCount - 1) * Math.max(0, stagger)
      const handle = window.setTimeout(() => {
        callbacks.current.onAnimationComplete?.(snapshot.to)
      }, total + 32)
      return () => window.clearTimeout(handle)
    }, [snapshot.revision, snapshot.from, snapshot.to, animateOnMount,
      canAnimate, duration, delay, stagger])

    const safeLineHeight = Number.isFinite(lineHeight) ? Math.max(0.85, Math.min(2, lineHeight)) : 1.12
    const safeDigitWidth = Number.isFinite(digitWidth) ? Math.max(0.3, Math.min(1.6, digitWidth)) : 0.64

    const customStyle = {
      '--counter-fg': color,
      '--counter-surface': backgroundColor,
      '--counter-border': borderColor,
      '--counter-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      '--counter-padding': typeof padding === 'number' ? `${padding}px` : padding,
      '--counter-gap': typeof gap === 'number' ? `${gap}px` : gap,
      '--counter-font-weight': weight,
      '--counter-letter-spacing': letterSpacing,
      fontFamily,
      fontSize: size,
      ...style
    } as CSSProperties

    const delta = snapshot.to - snapshot.from
    const trend = delta > 0 ? 'up' : delta < 0 ? 'down' : 'neutral'
    const trendText = useMemo(async () => {
      if (!showTrend) return null
      if (trendFormatter) return await trendFormatter(delta)
      try {
        return `${delta > 0 ? '+' : ''}${new Intl.NumberFormat(locale, {
          maximumFractionDigits: 2, numberingSystem: 'latn'
        }).format(delta)}`
      } catch {
        return `${delta > 0 ? '+' : ''}${delta}`
      }
    }, [showTrend, trendFormatter, delta, locale])

    const digitCount = tokens.filter(token => token.type === 'digit').length
    const staggerFromRight = staggerOrder === 'right-to-left' ||
      (staggerOrder === 'auto' && (
        changeDirection === 'decrease' ||
        (changeDirection === 'shortest' && snapshot.to < snapshot.from)
      ))
    let digitIndex = -1
    const renderToken = (token: CounterToken) => {
      if (token.type === 'literal') {
        return <span key={token.key}
          className={classNames(styles.literal, separatorClassName)}
          style={{ height: `${safeLineHeight}em` }} aria-hidden="true">{token.char}</span>
      }
      digitIndex += 1
      const sequenceIndex = staggerOrder === 'none'
        ? 0
        : staggerFromRight ? digitCount - digitIndex - 1 : digitIndex
      const from = previousDigits.get(token.key) ?? '0'
      const to = token.char
      const fromNumber = Number(from)
      const toNumber = Number(to)
      const increasing = changeDirection === 'shortest'
        ? resolveDiskDirection('shortest', fromNumber, toNumber)
        : changeDirection !== 'decrease'
      return (
        <Disk
          key={token.key}
          number={to}
          prevNumber={from}
          isIncreasing={increasing}
          level={false}
          initialValue={fromNumber}
          size="1em"
          delay={0}
          duration={animation === 'compact' ? duration * 0.7 : duration}
          staggerDelay={Math.max(0, delay) + Math.max(0, stagger) * sequenceIndex}
          columnKey={token.key}
          easing={easing}
          animated={canAnimate}
          digitClassName={digitClassName}
          lineHeight={safeLineHeight}
          digitWidth={safeDigitWidth}
        />
      )
    }

    return (
      <output
        ref={forwardedRef}
        id={id}
        data-testid={testId}
        title={title}
        className={classNames(styles.root, variantClass[variant], colorClass[tone],
          align === 'start' ? styles.alignStart : align === 'end' ? styles.alignEnd : styles.alignCenter,
          className)}
        style={customStyle}
        aria-label={ariaLabel}
        aria-live={announceChanges ? 'polite' : 'off'}
        aria-atomic="true"
      >
        <span className={classNames(styles.valueRow, valueClassName)} style={valueStyle}>
          {prefix != null && <span className={styles.prefix} aria-hidden="true">{prefix}</span>}
          <span className={styles.number} aria-hidden="true">{tokens.map(renderToken)}</span>
          {suffix != null && <span className={styles.suffix} aria-hidden="true">{suffix}</span>}
        </span>
        <span className={styles.srOnly}>{ariaValueText ?? [
          (typeof prefix === 'string' || typeof prefix === 'number') ? prefix : '',
          formatted,
          (typeof suffix === 'string' || typeof suffix === 'number') ? suffix : ''
        ].filter(Boolean).join(' ')}</span>
        {(label != null || description != null || showTrend) && (
          <span className={styles.meta}>
            {label != null && <span className={styles.label}>{label}</span>}
            {description != null && <span className={styles.description}>{description}</span>}
            {showTrend && snapshot.revision > 0 &&
              <span className={styles.trend} data-trend={trend}>{trendText}</span>}
          </span>
        )}
      </output>
    )
  }
)

CounterAnimationImpl.displayName = 'MemoCounterAnimation'
/** Alias original conservado. */
export const MemoCounterAnimation = CounterAnimationImpl
/** React.memo sin comparador manual: también responde a cambios de size, estilos y formato. */
export const CounterAnimation = memo(CounterAnimationImpl)
CounterAnimation.displayName = 'CounterAnimation'
