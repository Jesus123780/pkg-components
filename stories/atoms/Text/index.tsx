'use client'

import React, { forwardRef } from 'react'
import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode
} from 'react'

import styles from './text.module.css'

export type TextFont = 'regular' | 'medium' | 'bold' | 'semibold' | 'light'
export type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end' | 'justify'
export type TextTransform = CSSProperties['textTransform']

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'color' | 'size'> {
  children?: ReactNode
  /** Semantic color token (e.g. primary, gray-dark, default) or a valid CSS color. */
  color?: string
  /** Existing design-system typography token, e.g. sm, md, 2xl, xxl. */
  size?: string
  align?: TextAlign | string
  font?: TextFont | string
  weight?: number | string
  className?: string | string[]
  title?: string
  /** Existing line-height token or a CSS line-height value. */
  lineHeight?: string | number
  /** Render a semantic element, e.g. h1, p, label, or span. */
  as?: ElementType
  /** Legacy custom styles prop; retained for backwards compatibility. */
  styles?: CSSProperties | Record<string, unknown>
  /** Explicit CSS font-size. Numbers are treated as pixels. */
  customSize?: string | number
  /** Clamp text to a maximum number of lines. */
  lineClamp?: number
  /** Single-line ellipsis. */
  truncate?: boolean
  /** Prevent wrapping without adding an ellipsis. */
  noWrap?: boolean
  italic?: boolean
  underline?: boolean
  textTransform?: TextTransform
  /** Optional raw CSS color. */
  customColor?: string
  /** Apply overflow-wrap: anywhere. */
  breakWord?: boolean
}

const LINE_HEIGHT_VALUES: Record<string, number | string> = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2
}

/**
 * Normalizes vendor-prefixed inline CSS properties before passing them to React.
 * React expects WebkitLineClamp, not -webkitLine-clamp or -webkit-line-clamp.
 * CSS custom properties (for example, --my-token) are kept unchanged.
 */
function normalizeStyleKey(key: string): string {
  if (key.startsWith('--')) return key

  const compactKey = key.replace(/^-/, '').toLowerCase()
  if (compactKey === 'webkitlineclamp') return 'WebkitLineClamp'
  if (compactKey === 'webkitboxorient') return 'WebkitBoxOrient'

  let normalizedKey = key
    .replace(/^-([a-z])/, (_, letter: string) => letter.toUpperCase())
    .replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())

  // Also tolerate the common but incorrectly lowercased webkit-prefixed form.
  if (/^webkit[A-Z]/.test(normalizedKey)) {
    normalizedKey = `W${normalizedKey.slice(1)}`
  }

  return normalizedKey
}

function normalizeInlineStyles(
  input?: CSSProperties | Record<string, unknown>
): CSSProperties {
  if (!input) return {}

  const normalized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(input)) {
    normalized[normalizeStyleKey(key)] = value
  }

  return normalized as CSSProperties
}

function joinClassNames(values: Array<string | false | null | undefined>): string {
  return values.filter((value): value is string => Boolean(value)).join(' ')
}

function isCssColor(value: string): boolean {
  return (
    value.startsWith('#') ||
    /^rgba?\(/i.test(value) ||
    /^hsla?\(/i.test(value) ||
    /^oklch\(/i.test(value) ||
    /^color\(/i.test(value) ||
    /^var\(/i.test(value) ||
    ['transparent', 'currentColor', 'inherit', 'initial', 'unset'].includes(value)
  )
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    children,
    color = 'default',
    size = '',
    align = 'start',
    font = '',
    weight = 400,
    className = '',
    title,
    lineHeight,
    as: Component = 'span',
    styles: legacyStyles,
    style: nativeStyle,
    customSize,
    lineClamp,
    truncate = false,
    noWrap = false,
    italic = false,
    underline = false,
    textTransform,
    customColor,
    breakWord = false,
    ...restProps
  },
  ref
) {
  const inlineStyles: CSSProperties = {}

  if (customSize !== undefined && customSize !== '') {
    inlineStyles.fontSize = typeof customSize === 'number'
      ? `${customSize}px`
      : customSize
  }

  if (lineHeight !== undefined && lineHeight !== null && lineHeight !== '') {
    const lineHeightString = String(lineHeight)
    const lineHeightClassExists = Boolean(styles[`line-height-${lineHeightString}`])

    if (!lineHeightClassExists) {
      inlineStyles.lineHeight = LINE_HEIGHT_VALUES[lineHeightString] ?? lineHeight
    }
  }

  if (typeof lineClamp === 'number' && Number.isFinite(lineClamp) && lineClamp > 0) {
    inlineStyles.display = '-webkit-box'
    inlineStyles.WebkitBoxOrient = 'vertical'
    inlineStyles.WebkitLineClamp = Math.floor(lineClamp)
    inlineStyles.overflow = 'hidden'
  }

  if (truncate) {
    inlineStyles.overflow = 'hidden'
    inlineStyles.textOverflow = 'ellipsis'
    inlineStyles.whiteSpace = 'nowrap'
  } else if (noWrap) {
    inlineStyles.whiteSpace = 'nowrap'
  }

  if (customColor) {
    inlineStyles.color = customColor
  } else if (!styles[`color-${color}`] && isCssColor(color)) {
    inlineStyles.color = color
  }

  if (textTransform) inlineStyles.textTransform = textTransform
  if (breakWord) inlineStyles.overflowWrap = 'anywhere'

  const extraClasses = Array.isArray(className) ? className : [className]
  const lineHeightClass = typeof lineHeight === 'string'
    ? styles[`line-height-${lineHeight}`]
    : undefined

  const combinedClassName = joinClassNames([
    styles.text,
    size ? styles[`size-${size}`] : undefined,
    color ? styles[`color-${color}`] : undefined,
    weight !== undefined && weight !== null ? styles[`weight-${weight}`] : undefined,
    font ? styles[`font-${font}`] : undefined,
    align ? styles[`align-${align}`] : undefined,
    lineHeightClass,
    italic ? styles.italic : undefined,
    underline ? styles.underline : undefined,
    truncate ? styles.truncate : undefined,
    noWrap && !truncate ? styles.noWrap : undefined,
    breakWord ? styles.breakWord : undefined,
    ...extraClasses
  ])

  // Keep the legacy `styles` prop as the final override, matching its old behavior.
  const finalStyle: CSSProperties = {
    ...inlineStyles,
    ...normalizeInlineStyles(nativeStyle),
    ...normalizeInlineStyles(legacyStyles)
  }

  return React.createElement(
    Component,
    {
      ...restProps,
      ref,
      title,
      className: combinedClassName,
      style: finalStyle
    } as React.HTMLAttributes<HTMLElement>,
    children
  )
})

Text.displayName = 'Text'

export default Text
