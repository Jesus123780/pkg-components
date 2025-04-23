'use client'

import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../../utils'

interface CheckboxProps {
  checked?: boolean
  className?: string
  disabled?: boolean
  hideLabel?: boolean
  id?: any
  indeterminate?: boolean
  label?: any
  name?: any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  className = '',
  disabled = false,
  id,
  indeterminate = false,
  label,
  name,
  onChange = (event, id) => ({ event, id }),
  ...restProps
}) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const clickThreshold = 1000

  const syncIndeterminateState = useCallback(() => {
    if (inputEl.current) {
      inputEl.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  useEffect(() => {
    syncIndeterminateState()
  }, [indeterminate, syncIndeterminateState])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (indeterminate) syncIndeterminateState()

    const now = Date.now()
    setClickCount(now - lastClickTime < clickThreshold ? prev => prev + 1 : 1)
    if (clickCount >= 7) setClickCount(0)
    setLastClickTime(now)

    onChange(event, id)
  }

  const disabledStyles = { color: getGlobalStyle('--color-text-inactive') }

  return (
    <span
      className={styles.container}
      id={id}
      style={disabled ? disabledStyles : {}}
      {...restProps}
    >
      <input
        className={styles.input}
        checked={checked}
        disabled={disabled}
        id={`checkbox-${id}`}
        name={name}
        onChange={handleChange}
        ref={inputEl}
        type="checkbox"
      />
      <label
        htmlFor={`checkbox-${id}`}
        className={classNames(styles.label, {
          [styles.checked]: checked,
          [className]: !!className
        })}
      >
        {label}
      </label>
    </span>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.any,
  indeterminate: PropTypes.bool,
  label: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.func
}
