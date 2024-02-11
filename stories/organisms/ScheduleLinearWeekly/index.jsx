// ScheduleLinearWeekly.js

import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles.module.css'
import { organizeData } from './helpers'
import { ScheduleMobile } from './ScheduleMobile'

const days = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  0: 'Domingo'
}

const hours = Array.from({ length: 25 }, (_, i) => {
  return i
})

export const ScheduleLinearWeekly = ({ openStoreEveryDay, isMobile, handleClick = (number) => { return number }, handleHourPmAM = (string) => { return string }, schedules = [], style = {} }) => {
  const data = organizeData(schedules)
  if (isMobile) return <ScheduleMobile
    data={schedules}
    days={days}
    handleClick={handleClick}
    handleHourPmAM={handleHourPmAM}
    isMobile={isMobile}
    style={style}
  /> 
  return (
    <div className={styles.container} style={style}>
      <div className={styles.timeColumn}>
        {hours?.map((hour) => {
          return <div className={styles.time} key={hour}>{`${hour}:00`}</div>
        })}
      </div>
      <div className={styles.scheduleGrid}>
        {Object.entries(data).map(([day, hoursData], indexDays) => {
          let isFirstEventShown = false // Variable para rastrear si ya se mostró el texto del primer evento
          let lastEventIndex = 0 // Variable para rastrear el índice del último evento
          const totalHours = Object.keys(hoursData).length // Obtener el número total de horas con eventos
          let Hours = 0 // Inicializar el total de horas para el día
          for (let hour in hoursData) {
            Hours += hoursData[hour].length // Sumar la cantidad de horas para cada evento
          }
          return (
            <div className={styles.dayColumn} key={day}>
              <span
                className={styles.dayLabel_action}
                onClick={() => {
                  return handleClick(Number(indexDays))
                }}
              >
                {days[day]}
                {Hours ? ` ${Hours || 0} h` : null}
              </span>
              {hours?.map((hour, index) => {
                const events = hoursData[hour]
                if (events && events.length > 0) {
                  const event = events[0]
                  const isFirstEvent = !isFirstEventShown // Verifica si es el primer evento
                  isFirstEventShown = true // Actualiza isFirstEventShown después de mostrar el primer evento
                  lastEventIndex = index // Actualiza el índice del último evento mostrado
                  let borderRadiusStyle = {} // Estilo para el borde de la celda
                  if (totalHours === 1) {
                    // Si solo hay un evento, aplicar bordes redondeados
                    borderRadiusStyle = {
                      borderRadius: '5px'
                    }
                  } else if (index === 0) {
                    // Si es el primer evento
                    borderRadiusStyle = {
                      borderTopLeftRadius: '5px',
                      borderTopRightRadius: '5px'
                    }
                  } else if (index === totalHours - 1) {
                    // Si es el último evento
                    borderRadiusStyle = {
                      borderBottomLeftRadius: '5px',
                      borderBottomRightRadius: '5px'
                    }
                  } else if (index === lastEventIndex - 1) {
                    // Si es el evento antes del último
                    borderRadiusStyle = {
                      borderBottomLeftRadius: '0',
                      borderBottomRightRadius: '0'
                    }
                  }
                  return (
                    <div
                      className={styles.hourCell}
                      key={`${day}-${hour}`}
                      onClick={() => {
                        return handleClick(indexDays)
                      }}
                    >
                      <div
                        className={styles.event}
                        style={borderRadiusStyle}
                      >
                        {isFirstEvent ? `${event.schHoSta} - ${event.schHoEnd}` : null}
                      </div>
                    </div>
                  )
                }
                return (
                  <div className={styles.hourCell} key={`${day}-${hour}`} />
                )
              })}
            </div>
          )
        })}


      </div>
    </div>
  )
}

ScheduleLinearWeekly.propTypes = {
  handleClick: PropTypes.func,
  handleHourPmAM: PropTypes.func,
  isMobile: PropTypes.bool,
  openStoreEveryDay: PropTypes.bool,
  schedules: PropTypes.array,
  style: PropTypes.object
}
