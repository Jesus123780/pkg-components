'use client'

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import type { JSX } from 'react'
import { createPortal } from 'react-dom'
import {
  compareValues,
  resolvePath,
  stableSort,
  type SortDirection
} from './orderColumn'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

export { Section } from './Section'

type ColumnJustify = 'flex-start' | 'flex-end' | 'center'

export type TableColumnDataType =
  | 'unknown'
  | 'text'
  | 'number'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'time'

export type TableDateFormat =
  | 'auto'
  | 'date'
  | 'dateTimeMinutes'
  | 'dateTimeSeconds'
  | 'dateTimeMilliseconds'
  | 'timeMinutes'
  | 'timeSeconds'
  | 'timeMilliseconds'
  | 'iso'

export interface TableTitleColumn {
  /**
   * ID estable recomendado.
   * Si no existe se usa key -> name -> índice.
   */
  id?: string
  name: string
  key?: string
  justify?: ColumnJustify
  width?: string

  /** Muestra los controles de ordenamiento. */
  arrow?: boolean

  /** Permite individualizar capacidades por columna. */
  sortable?: boolean
  draggable?: boolean
  resizable?: boolean

  /** Límites individuales opcionales. */
  minWidth?: number
  maxWidth?: number

  /**
   * Tipo explícito. Si no se informa, Table hace inferencia conservadora
   * a partir del nombre/key y de una muestra de valores.
   */
  dataType?: TableColumnDataType

  /**
   * Formato visual aplicado únicamente cuando se selecciona desde el menú
   * de la columna. `auto` deja el valor original intacto.
   */
  displayFormat?: TableDateFormat

  render?: () => JSX.Element | null
}

export interface TableSortChange {
  id: string
  key: string
  direction: SortDirection
}

export interface TableColumnFormatChange {
  id: string
  key?: string
  dataType: TableColumnDataType
  format: TableDateFormat
}

export interface TableProps {
  titles: TableTitleColumn[]
  bgRow?: string
  data?: any[]
  pointer?: boolean
  loading?: boolean
  header?: boolean
  checkbox?: boolean

  pagination?: {
    currentPage: number
    totalPages: number
    pageSize?: number
  }

  renderBody: (
    data: any[],
    titles: TableTitleColumn[],
    indexFirstElem: number
  ) => JSX.Element[]

  handleCheckedAll?: (check: boolean) => void

  /** Capacidades opcionales. */
  enableColumnDrag?: boolean
  enableKeyboardNav?: boolean
  enableColumnResize?: boolean
  enableColumnFormatting?: boolean
  autoDetectColumnTypes?: boolean
  multiColumnSort?: boolean

  /** Persistencia local opcional. */
  columnStorageKey?: string

  /** Hook del consumidor para guardar el layout en backend/context. */
  onColumnsChange?: (columns: TableTitleColumn[]) => void

  /** Hook del consumidor para observar el ordenamiento. */
  onSortChange?: (sort: TableSortChange[]) => void

  /** Hook específico para cambios de formato de columna. */
  onColumnFormatChange?: (
    change: TableColumnFormatChange
  ) => void

  /** Locale usado por Intl.DateTimeFormat al formatear fechas. */
  dateFormatLocale?: string

  /** Ancho global mínimo/máximo. */
  minColumnWidth?: number
  maxColumnWidth?: number

  /**
   * Mantiene compatibilidad con tu implementación actual:
   * renderBody genera hijos en el orden original de titles y Table los
   * reordena automáticamente al cambiar el orden de columnas.
   */
  reorderBodyChildren?: boolean
}

interface RuntimeColumn extends TableTitleColumn {
  id: string
}

interface DragState {
  pointerId: number
  columnId: string
  startIndex: number
  currentIndex: number
  startX: number
  startY: number
  pointerX: number
  pointerY: number
  grabOffsetX: number
  grabOffsetY: number
  started: boolean
  originalColumns: RuntimeColumn[]
  originalWidths: number[]
  dropSide: 'before' | 'after'
}

interface DragOverlayState {
  columnId: string
  width: number
  height: number
  top: number
  left: number
}

interface FormatMenuState {
  columnId: string
  top: number
  left: number
}

const DEFAULT_MIN_WIDTH = 72
const DEFAULT_MAX_WIDTH = 1000
const DRAG_THRESHOLD = 5
const DRAG_HYSTERESIS_PX = 9
const EDGE_SCROLL_ZONE = 76
const EDGE_SCROLL_MAX_SPEED = 26
const EDGE_SCROLL_FRICTION = 0.78
const DRAG_ANIMATION_MS = 250
const DROP_ANIMATION_MS = 300
const DRAG_LIFT_SCALE = 1.025
const DRAG_MAX_ROTATION = 2.25
const DRAG_ROTATION_SMOOTHING = 0.18
const DRAG_SCALE_SPEED_FACTOR = 0.0012
const TYPE_SAMPLE_SIZE = 40

const DATE_ONLY_RE =
  /^\d{4}-\d{2}-\d{2}$/

const DATETIME_RE =
  /^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}(?::?\d{2})?)?$/

const TIME_ONLY_RE =
  /^\d{1,2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?$/

const DATE_KEY_HINT_RE =
  /(date|fecha|time|hora|timestamp|created|updated|modified|finalized|completed|started|ended|at$|_at$)/i

const DATE_FORMATS: Array<{
  value: TableDateFormat
  label: string
  description: string
}> = [
  {
    value: 'auto',
    label: 'Automático',
    description: 'Conserva el valor original'
  },
  {
    value: 'date',
    label: 'Fecha',
    description: 'Solo año, mes y día'
  },
  {
    value: 'dateTimeMinutes',
    label: 'Fecha + hora',
    description: 'HH:MM'
  },
  {
    value: 'dateTimeSeconds',
    label: 'Fecha + hora + segundos',
    description: 'HH:MM:SS'
  },
  {
    value: 'dateTimeMilliseconds',
    label: 'Fecha + milisegundos',
    description: 'HH:MM:SS.MS'
  },
  {
    value: 'timeMinutes',
    label: 'Hora',
    description: 'HH:MM'
  },
  {
    value: 'timeSeconds',
    label: 'Hora + segundos',
    description: 'HH:MM:SS'
  },
  {
    value: 'timeMilliseconds',
    label: 'Hora + milisegundos',
    description: 'HH:MM:SS.MS'
  },
  {
    value: 'iso',
    label: 'ISO 8601',
    description: 'Valor completo ISO'
  }
]

const getColumnId = (
  column: TableTitleColumn,
  index: number
): string => {
  const raw = column.id ?? column.key ?? column.name

  if (raw && raw.trim()) {
    return raw
  }

  return `__column_${index}`
}

const clamp = (
  value: number,
  min: number,
  max: number
): number => Math.min(max, Math.max(min, value))

const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false

  return window.matchMedia?.(
    '(prefers-reduced-motion: reduce)'
  ).matches ?? false
}

const parseWidth = (
  width: string | undefined,
  containerWidth: number
): {
  type: 'px' | 'percent' | 'fr' | 'invalid'
  value: number
} => {
  const raw = (width ?? '1fr').trim().toLowerCase()

  if (raw.endsWith('px')) {
    return {
      type: 'px',
      value: Number.parseFloat(raw) || 0
    }
  }

  if (raw.endsWith('%')) {
    return {
      type: 'percent',
      value: Number.parseFloat(raw) || 0
    }
  }

  if (raw.endsWith('fr')) {
    return {
      type: 'fr',
      value: Number.parseFloat(raw) || 1
    }
  }

  const numberValue = Number.parseFloat(raw)

  if (Number.isFinite(numberValue) && numberValue > 0) {
    return {
      type: 'px',
      value: numberValue
    }
  }

  return {
    type: 'invalid',
    value: 1
  }
}

const cellKey = (row: number, col: number): string => {
  return `${row}:${col}`
}

const isValidDateFormat = (
  value: unknown
): value is TableDateFormat => {
  return DATE_FORMATS.some(
    format => format.value === value
  )
}

const isFiniteNumber = (value: unknown): value is number => {
  return (
    typeof value === 'number' &&
    Number.isFinite(value)
  )
}

const hasDateKeyHint = (
  column: TableTitleColumn
): boolean => {
  return DATE_KEY_HINT_RE.test(
    column.key ?? column.name
  )
}

const isEpochLike = (
  value: unknown
): boolean => {
  if (!isFiniteNumber(value)) return false

  const absolute = Math.abs(value)

  return (
    absolute >= 1_000_000_000 &&
    absolute <= 10_000_000_000_000_000
  )
}

const detectTemporalStringType = (
  value: string
): 'date' | 'datetime' | 'time' | null => {
  const trimmed = value.trim()

  if (!trimmed) return null

  if (DATE_ONLY_RE.test(trimmed)) {
    return 'date'
  }

  if (DATETIME_RE.test(trimmed)) {
    return 'datetime'
  }

  if (TIME_ONLY_RE.test(trimmed)) {
    return 'time'
  }

  return null
}

const inferColumnDataType = (
  column: TableTitleColumn,
  rows: any[]
): TableColumnDataType => {
  if (column.dataType && column.dataType !== 'unknown') {
    return column.dataType
  }

  if (!column.key || !Array.isArray(rows) || rows.length === 0) {
    return 'unknown'
  }

  const sample = rows
    .slice(0, TYPE_SAMPLE_SIZE)
    .map(row => resolvePath(row, column.key))
    .filter(value => value !== null && value !== undefined && value !== '')

  if (sample.length === 0) return 'unknown'

  const booleanRatio =
    sample.filter(value => typeof value === 'boolean').length /
    sample.length

  if (booleanRatio >= 0.8) {
    return 'boolean'
  }

  const numberRatio =
    sample.filter(value => isFiniteNumber(value)).length /
    sample.length

  if (numberRatio >= 0.8) {
    if (
      hasDateKeyHint(column) &&
      sample.filter(isEpochLike).length / sample.length >= 0.8
    ) {
      return 'datetime'
    }

    return 'number'
  }

  let dateCount = 0
  let datetimeCount = 0
  let timeCount = 0

  sample.forEach(value => {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      datetimeCount += 1
      return
    }

    if (typeof value !== 'string') return

    const detected = detectTemporalStringType(value)

    if (detected === 'date') dateCount += 1
    if (detected === 'datetime') datetimeCount += 1
    if (detected === 'time') timeCount += 1
  })

  const temporalRatio =
    (dateCount + datetimeCount + timeCount) /
    sample.length

  if (temporalRatio >= 0.8) {
    if (datetimeCount > 0) return 'datetime'
    if (dateCount > 0) return 'date'
    if (timeCount > 0) return 'time'
  }

  /**
   * Fallback conservador: para nombres claramente temporales aceptamos
   * valores Date o epoch incluso cuando la muestra es corta.
   */
  if (hasDateKeyHint(column)) {
    const hasTemporalValue = sample.some(value => {
      if (value instanceof Date) {
        return !Number.isNaN(value.getTime())
      }

      if (isEpochLike(value)) return true

      return (
        typeof value === 'string' &&
        detectTemporalStringType(value) !== null
      )
    })

    if (hasTemporalValue) {
      return 'datetime'
    }
  }

  return 'text'
}

const parseTemporalValue = (
  value: unknown
): Date | null => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? null
      : new Date(value.getTime())
  }

  if (isFiniteNumber(value) && isEpochLike(value)) {
    const milliseconds =
      Math.abs(value) < 100_000_000_000
        ? value * 1000
        : value

    const date = new Date(milliseconds)

    return Number.isNaN(date.getTime())
      ? null
      : date
  }

  if (typeof value !== 'string') return null

  const trimmed = value.trim()

  if (!trimmed) return null

  if (DATE_ONLY_RE.test(trimmed)) {
    const [year, month, day] = trimmed
      .split('-')
      .map(Number)

    const localDate = new Date(
      year,
      month - 1,
      day
    )

    return Number.isNaN(localDate.getTime())
      ? null
      : localDate
  }

  if (TIME_ONLY_RE.test(trimmed)) {
    const localDate = new Date()
    const [hour, minute, secondsPart] = trimmed.split(':')
    const [second, millisecondsPart] = (
      secondsPart ?? '0'
    ).split('.')

    localDate.setHours(
      Number(hour),
      Number(minute),
      Number(second),
      Number(
        `${millisecondsPart ?? '0'}`.padEnd(3, '0').slice(0, 3)
      )
    )

    return Number.isNaN(localDate.getTime())
      ? null
      : localDate
  }

  const date = new Date(trimmed)

  return Number.isNaN(date.getTime())
    ? null
    : date
}

const formatTemporalValue = (
  value: unknown,
  format: TableDateFormat,
  locale?: string
): unknown => {
  if (format === 'auto') return value

  const date = parseTemporalValue(value)

  if (!date) return value

  if (format === 'iso') {
    return date.toISOString()
  }

  const baseDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }

  const dateTimeMinutes: Intl.DateTimeFormatOptions = {
    ...baseDate,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }

  const dateTimeSeconds: Intl.DateTimeFormatOptions = {
    ...dateTimeMinutes,
    second: '2-digit'
  }

  const dateTimeMilliseconds: Intl.DateTimeFormatOptions = {
    ...dateTimeSeconds,
    fractionalSecondDigits: 3
  }

  const timeMinutes: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }

  const timeSeconds: Intl.DateTimeFormatOptions = {
    ...timeMinutes,
    second: '2-digit'
  }

  const timeMilliseconds: Intl.DateTimeFormatOptions = {
    ...timeSeconds,
    fractionalSecondDigits: 3
  }

  const optionsByFormat: Record<
  Exclude<TableDateFormat, 'auto' | 'iso'>,
  Intl.DateTimeFormatOptions
  > = {
    date: baseDate,
    dateTimeMinutes,
    dateTimeSeconds,
    dateTimeMilliseconds,
    timeMinutes,
    timeSeconds,
    timeMilliseconds
  }

  return new Intl.DateTimeFormat(
    locale,
    optionsByFormat[format]
  ).format(date)
}

const setPathValue = (
  source: any,
  path: string,
  value: unknown
): any => {
  const parts = path.split('.').filter(Boolean)

  if (parts.length === 0) return source

  const root = Array.isArray(source)
    ? source.slice()
    : { ...(source ?? {}) }

  let cursor = root

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      cursor[part] = value
      return
    }

    const next = cursor[part]

    cursor[part] = Array.isArray(next)
      ? next.slice()
      : { ...(next ?? {}) }

    cursor = cursor[part]
  })

  return root
}

const useIntersectionVisibility = (
  ref: React.RefObject<HTMLElement | null>
): boolean => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        setVisible(
          Boolean(entry?.isIntersecting) ||
          Boolean(entry?.intersectionRatio)
        )
      },
      {
        root: null,
        rootMargin: '240px 0px',
        threshold: [0, 0.01]
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref])

  return visible
}

export const TableCell: React.FC<{
  row: number
  col: number
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}> = ({
  row,
  col,
  children,
  className,
  style
}) => {
  return (
    <div
      className={`${styles.tableCell}${className ? ` ${className}` : ''}`}
      style={{
        outline: 'none',
        ...style
      }}
      data-table-cell={cellKey(row, col)}
      tabIndex={0}
      role='gridcell'
    >
      {children}
    </div>
  )
}

export const Table: React.FC<TableProps> = ({
  titles,
  bgRow,
  data = [],
  pointer = false,
  renderBody,
  header = true,
  enableColumnDrag = true,
  enableKeyboardNav = true,
  enableColumnResize = true,
  enableColumnFormatting = true,
  autoDetectColumnTypes = true,
  multiColumnSort = false,
  columnStorageKey,
  onColumnsChange,
  onSortChange,
  onColumnFormatChange,
  dateFormatLocale,
  minColumnWidth = DEFAULT_MIN_WIDTH,
  maxColumnWidth = DEFAULT_MAX_WIDTH,
  reorderBodyChildren = true,
  pagination
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const headerRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const formatMenuRef = useRef<HTMLDivElement | null>(null)
  const dragOverlayRef = useRef<HTMLDivElement | null>(null)

  const isResizingRef = useRef(false)
  const resizeRafRef = useRef<number | null>(null)
  const dragRafRef = useRef<number | null>(null)
  const autoScrollRafRef = useRef<number | null>(null)

  const [columns, setColumns] = useState<RuntimeColumn[]>(() => {
    return titles.map((column, index) => ({
      ...column,
      id: getColumnId(column, index)
    }))
  })

  const [columnWidthsPx, setColumnWidthsPx] = useState<number[]>([])
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [dragDropSide, setDragDropSide] = useState<'before' | 'after'>('after')
  const [isColumnDragging, setIsColumnDragging] = useState(false)
  const [isColumnResizing, setIsColumnResizing] = useState(false)

  const [sortState, setSortState] = useState<TableSortChange[]>([])
  const [dragOverlay, setDragOverlay] = useState<DragOverlayState | null>(null)
  const [formatMenu, setFormatMenu] = useState<FormatMenuState | null>(null)

  const dragStateRef = useRef<DragState | null>(null)
  const columnsRef = useRef<RuntimeColumn[]>(columns)
  const widthsRef = useRef<number[]>(columnWidthsPx)

  const pointerXRef = useRef(0)
  const pointerYRef = useRef(0)
  const autoScrollVelocityRef = useRef(0)
  const lastAutoScrollTimestampRef = useRef<number | null>(null)

  const initialisedWidthSignatureRef = useRef('')
  const hydratedStorageRef = useRef(false)
  const userResizedRef = useRef(false)
  const previousHeaderRectsRef = useRef<Map<string, DOMRect>>(new Map())
  const pendingFlipRef = useRef(false)
  const dropAnimationTimerRef = useRef<number | null>(null)
  const overlayRotationRef = useRef(0)
  const previousOverlayXRef = useRef<number | null>(null)
  const [isColumnDropSettling, setIsColumnDropSettling] = useState(false)

  useEffect(() => {
    columnsRef.current = columns
  }, [columns])

  useEffect(() => {
    widthsRef.current = columnWidthsPx
  }, [columnWidthsPx])

  const columnsSignature = useMemo(() => {
    return columns
      .map(column => column.id)
      .slice()
      .sort()
      .join('|')
  }, [columns])

  const currentColumnIds = useMemo(() => {
    return columns.map(column => column.id)
  }, [columns])

  /**
   * Sincroniza títulos externos sin destruir:
   * - orden actual
   * - widths actuales
   * - formato seleccionado
   */
  useEffect(() => {
    setColumns(previous => {
      const previousById = new Map(
        previous.map(column => [column.id, column])
      )

      const incoming = titles.map((title, index) => {
        const id = getColumnId(title, index)
        const previousColumn = previousById.get(id)

        return {
          ...(previousColumn ?? {}),
          ...title,
          id,
          width:
            previousColumn?.width ??
            title.width,
          displayFormat:
            title.displayFormat ??
            previousColumn?.displayFormat
        } satisfies RuntimeColumn
      })

      const incomingById = new Map(
        incoming.map(column => [column.id, column])
      )

      const incomingIds = new Set(
        incoming.map(column => column.id)
      )

      const preservedOrder = previous
        .map(column => incomingById.get(column.id))
        .filter(
          (column): column is RuntimeColumn =>
            Boolean(column) && incomingIds.has(column.id)
        )

      const newColumns = incoming.filter(
        column =>
          !previous.some(previousColumn => {
            return previousColumn.id === column.id
          })
      )

      const next = [...preservedOrder, ...newColumns]
      columnsRef.current = next
      return next
    })
  }, [titles])

  /**
   * IntersectionObserver:
   * evita medir constantemente una tabla que está muy lejos del viewport.
   */
  const tableVisible = useIntersectionVisibility(containerRef)

  const calculateInitialWidths = useCallback((): number[] => {
    const containerWidth =
      containerRef.current?.getBoundingClientRect().width ??
      960

    const fixed: number[] = new Array(columns.length).fill(0)
    const frWeights: number[] = new Array(columns.length).fill(0)

    let totalNonFr = 0
    let totalFr = 0

    columns.forEach((column, index) => {
      const parsed = parseWidth(
        column.width,
        containerWidth
      )

      if (parsed.type === 'fr') {
        frWeights[index] = parsed.value
        totalFr += parsed.value
        return
      }

      let width = parsed.value

      if (parsed.type === 'percent') {
        width = (parsed.value / 100) * containerWidth
      }

      width = clamp(
        width,
        Math.max(
          minColumnWidth,
          column.minWidth ?? minColumnWidth
        ),
        Math.min(
          maxColumnWidth,
          column.maxWidth ?? maxColumnWidth
        )
      )

      fixed[index] = width
      totalNonFr += width
    })

    const availableForFr = Math.max(
      0,
      containerWidth - totalNonFr
    )

    columns.forEach((column, index) => {
      if (frWeights[index] <= 0) return

      const allocated =
        totalFr > 0
          ? (frWeights[index] / totalFr) *
            availableForFr
          : availableForFr / Math.max(1, columns.length)

      fixed[index] = clamp(
        allocated,
        Math.max(
          minColumnWidth,
          column.minWidth ?? minColumnWidth
        ),
        Math.min(
          maxColumnWidth,
          column.maxWidth ?? maxColumnWidth
        )
      )
    })

    return fixed.map(value =>
      Math.max(minColumnWidth, Math.round(value))
    )
  }, [
    columns,
    maxColumnWidth,
    minColumnWidth
  ])

  /**
   * Inicialización/actualización de widths:
   * - primera medición => calcula px reales
   * - reorder => NO recalcula
   * - resize manual => NO pisa el ancho del usuario
   * - add/remove de columnas => vuelve a calcular
   */
  useEffect(() => {
    if (!tableVisible) return

    if (
      initialisedWidthSignatureRef.current === columnsSignature &&
      columnWidthsPx.length === columns.length
    ) {
      return
    }

    if (
      userResizedRef.current &&
      columnWidthsPx.length === columns.length
    ) {
      initialisedWidthSignatureRef.current = columnsSignature
      return
    }

    const nextWidths = calculateInitialWidths()

    widthsRef.current = nextWidths
    setColumnWidthsPx(nextWidths)
    initialisedWidthSignatureRef.current = columnsSignature
  }, [
    calculateInitialWidths,
    columnWidthsPx.length,
    columns.length,
    columnsSignature,
    tableVisible
  ])

  /**
   * FLIP dedicado a los reorders.
   * Capturamos la geometría antes del cambio de orden en `applyColumnMove`
   * y aquí solo hacemos la lectura posterior + la animación.
   * Esto evita depender de un rect anterior capturado en un render intermedio.
   */
  useLayoutEffect(() => {
    const nextRects = new Map<string, DOMRect>()

    headerRefs.current.forEach((element, id) => {
      nextRects.set(id, element.getBoundingClientRect())
    })

    const previousRects = previousHeaderRectsRef.current

    if (isColumnResizing) {
      previousHeaderRectsRef.current = nextRects
      pendingFlipRef.current = false
      return
    }

    if (!pendingFlipRef.current) {
      previousHeaderRectsRef.current = nextRects
      return
    }

    pendingFlipRef.current = false

    nextRects.forEach((nextRect, id) => {
      const previousRect = previousRects.get(id)
      const element = headerRefs.current.get(id)

      if (!previousRect || !element) return

      if (
        isColumnDragging &&
        dragStateRef.current?.columnId === id
      ) {
        return
      }

      const deltaX = previousRect.left - nextRect.left
      const deltaY = previousRect.top - nextRect.top

      if (
        Math.abs(deltaX) < 0.5 &&
        Math.abs(deltaY) < 0.5
      ) {
        return
      }

      element.style.transition = 'none'
      element.style.transform =
        `translate3d(${deltaX}px, ${deltaY}px, 0)`

      requestAnimationFrame(() => {
        if (!element.isConnected) return

        element.style.transition = shouldReduceMotion()
          ? 'none'
          : `transform ${DRAG_ANIMATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
        element.style.transform = ''

        window.setTimeout(() => {
          if (!element.isConnected) return
          element.style.transition = ''
        }, DRAG_ANIMATION_MS)
      })
    })

    previousHeaderRectsRef.current = nextRects
  }, [
    columns,
    isColumnDragging,
    isColumnResizing
  ])

  /** ResizeObserver moderno. */
  useEffect(() => {
    const element = containerRef.current

    if (!element) return
    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(() => {
      if (!tableVisible) return

      if (
        !userResizedRef.current &&
        columnWidthsPx.length === columns.length
      ) {
        const next = calculateInitialWidths()
        widthsRef.current = next
        setColumnWidthsPx(next)
      }
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [
    calculateInitialWidths,
    columnWidthsPx.length,
    columns.length,
    tableVisible
  ])

  /**
   * Restaura layout persistido.
   * Formato:
   * {
   *   order: string[],
   *   widths: Record<string, number>,
   *   formats?: Record<string, TableDateFormat>
   * }
   */
  useEffect(() => {
    if (!columnStorageKey || hydratedStorageRef.current) {
      return
    }

    hydratedStorageRef.current = true

    try {
      const raw = window.localStorage.getItem(
        columnStorageKey
      )

      if (!raw) return

      const saved = JSON.parse(raw) as {
        order?: string[]
        widths?: Record<string, number>
        formats?: Record<string, TableDateFormat>
      }

      if (!Array.isArray(saved.order) || !saved.widths) {
        return
      }

      const byId = new Map(
        columns.map(column => [column.id, column])
      )

      const restored = [
        ...saved.order
          .map(id => byId.get(id))
          .filter(
            (column): column is RuntimeColumn =>
              Boolean(column)
          ),
        ...columns.filter(
          column => !saved.order?.includes(column.id)
        )
      ]

      const restoredWithFormats = restored.map(column => {
        const savedFormat = saved.formats?.[column.id]

        return {
          ...column,
          displayFormat:
            isValidDateFormat(savedFormat)
              ? savedFormat
              : column.displayFormat
        }
      })

      const restoredWidths = restoredWithFormats.map(
        (column, index) => {
          const savedWidth = saved.widths?.[column.id]

          if (
            typeof savedWidth === 'number' &&
            Number.isFinite(savedWidth)
          ) {
            return clamp(
              savedWidth,
              Math.max(
                minColumnWidth,
                column.minWidth ?? minColumnWidth
              ),
              Math.min(
                maxColumnWidth,
                column.maxWidth ?? maxColumnWidth
              )
            )
          }

          return columnWidthsPx[index] ?? minColumnWidth
        }
      )

      columnsRef.current = restoredWithFormats
      widthsRef.current = restoredWidths
      setColumns(restoredWithFormats)
      setColumnWidthsPx(restoredWidths)
      userResizedRef.current = true
      initialisedWidthSignatureRef.current =
        restoredWithFormats
          .map(column => column.id)
          .slice()
          .sort()
          .join('|')
    } catch {
      // localStorage corrupto: no interrumpimos la tabla.
    }
  }, [
    columnStorageKey,
    columns,
    columnWidthsPx,
    maxColumnWidth,
    minColumnWidth
  ])

  const persistLayout = useCallback(
    (
      nextColumns: RuntimeColumn[],
      nextWidths: number[]
    ) => {
      const cleanWidths: Record<string, number> = {}
      const formats: Record<string, TableDateFormat> = {}

      nextColumns.forEach((column, index) => {
        cleanWidths[column.id] = Math.round(
          nextWidths[index] ?? 0
        )

        if (
          column.displayFormat &&
          column.displayFormat !== 'auto'
        ) {
          formats[column.id] = column.displayFormat
        }
      })

      const payload = {
        order: nextColumns.map(column => column.id),
        widths: cleanWidths,
        formats
      }

      if (columnStorageKey) {
        try {
          window.localStorage.setItem(
            columnStorageKey,
            JSON.stringify(payload)
          )
        } catch {
          // private mode/quota bloqueado: ignoramos.
        }
      }

      onColumnsChange?.(
        nextColumns.map(column => ({
          ...column,
          width:
            `${Math.round(
              cleanWidths[column.id] ?? 0
            )}px`
        }))
      )
    },
    [columnStorageKey, onColumnsChange]
  )

  const captureHeaderRects = useCallback(() => {
    const snapshot = new Map<string, DOMRect>()

    headerRefs.current.forEach((element, id) => {
      snapshot.set(id, element.getBoundingClientRect())
    })

    return snapshot
  }, [])

  /**
   * Movimiento genérico de columnas.
   * `persist=true` se usa para keyboard/drop final; durante hover no se
   * persiste para no llenar localStorage ni disparar callbacks decenas de
   * veces por segundo.
   */
  const applyColumnMove = useCallback(
    (
      fromIndex: number,
      toIndex: number,
      persist = false
    ): boolean => {
      const currentColumns = columnsRef.current
      const currentWidths = widthsRef.current

      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= currentColumns.length ||
        toIndex >= currentColumns.length
      ) {
        return false
      }

      const fromColumn = currentColumns[fromIndex]
      const targetColumn = currentColumns[toIndex]

      if (fromColumn?.draggable === false) return false
      if (targetColumn?.draggable === false) return false

      previousHeaderRectsRef.current = captureHeaderRects()
      pendingFlipRef.current = true

      const nextColumns = currentColumns.slice()
      const [movedColumn] = nextColumns.splice(fromIndex, 1)

      nextColumns.splice(toIndex, 0, movedColumn)

      const nextWidths = currentWidths.slice()
      const [movedWidth] = nextWidths.splice(fromIndex, 1)

      nextWidths.splice(toIndex, 0, movedWidth)

      columnsRef.current = nextColumns
      widthsRef.current = nextWidths

      setColumns(nextColumns)
      setColumnWidthsPx(nextWidths)

      if (dragStateRef.current?.started) {
        setDragOverIndex(toIndex)
      } else {
        setDragOverIndex(null)
      }

      if (persist) {
        persistLayout(nextColumns, nextWidths)
      }

      return true
    },
    [captureHeaderRects, persistLayout]
  )

  const getWidthLimits = useCallback(
    (index: number) => {
      const column = columnsRef.current[index]

      return {
        min: Math.max(
          minColumnWidth,
          column?.minWidth ?? minColumnWidth
        ),
        max: Math.min(
          maxColumnWidth,
          column?.maxWidth ?? maxColumnWidth
        )
      }
    },
    [
      maxColumnWidth,
      minColumnWidth
    ]
  )

  const commitResize = useCallback(
    (
      index: number,
      requestedLeft: number
    ) => {
      const leftLimits = getWidthLimits(index)
      const rightLimits = getWidthLimits(index + 1)

      const leftStart =
        widthsRef.current[index] ?? leftLimits.min
      const rightStart =
        widthsRef.current[index + 1] ?? rightLimits.min

      /** dx positivo: izquierda crece, derecha decrece. */
      const minDx = Math.max(
        leftLimits.min - leftStart,
        rightStart - rightLimits.max
      )

      const maxDx = Math.min(
        leftLimits.max - leftStart,
        rightStart - rightLimits.min
      )

      const rawDx = requestedLeft - leftStart

      const dx = clamp(rawDx, minDx, maxDx)

      const nextLeft = clamp(
        leftStart + dx,
        leftLimits.min,
        leftLimits.max
      )

      const nextRight = clamp(
        rightStart - dx,
        rightLimits.min,
        rightLimits.max
      )

      const next = widthsRef.current.slice()

      while (next.length < columnsRef.current.length) {
        next.push(minColumnWidth)
      }

      next[index] = Math.round(nextLeft)
      next[index + 1] = Math.round(nextRight)

      widthsRef.current = next
      setColumnWidthsPx(next)

      return {
        nextLeft: Math.round(nextLeft),
        nextRight: Math.round(nextRight)
      }
    },
    [getWidthLimits, minColumnWidth]
  )

  const handleResizeStart = useCallback(
    (
      event: React.PointerEvent<HTMLDivElement>,
      leftIndex: number
    ) => {
      if (!enableColumnResize) return
      if (leftIndex >= columnsRef.current.length - 1) return

      const leftColumn = columnsRef.current[leftIndex]
      const rightColumn = columnsRef.current[leftIndex + 1]

      if (leftColumn?.resizable === false) return
      if (rightColumn?.resizable === false) return

      event.preventDefault()
      event.stopPropagation()

      isResizingRef.current = true
      setIsColumnResizing(true)
      userResizedRef.current = true

      const startX = event.clientX
      const leftStart =
        widthsRef.current[leftIndex] ??
        getWidthLimits(leftIndex).min
      const rightStart =
        widthsRef.current[leftIndex + 1] ??
        getWidthLimits(leftIndex + 1).min

      const resizer = event.currentTarget
      resizer.setPointerCapture?.(event.pointerId)

      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'

      let latestX = startX

      const apply = () => {
        resizeRafRef.current = null

        if (!isResizingRef.current) return

        const currentDx = latestX - startX

        commitResize(
          leftIndex,
          leftStart + currentDx
        )
      }

      const onPointerMove = (moveEvent: PointerEvent) => {
        latestX = moveEvent.clientX

        if (resizeRafRef.current == null) {
          resizeRafRef.current = window.requestAnimationFrame(apply)
        }
      }

      const finish = () => {
        if (resizeRafRef.current != null) {
          window.cancelAnimationFrame(resizeRafRef.current)
          resizeRafRef.current = null
        }

        isResizingRef.current = false
        setIsColumnResizing(false)

        document.body.style.cursor = ''
        document.body.style.userSelect = ''

        const finalDx = latestX - startX
        const leftLimits = getWidthLimits(leftIndex)
        const rightLimits = getWidthLimits(leftIndex + 1)

        const leftFinal = clamp(
          leftStart + finalDx,
          leftLimits.min,
          leftLimits.max
        )

        const rightFinal = clamp(
          rightStart - finalDx,
          rightLimits.min,
          rightLimits.max
        )

        const finalWidths = widthsRef.current.slice()

        finalWidths[leftIndex] = Math.round(leftFinal)
        finalWidths[leftIndex + 1] = Math.round(rightFinal)

        const committedColumns = columnsRef.current.map(
          (column, index) => ({
            ...column,
            width:
              `${Math.round(
                finalWidths[index] ?? 0
              )}px`
          })
        )

        columnsRef.current = committedColumns
        widthsRef.current = finalWidths
        setColumnWidthsPx(finalWidths)
        setColumns(committedColumns)

        persistLayout(
          committedColumns,
          finalWidths
        )
      }

      const onPointerUp = () => {
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerup', onPointerUp)
        window.removeEventListener('pointercancel', onPointerUp)

        finish()
      }

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)
    },
    [
      commitResize,
      enableColumnResize,
      getWidthLimits,
      persistLayout
    ]
  )

  /**
   * React DnD-like sortable rule, pero horizontal:
   * solo reordenamos cuando el puntero cruza el 50% de la columna vecina.
   * Al mover, la propia columna fuente desaparece visualmente del grid y
   * se convierte en un placeholder mientras un overlay independiente sigue
   * al puntero.
   */
  const getAdjacentDragIndex = useCallback(
    (clientX: number): number | null => {
      const dragState = dragStateRef.current
      const currentColumns = columnsRef.current

      if (!dragState?.started) return null

      const currentIndex = currentColumns.findIndex(
        column => column.id === dragState.columnId
      )

      if (currentIndex < 0) return null

      dragState.currentIndex = currentIndex

      if (currentIndex > 0) {
        const previous = currentColumns[currentIndex - 1]
        const previousElement = previous
          ? headerRefs.current.get(previous.id)
          : null

        if (previousElement) {
          const rect = previousElement.getBoundingClientRect()
          const midpoint = rect.left + rect.width / 2

          if (clientX < midpoint - DRAG_HYSTERESIS_PX) {
            return currentIndex - 1
          }
        }
      }

      if (currentIndex < currentColumns.length - 1) {
        const next = currentColumns[currentIndex + 1]
        const nextElement = next
          ? headerRefs.current.get(next.id)
          : null

        if (nextElement) {
          const rect = nextElement.getBoundingClientRect()
          const midpoint = rect.left + rect.width / 2

          if (clientX > midpoint + DRAG_HYSTERESIS_PX) {
            return currentIndex + 1
          }
        }
      }

      return currentIndex
    },
    []
  )

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRafRef.current != null) {
      window.cancelAnimationFrame(autoScrollRafRef.current)
      autoScrollRafRef.current = null
    }

    autoScrollVelocityRef.current = 0
    lastAutoScrollTimestampRef.current = null
  }, [])

  /**
   * Autoscroll horizontal. La dirección/velocidad se calcula según la zona
   * del viewport donde se encuentre el puntero y se mantiene funcionando
   * aunque el puntero deje de disparar eventos por frame.
   */
  const runAutoScroll = useCallback(
    (timestamp: number) => {
      const viewport = scrollRef.current
      const dragState = dragStateRef.current

      if (!viewport || !dragState?.started) {
        stopAutoScroll()
        return
      }

      const rect = viewport.getBoundingClientRect()
      const x = pointerXRef.current

      let targetVelocity = 0

      if (x < rect.left + EDGE_SCROLL_ZONE) {
        const distance = clamp(
          rect.left + EDGE_SCROLL_ZONE - x,
          0,
          EDGE_SCROLL_ZONE
        )

        const normalized = distance / EDGE_SCROLL_ZONE

        targetVelocity =
          -EDGE_SCROLL_MAX_SPEED *
          normalized *
          normalized
      } else if (x > rect.right - EDGE_SCROLL_ZONE) {
        const distance = clamp(
          x - (rect.right - EDGE_SCROLL_ZONE),
          0,
          EDGE_SCROLL_ZONE
        )

        const normalized = distance / EDGE_SCROLL_ZONE

        targetVelocity =
          EDGE_SCROLL_MAX_SPEED *
          normalized *
          normalized
      }

      autoScrollVelocityRef.current =
        autoScrollVelocityRef.current * EDGE_SCROLL_FRICTION +
        targetVelocity * (1 - EDGE_SCROLL_FRICTION)

      const previous = lastAutoScrollTimestampRef.current
      const deltaMs = previous
        ? Math.min(32, timestamp - previous)
        : 16

      lastAutoScrollTimestampRef.current = timestamp

      viewport.scrollLeft +=
        autoScrollVelocityRef.current *
        (deltaMs / 16)

      const nextIndex = getAdjacentDragIndex(pointerXRef.current)
      const currentIndex = dragState.currentIndex

      if (
        nextIndex != null &&
        currentIndex >= 0 &&
        nextIndex !== currentIndex
      ) {
        const moved = applyColumnMove(
          currentIndex,
          nextIndex,
          false
        )

        if (moved) {
          dragState.currentIndex = nextIndex
          dragState.dropSide =
            nextIndex < currentIndex
              ? 'before'
              : 'after'
          setDragOverIndex(nextIndex)
          setDragDropSide(dragState.dropSide)
        }
      }

      autoScrollRafRef.current =
        window.requestAnimationFrame(runAutoScroll)
    },
    [
      applyColumnMove,
      getAdjacentDragIndex,
      stopAutoScroll
    ]
  )

  const clearDragVisuals = useCallback(() => {
    if (dragRafRef.current != null) {
      window.cancelAnimationFrame(dragRafRef.current)
      dragRafRef.current = null
    }

    if (dropAnimationTimerRef.current != null) {
      window.clearTimeout(dropAnimationTimerRef.current)
      dropAnimationTimerRef.current = null
    }

    setDragOverIndex(null)
    setDragDropSide('after')
    setIsColumnDragging(false)
    setIsColumnDropSettling(false)
    setDragOverlay(null)

    dragStateRef.current = null
    pointerXRef.current = 0
    pointerYRef.current = 0
    previousOverlayXRef.current = null
    overlayRotationRef.current = 0

    stopAutoScroll()
  }, [stopAutoScroll])

  const finishDrag = useCallback(
    (cancel = false) => {
      const dragState = dragStateRef.current

      if (!dragState) {
        clearDragVisuals()
        return
      }

      const wasStarted = dragState.started
      const moved =
        dragState.currentIndex !== dragState.startIndex

      if (!wasStarted) {
        clearDragVisuals()
        return
      }

      const overlay = dragOverlayRef.current

      if (!overlay) {
        clearDragVisuals()
        requestAnimationFrame(() => {
          headerRefs.current.get(dragState.columnId)?.focus()
        })
        return
      }

      stopAutoScroll()

      const motionDuration = shouldReduceMotion()
        ? 0
        : DROP_ANIMATION_MS

      if (cancel) {
        /**
         * Restauramos el layout lógico, pero mantenemos el overlay vivo.
         * En el siguiente frame medimos su posición original y lo hacemos
         * aterrizar allí; de esta forma Escape también tiene continuidad visual.
         */
        previousHeaderRectsRef.current = captureHeaderRects()
        pendingFlipRef.current = true

        columnsRef.current = dragState.originalColumns
        widthsRef.current = dragState.originalWidths
        setColumns(dragState.originalColumns)
        setColumnWidthsPx(dragState.originalWidths)
        setDragOverIndex(null)
        setDragDropSide('after')

        requestAnimationFrame(() => {
          const target = headerRefs.current.get(dragState.columnId)
          const currentOverlay = dragOverlayRef.current

          if (!target || !currentOverlay) {
            clearDragVisuals()
            return
          }

          const targetRect = target.getBoundingClientRect()

          currentOverlay.style.transition =
            motionDuration === 0
              ? 'none'
              : `transform ${Math.max(0, motionDuration - 30)}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${Math.max(0, motionDuration - 30)}ms ease`
          currentOverlay.style.transform =
            `translate3d(${targetRect.left}px, ${targetRect.top}px, 0) rotate(0deg) scale(0.995)`
          currentOverlay.style.opacity = '0.18'

          const finishCancel = () => {
            clearDragVisuals()

            requestAnimationFrame(() => {
              headerRefs.current.get(dragState.columnId)?.focus()
            })
          }

          if (motionDuration === 0) {
            finishCancel()
          } else {
            dropAnimationTimerRef.current = window.setTimeout(
              finishCancel,
              motionDuration
            )
          }
        })

        return
      }

      if (moved) {
        persistLayout(
          columnsRef.current,
          widthsRef.current
        )
      }

      /**
       * Landing continuo: revelamos la cabecera real en el mismo punto donde
       * llegará el overlay y cruzamos ambos visuales en lugar de “apagarlos”.
       */
      setIsColumnDropSettling(true)

      requestAnimationFrame(() => {
        const currentState = dragStateRef.current
        const target = headerRefs.current.get(dragState.columnId)
        const currentOverlay = dragOverlayRef.current

        if (!currentState || !currentOverlay || !target) {
          clearDragVisuals()
          return
        }

        const targetRect = target.getBoundingClientRect()
        const targetTransform =
          `translate3d(${targetRect.left}px, ${targetRect.top}px, 0) rotate(0deg) scale(0.995)`

        currentOverlay.style.transition =
          motionDuration === 0
            ? 'none'
            : `transform ${motionDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${motionDuration}ms ease, box-shadow ${motionDuration}ms ease`
        currentOverlay.style.transform = targetTransform
        currentOverlay.style.opacity = '0'
        currentOverlay.style.boxShadow =
          '0 8px 22px rgba(0, 0, 0, 0.08)'

        const finishDrop = () => {
          const focusedId = currentState.currentIndex >= 0
            ? columnsRef.current[currentState.currentIndex]?.id ?? dragState.columnId
            : dragState.columnId

          clearDragVisuals()

          requestAnimationFrame(() => {
            headerRefs.current.get(focusedId)?.focus()
          })
        }

        if (motionDuration === 0) {
          finishDrop()
        } else {
          dropAnimationTimerRef.current = window.setTimeout(
            finishDrop,
            motionDuration + 28
          )
        }
      })
    },
    [
      captureHeaderRects,
      clearDragVisuals,
      persistLayout,
      stopAutoScroll
    ]
  )

  const handleHeaderPointerDown = useCallback(
    (
      event: React.PointerEvent<HTMLDivElement>,
      index: number
    ) => {
      if (!enableColumnDrag) return

      const target = event.target as HTMLElement | null

      if (
        target?.closest(
          'button, input, textarea, select, option, a, [data-table-drag-ignore], [data-table-resize]'
        )
      ) {
        return
      }

      const column = columnsRef.current[index]

      if (!column || column.draggable === false) return

      const source = headerRefs.current.get(column.id)

      if (!source) return

      event.preventDefault()

      const rect = source.getBoundingClientRect()

      dragStateRef.current = {
        pointerId: event.pointerId,
        columnId: column.id,
        startIndex: index,
        currentIndex: index,
        startX: event.clientX,
        startY: event.clientY,
        pointerX: event.clientX,
        pointerY: event.clientY,
        grabOffsetX: event.clientX - rect.left,
        grabOffsetY: event.clientY - rect.top,
        started: false,
        originalColumns: columnsRef.current.slice(),
        originalWidths: widthsRef.current.slice(),
        dropSide: 'after'
      }

      pointerXRef.current = event.clientX
      pointerYRef.current = event.clientY
      previousOverlayXRef.current = event.clientX
      overlayRotationRef.current = 1.25
      setDragDropSide('after')

      event.currentTarget.setPointerCapture?.(event.pointerId)
    },
    [enableColumnDrag]
  )

  const startDragIfNeeded = useCallback(() => {
    const dragState = dragStateRef.current

    if (!dragState || dragState.started) return

    dragState.started = true

    setIsColumnDragging(true)
    setDragOverIndex(dragState.currentIndex)
    setDragDropSide('after')

    const source = headerRefs.current.get(dragState.columnId)

    if (source) {
      const rect = source.getBoundingClientRect()

      setDragOverlay({
        columnId: dragState.columnId,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      })

      source.style.setProperty('--drag-origin-width', `${rect.width}px`)
    }

    if (autoScrollRafRef.current == null) {
      autoScrollRafRef.current =
        window.requestAnimationFrame(runAutoScroll)
    }
  }, [runAutoScroll])

  const updateDragOverlay = useCallback(() => {
    const dragState = dragStateRef.current
    const overlay = dragOverlayRef.current

    if (!dragState?.started || !overlay) return

    const left =
      pointerXRef.current - dragState.grabOffsetX
    const top =
      pointerYRef.current - dragState.grabOffsetY

    const previousX = previousOverlayXRef.current
    const deltaX = previousX == null
      ? 0
      : pointerXRef.current - previousX

    previousOverlayXRef.current = pointerXRef.current

    const targetRotation = clamp(
      deltaX * 0.045,
      -DRAG_MAX_ROTATION,
      DRAG_MAX_ROTATION
    )

    overlayRotationRef.current +=
      (targetRotation - overlayRotationRef.current) *
      DRAG_ROTATION_SMOOTHING

    const speedBoost = clamp(
      Math.abs(deltaX) * DRAG_SCALE_SPEED_FACTOR,
      0,
      0.008
    )

    overlay.style.transform =
      `translate3d(${left}px, ${top}px, 0) rotate(${overlayRotationRef.current}deg) scale(${DRAG_LIFT_SCALE + speedBoost})`
  }, [])

  const processDragFrame = useCallback(() => {
    dragRafRef.current = null

    const dragState = dragStateRef.current

    if (!dragState) return

    if (!dragState.started) {
      startDragIfNeeded()
    }

    if (!dragState.started) return

    updateDragOverlay()

    const currentIndex = dragState.currentIndex
    const nextIndex = getAdjacentDragIndex(pointerXRef.current)

    if (
      nextIndex != null &&
      nextIndex !== currentIndex
    ) {
      const moved = applyColumnMove(
        currentIndex,
        nextIndex,
        false
      )

      if (moved) {
        dragState.currentIndex = nextIndex
        dragState.dropSide =
          nextIndex < currentIndex
            ? 'before'
            : 'after'
        setDragOverIndex(nextIndex)
        setDragDropSide(dragState.dropSide)
      }
    }
  }, [
    applyColumnMove,
    getAdjacentDragIndex,
    startDragIfNeeded,
    updateDragOverlay
  ])

  const handleHeaderPointerMove = useCallback(
    (
      event: React.PointerEvent<HTMLDivElement>
    ) => {
      const dragState = dragStateRef.current

      if (
        !dragState ||
        dragState.pointerId !== event.pointerId
      ) {
        return
      }

      dragState.pointerX = event.clientX
      dragState.pointerY = event.clientY
      pointerXRef.current = event.clientX
      pointerYRef.current = event.clientY

      if (
        !dragState.started &&
        Math.hypot(
          event.clientX - dragState.startX,
          event.clientY - dragState.startY
        ) < DRAG_THRESHOLD
      ) {
        return
      }

      if (dragRafRef.current == null) {
        dragRafRef.current =
          window.requestAnimationFrame(processDragFrame)
      }
    },
    [processDragFrame]
  )

  const handleHeaderPointerUp = useCallback(() => {
    finishDrag(false)
  }, [finishDrag])

  useEffect(() => {
    if (!isColumnDragging) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        finishDrag(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [finishDrag, isColumnDragging])

  useEffect(() => {
    return () => {
      if (resizeRafRef.current != null) {
        window.cancelAnimationFrame(resizeRafRef.current)
      }

      if (dragRafRef.current != null) {
        window.cancelAnimationFrame(dragRafRef.current)
      }

      if (dropAnimationTimerRef.current != null) {
        window.clearTimeout(dropAnimationTimerRef.current)
      }

      stopAutoScroll()
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [stopAutoScroll])

  const setSortDirection = useCallback(
    (
      column: RuntimeColumn,
      direction: SortDirection,
      shiftPressed = false
    ) => {
      if (
        !column.key ||
        (
          column.sortable === false &&
          column.arrow !== true
        )
      ) {
        return
      }

      const nextItem: TableSortChange = {
        id: column.id,
        key: column.key,
        direction
      }

      setSortState(previous => {
        if (!multiColumnSort || !shiftPressed) {
          return [nextItem]
        }

        const withoutCurrent = previous.filter(
          item => item.id !== column.id
        )

        return [...withoutCurrent, nextItem]
      })
    },
    [multiColumnSort]
  )

  const toggleSort = useCallback(
    (
      column: RuntimeColumn,
      shiftPressed = false
    ) => {
      if (!column.key) return

      const current = sortState.find(
        item => item.id === column.id
      )

      if (!current) {
        setSortDirection(column, 0, shiftPressed)
        return
      }

      if (current.direction === 0) {
        setSortDirection(column, 1, shiftPressed)
        return
      }

      setSortState(previous =>
        previous.filter(item => item.id !== column.id)
      )
    },
    [
      setSortDirection,
      sortState
    ]
  )

  useEffect(() => {
    onSortChange?.(
      sortState.map(item => ({
        ...item
      }))
    )
  }, [onSortChange, sortState])

  const comparator = useMemo(() => {
    if (sortState.length === 0) return null

    return (first: any, second: any): number => {
      for (const descriptor of sortState) {
        const result = compareValues(
          resolvePath(first, descriptor.key),
          resolvePath(second, descriptor.key),
          descriptor.direction
        )

        if (result !== 0) return result
      }

      return 0
    }
  }, [sortState])

  const currentPage = pagination?.currentPage ?? 1
  const pageSize = pagination?.pageSize ?? 100

  const indexFirstElem = Math.max(
    0,
    (currentPage - 1) * pageSize
  )

  const indexLastElem = Math.min(
    data.length,
    indexFirstElem + pageSize
  )

  const processed = useMemo(() => {
    const source = Array.isArray(data)
      ? data.slice()
      : []

    if (!comparator) {
      return source.slice(
        indexFirstElem,
        indexLastElem
      )
    }

    return stableSort(source, comparator).slice(
      indexFirstElem,
      indexLastElem
    )
  }, [
    comparator,
    data,
    indexFirstElem,
    indexLastElem
  ])

  /**
   * El tipo se infiere sin almacenarlo en el estado, así cambia con nuevos
   * datos aunque titles siga siendo el mismo array.
   */
  const effectiveColumns = useMemo(() => {
    return columns.map((column, index) => ({
      ...column,
      dataType:
        autoDetectColumnTypes
          ? inferColumnDataType(column, data)
          : column.dataType ?? 'unknown',
      width:
        columnWidthsPx.length === columns.length
          ? `${Math.round(
              columnWidthsPx[index] ?? minColumnWidth
            )}px`
          : column.width ?? '1fr'
    }))
  }, [
    autoDetectColumnTypes,
    columnWidthsPx,
    columns,
    data,
    minColumnWidth
  ])

  const formattedProcessed = useMemo(() => {
    if (!enableColumnFormatting) return processed

    const columnsWithFormat = effectiveColumns.filter(
      column =>
        Boolean(column.key) &&
        (
          column.dataType === 'date' ||
          column.dataType === 'datetime' ||
          column.dataType === 'time'
        ) &&
        Boolean(column.displayFormat) &&
        column.displayFormat !== 'auto'
    )

    if (columnsWithFormat.length === 0) {
      return processed
    }

    return processed.map(row => {
      let nextRow = row

      columnsWithFormat.forEach(column => {
        const key = column.key!
        const rawValue = resolvePath(row, key)
        const formattedValue = formatTemporalValue(
          rawValue,
          column.displayFormat!,
          dateFormatLocale
        )

        if (formattedValue !== rawValue) {
          nextRow = setPathValue(
            nextRow,
            key,
            formattedValue
          )
        }
      })

      return nextRow
    })
  }, [
    dateFormatLocale,
    effectiveColumns,
    enableColumnFormatting,
    processed
  ])

  const gridTemplateColumns = useMemo(() => {
    if (columnWidthsPx.length !== columns.length) {
      return columns
        .map(column => column.width ?? '1fr')
        .join(' ')
    }

    return columnWidthsPx
      .map(width =>
        `${Math.max(
          minColumnWidth,
          Math.round(width)
        )}px`
      )
      .join(' ')
  }, [
    columnWidthsPx,
    columns,
    minColumnWidth
  ])

  const tableWidth = useMemo(() => {
    if (columnWidthsPx.length !== columns.length) {
      return undefined
    }

    return Math.max(
      0,
      columnWidthsPx.reduce(
        (total, width) =>
          total +
          Math.max(
            minColumnWidth,
            width
          ),
        0
      )
    )
  }, [
    columnWidthsPx,
    columns.length,
    minColumnWidth
  ])

  /**
   * Reordena los hijos legacy del renderBody.
   */
  const renderedBody = useMemo(() => {
    const result = renderBody(
      formattedProcessed,
      effectiveColumns,
      indexFirstElem
    )

    if (
      !reorderBodyChildren ||
      result.length === 0
    ) {
      return result
    }

    const originalIds = titles.map(
      (title, index) =>
        getColumnId(title, index)
    )

    if (originalIds.length !== columns.length) {
      return result
    }

    const originalIndexById = new Map(
      originalIds.map((id, index) => [id, index])
    )

    return result.map(
      (rowElement, rowIndex) => {
        const childArray =
          React.Children.toArray(
            rowElement.props.children
          )

        if (childArray.length !== originalIds.length) {
          return rowElement
        }

        const orderedChildren = currentColumnIds
          .map(
            id =>
              childArray[
                originalIndexById.get(id) ?? -1
              ]
          )
          .filter(child => child !== undefined)

        if (orderedChildren.length !== childArray.length) {
          return rowElement
        }

        return React.cloneElement(
          rowElement,
          {
            key:
              rowElement.key ??
              `table-row-${rowIndex}`
          },
          orderedChildren
        )
      }
    )
  }, [
    columns.length,
    currentColumnIds,
    effectiveColumns,
    formattedProcessed,
    indexFirstElem,
    renderBody,
    reorderBodyChildren,
    titles
  ])

  const focusHeader = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= columnsRef.current.length
      ) {
        return
      }

      const id = columnsRef.current[index]?.id

      if (!id) return

      requestAnimationFrame(() => {
        headerRefs.current.get(id)?.focus()
      })
    },
    []
  )

  const handleHeaderKeyDown = useCallback(
    (
      event: React.KeyboardEvent<HTMLDivElement>,
      index: number
    ) => {
      if (!enableKeyboardNav) return

      const column = columnsRef.current[index]

      if (!column) return

      /** Alt/Cmd+Arrow: reordena columna. */
      if (
        (event.altKey || event.metaKey) &&
        !event.shiftKey &&
        event.key === 'ArrowLeft'
      ) {
        event.preventDefault()
        applyColumnMove(index, index - 1, true)
        focusHeader(Math.max(0, index - 1))
        return
      }

      if (
        (event.altKey || event.metaKey) &&
        !event.shiftKey &&
        event.key === 'ArrowRight'
      ) {
        event.preventDefault()
        applyColumnMove(
          index,
          Math.min(
            columnsRef.current.length - 1,
            index + 1
          ),
          true
        )
        focusHeader(
          Math.min(
            columnsRef.current.length - 1,
            index + 1
          )
        )
        return
      }

      /** Shift+Alt/Cmd+Arrow: resize desde teclado. */
      if (
        (event.altKey || event.metaKey) &&
        event.shiftKey &&
        (
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight'
        )
      ) {
        event.preventDefault()

        const delta =
          event.key === 'ArrowLeft'
            ? -12
            : 12

        const next = widthsRef.current.slice()
        const current = next[index] ?? minColumnWidth
        const limits = getWidthLimits(index)

        next[index] = clamp(
          current + delta,
          limits.min,
          limits.max
        )

        if (index < next.length - 1) {
          const neighbor =
            next[index + 1] ?? minColumnWidth
          const neighborLimits = getWidthLimits(index + 1)
          const actualDelta = next[index] - current

          next[index + 1] = clamp(
            neighbor - actualDelta,
            neighborLimits.min,
            neighborLimits.max
          )
        }

        userResizedRef.current = true
        widthsRef.current = next
        setColumnWidthsPx(next)

        const nextColumns = columnsRef.current.map(
          (item, columnIndex) => ({
            ...item,
            width:
              `${Math.round(
                next[columnIndex] ?? minColumnWidth
              )}px`
          })
        )

        columnsRef.current = nextColumns
        setColumns(nextColumns)
        persistLayout(nextColumns, next)
        return
      }

      /** Flechas normales: mover foco por cabeceras. */
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        focusHeader(Math.max(0, index - 1))
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        focusHeader(
          Math.min(
            columnsRef.current.length - 1,
            index + 1
          )
        )
        return
      }

      /** Enter/Space: ordena si hay key. */
      if (
        (event.key === 'Enter' || event.key === ' ') &&
        column.key
      ) {
        event.preventDefault()
        toggleSort(column, event.shiftKey)
      }
    },
    [
      applyColumnMove,
      enableKeyboardNav,
      focusHeader,
      getWidthLimits,
      minColumnWidth,
      persistLayout,
      toggleSort
    ]
  )

  const handleTableKeyDown = useCallback(
    (
      event: React.KeyboardEvent<HTMLDivElement>
    ) => {
      if (!enableKeyboardNav) return

      const target = event.target as HTMLElement | null
      const cell = target?.closest('[data-table-cell]') as HTMLElement | null

      if (!cell) return

      const attr = cell.getAttribute('data-table-cell')
      if (!attr) return

      const [rowString, columnString] = attr.split(':')
      const row = Number.parseInt(rowString, 10)
      const column = Number.parseInt(columnString, 10)

      if (!Number.isFinite(row) || !Number.isFinite(column)) {
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()

        const next =
          containerRef.current?.querySelector(
            `[data-table-cell='${cellKey(
              row,
              Math.max(0, column - 1)
            )}']`
          ) as HTMLElement | null

        next?.focus()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()

        const next =
          containerRef.current?.querySelector(
            `[data-table-cell='${cellKey(
              row,
              Math.min(
                columnsRef.current.length - 1,
                column + 1
              )
            )}']`
          ) as HTMLElement | null

        next?.focus()
      }
    },
    [enableKeyboardNav]
  )

  const openFormatMenu = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      columnId: string
    ) => {
      event.preventDefault()
      event.stopPropagation()

      const rect = event.currentTarget.getBoundingClientRect()
      const menuWidth = 248
      const margin = 8

      setFormatMenu({
        columnId,
        top: rect.bottom + 8,
        left: Math.min(
          rect.left,
          Math.max(
            margin,
            window.innerWidth - menuWidth - margin
          )
        )
      })
    },
    []
  )

  const setColumnFormat = useCallback(
    (
      column: RuntimeColumn,
      format: TableDateFormat
    ) => {
      if (!column.key) return

      const nextColumns = columnsRef.current.map(item =>
        item.id === column.id
          ? {
              ...item,
              displayFormat: format
            }
          : item
      )

      columnsRef.current = nextColumns
      setColumns(nextColumns)
      setFormatMenu(null)

      const dataType =
        column.dataType && column.dataType !== 'unknown'
          ? column.dataType
          : inferColumnDataType(column, data)

      onColumnFormatChange?.({
        id: column.id,
        key: column.key,
        dataType,
        format
      })

      persistLayout(
        nextColumns,
        widthsRef.current
      )
    },
    [
      data,
      onColumnFormatChange,
      persistLayout
    ]
  )

  useEffect(() => {
    if (!formatMenu) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null

      if (
        target &&
        formatMenuRef.current?.contains(target)
      ) {
        return
      }

      setFormatMenu(null)
    }

    const onScroll = () => setFormatMenu(null)
    const onResize = () => setFormatMenu(null)

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  }, [formatMenu])

  useEffect(() => {
    if (!dragOverlay) return

    requestAnimationFrame(() => {
      const dragState = dragStateRef.current
      const overlay = dragOverlayRef.current

      if (!dragState || !overlay) return

      const left =
        pointerXRef.current - dragState.grabOffsetX
      const top =
        pointerYRef.current - dragState.grabOffsetY

      overlay.style.transform =
        `translate3d(${left}px, ${top}px, 0) rotate(0deg) scale(${DRAG_LIFT_SCALE})`
    })
  }, [dragOverlay])

  const activeFormatColumn = formatMenu
    ? effectiveColumns.find(
      column => column.id === formatMenu.columnId
    )
    : null

  const activeDragColumn = dragOverlay
    ? columns.find(
      column => column.id === dragOverlay.columnId
    )
    : null

  const renderFormatMenu = () => {
    if (
      !formatMenu ||
      !activeFormatColumn ||
      !document?.body
    ) {
      return null
    }

    const currentFormat =
      activeFormatColumn.displayFormat ?? 'auto'

    return createPortal(
      <div
        ref={formatMenuRef}
        className={styles.formatMenu}
        style={{
          top: formatMenu.top,
          left: formatMenu.left,
          zIndex: getGlobalStyle('--z-index-high')
        }}

        role='menu'
        aria-label={`Formato de ${activeFormatColumn.name}`}
        data-table-drag-ignore
        onPointerDown={event => {
          event.stopPropagation()
        }}
      >
        <div className={styles.formatMenuHeader}>
          <strong>Formato</strong>
          <span>{activeFormatColumn.name}</span>
        </div>

        <div className={styles.formatMenuOptions}>
          {DATE_FORMATS.map(option => {
            const selected = currentFormat === option.value

            return (
              <button
                key={option.value}
                type='button'
                role='menuitemradio'
                aria-checked={selected}
                className={`${styles.formatMenuOption}${
                  selected
                    ? ` ${styles.formatMenuOptionActive}`
                    : ''
                }`}
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  setColumnFormat(
                    activeFormatColumn,
                    option.value
                  )
                }}
              >
                <span className={styles.formatMenuOptionText}>
                  <span>{option.label}</span>
                  <small>{option.description}</small>
                </span>
                {selected && (
                  <span
                    className={styles.formatMenuCheck}
                    aria-hidden='true'
                  >
                    <Icon
                    icon='IconMiniCheck'
                    color={getGlobalStyle('--color-icons-primary')}
                    size={15}
                     />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>,
      document.body
    )
  }

  return (
    <div
      className={[
        styles.tableOuter,
        isColumnDragging
          ? styles.columnDragging
          : '',
        isColumnResizing
          ? styles.columnResizing
          : ''
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        ref={scrollRef}
        className={styles.tableInner}
      >
        <div
          ref={containerRef}
          className={styles.tableCanvas}
          onKeyDown={handleTableKeyDown}
          role='grid'
          aria-colcount={columns.length}
          style={{
            width:
              tableWidth != null
                ? `${tableWidth}px`
                : '100%',
            minWidth: '100%',
            '--table-grid-template':
              gridTemplateColumns
          } satisfies React.CSSProperties & {
            '--table-grid-template': string
          }}
        >
          {header && (
            <div
              className={`${styles.headerRow} ${styles.gridRow}`}
              role='row'
              style={{
                gridTemplateColumns
              }}
            >
              {effectiveColumns.map(
                (column, index) => {
                  const sort = sortState.find(
                    item => item.id === column.id
                  )

                  const sortable =
                    Boolean(column.key) &&
                    column.sortable !== false &&
                    (
                      column.arrow === true ||
                      column.sortable === true
                    )

                  const isDropTarget =
                    dragOverIndex === index &&
                    isColumnDragging

                  const isDragSource =
                    isColumnDragging &&
                    dragStateRef.current?.columnId ===
                      column.id

                  const isDropSettling =
                    isColumnDropSettling &&
                    dragStateRef.current?.columnId ===
                      column.id

                  const isTemporalColumn =
                    column.dataType === 'date' ||
                    column.dataType === 'datetime' ||
                    column.dataType === 'time'

                  return (
                    <div
                      key={column.id}
                      ref={element => {
                        if (element) {
                          headerRefs.current.set(
                            column.id,
                            element
                          )
                        } else {
                          headerRefs.current.delete(column.id)
                        }
                      }}
                      className={[
                        styles.section__content,
                        isDragSource
                          ? styles.columnDragSource
                          : '',
                        isDropSettling
                          ? styles.columnDropSettling
                          : ''
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      style={{
                        justifyContent:
                          column.justify ??
                          'flex-start',
                        backgroundColor:
                          bgRow,
                        cursor:
                          pointer
                            ? 'pointer'
                            : enableColumnDrag &&
                                column.draggable !== false
                              ? isColumnDragging
                                ? 'grabbing'
                                : 'grab'
                              : 'default'
                      }}
                      data-col-index={index}
                      data-column-id={column.id}
                      role='columnheader'
                      aria-colindex={index + 1}
                      aria-label={
                        column.name
                          ? `${column.name} column`
                          : `Column ${index + 1}`
                      }
                      aria-grabbed={
                        isDragSource || undefined
                      }
                      data-dragging={
                        isDragSource ? 'true' : undefined
                      }
                      data-drop-target={
                        isDropTarget ? 'true' : undefined
                      }
                      data-drop-side={
                        isDropTarget
                          ? dragDropSide
                          : undefined
                      }
                      tabIndex={0}
                      onKeyDown={event =>
                        handleHeaderKeyDown(
                          event,
                          index
                        )
                      }
                      onPointerDown={event =>
                        handleHeaderPointerDown(
                          event,
                          index
                        )
                      }
                      onPointerMove={
                        handleHeaderPointerMove
                      }
                      onPointerUp={
                        handleHeaderPointerUp
                      }
                      onPointerCancel={() =>
                        finishDrag(true)
                      }
                    >
                      {enableColumnDrag &&
                        column.draggable !== false && (
                          <span
                            className={styles.dragHandle}
                            aria-hidden='true'
                          >
                            <i />
                            <i />
                            <i />
                          </span>
                      )}

                      <div className={styles.headerMain}>
                        <div className={styles.titleZone}>
                          <span
                            className={styles.title}
                            title={column.name}
                          >
                            {column.name}
                          </span>

                          {column.render != null && (
                            <span
                              className={styles.customTitleContent}
                            >
                              {column.render()}
                            </span>
                          )}
                        </div>

                        <div className={styles.headerActions}>
                          {sortable && (
                            <div
                              className={`${styles.sortControls}${sort ? ` ${styles.sortControlsActive}` : ''}`}
                              data-table-drag-ignore
                            >
                              <button
                                type='button'
                                className={`${styles.sortButton}${sort?.direction === 0 ? ` ${styles.sortButtonActive}` : ''}`}
                                aria-label={`Ordenar ${column.name} ascendente`}
                                aria-pressed={
                                  sort?.direction === 0
                                }
                                onClick={event => {
                                  event.stopPropagation()
                                  setSortDirection(
                                    column,
                                    0,
                                    event.shiftKey
                                  )
                                }}
                              >
                                <Icon
                                  icon='IconArrowTop'
                                  color={
                                    sort?.direction === 0
                                      ? getGlobalStyle(
                                        '--color-icons-black'
                                      )
                                      : getGlobalStyle(
                                        '--color-icons-gray-light'
                                      )
                                  }
                                  size={14}
                                />
                              </button>

                              <button
                                type='button'
                                className={`${styles.sortButton}${sort?.direction === 1 ? ` ${styles.sortButtonActive}` : ''}`}
                                aria-label={`Ordenar ${column.name} descendente`}
                                aria-pressed={
                                  sort?.direction === 1
                                }
                                onClick={event => {
                                  event.stopPropagation()
                                  setSortDirection(
                                    column,
                                    1,
                                    event.shiftKey
                                  )
                                }}
                              >
                                <Icon
                                  icon='IconArrowBottom'
                                  color={
                                    sort?.direction === 1
                                      ? getGlobalStyle(
                                        '--color-icons-black'
                                      )
                                      : getGlobalStyle(
                                        '--color-icons-gray-light'
                                      )
                                  }
                                  size={14}
                                />
                              </button>

                              {multiColumnSort && (
                                <span
                                  className={`${styles.sortPrioritySlot}${
                                    sort && sortState.length > 1
                                      ? ` ${styles.sortPriorityVisible}`
                                      : ''
                                  }`}
                                  aria-hidden={!(sort && sortState.length > 1)}
                                  aria-label={
                                    sort && sortState.length > 1
                                      ? `Prioridad de orden ${sortState.findIndex(item => item.id === column.id) + 1}`
                                      : undefined
                                  }
                                >
                                  {sort && sortState.length > 1
                                    ? sortState.findIndex(item => item.id === column.id) + 1
                                    : ''}
                                </span>
                              )}
                            </div>
                          )}

                          {enableColumnFormatting &&
                            isTemporalColumn &&
                            column.key && (
                              <button
                                type='button'
                                className={`${styles.formatButton}${column.displayFormat && column.displayFormat !== 'auto' ? ` ${styles.formatButtonActive}` : ''}`}
                                aria-label={`Cambiar formato de ${column.name}`}
                                aria-haspopup='menu'
                                aria-expanded={
                                  formatMenu?.columnId ===
                                  column.id
                                }
                                data-table-drag-ignore
                                onClick={event =>
                                  openFormatMenu(
                                    event,
                                    column.id
                                  )
                                }
                              >
                                ⋮
                              </button>
                          )}
                        </div>
                      </div>

                      {enableColumnResize &&
                        index < columns.length - 1 &&
                        column.resizable !== false &&
                        columns[index + 1]?.resizable !== false && (
                          <div
                            role='separator'
                            aria-orientation='vertical'
                            aria-label={`Cambiar ancho de ${column.name || `columna ${index + 1}`}`}
                            className={styles.resizer}
                            data-table-resize
                            onPointerDown={event =>
                              handleResizeStart(
                                event,
                                index
                              )
                            }
                            tabIndex={-1}
                          />
                      )}
                    </div>
                  )
                }
              )}
            </div>
          )}

          <div className={styles.body}>
            {renderedBody}
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        dragOverlay &&
        activeDragColumn &&
        createPortal(
          <div
            ref={dragOverlayRef}
            className={styles.dragOverlay}
            style={{
              width: dragOverlay.width,
              height: dragOverlay.height,
              left: 0,
              top: 0,
              zIndex: getGlobalStyle('--z-index-high')
            }}
            aria-hidden='true'
          >
            <div className={styles.dragOverlaySurface}>
              <div className={styles.dragOverlayGrip}>
                <i />
                <i />
                <i />
              </div>

              <div className={styles.dragOverlayContent}>
              <div className={styles.titleZone}>
                <span
                  className={styles.title}
                  title={activeDragColumn.name}
                >
                  {activeDragColumn.name}
                </span>

                {activeDragColumn.render != null && (
                  <span
                    className={styles.customTitleContent}
                  >
                    {activeDragColumn.render()}
                  </span>
                )}
              </div>
              </div>

              <div className={styles.dragOverlaySort}>
                {(sortState.find(item => item.id === activeDragColumn.id) != null) && (
                  <span>
                    {sortState.find(item => item.id === activeDragColumn.id)?.direction === 0 ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      {renderFormatMenu()}
    </div>
  )
}
