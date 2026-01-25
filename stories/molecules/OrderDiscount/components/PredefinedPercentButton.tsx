import React from 'react'
import { Column, Icon } from '../../../atoms'
import { getGlobalStyle } from '../../../../helpers'
import styles from '../styles.module.css'

/**
 * Small memoized button for the predefined percent options.
 */
export const PredefinedPercentButton = React.memo(
  ({
    percent,
    active,
    onSelect
  }: {
    percent: number
    active: boolean
    onSelect: (p: number) => void
  }) => {
    return (
      <button
        type='button'
        onClick={() => onSelect(percent)}
        className={`${styles['option-btn']} ${active ? styles.active : ''}`}
      >
        {percent}%
        {active && (
          <Column className={styles['icon-wrapper']}>
            <Icon icon='IconSuccess' color={getGlobalStyle('--color-icons-white')} />
          </Column>
        )}
      </button>
    )
  }
)