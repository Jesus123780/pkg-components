'use client'

import React from 'react'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'
import { Icon } from '../../atoms'

type PredefinedSize = 'small' | 'medium' | 'large'
type SizeProp = PredefinedSize | number

interface ToggleSwitchProps {
  checked: boolean
  id?: string
  disabled?: boolean
  label?: string
  name?: string
  style?: React.CSSProperties
  successColor?: 'green' | 'red' | 'white'
  iconLeft?: string
  iconRight?: string
  size?: SizeProp
  onChange: (checked: boolean) => void
}

/**
 * Creates the CSS variables used by the toggle.
 *
 * The thumb translation is calculated dynamically:
 *
 * trackWidth - thumbSize - (padding * 2)
 *
 * This guarantees that the thumb stays inside the track.
 */
const createSizeVariables = (
  trackWidth: number,
  trackHeight: number,
  thumbSize: number,
  iconSize: number,
  padding: number
): React.CSSProperties => {
  const thumbTranslate = Math.max(
    0,
    trackWidth - thumbSize - padding * 2
  )

  return {
    '--ts-track-width': `${trackWidth}px`,
    '--ts-track-height': `${trackHeight}px`,
    '--ts-thumb-size': `${thumbSize}px`,
    '--ts-thumb-translate': `${thumbTranslate}px`,
    '--ts-icon-size': `${iconSize}px`,
    '--ts-padding': `${padding}px`
  } as React.CSSProperties
}

/**
 * Computes all dimensions according to the requested size.
 */
const computeSizeVariables = (
  size: SizeProp = 'medium'
): React.CSSProperties => {
  const presets: Record<
    PredefinedSize,
    React.CSSProperties
  > = {
    small: createSizeVariables(
      40,
      20,
      16,
      14,
      4
    ),

    medium: createSizeVariables(
      56,
      28,
      22,
      19,
      6
    ),

    large: createSizeVariables(
      72,
      36,
      28,
      22,
      8
    )
  }

  /**
   * Numeric size works as a scale factor.
   *
   * Example:
   * size={1.2}
   *
   * Everything will be 20% larger.
   */
  if (
    typeof size === 'number' &&
    Number.isFinite(size) &&
    size > 0
  ) {
    return createSizeVariables(
      Math.round(56 * size),
      Math.round(28 * size),
      Math.round(22 * size),
      Math.round(19 * size),
      Math.round(6 * size)
    )
  }

  if (
    typeof size === 'string' &&
    size in presets
  ) {
    return presets[size]
  }

  return presets.medium
}

/**
 * Animated ToggleSwitch component.
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  id,
  disabled = false,
  label = '',
  name = '',
  style,
  successColor = 'red',
  iconLeft,
  iconRight,
  size = 'medium',
  onChange
}) => {
  const generatedId = React.useId()

  const resolvedId =
    id ?? `toggle-switch-${generatedId}`

  const colors = {
    green: getGlobalStyle('--color-text-success'),
    red: getGlobalStyle('--color-background-primary'),
    white: getGlobalStyle('--color-icons-white')
  } as const

  const sizeVars = computeSizeVariables(size)

  const backgroundColor = checked
    ? colors[successColor] ?? colors.red
    : getGlobalStyle('--color-text-inactive')

  /**
   * Extract icon size from the CSS variable.
   */
  const iconSizeValue = (() => {
    const value = sizeVars['--ts-icon-size']

    if (
      typeof value === 'string' &&
      value.endsWith('px')
    ) {
      const parsedValue = parseInt(value, 10)

      if (!Number.isNaN(parsedValue)) {
        return parsedValue
      }
    }

    return 19
  })()

  const handleChange = React.useCallback(() => {
    if (disabled) {
      return
    }

    onChange(!checked)
  }, [
    disabled,
    checked,
    onChange
  ])

  return (
    <div
      className={styles.container}
      style={style}
    >
      <label
        className={styles.switch}
        htmlFor={resolvedId}
      >
        <input
          id={resolvedId}
          name={name}
          type='checkbox'
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
        />

        <span
          className={styles.track}
          style={{
            ...sizeVars,
            backgroundColor
          }}
        >
          {iconLeft && (
            <span
              className={`${styles.icon} ${styles.left}`}
            >
              <Icon
                icon={iconLeft}
                size={iconSizeValue}
              />
            </span>
          )}

          {iconRight && (
            <span
              className={`${styles.icon} ${styles.right}`}
            >
              <Icon
                icon={iconRight}
                size={iconSizeValue}
              />
            </span>
          )}

          <span className={styles.thumb} />
        </span>
      </label>

      {label && (
        <label
          htmlFor={resolvedId}
          className={styles.label}
        >
          {label}
        </label>
      )}
    </div>
  )
}