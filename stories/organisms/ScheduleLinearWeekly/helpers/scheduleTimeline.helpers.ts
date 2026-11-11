
export interface StoreSchedule {
  schId?: string
  schDay: number
  schHoSta: string
  schHoEnd: string
  schState?: number | string
  [key: string]: unknown
}

export interface ScheduleSegment {
  day: number
  startMinute: number
  endMinute: number
  schedule: StoreSchedule
  continuesFromPrevious: boolean
  continuesNext: boolean
}

export interface ScheduleDaySummary {
  totalMinutes: number
  isAllDay: boolean
  isOpen: boolean
  scheduleCount: number
  label: string
}

export const WEEK_DAYS = [
  { value: 0, label: 'Domingo', shortLabel: 'Dom' },
  { value: 1, label: 'Lunes', shortLabel: 'Lun' },
  { value: 2, label: 'Martes', shortLabel: 'Mar' },
  { value: 3, label: 'Miércoles', shortLabel: 'Mié' },
  { value: 4, label: 'Jueves', shortLabel: 'Jue' },
  { value: 5, label: 'Viernes', shortLabel: 'Vie' },
  { value: 6, label: 'Sábado', shortLabel: 'Sáb' }
] as const

const MINUTES_PER_DAY = 24 * 60

/**
 * Convierte HH:mm o una hora con AM/PM a minutos desde las 00:00.
 * Devuelve null cuando el valor no es una hora válida.
 */
export const timeToMinutes = (value?: string | null): number | null => {
  if (!value || typeof value !== 'string') return null

  const normalized = value.trim().toUpperCase()
  const match = normalized.match(
    /^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?$/
  )

  if (!match) return null

  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3]

  if (minutes < 0 || minutes > 59) return null

  if (period) {
    if (hours < 1 || hours > 12) return null

    if (period === 'AM') {
      hours = hours === 12 ? 0 : hours
    } else {
      hours = hours === 12 ? 12 : hours + 12
    }
  }

  if (hours < 0 || hours > 23) return null

  return (hours * 60) + minutes
}

export const formatMinutesToTime = (minutes: number): string => {
  const safeMinutes = Math.max(0, Math.min(minutes, MINUTES_PER_DAY))
  const hours = Math.floor(safeMinutes / 60)
  const remainingMinutes = safeMinutes % 60

  return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`
}

export const formatDuration = (minutes: number): string => {
  if (minutes >= MINUTES_PER_DAY - 1) return '24 horas'
  if (minutes <= 0) return '0 min'

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) return `${remainingMinutes} min`
  if (remainingMinutes === 0) return `${hours} h`

  return `${hours} h ${remainingMinutes} min`
}

/**
 * Genera los segmentos visibles por día.
 *
 * Un horario como 22:00–02:00 se representa como:
 * - Día original: 22:00–24:00.
 * - Día siguiente: 00:00–02:00.
 *
 * Ambos segmentos conservan la referencia al horario original.
 */
export const buildScheduleSegments = (
  schedules: StoreSchedule[] = []
): Record<number, ScheduleSegment[]> => {
  const result: Record<number, ScheduleSegment[]> = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  }

  schedules.forEach((schedule) => {
    const day = Number(schedule?.schDay)

    if (!Number.isInteger(day) || day < 0 || day > 6) return

    if (schedule?.schState !== undefined && Number(schedule.schState) !== 1) {
      return
    }

    const start = timeToMinutes(schedule?.schHoSta)
    const end = timeToMinutes(schedule?.schHoEnd)

    if (start === null || end === null || start === end) return

    if (end > start) {
      result[day].push({
        day,
        startMinute: start,
        endMinute: end,
        schedule,
        continuesFromPrevious: false,
        continuesNext: false
      })

      return
    }

    // El horario cruza la medianoche.
    result[day].push({
      day,
      startMinute: start,
      endMinute: MINUTES_PER_DAY,
      schedule,
      continuesFromPrevious: false,
      continuesNext: true
    })

    const nextDay = (day + 1) % 7

    if (end > 0) {
      result[nextDay].push({
        day: nextDay,
        startMinute: 0,
        endMinute: end,
        schedule,
        continuesFromPrevious: true,
        continuesNext: false
      })
    }
  })

  Object.values(result).forEach((segments) => {
    segments.sort((a, b) => a.startMinute - b.startMinute)
  })

  return result
}

/**
 * Calcula la cantidad real de minutos abiertos.
 * Une los intervalos que se solapan para evitar contar dos veces el tiempo.
 */
export const getScheduleDaySummary = (
  segments: ScheduleSegment[]
): ScheduleDaySummary => {
  if (!segments.length) {
    return {
      totalMinutes: 0,
      isAllDay: false,
      isOpen: false,
      scheduleCount: 0,
      label: 'Cerrado'
    }
  }

  const sorted = [...segments].sort(
    (a, b) => a.startMinute - b.startMinute
  )

  let totalMinutes = 0
  let currentStart = sorted[0].startMinute
  let currentEnd = sorted[0].endMinute

  sorted.slice(1).forEach((segment) => {
    if (segment.startMinute <= currentEnd) {
      currentEnd = Math.max(currentEnd, segment.endMinute)
      return
    }

    totalMinutes += currentEnd - currentStart
    currentStart = segment.startMinute
    currentEnd = segment.endMinute
  })

  totalMinutes += currentEnd - currentStart

  const isAllDay = totalMinutes >= MINUTES_PER_DAY - 1

  return {
    totalMinutes,
    isAllDay,
    isOpen: true,
    scheduleCount: segments.length,
    label: isAllDay ? '24 horas' : `Abierto ${formatDuration(totalMinutes)}`
  }
}

export const formatCurrentTime = (date: Date): string => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`
}
