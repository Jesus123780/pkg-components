'use client'

import React, {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent
} from 'react'
import styles from './styles.module.css'
import { Text } from '../../../atoms'
import { getGlobalStyle } from '../../../../helpers'

/**
 * Props for the Range component.
 */
interface RangeProps {
  label?: string
  max?: number
  min?: number
  showProgress?: boolean
  ticks?: boolean
  value?: number
  width?: string | number
  step?: number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Custom range slider with optional circular progress and label.
 * @param {RangeProps} props - Props for the Range component.
 * @returns {JSX.Element}
 */
export const Range: React.FC<RangeProps> = ({
  min = 0,
  max = 100,
  value = 0,
  showProgress = false,
  ticks = false,
  label = '',
  onChange = () => { },
  width = '100%',
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState<number>(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = Number(e.target.value)
    setCurrentValue(newValue)
    onChange?.(e)
  }

  const step = props.step ?? 1
  const stepCount = Math.floor((max - min) / step)

  const dashValue = useMemo(() => (currentValue / max) * 88, [currentValue, max])
  const percentage = useMemo(() => ((currentValue - min) / (max - min)) * 100, [
    currentValue,
    min,
    max
  ])

  const inputStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(to right, ${getGlobalStyle('--color-primary-red')}, ${getGlobalStyle('--color-primary-red2')})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${percentage}% 100%`,
    backgroundColor: '#e6e6e6',
    borderRadius: '999px'
  }), [percentage])

  return (
    <div className={styles.container}>
      {showProgress && (
        <div className={styles.progress}>
          <svg className={styles.svg} viewBox='0 0 30 30'>
            <circle
              r='14'
              cx='15'
              cy='15'
              strokeWidth='2'
              fill='none'
              transform='rotate(-95 15 15)'
              strokeDasharray={`${dashValue}px 88px`}
            />
          </svg>
          <div className={styles.circleBorder} />
        </div>
      )}
      <Text size='xl'>
        {label}</Text>
      <input
        type='range'
        className={styles.input}
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        style={{ ...inputStyle, width }}
      />
      {ticks &&
        <div className={styles.ticks}>
          {Array.from({ length: stepCount + 1 }).map((_, index) => (
            <span key={index} className={styles.tick} />
          ))}
        </div>
      }
    </div>
  )
}
