'use client'

import React, { useState } from 'react'
import { PatternFormat } from '../PatternFormat'
import { Icon } from '../../../atoms'
import { getGlobalStyle } from '../../../../utils'
import styles from './styles.module.css'

interface InputTimeHoursProps {
  times?: string[]
  width?: string
  value?: string
  placeholder?: string
  info?: string | null
  disabled?: boolean
  error?: boolean
  onSelected?: (time: string) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputTimeHours: React.FC<InputTimeHoursProps> = ({
  times = [],
  width,
  value,
  placeholder,
  info = '',
  error,
  disabled = false,
  onSelected = (time) => time ?? '',
  onChange = (event) => event
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSuggestionsClick = (event: React.MouseEvent<HTMLUListElement>): any => {
    event.stopPropagation()
  }

  return (
    <div className={styles.container} style={{ width }}>
      <PatternFormat
        format="##:##"
        value={value ?? '0000'}
        type="text"
        disabled={disabled}
        defaultValue={placeholder ?? '00:00'}
        placeholder={placeholder ?? '00:00'}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 100)
        }}
        className={styles.input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event !== null) onChange(event)
        }}
      />
      {info !== '' && <>
        <Icon
          color={getGlobalStyle('--color-icons-warning')}
          icon='IconInfo'
          size={15}
        /> <span style={{
          fontSize: getGlobalStyle('--font-size-2xs')
        }} >
          {info}
        </span></>}
      {showSuggestions && (
        <ul className={styles.suggestions} onClick={handleSuggestionsClick}>
          {times.map((time) => (
            <li
              key={time}
              onClick={() => {
                onSelected(time)
                setShowSuggestions(false)
              }}
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
