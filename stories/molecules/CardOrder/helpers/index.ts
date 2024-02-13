import { getGlobalStyle } from '../../../../utils'

export const color = {
  0: getGlobalStyle('--color-feedback-success-light'),
  1: getGlobalStyle('--color-feedback-warning-light'),
  2: getGlobalStyle('--color-campaigns-yellow'),
  3: getGlobalStyle('--color-feedback-warning-dark'),
  4: getGlobalStyle('--color-feedback-success-light'),
  5: getGlobalStyle('--color-primary-red')
}
export interface IColor {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
}

export const calculateRemainingTime = (pDatCre: string, timeDelivery: number) => {
  const fechaCreacion = new Date(pDatCre)
  const fechaEntrega = new Date(fechaCreacion.getTime() + timeDelivery * 60000) // Convertir minutos a milisegundos

  const ahora = new Date()
  const tiempoRestante = fechaEntrega - ahora
  const hourEntrega = fechaEntrega.getHours()
  const minutesEntrega = fechaEntrega.getMinutes()

  const hourEntrega12 = (hourEntrega % 12) || 12 // Convertir a formato de 12 horas
  const period = hourEntrega >= 12 ? 'PM' : 'AM'

  if (tiempoRestante <= 0) {
    const hourDeRetraso = Math.floor(Math.abs(tiempoRestante) / 3600000) // Calcular hour de retraso
    const minutesDeRetraso = Math.floor((Math.abs(tiempoRestante) % 3600000) / 60000) // Calcular minutes restantes

    if (hourDeRetraso === 0) {
      return {
        minutes: `${minutesDeRetraso} min`,
        delay: true,
        remainingTimeText: `${minutesDeRetraso} min de retraso`
      }
    } else if (minutesDeRetraso === 0) {
      return {
        hour: `${hourDeRetraso} ${hourDeRetraso > 1 ? 'horas' : 'hora'}`,
        delay: true,
        remainingTimeText: `${hourDeRetraso} ${hourDeRetraso > 1 ? 'horas de retraso' : 'hora de retraso'}`
      }
    } 
    return {
      hour: hourDeRetraso,
      minutes: `${minutesDeRetraso} min`,
      delay: true,
      remainingTimeText: `${hourDeRetraso} horas y ${minutesDeRetraso} min de retraso`
    }
    
  }

  const hourRestantes = Math.floor(tiempoRestante / 3600000) // Convertir milisegundos a hour
  const minutesRestantes = Math.floor((tiempoRestante % 3600000) / 60000) // Calcular los minutes restantes

  if (hourRestantes === 0) {
    return {
      minutes: `${minutesRestantes} min`,
      remainingTimeText: `${minutesRestantes} min restantes`,
      entregaText: `Entregar a las ${hourEntrega12}:${minutesEntrega < 10 ? '0' : ''}${minutesEntrega} ${period}`
    }
  } 
  if (minutesRestantes === 0) {
    return {
      hour: `${hourRestantes} hour`,
      remainingTimeText: `${hourRestantes} hour restantes`,
      entregaText: `Entregar a las ${hourEntrega12}:${minutesEntrega < 10 ? '0' : ''}${minutesEntrega} ${period}`
    }
  } 

  return {
    hour: hourRestantes,
    minutes: `${minutesRestantes} min`,
    remainingTimeText: `${hourRestantes} hour y ${minutesRestantes} min restantes`,
    entregaText: `Entregar a las ${hourEntrega12}:${minutesEntrega < 10 ? '0' : ''}${minutesEntrega} ${period}`
  }
}


