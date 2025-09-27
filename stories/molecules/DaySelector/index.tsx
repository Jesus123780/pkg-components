import React from 'react'
import { CircleDay } from './styled'
import { InputTimeHours } from '../Inputs'
import {
  Column,
  Text,
  Row
} from '../../atoms'
import styles from './styles.module.css'
import { DAYS_STRINGS } from '../../../utils'

interface DaySelectorProps {
  days: Array<{ day: number, name: string }>
  timeSuggestions: string[]
  selectedDays: number[]
  dayConfigs: Record<number, { startTime: string, endTime: string }>
  handleDaySelection: (day: number) => void
  handleChange: (day: number, field: 'startTime' | 'endTime', value: string) => void
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days = [],
  timeSuggestions = [],
  selectedDays = [],
  dayConfigs = {},
  handleDaySelection = () => { },
  handleChange = () => { }
}) => {
  return (
    <>
      <Row>
        {days.map((day) => (
          <Column key={day.day} style={{ alignItems: 'center', width: 'min-content' }}>
          <CircleDay
            onClick={() => handleDaySelection(day.day)}
            pulse={selectedDays.includes(day.day)}
          >
            {day.name}
          </CircleDay>
          <Text>
            {DAYS_STRINGS[day.name]}
          </Text>
          </Column>
        ))}
      </Row>
      <Column className={styles['day-config-container']}>
        {selectedDays.map((day) => (
          <div key={`config-${day}`} style={{ marginTop: '1rem' }}>
            <Text weight='semibold' font='regular'>
              {DAYS_STRINGS[days.find((d) => d.day === day)?.name ?? '']}
            </Text>
            <div style={{ display: 'flex', gap: '1rem', width: 'min-content' }}>
              <div>
                <Text>Hora inicial</Text>
                <InputTimeHours
                  onSelected={(time) => handleChange(day, 'startTime', time)}
                  times={timeSuggestions}
                  value={typeof dayConfigs[day]?.startTime === 'string' && dayConfigs[day]?.startTime !== '' ? dayConfigs[day]?.startTime : ''}
                  width="200px"
                  placeholder='00:00'
                />
              </div>
              <div>
                <Text>Hora final</Text>
                <InputTimeHours
                  onSelected={(time) => handleChange(day, 'endTime', time)}
                  times={timeSuggestions}
                  value={typeof dayConfigs[day]?.endTime === 'string' && dayConfigs[day]?.endTime !== '' ? dayConfigs[day]?.endTime : ''}
                  width="200px"
                  placeholder='23:59'
                />
              </div>
            </div>
          </div>
        ))}
      </Column>
    </>
  )
}
