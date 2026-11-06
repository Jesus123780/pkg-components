
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
  /** Show an "edit" affordance in the header. */
  editable?: boolean
  /** Called when the user asks to edit the schedule. */
  onEdit?: () => void
}

const TIME_SEPARATOR = ' - '

/**
 * Renders the schedule edit button.
 */
const EditButton: React.FC<{ onEdit: () => void }> = ({ onEdit }) => {
  return (
    <button
      type='button'
      className={styles.editButton}
      onClick={onEdit}
      aria-label='Editar días disponibles'
    >
      <Icon
        icon='IconEdit'
        size={16}
        color={getGlobalStyle('--color-primary-pink-light')}
      />

      <Text color='gray-dark' size='xs' weight='semibold'>
        Editar
      </Text>
    </button>
  )
}

/**
 * Read-only view of the weekly availability of a product.
 *
 * The layout adapts to the available width of its parent container.
 * It supports narrow columns, nested flex/grid layouts and long text
 * without introducing horizontal overflow.
 */
export const AvailableDaysView: React.FC<AvailableDaysViewProps> = ({
  days = [],
  todayIndex = new Date().getDay(),
  availableToday = true,
  emptyMessage = 'Disponible toda la semana',
  editable = false,
  onEdit = () => {}
}) => {
  if (!Array.isArray(days) || days.length === 0) {
    return (
      <Row
        className={styles.emptyState}
        justifyContent='space-between'
      >
        <Row className={styles.emptyContent}>
          <span className={styles.iconWrapper}>
            <Icon
              icon='IconSimpleCalendar'
              size={18}
              color={getGlobalStyle('--color-feedback-success-light')}
            />
          </span>

          <span className={styles.emptyText}>
            <Text color='gray-dark' size='sm'>
              {emptyMessage}
            </Text>
          </span>
        </Row>

        {editable ? <EditButton onEdit={onEdit} /> : null}
      </Row>
    )
  }

  return (
    <Column className={styles.container}>
      <Row
        className={styles.statusRow}
        justifyContent='space-between'
      >
        <Row className={styles.statusContent}>
          <span className={styles.iconWrapper}>
            <Icon
              icon={availableToday ? 'IconSuccess' : 'time'}
              size={18}
              color={
                availableToday
                  ? getGlobalStyle('--color-feedback-success-light')
                  : getGlobalStyle('--color-neutral-gray-dark')
              }
            />
          </span>

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

        {editable ? <EditButton onEdit={onEdit} /> : null}
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
                <span className={styles.iconWrapper}>
                  <Icon
                    icon='IconSimpleCalendar'
                    size={18}
                    color={
                      isToday
                        ? getGlobalStyle('--color-feedback-success-light')
                        : getGlobalStyle('--color-neutral-gray-dark')
                    }
                  />
                </span>

                <span className={styles.dayName}>
                  <Text
                    color='gray-dark'
                    size='sm'
                    weight='semibold'
                  >
                    {item.name}
                  </Text>
                </span>

                {isToday ? (
                  <span className={styles.todayBadge}>
                    Hoy
                  </span>
                ) : null}
              </Row>

              <Column className={styles.rangeList}>
                {item.ranges.map((range, index) => (
                  <Row
                    key={`range-${item.day}-${index}`}
                    className={styles.rangeRow}
                  >
                    <span className={styles.iconWrapper}>
                      <Icon
                        icon='time'
                        size={16}
                        color={getGlobalStyle('--color-neutral-gray-dark')}
                      />
                    </span>

                    <span className={styles.rangeTime}>
                      <Text color='gray-dark' size='xs'>
                        {`${range.startDate}${TIME_SEPARATOR}${range.endDate}`}
                      </Text>
                    </span>
                  </Row>
                ))}
              </Column>
            </section>
          )
        })}
      </div>
    </Column>
  )
}

export default AvailableDaysView
