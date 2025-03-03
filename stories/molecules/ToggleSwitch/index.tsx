import React from 'react'
import styles from './styles.module.css'

interface ToggleSwitchProps {
  checked: boolean
  id?: string
  disabled?: boolean
  label?: string
  style?: React.CSSProperties
  onChange: (checked: boolean) => void
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  id = 'toggle-switch',
  disabled = false,
  label = '',
  style = {},
  onChange = () => {}
}) => {
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
        <span className={styles.slider} />
      </label>
      {label !== '' && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  )
}
