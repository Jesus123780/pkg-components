import React, { type FC } from 'react'
import { Text } from '../../atoms'
import { getGlobalStyle } from '../../../utils'
import styles from './HeaderSteps.module.css'

interface HeaderStepsProps {
  active?: number
  steps: string[]
  overActive?: number | null
  style?: React.CSSProperties
  handleOverActive?: (index: number) => void
  setActive?: (index: number) => void
}

export const HeaderSteps: FC<HeaderStepsProps> = ({
  active = 0,
  steps = [],
  overActive = null,
  handleOverActive = (index) => {
    return index
  },
  setActive = (index) => {
    return index
  },
  style = {}
}) => {
  const tabWidth = 100 / steps.length
  return (
    <div style={style} className={styles.header_step} >
      {steps.map((title, index) => {
        return (
          <div
            className={`${styles.tabs} ${
              index === overActive && styles.slider__active
            }`}
            key={title}
            onClick={() => {
              setActive(index)
            }}
            onMouseLeave={() => {
              handleOverActive(active)
            }}
            onMouseOver={() => {
              handleOverActive(index)
            }}
          >
            <Text
              as='h2'
              className={styles.text}
              size='md'
              align='center'
              weight='normal'
              style={{
                userSelect: 'none',
                fontWeight: getGlobalStyle('--font-weight-bold'),
                color:
                  index === active
                    ? getGlobalStyle('--color-primary-red')
                    : getGlobalStyle('--color-text-gray-light')
              }}
            >
              {title}
            </Text>
          </div>
        )
      })}
      <span
        className={`${styles.slider}`}
        style={{
          left: `${active * tabWidth}%`,
          width: `${tabWidth}%`
        }}
      ></span>
    </div>
  )
}
