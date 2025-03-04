import React from 'react'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'

interface ToggleSwitchProps {
  checked: boolean
  id?: string
  disabled?: boolean
  label?: string
  style?: React.CSSProperties
  successColor: 'green' | 'red'
  onChange: (checked: boolean) => void
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  id = 'toggle-switch',
  disabled = false,
  label = '',
  successColor = 'red',
  style = {},
  onChange = () => {}
}) => {
  const diccionary = {
    green: getGlobalStyle('--color-text-success'),
    red: getGlobalStyle('--color-background-primary')
  } as const

  return (
    <div className={styles.container} style={style}>
      <label className={styles.switch} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={() => onChange(!checked)}
          className={styles.input}
        />
        <span className={styles.slider} style={{
          backgroundColor: checked ? diccionary[successColor as 'green' | 'red'] : getGlobalStyle('--color-text-inactive')
        }} />
      </label>
      {label !== '' && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  )
}
