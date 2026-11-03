import React from 'react'

import { CircleDay } from './styled'
import { InputTimeHours } from '../Inputs'
import {
  Column,
  Text,
  Row
} from '../../atoms'

import { DAYS_STRINGS } from '../../../utils'
import styles from './styles.module.css'

interface DaySelectorProps {
  days: Array<{ day: number, name: string }>
  timeSuggestions: string[]
  selectedDays: number[]
  dayConfigs: Record<number, {
    startTime: string
    endTime: string
  }>
  handleDaySelection: (day: number) => void
  handleChange: (
    day: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => void
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days = [],
  timeSuggestions = [],
  selectedDays = [],
  dayConfigs = {},
  handleDaySelection = () => {},
  handleChange = () => {}
}) => {
  return (
    <section className={styles.container}>
      {/* Selector de días */}
      <Row className={styles.daysContainer}>
        {days.map((day) => {
          const isSelected = selectedDays.includes(day.day)

          return (
            <Column
              key={day.day}
              className={styles.dayItem}
            >
              <CircleDay
                className={styles.dayCircle}
                onClick={() => handleDaySelection(day.day)}
                pulse={isSelected}
              >
                {day.name}
              </CircleDay>

              <Text>
                {DAYS_STRINGS[day.name]}
              </Text>
            </Column>
          )
        })}
      </Row>

      {/* Configuración de horarios */}
      <Column className={styles.dayConfigContainer}>
        {selectedDays.map((day) => {
          const dayName =
            days.find((item) => item.day === day)?.name ?? ''

          const config = dayConfigs[day]

          return (
            <section
              key={`config-${day}`}
              className={styles.dayConfig}
            >
              <header className={styles.dayConfigHeader}>
                <Text
                  weight='semibold'
                  font='regular'
                >
                  {DAYS_STRINGS[dayName]}
                </Text>
              </header>

              <div className={styles.timeFields}>
                <div className={styles.timeField}>
                  <Text>
                    Hora inicial
                  </Text>

                  <InputTimeHours
                    onSelected={(time) =>
                      handleChange(day, 'startTime', time)
                    }
                    times={timeSuggestions}
                    value={
                      typeof config?.startTime === 'string'
                        ? config.startTime
                        : ''
                    }
                    width='100%'
                    placeholder='00:00'
                  />
                </div>

                <div className={styles.timeField}>
                  <Text>
                    Hora final
                  </Text>

                  <InputTimeHours
                    onSelected={(time) =>
                      handleChange(day, 'endTime', time)
                    }
                    times={timeSuggestions}
                    value={
                      typeof config?.endTime === 'string'
                        ? config.endTime
                        : ''
                    }
                    width='100%'
                    placeholder='23:59'
                  />
                </div>
              </div>
            </section>
          )
        })}
      </Column>
    </section>
  )
}