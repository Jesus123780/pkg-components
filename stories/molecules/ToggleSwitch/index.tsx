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
  /**
   * Size can be 'small' | 'medium' | 'large' or a numeric scale factor.
   * - predefined sizes map to concrete px values
   * - numeric factor scales the medium base size (e.g. 1.2 -> 20% larger)
   */
  size?: SizeProp
  onChange: (checked: boolean) => void
}

/**
 * Compute numeric sizes (px) based on `size` prop.
 * Accepts 'small' | 'medium' | 'large' or a numeric scale factor.
 * Returns a map of CSS variable values to apply inline on the track element.
 */
const computeSizeVariables = (size: SizeProp = 'medium') => {
  const base = {
    trackWidth: 56,
    trackHeight: 28,
    thumbSize: 22,
    translateX: 28,
    iconSize: 19,
    padding: 6
  }

  if (typeof size === 'number' && Number.isFinite(size) && size > 0) {
    // numeric scale factor: scale base values
    const s = size
    return {
      '--ts-track-width': `${Math.round(base.trackWidth * s)}px`,
      '--ts-track-height': `${Math.round(base.trackHeight * s)}px`,
      '--ts-thumb-size': `${Math.round(base.thumbSize * s)}px`,
      '--ts-thumb-translate': `${Math.round(base.translateX * s)}px`,
      '--ts-icon-size': `${Math.round(base.iconSize * s)}px`,
      '--ts-padding': `${Math.round(base.padding * s)}px`
    } as React.CSSProperties
  }

  const presets: Record<PredefinedSize, typeof base> = {
    small: { trackWidth: 40, trackHeight: 20, thumbSize: 16, translateX: 16, iconSize: 14, padding: 4 },
    medium: base,
    large: { trackWidth: 72, trackHeight: 36, thumbSize: 28, translateX: 36, iconSize: 22, padding: 8 }
  }

  if (typeof size === 'string') {
    const preset = (presets as any)[size]
    if (!preset) {
      // invalid string -> fallback to medium (but don't crash)
      // helps detect misuse while remaining tolerant
      // eslint-disable-next-line no-console
      console.warn(`[ToggleSwitch] invalid size "${size}", falling back to "medium".`)
      const p = presets.medium
      return {
        '--ts-track-width': `${p.trackWidth}px`,
        '--ts-track-height': `${p.trackHeight}px`,
        '--ts-thumb-size': `${p.thumbSize}px`,
        '--ts-thumb-translate': `${p.translateX}px`,
        '--ts-icon-size': `${p.iconSize}px`,
        '--ts-padding': `${p.padding}px`
      } as React.CSSProperties
    }
    return {
      '--ts-track-width': `${preset.trackWidth}px`,
      '--ts-track-height': `${preset.trackHeight}px`,
      '--ts-thumb-size': `${preset.thumbSize}px`,
      '--ts-thumb-translate': `${preset.translateX}px`,
      '--ts-icon-size': `${preset.iconSize}px`,
      '--ts-padding': `${preset.padding}px`
    } as React.CSSProperties
  }

  // fallback (shouldn't reach)
  const p = presets.medium
  return {
    '--ts-track-width': `${p.trackWidth}px`,
    '--ts-track-height': `${p.trackHeight}px`,
    '--ts-thumb-size': `${p.thumbSize}px`,
    '--ts-thumb-translate': `${p.translateX}px`,
    '--ts-icon-size': `${p.iconSize}px`,
    '--ts-padding': `${p.padding}px`
  } as React.CSSProperties
}

/**
 * ToggleSwitch
 * Animated toggle switch with optional icons and smooth transitions.
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
  const resolvedId = id ?? `toggle-switch-${generatedId}`

  const colors = {
    green: getGlobalStyle('--color-text-success'),
    red: getGlobalStyle('--color-background-primary'),
    white: getGlobalStyle('--color-icons-white')
  } as const

  const sizeVars = computeSizeVariables(size)
  const backgroundColor = checked ? colors[successColor] ?? colors.red : getGlobalStyle('--color-text-inactive')

  // icon size is derived from the computed CSS variable (fallback to 19)
  const iconSizeValue = (() => {
    const v = sizeVars['--ts-icon-size']
    if (typeof v === 'string' && v.endsWith('px')) {
      const n = parseInt(v, 10)
      if (!Number.isNaN(n)) return n
    }
    return 19
  })()

  const handleChange = React.useCallback(() => {
    if (disabled) return
    onChange(!checked)
  }, [disabled, checked, onChange])

  return (
    <div className={styles.container} style={style}>
      <label className={styles.switch} htmlFor={resolvedId}>
        <input
          id={resolvedId}
          name={name}
          type="checkbox"
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
            <span className={`${styles.icon} ${styles.left}`}>
              <Icon icon={iconLeft} size={iconSizeValue} />
            </span>
          )}

          {iconRight && (
            <span className={`${styles.icon} ${styles.right}`}>
              <Icon icon={iconRight} size={iconSizeValue} />
            </span>
          )}

          <span className={styles.thumb} />
        </span>
      </label>

      {label && (
        <label htmlFor={resolvedId} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  )
}