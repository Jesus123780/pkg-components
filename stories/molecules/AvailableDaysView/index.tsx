'use client'

import React from 'react'

import { getGlobalStyle } from '../../../utils'
import { Column, Icon, Row, Text } from '../../atoms'
import styles from './styles.module.css'

/** A single time range for a given day. */
export interface AvailableDayRange {
  startDate: string
  endDate: string
}

/** A weekday with its label and the time ranges it is available. */
export interface AvailableDayItem {
  /** 0 = Sunday ... 6 = Saturday. */
  day: number
  /** Full localized name (e.g. "Lunes"). */
  name: string
  /** Short code (L, M, MI, J, V, S, D). */
  code?: string
  /** Time ranges configured for this day. */
  ranges: AvailableDayRange[]
}

export interface AvailableDaysViewProps {
  /** Grouped availability per weekday (already sorted). */
  days?: AvailableDayItem[]
  /** Highlight the day that matches "today". */
  todayIndex?: number
  /** Whether the product is available right now. */
  availableToday?: boolean
  /** Message shown when there is no explicit schedule. */
  emptyMessage?: string
}

const TIME_SEPARATOR = ' - '

/**
 * Read-only view of the weekly availability of a product.
 *
 * Uses the shared `Icon` atom to render a calendar icon per day and a clock
 * icon for each time range. When `days` is empty it shows a friendly
 * "available all week" message. The current weekday is highlighted.
 */
export const AvailableDaysView: React.FC<AvailableDaysViewProps> = ({
  days = [],
  todayIndex = new Date().getDay(),
  availableToday = true,
  emptyMessage = 'Disponible toda la semana'
}) => {
  if (!Array.isArray(days) || days.length === 0) {
    return (
      <Row className={styles.emptyRow}>
        <Icon
          icon='IconSimpleCalendar'
          size={18}
          color={getGlobalStyle('--color-feedback-success-light')}
        />
        <Text color='gray-dark' size='sm'>
          {emptyMessage}
        </Text>
      </Row>
    )
  }

  return (
    <Column className={styles.container}>
      <Row className={styles.statusRow}>
        <Icon
          icon={availableToday ? 'IconSuccess' : 'time'}
          size={18}
          color={
            availableToday
              ? getGlobalStyle('--color-feedback-success-light')
              : getGlobalStyle('--color-neutral-gray-dark')
          }
        />
        <Text
          color={availableToday ? 'green' : 'gray-dark'}
          size='sm'
          weight='semibold'
        >
          {availableToday
            ? 'Disponible hoy'
            : 'No disponible hoy'}
        </Text>
      </Row>

      <div className={styles.daysGrid}>
        {days.map((item) => {
          const isToday = item.day === todayIndex

          return (
            <section
              key={`available-day-${item.day}`}
              className={
                isToday
                  ? `${styles.dayCard} ${styles.dayCardToday}`
                  : styles.dayCard
              }
            >
              <Row className={styles.dayHeader}>
                <Icon
                  icon='IconSimpleCalendar'
                  size={18}
                  color={
                    isToday
                      ? getGlobalStyle('--color-feedback-success-light')
                      : getGlobalStyle('--color-neutral-gray-dark')
                  }
                />
                <Text
                  color='gray-dark'
                  size='sm'
                  weight='semibold'
                >
                  {item.name}
                </Text>
                {isToday
                  ? (
                  <span className={styles.todayBadge}>Hoy</span>
                    )
                  : null}
              </Row>

              <Column className={styles.rangeList}>
                {item.ranges.map((range, index) => {
                  return (
                    <Row
                      key={`range-${item.day}-${index}`}
                      className={styles.rangeRow}
                    >
                      <Icon
                        icon='IconTime'
                        size={16}
                        color={getGlobalStyle('--color-neutral-gray-dark')}
                      />
                      <Text color='gray-dark' size='xs'>
                        {`${range.startDate}${TIME_SEPARATOR}${range.endDate}`}
                      </Text>
                    </Row>
                  )
                })}
              </Column>
            </section>
          )
        })}
      </div>
    </Column>
  )
}

export default AvailableDaysView
