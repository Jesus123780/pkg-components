import React from 'react'
import styles from './styles.module.css'

interface ScheduleMobileProps {
  data?: any
  days?: any
  isMobile?: boolean
  openStoreEveryDay?: any
  showTiming?: any
  style?: React.CSSProperties
  handleClick?: (number: number) => void
  handleHourPmAM?: (string: string) => void
}
export const ScheduleMobile: React.FC<ScheduleMobileProps> = ({
  data,
  days,
  isMobile,
  openStoreEveryDay,
  showTiming,
  style,
  handleClick,
  handleHourPmAM = (string: string) => string,
}) => {
  return (
    <div className={styles.scheduleHeader} style={isMobile ? { ...style } : { margin: 'auto', width: '95%', ...style }}>
      {data?.map((s: any, i: number) => {
        const start = handleHourPmAM(s.schHoSta)
        const end = handleHourPmAM(s.schHoEnd)
        const handleDivClick = () => {
          if (!openStoreEveryDay && handleClick) {
            handleClick(Number(s.schDay || s.day))
          }
        }
        const handleDivKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
          if ((event.key === 'Enter' || event.key === ' ') && !openStoreEveryDay && handleClick) {
            handleClick(Number(s.schDay || s.day))
          }
        }
        return (
          <div
            className={`${styles.card} ${s.schDay === showTiming ? styles.active : ''}`}
            key={i + 1}
            role="button"
            tabIndex={0}
            onClick={handleDivClick}
            onKeyDown={handleDivKeyDown}
            style={{ cursor: 'pointer' }}
          >
            <div>{days[Number(s.schDay ?? s.day)]}</div>
            <div>{start} - {end}</div>
          </div>
        )
      })}
    </div>
  )
}