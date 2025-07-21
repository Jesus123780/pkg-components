// ToggleSwitch.tsx
import React from 'react'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'

interface ToggleSwitchProps {
  checked: boolean
  id?: string
  disabled?: boolean
  label?: string
  style?: React.CSSProperties
  name?: string
  successColor: 'green' | 'red'
  onChange: (checked: boolean) => void
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  id = 'toggle-switch',
  disabled = false,
  label = '',
  name = '',
  successColor = 'red',
  style = {},
  onChange = () => { }
}) => {
  const diccionary = {
    green: getGlobalStyle('--color-text-success'),
    red: getGlobalStyle('--color-background-primary')
  } as const

  return (
    <div className={styles.container} style={style} data-testid="toggle-switch-container">
      <label className={styles.switch} htmlFor={id}>
        <input
          id={id}
          name={name}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={() => onChange(!checked)}
          className={styles.input}
          data-testid="toggle-switch-input"
        />
        <span
          className={styles.slider}
          style={{
            backgroundColor: checked ? diccionary[successColor] : getGlobalStyle('--color-text-inactive')
          }}
          data-testid="toggle-switch-slider"
        />
      </label>
      {label !== '' && (
        <label htmlFor={id} className={styles.label} data-testid="toggle-switch-label">
          {label}
        </label>
      )}
    </div>
  )
}
