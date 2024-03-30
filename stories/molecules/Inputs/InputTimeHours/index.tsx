import React, { useState } from 'react'
import { PatternFormat } from '../PatternFormat'
import styles from './styles.module.css'

interface InputTimeHoursProps {
  times?: string[]
  width?: string
  value?: string
  disabled?: boolean
  onSelected?: (time: string) => void
}

export const InputTimeHours: React.FC<InputTimeHoursProps> = ({
  times = [],
  width,
  value,
  disabled = false,
  onSelected = (time) => {
    return time ?? ''
  }
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  return (
        <div className={styles.container} style={{
          width
        }}>
        <PatternFormat format="##:##" value={value ?? '0000'}
          type="text"
          disabled={disabled}
          onFocus={() => setShowSuggestions(true)}
          className={styles.input}
        />
        {showSuggestions && (
          <ul className={styles.suggestions}>
            {times.map((time, index) => (
              <li key={index} onClick={() => {
                console.log('Hola ')
                onSelected(time)
                setShowSuggestions(false)
              }}>
                {time}
              </li>
            ))}
          </ul>
        )}
      </div>
  )
}
