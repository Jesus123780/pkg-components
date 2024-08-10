import React from 'react'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

interface StepperProps {
  active: number
  steps: string[]
  style?: React.CSSProperties
  onClick: (step: number) => void
}

export const Stepper: React.FC<StepperProps> = ({
  active,
  steps = [],
  style,
  onClick = (step: number) => () => {
    return step
  }
}) => {
  const titleHeaders = steps.length > 0 ? steps : ['Con cédula', 'Con NIT', 'Otro']
  const tabWidth = 100 / titleHeaders.length

  return (
    <div className={styles.container} style={style} >
      {titleHeaders.map((title, index) => {
        const isActive = index === active
        return (
          <div
            className={styles.tabs}
            key={title}
            role='button'
            onClick={() => onClick(index)}
          >
            <span
              className={styles.text}
              style={{
                userSelect: 'none',
                color: isActive
                  ? getGlobalStyle('--color-neutral-white')
                  : getGlobalStyle('--color-text-black')
              }}
            >
              {title}
            </span>
          </div>
        )
      })}
      <span
        className={styles.slider}
        style={{
          left: active === titleHeaders.length - 1 ? `${active * tabWidth - 0.3}%` : `${active * tabWidth + 0.5}%`,
          width: `${tabWidth}%`
        }}
      ></span>
    </div>
  )
}
