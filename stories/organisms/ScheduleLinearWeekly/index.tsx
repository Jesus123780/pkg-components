import PropTypes from 'prop-types'
import React from 'react'
import { organizeData } from './helpers'
import { ScheduleMobile } from './ScheduleMobile'
import { Divider } from '../../atoms/Divider'
import styles from './styles.module.css'

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

interface ScheduleLinearWeeklyProps {
  isMobile?: boolean
  handleClick?: (number: number) => void
  handleHourPmAM?: (string: string) => void
  schedules?: any[]
  style?: React.CSSProperties
}
export const ScheduleLinearWeekly: React.FC<ScheduleLinearWeeklyProps> = ({
  isMobile = false,
  handleClick = (number) => {
    return number
  },
  handleHourPmAM = (string) => {
    return string
  },
  schedules = [],
  style = {}
}) => {
  const data = organizeData(schedules)
  if (isMobile) {
    return (
      <ScheduleMobile
        data={schedules}
        days={days}
        handleClick={handleClick}
        handleHourPmAM={handleHourPmAM}
        isMobile={isMobile}
        style={style}
      />
    )
  }

  return (
    <>
      <Divider marginBottom='100px' />
      <div className={styles.container} style={style}>
        <div className={styles.timeColumn}>
          {hours?.map((hour) => {
            return <div className={styles.time} key={hour}>{`${hour}h`}</div>
          })}
        </div>
        <div className={styles.scheduleGrid}>
          {Object.entries(data).map(([day, hoursData], indexDays) => {
            let isFirstEventShown = false
            let lastEventIndex = 0
            const totalHours = Object.keys(hoursData).length
            let Hours = 0
            for (const hour in hoursData) {
              Hours += hoursData[hour].length
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
                  {(Hours !== null) ? ` ${Hours || 0} h` : null}
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
                          handleClick(indexDays)
                        }}
                      >
                        <div className={styles.event} style={borderRadiusStyle}>
                          {isFirstEvent
                            ? `${event.schHoSta} - ${event.schHoEnd}`
                            : null}
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
    </>
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
