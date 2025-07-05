'use client'

import React, { useEffect, useRef, useState } from 'react'

export const Maintenance = () => {
  const [timerDays, setTimerDays] = useState('00')
  const [timerHours, setTimerHours] = useState('00')
  const [timerMinutes, setTimerMinutes] = useState('00')
  const [timerSeconds, setTimerSeconds] = useState('00')

  let interval = useRef()

  const startTimer = () => {
    const countdownDate = new Date('Oct 30,  2023 00:00:00').getTime()
    interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countdownDate - now
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(interval.current)
      } else {
        setTimerDays(days)
        setTimerHours(hours)
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
      }
    }, 1000)
  }
  useEffect(() => {
    const someref = interval.current
    startTimer()
    return () => {
      clearInterval(someref)
    }
  }, [])

  return (
    <>
      <div>
        <div>
          <div>
            <span>Dias</span>
            <h4>{timerDays}</h4>
          </div>
          <div>
            <span>Horas</span>
            <h4>{timerHours}</h4>
          </div>
          <div>
            <span>Minutos</span>
            <h4>{timerMinutes}</h4>
          </div>
          <div>
            <span>Segundos</span>
            <h4>{timerSeconds}</h4>
          </div>
        </div>
      </div>
    </>
  )
}
