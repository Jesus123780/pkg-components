// Nuevo componente: ScheduleHeaderComponent.js
import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles.module.css'

export const ScheduleMobile = ({ 
  isMobile, 
  data, 
  showTiming, 
  openStoreEveryDay, 
  handleClick, 
  style, 
  handleHourPmAM = (string) => { return string }, 
  days
}) => {
  return (
    <div className={styles.scheduleHeader} style={isMobile ? {...style} : { margin: 'auto', width: '95%', ...style }}>
      {data?.map((s, i) => {
        const start = handleHourPmAM(s.schHoSta)
        const end = handleHourPmAM(s.schHoEnd)
        return (
          <div
            className={`${styles.card} ${s.schDay === showTiming ? styles.active : ''}`}
            key={i + 1}
            onClick={() => {return openStoreEveryDay ? () => { } : handleClick(Number(s.schDay || s.day))}}
          >
            <div>{days[Number(s.schDay ?? s.day)]}</div>
            <div>{start} - {end}</div>
          </div>
        )
      })}
    </div>
  )
}

ScheduleMobile.propTypes = {
  combinedArray: PropTypes.shape({
    map: PropTypes.func
  }),
  data: PropTypes.any,
  days: PropTypes.any,
  handleClick: PropTypes.func,
  style: PropTypes.object,
  handleHourPmAM: PropTypes.func,
  isMobile: PropTypes.bool,
  openStoreEveryDay: PropTypes.any,
  showTiming: PropTypes.any
}
