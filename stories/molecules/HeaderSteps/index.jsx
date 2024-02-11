import PropTypes from 'prop-types'
import React from 'react'
import { Text } from '../../atoms'
import styles from './HeaderSteps.module.css'
import { getGlobalStyle } from '../../../utils'

export const HeaderSteps = ({
  active = 0,
  steps = [],
  overActive = null,
  handleOverActive = (index) => {
    return index
  },
  setActive = (index) => {
    return index
  }
}) => {
  const tabWidth = 100 / steps.length
  return (
    <div className={styles.header_step}>
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
              fontFamily='PFont-Light'
              fontSize='.9rem'
              fontWeight='500'
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

HeaderSteps.propTypes = {
  active: PropTypes.number,
  handleOverActive: PropTypes.func,
  setActive: PropTypes.func,
  overActive: PropTypes.number,
  steps: PropTypes.array
}
