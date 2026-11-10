
/* =========================================
   PRODUCT AVAILABILITY
========================================= */

export interface AvailabilityRecordLike {
  dayAvailable?: number | string | null
  startDate?: string | null
  endDate?: string | null
  state?: number | string | null
}

export type AvailabilityStatus =
  | 'always'
  | 'available'
  | 'upcoming'
  | 'finished'
  | 'closed'

export interface AvailabilityPeriodView {
  startDate: string
  endDate: string
  label: string
  isAllDay: boolean
  isOvernight: boolean
}

export interface AvailabilityDayView {
  day: number
  name: string
  isToday: boolean
  hasAvailability: boolean
  periods: AvailabilityPeriodView[]
  summary: string
}

export interface ProductAvailabilityInfo {
  hasSchedule: boolean
  isAvailableNow: boolean
  isAvailableToday: boolean
  status: AvailabilityStatus
  badgeLabel: string
  message: string
  todayHours: string[]
  todayHoursText: string
  nextOpeningLabel: string | null
  currentPeriodLabel: string | null
  weeklySchedule: AvailabilityDayView[]
}

interface NormalizedAvailability {
  day: number
  start: number
  end: number
  isAllDay: boolean
  isOvernight: boolean
}

interface AvailabilityInterval {
  start: number
  end: number
  startDayOffset: number
  endDayOffset: number
  isAllDay: boolean
  isOvernight: boolean
}

const AVAILABILITY_DAY_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
]

const MINUTES_PER_DAY = 1440

const AVAILABILITY_TIME_PATTERN =
  /^([01]?\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/

/**
 * Convierte HH:mm o HH:mm:ss en minutos desde medianoche.
 */
export const availabilityTimeToMinutes = (
  time?: string | null
): number | null => {
  if (!time) return null

  const normalized = time.trim()
  const match = AVAILABILITY_TIME_PATTERN.exec(normalized)

  if (!match) return null

  const hours = Number(match[1])
  const minutes = Number(match[2])

  return hours * 60 + minutes
}

/**
 * Convierte minutos a HH:mm.
 */
export const formatAvailabilityTime = (minutes: number): string => {
  const normalized = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY)
    % MINUTES_PER_DAY

  const hours = Math.floor(normalized / 60)
  const remainingMinutes = normalized % 60

  return [
    String(hours).padStart(2, '0'),
    String(remainingMinutes).padStart(2, '0')
  ].join(':')
}

/**
 * Comprueba si el registro está activo.
 * Si state no existe, se considera activo para conservar
 * compatibilidad con los registros antiguos.
 */
const isActiveAvailabilityRecord = (
  record: AvailabilityRecordLike
): boolean => {
  if (record.state === undefined || record.state === null) {
    return true
  }

  return Number(record.state) === 1
}

/**
 * Normaliza los registros de disponibilidad.
 *
 * Reglas:
 * - dayAvailable: 0 domingo ... 6 sábado.
 * - startDate/endDate: HH:mm.
 * - Si falta una hora o es inválida, se interpreta como todo el día.
 * - start > end significa que el horario cruza la medianoche.
 */
const normalizeAvailabilityRecords = (
  records?: AvailabilityRecordLike[] | null
): NormalizedAvailability[] => {
  if (!Array.isArray(records)) return []

  return records
    .filter(isActiveAvailabilityRecord)
    .reduce<NormalizedAvailability[]>((result, record) => {
      const day = Number(record.dayAvailable)

      if (!Number.isInteger(day) || day < 0 || day > 6) {
        return result
      }

      const parsedStart = availabilityTimeToMinutes(record.startDate)
      const parsedEnd = availabilityTimeToMinutes(record.endDate)

      const isAllDay = parsedStart === null || parsedEnd === null

      const start = isAllDay ? 0 : parsedStart
      const end = isAllDay ? 1439 : parsedEnd

      result.push({
        day,
        start: start as number,
        end: end as number,
        isAllDay,
        isOvernight: !isAllDay && (start as number) > (end as number)
      })

      return result
    }, [])
}

/**
 * Devuelve las reglas activas de un día.
 */
const getDayAvailabilityPeriods = (
  records: NormalizedAvailability[],
  day: number
): AvailabilityPeriodView[] => {
  return records
    .filter(record => record.day === day)
    .sort((a, b) => a.start - b.start)
    .map(record => {
      let label: string

      if (record.isAllDay) {
        label = 'Todo el día'
      } else {
        label =
          `${formatAvailabilityTime(record.start)} – ` +
          `${formatAvailabilityTime(record.end)}`

        if (record.isOvernight) {
          label += ' (+1 día)'
        }
      }

      return {
        startDate: formatAvailabilityTime(record.start),
        endDate: formatAvailabilityTime(record.end),
        label,
        isAllDay: record.isAllDay,
        isOvernight: record.isOvernight
      }
    })
}

/**
 * Calcula las fechas relativas respecto al día actual.
 */
const getRelativeDayName = (
  dayOffset: number,
  now: Date
): string => {
  if (dayOffset < 0) return 'ayer'
  if (dayOffset === 0) return 'hoy'
  if (dayOffset === 1) return 'mañana'

  const day = (now.getDay() + dayOffset) % 7

  return AVAILABILITY_DAY_NAMES[day]
}

/**
 * Crea las ocurrencias de los horarios respecto al día actual.
 *
 * Se incluyen:
 * - El día anterior, para detectar horarios nocturnos.
 * - Hoy.
 * - Los próximos siete días, para encontrar la próxima apertura.
 */
const buildAvailabilityIntervals = (
  records: NormalizedAvailability[],
  today: number
): AvailabilityInterval[] => {
  const intervals: AvailabilityInterval[] = []

  for (let dayOffset = -1; dayOffset <= 7; dayOffset++) {
    const currentDay = (today + dayOffset + 7) % 7

    const dayRecords = records.filter(
      record => record.day === currentDay
    )

    dayRecords.forEach(record => {
      const start = dayOffset * MINUTES_PER_DAY + record.start

      let end = dayOffset * MINUTES_PER_DAY + record.end

      if (record.isOvernight) {
        end += MINUTES_PER_DAY
      }

      intervals.push({
        start,
        end,
        startDayOffset: dayOffset,
        endDayOffset: Math.floor(end / MINUTES_PER_DAY),
        isAllDay: record.isAllDay,
        isOvernight: record.isOvernight
      })
    })
  }

  return intervals.sort((a, b) => a.start - b.start)
}

/**
 * Genera el horario de toda la semana.
 */
const buildWeeklySchedule = (
  records: NormalizedAvailability[],
  today: number,
  alwaysAvailable = false
): AvailabilityDayView[] => {
  return AVAILABILITY_DAY_NAMES.map((name, day) => {
    const periods = alwaysAvailable
      ? [{
          startDate: '00:00',
          endDate: '23:59',
          label: 'Todo el día',
          isAllDay: true,
          isOvernight: false
        }]
      : getDayAvailabilityPeriods(records, day)

    return {
      day,
      name,
      isToday: day === today,
      hasAvailability: periods.length > 0,
      periods,
      summary: periods.length > 0
        ? periods.map(period => period.label).join(' · ')
        : 'No habilitado'
    }
  })
}

/**
 * Información completa sobre la disponibilidad actual del producto.
 *
 * IMPORTANTE:
 * - Sin horario configurado = siempre disponible.
 * - Solo se consideran registros activos.
 * - Soporta más de un horario por día.
 * - Soporta horarios nocturnos (22:00 - 02:00).
 * - Detecta horarios heredados del día anterior.
 */
export const getProductAvailabilityInfo = (
  records?: AvailabilityRecordLike[] | null,
  now: Date = new Date()
): ProductAvailabilityInfo => {
  const normalizedRecords = normalizeAvailabilityRecords(records)

  const today = now.getDay()

  const weeklySchedule = buildWeeklySchedule(
    normalizedRecords,
    today
  )

  /*
   * Sin horarios configurados:
   * el producto está disponible todo el tiempo.
   */
  if (normalizedRecords.length === 0) {
    return {
      hasSchedule: false,
      isAvailableNow: true,
      isAvailableToday: true,
      status: 'always',
      badgeLabel: 'Siempre disponible',
      message: 'Este producto no tiene restricciones de horario.',
      todayHours: ['Todo el día'],
      todayHoursText: 'Disponible las 24 horas.',
      nextOpeningLabel: null,
      currentPeriodLabel: 'Todo el día',
      weeklySchedule: buildWeeklySchedule(
        [],
        today,
        true
      )
    }
  }

  const currentMinutes =
    now.getHours() * 60 + now.getMinutes()

  const intervals = buildAvailabilityIntervals(
    normalizedRecords,
    today
  )

  /*
   * Un intervalo pertenece a hoy cuando se cruza con
   * el rango de minutos 0 - 1439 del día actual.
   */
  const todayIntervals = intervals.filter(interval => {
    return interval.start <= 1439 && interval.end >= 0
  })

  /*
   * Detecta si existe un intervalo activo en este momento.
   */
  const currentInterval = intervals.find(interval => {
    return (
      currentMinutes >= interval.start &&
      currentMinutes <= interval.end
    )
  })

  const isAvailableNow = currentInterval !== undefined
  const isAvailableToday = todayIntervals.length > 0

  /*
   * Horarios correspondientes al día actual.
   * También incluye la continuación de horarios nocturnos
   * que comenzaron ayer.
   */
  const todayHours = todayIntervals.map(interval => {
    if (interval.isAllDay && interval.startDayOffset === 0) {
      return 'Todo el día'
    }

    const start = Math.max(0, interval.start)
    const end = Math.min(1439, interval.end)

    let label =
      `${formatAvailabilityTime(start)} – ` +
      `${formatAvailabilityTime(end)}`

    if (interval.start < 0) {
      label += ' (desde ayer)'
    }

    if (interval.end > 1439) {
      label += ' (continúa mañana)'
    }

    return label
  })

  const uniqueTodayHours = [...new Set(todayHours)]

  const todayHoursText = uniqueTodayHours.length > 0
    ? uniqueTodayHours.join(' · ')
    : 'Hoy no tiene horario habilitado.'

  /*
   * Encuentra la próxima apertura.
   */
  const nextOpening = intervals.find(interval => {
    return interval.start > currentMinutes
  })

  let nextOpeningLabel: string | null = null

  if (nextOpening) {
    const nextDayOffset = Math.floor(
      nextOpening.start / MINUTES_PER_DAY
    )

    const nextTime = formatAvailabilityTime(
      nextOpening.start
    )

    nextOpeningLabel =
      `${getRelativeDayName(nextDayOffset, now)} ${nextTime}`
  }

  /*
   * Estado actual y mensaje descriptivo.
   */
  let status: AvailabilityStatus = 'closed'
  let badgeLabel = 'No disponible hoy'
  let message = 'Este producto no tiene horarios disponibles hoy.'
  let currentPeriodLabel: string | null = null

  if (isAvailableNow && currentInterval) {
    status = 'available'

    const endTime = formatAvailabilityTime(
      currentInterval.end
    )

    const endDayName = getRelativeDayName(
      currentInterval.endDayOffset,
      now
    )

    const startTime = formatAvailabilityTime(
      currentInterval.start
    )

    const startDayName = getRelativeDayName(
      currentInterval.startDayOffset,
      now
    )

    if (currentInterval.isAllDay) {
      badgeLabel = 'Disponible todo el día'
      currentPeriodLabel = 'Todo el día'

      message = 'El producto está disponible durante todo el día.'
    } else {
      badgeLabel = currentInterval.endDayOffset === 0
        ? `Abierto hasta ${endTime}`
        : `Abierto hasta ${endDayName} ${endTime}`

      currentPeriodLabel =
        `${startDayName} ${startTime} – ` +
        `${endDayName} ${endTime}`

      message =
        `El producto está disponible ahora. ` +
        `Este horario termina ${endDayName} a las ${endTime}.`
    }
  } else if (
    nextOpening &&
    Math.floor(nextOpening.start / MINUTES_PER_DAY) === 0
  ) {
    /*
     * Existe otra franja horaria más tarde hoy.
     */
    status = 'upcoming'

    const openingTime = formatAvailabilityTime(
      nextOpening.start
    )

    badgeLabel = `Abre ${openingTime}`

    message =
      `El producto no está disponible en este momento. ` +
      `Estará habilitado nuevamente hoy desde las ${openingTime}.`
  } else if (todayIntervals.length > 0) {
    /*
     * Ya pasaron todos los horarios de hoy.
     */
    status = 'finished'
    badgeLabel = 'Cerrado por hoy'

    message = 'El horario de disponibilidad de hoy ya terminó.'

    if (nextOpeningLabel) {
      message += ` Próxima apertura: ${nextOpeningLabel}.`
    }
  } else {
    status = 'closed'
    badgeLabel = 'No disponible hoy'

    message = 'Este producto no tiene horarios habilitados para hoy.'

    if (nextOpeningLabel) {
      message += ` Próxima apertura: ${nextOpeningLabel}.`
    }
  }

  return {
    hasSchedule: true,
    isAvailableNow,
    isAvailableToday,
    status,
    badgeLabel,
    message,
    todayHours: uniqueTodayHours,
    todayHoursText,
    nextOpeningLabel,
    currentPeriodLabel,
    weeklySchedule
  }
}

/**
 * Mantiene compatibilidad con los componentes anteriores.
 */
export const isProductAvailableNow = (
  records?: AvailabilityRecordLike[] | null,
  now: Date = new Date()
): boolean => {
  return getProductAvailabilityInfo(records, now).isAvailableNow
}

/**
 * Comprueba si tiene al menos un horario activo configurado.
 */
export const hasAvailabilitySchedule = (
  records?: AvailabilityRecordLike[] | null
): boolean => {
  return normalizeAvailabilityRecords(records).length > 0
}
