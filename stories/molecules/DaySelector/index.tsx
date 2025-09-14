import React from 'react'
import { CircleDay } from './styled'
import { InputTimeHours } from '../Inputs'
import { Column, Text } from '../../atoms'

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
  handleDaySelection = () => {},
  handleChange = () => {}
}) => {
  return (
    <>
      {/* Selector de días */}
      {days.map((day) => (
        <CircleDay
          key={day.day}
          onClick={() => handleDaySelection(day.day)}
          pulse={selectedDays.includes(day.day)}
        >
          {day.name}
        </CircleDay>
      ))}

      {/* Configuración de horas para los días seleccionados */}
      {selectedDays.map((day) => (
        <div key={`config-${day}`} style={{ marginTop: '1rem' }}>
          <Text>{days.find((d) => d.day === day)?.name}</Text>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Column>
              <Text>Hora inicial</Text>
              <InputTimeHours
                onSelected={(time) => handleChange(day, 'startTime', time)}
                times={timeSuggestions}
                value={dayConfigs[day]?.startTime || ''}
                width="200px"
              />
            </Column>
            <Column>
              <Text>Hora final</Text>
              <InputTimeHours
                onSelected={(time) => handleChange(day, 'endTime', time)}
                times={timeSuggestions}
                value={dayConfigs[day]?.endTime || ''}
                width="200px"
              />
            </Column>
          </div>
        </div>
      ))}
    </>
  )
}
