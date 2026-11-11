
'use client'

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { organizeData } from './helpers'
import { ScheduleMobile } from './ScheduleMobile'
import { Divider } from '../../atoms/Divider'

import styles from './styles.module.css'

import {
  buildScheduleSegments,
  formatCurrentTime,
  formatDuration,
  formatMinutesToTime,
  getScheduleDaySummary,
  timeToMinutes,
  WEEK_DAYS,
  type ScheduleSegment,
  type StoreSchedule
} from './helpers/scheduleTimeline.helpers'

interface ScheduleLinearWeeklyProps {
  isMobile?: boolean
  handleClick?: (dayNumber: number, schedule?: StoreSchedule) => void
  handleHourPmAM?: (time: string) => string
  schedules?: any[]
  rawSchedules?: StoreSchedule[]
  style?: React.CSSProperties
}

const HOURS = Array.from({ length: 24 }, (_, index) => index)

const getDaySchedules = (
  schedules: StoreSchedule[],
  day: number
): StoreSchedule[] => {
  return schedules.filter((schedule) => Number(schedule?.schDay) === day)
}

interface TimelineBlockProps {
  segment: ScheduleSegment
  onClick: (schedule: StoreSchedule) => void
  index: number
}

const TimelineBlock: React.FC<TimelineBlockProps> = ({
  segment,
  onClick,
  index
}) => {
  const start = segment.startMinute
  const end = segment.endMinute
  const duration = end - start

  const top = (start / 1440) * 100
  const height = (duration / 1440) * 100

  const timeLabel = `${formatMinutesToTime(start)} – ${formatMinutesToTime(end)}`
  const durationLabel = formatDuration(duration)

  const continuationLabel = segment.continuesFromPrevious
    ? 'Continúa desde el día anterior'
    : segment.continuesNext
      ? 'Continúa al día siguiente'
      : ''

  return (
    <button
      aria-label={`${timeLabel}. ${durationLabel}. ${continuationLabel}`}
      className={styles.scheduleBlock}
      onClick={(event) => {
        event.stopPropagation()
        onClick(segment.schedule)
      }}
      style={{
        top: `${top}%`,
        height: `${height}%`,
        animationDelay: `${Math.min(index * 35, 210)}ms`
      }}
      title={`${timeLabel} · ${durationLabel}`}
      type='button'
    >
      <span className={styles.scheduleBlockTime}>
        {timeLabel}
      </span>

      <span className={styles.scheduleBlockDuration}>
        {durationLabel}
      </span>

      {(segment.continuesFromPrevious || segment.continuesNext) && (
        <span className={styles.scheduleBlockContinuation}>
          {segment.continuesFromPrevious ? '← Continuación' : 'Continúa →'}
        </span>
      )}
    </button>
  )
}

const WeeklyTimeline: React.FC<{
  schedules: StoreSchedule[]
  handleClick: (dayNumber: number, schedule?: StoreSchedule) => void
}> = ({ schedules, handleClick }) => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date())
    }, 60_000)

    return () => window.clearInterval(interval)
  }, [])

  const segmentsByDay = buildScheduleSegments(schedules)
  const today = now.getDay()
  const currentMinute = (now.getHours() * 60) + now.getMinutes()
  const currentTime = formatCurrentTime(now)

  const handleDayClick = (day: number) => {
    const daySchedules = getDaySchedules(schedules, day)
    handleClick(day, daySchedules[0])
  }

  const handleTrackKeyboard = (
    event: React.KeyboardEvent<HTMLDivElement>,
    day: number
  ) => {
    if (event.target !== event.currentTarget) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleDayClick(day)
    }
  }

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineLegend}>
        <div className={styles.timelineLegendItem}>
          <span className={styles.legendOpen} />
          <span>Horario configurado</span>
        </div>

        <div className={styles.timelineLegendItem}>
          <span className={styles.legendClosed} />
          <span>Fuera del horario</span>
        </div>

        <div className={styles.timelineLegendItem}>
          <span className={styles.legendCurrent} />
          <span>Hora actual</span>
        </div>
      </div>

      <div className={styles.timelineViewport}>
        <div className={styles.timelineCanvas}>
          <div className={styles.timelineHeader}>
            <div className={styles.timelineCorner}>
              <span>Hora</span>
            </div>

            {WEEK_DAYS.map((day) => {
              const segments = segmentsByDay[day.value] || []
              const summary = getScheduleDaySummary(segments)
              const isToday = today === day.value

              return (
                <button
                  aria-label={`${day.label}: ${summary.label}. Editar horario`}
                  className={`${styles.dayHeader} ${
                    isToday ? styles.dayHeaderToday : ''
                  }`}
                  key={day.value}
                  onClick={() => handleDayClick(day.value)}
                  type='button'
                >
                  <span className={styles.dayHeaderName}>
                    {day.label}
                    {isToday && (
                      <span className={styles.todayIndicator}>Hoy</span>
                    )}
                  </span>

                  <span
                    className={`${styles.dayHeaderStatus} ${
                      summary.isOpen
                        ? styles.dayHeaderStatusOpen
                        : styles.dayHeaderStatusClosed
                    }`}
                  >
                    {summary.label}
                  </span>

                  {segments.length > 1 && (
                    <span className={styles.dayHeaderCount}>
                      {segments.length} franjas
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className={styles.timelineBody}>
            <div aria-hidden='true' className={styles.timeScale}>
              {HOURS.map((hour) => (
                <div
                  className={styles.timeTick}
                  key={hour}
                  style={{ top: `${(hour / 24) * 100}%` }}
                >
                  <span>
                    {`${String(hour).padStart(2, '0')}:00`}
                  </span>
                </div>
              ))}
            </div>

            {WEEK_DAYS.map((day) => {
              const segments = segmentsByDay[day.value] || []
              const isToday = today === day.value
              const daySchedules = getDaySchedules(schedules, day.value)

              return (
                <div
                  aria-label={`${day.label}. ${segments.length ? 'Con horario' : 'Cerrado'}`}
                  className={`${styles.dayTrack} ${
                    isToday ? styles.dayTrackToday : ''
                  }`}
                  key={day.value}
                  onClick={() => handleDayClick(day.value)}
                  onKeyDown={(event) => handleTrackKeyboard(event, day.value)}
                  role='button'
                  tabIndex={0}
                >
                  {segments.length === 0 && (
                    <span className={styles.closedLabel}>
                      Sin horario
                    </span>
                  )}

                  {segments.map((segment, index) => (
                    <TimelineBlock
                      index={index}
                      key={`${segment.schedule.schId || day.value}-${segment.startMinute}-${index}`}
                      onClick={(schedule) => {
                        handleClick(day.value, schedule)
                      }}
                      segment={segment}
                    />
                  ))}

                  {isToday && (
                    <div
                      aria-label={`Hora actual: ${currentTime}`}
                      className={styles.currentTimeLine}
                      style={{
                        top: `${(currentMinute / 1440) * 100}%`
                      }}
                    >
                      <span className={styles.currentTimeLabel}>
                        {currentTime}
                      </span>
                    </div>
                  )}

                  {/*
                    Se conserva la referencia a los horarios originales
                    del día para que los clics sobre el espacio vacío
                    puedan abrir el formulario correspondiente.
                  */}
                  {daySchedules.length > 0 && (
                    <span className={styles.srOnly}>
                      {daySchedules.length} horarios configurados
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ScheduleLinearWeekly: React.FC<ScheduleLinearWeeklyProps> = ({
  isMobile = false,
  handleClick = () => undefined,
  handleHourPmAM = (time) => time,
  schedules = [],
  rawSchedules,
  style = {}
}) => {
  if (isMobile) {
    return (
      <ScheduleMobile
        data={schedules}
        days={{
          1: 'Lunes',
          2: 'Martes',
          3: 'Miércoles',
          4: 'Jueves',
          5: 'Viernes',
          6: 'Sábado',
          0: 'Domingo'
        }}
        handleClick={handleClick}
        handleHourPmAM={handleHourPmAM}
        isMobile={isMobile}
        style={style}
      />
    )
  }

  /*
   * Nuevo calendario:
   * se activa únicamente cuando el consumidor entrega los datos
   * originales del backend mediante rawSchedules.
   */
  if (Array.isArray(rawSchedules)) {
    return (
      <div className={styles.timelineWrapper} style={style}>
        <Divider marginBottom='32px' />

        <WeeklyTimeline
          handleClick={handleClick}
          schedules={rawSchedules}
        />
      </div>
    )
  }

  /*
   * Compatibilidad con consumidores antiguos.
   * Se conserva la organización y el comportamiento previos.
   */
  const data = organizeData(schedules)

  return (
    <>
      <Divider marginBottom='100px' />

      <div className={styles.container} style={style}>
        <div className={styles.timeColumn}>
          {Array.from({ length: 25 }, (_, hour) => (
            <div className={styles.time} key={hour}>
              {`${hour}h`}
            </div>
          ))}
        </div>

        <div className={styles.scheduleGrid}>
          {Object.entries(data).map(([day, hoursData], indexDays) => {
            let isFirstEventShown = false
            const totalHours = Object.keys(
              hoursData as Record<string, any>
            ).length

            let totalOpenHours = 0

            Object.values(hoursData as Record<string, any>).forEach(
              (events: any) => {
                totalOpenHours += Array.isArray(events) ? events.length : 0
              }
            )

            return (
              <div className={styles.dayColumn} key={day}>
                <button
                  className={styles.dayLabel_action}
                  onClick={() => handleClick(Number(day))}
                  type='button'
                >
                  {WEEK_DAYS.find(
                    (item) => item.value === Number(day)
                  )?.label || day}

                  {` ${totalOpenHours} h`}
                </button>

                {HOURS.map((hour, index) => {
                  const events = (
                    hoursData as Record<string, any>
                  )[hour]

                  if (Array.isArray(events) && events.length > 0) {
                    const event = events[0]
                    const isFirstEvent = !isFirstEventShown

                    isFirstEventShown = true

                    const borderRadiusStyle: React.CSSProperties =
                      totalHours === 1
                        ? { borderRadius: '5px' }
                        : index === 0
                          ? {
                              borderTopLeftRadius: '5px',
                              borderTopRightRadius: '5px'
                            }
                          : index === totalHours - 1
                            ? {
                                borderBottomLeftRadius: '5px',
                                borderBottomRightRadius: '5px'
                              }
                            : {}

                    return (
                      <button
                        className={styles.hourCell}
                        key={`${day}-${hour}`}
                        onClick={() => handleClick(
                          Number(day),
                          event
                        )}
                        type='button'
                      >
                        <div
                          className={styles.event}
                          style={borderRadiusStyle}
                        >
                          {isFirstEvent
                            ? `${event.schHoSta} - ${event.schHoEnd}`
                            : null}
                        </div>
                      </button>
                    )
                  }

                  return (
                    <div
                      className={`${styles.hourCell} ${styles.hourCell_close}`}
                      key={`${day}-${hour}`}
                    >
                      <div className={styles.line_close} />
                    </div>
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
  schedules: PropTypes.array,
  rawSchedules: PropTypes.array,
  style: PropTypes.object
}
