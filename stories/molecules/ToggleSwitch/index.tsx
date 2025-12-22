'use client'

import React from 'react'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'
import { Icon } from '../../atoms'

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
  onChange: (checked: boolean) => void
}

/**
 * ToggleSwitch
 * Animated toggle switch with optional icons and smooth transitions
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  id = 'toggle-switch',
  disabled = false,
  label = '',
  name = '',
  style,
  successColor = 'red',
  iconLeft,
  iconRight,
  onChange
}) => {
  const colors = {
    green: getGlobalStyle('--color-text-success'),
    red: getGlobalStyle('--color-background-primary'),
    white: getGlobalStyle('--color-icons-white')
  } as const

  return (
    <div className={styles.container} style={style}>
      <label className={styles.switch} htmlFor={id}>
        <input
          id={id}
          name={name}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={() => onChange(!checked)}
        />

        <span
          className={styles.track}
          style={{
            backgroundColor: checked
              ? colors[successColor]
              : getGlobalStyle('--color-text-inactive')
          }}
        >
          {iconLeft && (
            <span className={`${styles.icon} ${styles.left}`}>
              <Icon icon={iconLeft} size={19} />
            </span>
          )}

          {iconRight && (
            <span className={`${styles.icon} ${styles.right}`}>
              <Icon icon={iconRight} size={19} />
            </span>
          )}

          <span className={styles.thumb} />
        </span>
      </label>

      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  )
}
