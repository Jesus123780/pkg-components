import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import styles from './styles.module.css'

export type InitialDividerPosition = Record<string, number>

type ResizeCallback = (positions: InitialDividerPosition) => void

interface ResisesColumnsProps {
  /** Minimum width applied to every column. Kept for backwards compatibility. */
  lastMinWidth?: string
  padding?: string
  height?: string
  backgroundColor?: string
  initialDividerPosition?: InitialDividerPosition | null
  children?: React.ReactNode

  /** Optional callbacks. The current percentages are passed as { __0: 50, __1: 50, ... }. */
  onResizeStart?: ResizeCallback
  onResize?: ResizeCallback
  onResizeEnd?: ResizeCallback

  /** Keyboard resize increment, expressed as a percentage of the track width. */
  resizeStep?: number
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

interface DragSession {
  pointerId: number
  dividerIndex: number
  startX: number
  trackWidth: number
  startPositions: InitialDividerPosition
  lastPositions: InitialDividerPosition
  handle: HTMLButtonElement
}

const DEFAULT_TWO_COLUMN_POSITION: InitialDividerPosition = {
  __0: 60,
  __1: 40
}

const roundPosition = (value: number): number =>
  Math.round(value * 10000) / 10000

const getColumnKey = (index: number): string => `__${index}`

const getInitialDividerPos = (
  numberOfColumns: number,
  initialPosition?: InitialDividerPosition | null
): InitialDividerPosition => {
  if (numberOfColumns <= 0) return {}

  const equalPosition = 100 / numberOfColumns
  const fallback = numberOfColumns === 2
    ? DEFAULT_TWO_COLUMN_POSITION
    : Object.fromEntries(
      Array.from({ length: numberOfColumns }, (_, index) => [
        getColumnKey(index), equalPosition
      ])
    )

  const values = Array.from({ length: numberOfColumns }, (_, index) => {
    const key = getColumnKey(index)
    const value = initialPosition?.[key] ?? fallback[key] ?? equalPosition
    return Number.isFinite(value) && value > 0 ? value : equalPosition
  })

  const total = values.reduce((sum, value) => sum + value, 0)
  if (!total) return Object.fromEntries(
    values.map((_, index) => [getColumnKey(index), equalPosition])
  )

  return Object.fromEntries(
    values.map((value, index) => [
      getColumnKey(index),
      roundPosition((value / total) * 100)
    ])
  )
}

/**
 * Keeps every column at or above its minimum width while preserving the
 * relative proportions of columns that have room to grow.
 */
const enforceMinimumWidths = (
  positions: InitialDividerPosition,
  numberOfColumns: number,
  trackWidth: number,
  minColumnWidth: number
): InitialDividerPosition => {
  if (!trackWidth || !numberOfColumns || !minColumnWidth) return positions

  const keys = Array.from({ length: numberOfColumns }, (_, index) =>
    getColumnKey(index)
  )
  const normalized = getInitialDividerPos(numberOfColumns, positions)
  const minPercent = (minColumnWidth / trackWidth) * 100

  if (minPercent * numberOfColumns >= 100) {
    // Preserve the user's proportions while the viewport is too narrow.
    // CSS enforces the physical minimum width until the layout has room again.
    return normalized
  }

  const availablePercent = 100 - (minPercent * numberOfColumns)
  const extraWeights = keys.map((key) =>
    Math.max(0, normalized[key] - minPercent)
  )
  const totalExtraWeight = extraWeights.reduce((sum, value) => sum + value, 0)

  return Object.fromEntries(
    keys.map((key, index) => {
      const extra = totalExtraWeight
        ? (extraWeights[index] / totalExtraWeight) * availablePercent
        : availablePercent / numberOfColumns

      return [key, roundPosition(minPercent + extra)]
    })
  )
}

const resizeAdjacentColumns = (
  positions: InitialDividerPosition,
  dividerIndex: number,
  deltaPx: number,
  trackWidth: number,
  minColumnWidth: number
): InitialDividerPosition => {
  const leftKey = getColumnKey(dividerIndex)
  const rightKey = getColumnKey(dividerIndex + 1)

  if (!trackWidth || positions[leftKey] === undefined || positions[rightKey] === undefined) {
    return positions
  }

  const leftWidth = (positions[leftKey] / 100) * trackWidth
  const rightWidth = (positions[rightKey] / 100) * trackWidth
  const pairWidth = leftWidth + rightWidth

  // There is no valid resize when both columns are already at their minimum.
  if (pairWidth < (minColumnWidth * 2) - 0.5) return positions

  const nextLeftWidth = Math.min(
    pairWidth - minColumnWidth,
    Math.max(minColumnWidth, leftWidth + deltaPx)
  )
  const nextRightWidth = pairWidth - nextLeftWidth

  return {
    ...positions,
    [leftKey]: roundPosition((nextLeftWidth / trackWidth) * 100),
    [rightKey]: roundPosition((nextRightWidth / trackWidth) * 100)
  }
}

const resolveMinWidth = (
  minWidth: string,
  columnElement?: HTMLDivElement | null
): number => {
  if (columnElement && typeof window !== 'undefined') {
    const computedMinWidth = window.getComputedStyle(columnElement).minWidth
    const computedValue = Number.parseFloat(computedMinWidth)
    if (Number.isFinite(computedValue)) return computedValue
  }

  const parsedValue = Number.parseFloat(minWidth)
  return Number.isFinite(parsedValue) ? parsedValue : 440
}

export const ResisesColumnsMemo: React.FC<ResisesColumnsProps> = ({
  lastMinWidth = '440px',
  padding = '15px',
  height = '',
  backgroundColor,
  initialDividerPosition = null,
  children: childrenProp,
  onResizeStart,
  onResize,
  onResizeEnd,
  resizeStep = 2,
  disabled = false,
  className = '',
  style
}) => {
  const children = useMemo(
    () => React.Children.toArray(childrenProp),
    [childrenProp]
  )
  const numberOfColumns = children.length
  const initialPositionSignature = initialDividerPosition
    ? Object.keys(initialDividerPosition)
      .sort()
      .map((key) => `${key}:${initialDividerPosition[key]}`)
      .join('|')
    : 'default'

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const columnRefs = useRef<Array<HTMLDivElement | null>>([])
  const dragRef = useRef<DragSession | null>(null)

  const [dividerPos, setDividerPos] = useState<InitialDividerPosition>(() =>
    getInitialDividerPos(numberOfColumns, initialDividerPosition)
  )
  const [trackWidth, setTrackWidth] = useState(0)
  const [activeDivider, setActiveDivider] = useState<number | null>(null)
  const [isResizing, setIsResizing] = useState(false)

  useEffect(() => {
    setDividerPos(
      getInitialDividerPos(numberOfColumns, initialDividerPosition)
    )
    setActiveDivider(null)
  }, [numberOfColumns, initialPositionSignature])

  // Track width changes caused by viewport resizing, side panels or parent layout changes.
  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return undefined

    const measureTrack = () => {
      const nextWidth = track.getBoundingClientRect().width
      setTrackWidth((currentWidth) =>
        Math.abs(currentWidth - nextWidth) > 0.5 ? nextWidth : currentWidth
      )
    }

    measureTrack()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureTrack)
      return () => window.removeEventListener('resize', measureTrack)
    }

    const observer = new ResizeObserver(measureTrack)
    observer.observe(wrapper)
    observer.observe(track)

    return () => observer.disconnect()
  }, [numberOfColumns, lastMinWidth])

  // When the available space changes, re-apply the minimum width constraints.
  useEffect(() => {
    if (!trackWidth || !numberOfColumns) return

    const nextMinWidth = resolveMinWidth(
      lastMinWidth,
      columnRefs.current[0]
    )

    setDividerPos((current) =>
      enforceMinimumWidths(
        current,
        numberOfColumns,
        trackWidth,
        nextMinWidth
      )
    )
  }, [trackWidth, numberOfColumns, lastMinWidth])

  const stopDragging = useCallback((pointerId?: number) => {
    const session = dragRef.current
    if (!session) return
    if (pointerId !== undefined && session.pointerId !== pointerId) return

    dragRef.current = null
    setIsResizing(false)
    setActiveDivider(null)

    if (session.handle.hasPointerCapture?.(session.pointerId)) {
      session.handle.releasePointerCapture(session.pointerId)
    }

    onResizeEnd?.({ ...session.lastPositions })
  }, [onResizeEnd])

  useEffect(() => {
    const handleWindowBlur = () => stopDragging()
    window.addEventListener('blur', handleWindowBlur)
    return () => window.removeEventListener('blur', handleWindowBlur)
  }, [stopDragging])

  const handlePointerDown = useCallback((
    event: React.PointerEvent<HTMLButtonElement>,
    dividerIndex: number
  ) => {
    if (disabled || !event.isPrimary || !trackRef.current) return

    const currentTrackWidth = trackRef.current.getBoundingClientRect().width
    if (!currentTrackWidth) return

    const handle = event.currentTarget
    const currentPositions = { ...dividerPos }
    const constrainedPositions = enforceMinimumWidths(
      currentPositions,
      numberOfColumns,
      currentTrackWidth,
      resolveMinWidth(lastMinWidth, columnRefs.current[0])
    )

    dragRef.current = {
      pointerId: event.pointerId,
      dividerIndex,
      startX: event.clientX,
      trackWidth: currentTrackWidth,
      startPositions: constrainedPositions,
      lastPositions: constrainedPositions,
      handle
    }

    try {
      handle.setPointerCapture(event.pointerId)
    } catch {
      // Pointer capture may fail if the pointer has already been cancelled.
    }

    setDividerPos(constrainedPositions)
    setActiveDivider(dividerIndex)
    setIsResizing(true)
    onResizeStart?.({ ...constrainedPositions })
  }, [
    disabled,
    dividerPos,
    lastMinWidth,
    numberOfColumns,
    onResizeStart
  ])

  const handlePointerMove = useCallback((
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const session = dragRef.current
    if (!session || event.pointerId !== session.pointerId) return

    const minWidth = resolveMinWidth(lastMinWidth, columnRefs.current[0])
    const deltaX = event.clientX - session.startX
    const nextPositions = resizeAdjacentColumns(
      session.startPositions,
      session.dividerIndex,
      deltaX,
      session.trackWidth,
      minWidth
    )

    session.lastPositions = nextPositions
    setDividerPos(nextPositions)
    onResize?.({ ...nextPositions })
  }, [lastMinWidth, onResize])

  const updateDividerWithKeyboard = useCallback((
    event: React.KeyboardEvent<HTMLButtonElement>,
    dividerIndex: number
  ) => {
    if (disabled || !trackWidth) return

    let deltaPx = 0
    const stepPx = (Math.max(0.1, resizeStep) / 100) * trackWidth
    const minWidth = resolveMinWidth(lastMinWidth, columnRefs.current[0])
    const leftKey = getColumnKey(dividerIndex)
    const rightKey = getColumnKey(dividerIndex + 1)
    const leftWidth = ((dividerPos[leftKey] ?? 0) / 100) * trackWidth
    const rightWidth = ((dividerPos[rightKey] ?? 0) / 100) * trackWidth

    switch (event.key) {
      case 'ArrowLeft':
        deltaPx = -stepPx
        break
      case 'ArrowRight':
        deltaPx = stepPx
        break
      case 'Home':
        deltaPx = minWidth - leftWidth
        break
      case 'End':
        deltaPx = rightWidth - minWidth
        break
      default:
        return
    }

    event.preventDefault()
    const nextPositions = resizeAdjacentColumns(
      dividerPos,
      dividerIndex,
      deltaPx,
      trackWidth,
      minWidth
    )

    setDividerPos(nextPositions)
    onResizeStart?.({ ...dividerPos })
    onResize?.({ ...nextPositions })
    onResizeEnd?.({ ...nextPositions })
  }, [
    disabled,
    dividerPos,
    lastMinWidth,
    onResize,
    onResizeEnd,
    onResizeStart,
    resizeStep,
    trackWidth
  ])

  const balanceDivider = useCallback((dividerIndex: number) => {
    if (disabled || !trackWidth) return

    const leftKey = getColumnKey(dividerIndex)
    const rightKey = getColumnKey(dividerIndex + 1)
    const pairWidth = (
      (dividerPos[leftKey] ?? 0) + (dividerPos[rightKey] ?? 0)
    ) / 100 * trackWidth
    const minWidth = resolveMinWidth(lastMinWidth, columnRefs.current[0])

    if (pairWidth < minWidth * 2) return

    const halfPair = pairWidth / 2
    const nextPositions = {
      ...dividerPos,
      [leftKey]: roundPosition((halfPair / trackWidth) * 100),
      [rightKey]: roundPosition((halfPair / trackWidth) * 100)
    }

    setDividerPos(nextPositions)
    onResize?.({ ...nextPositions })
    onResizeEnd?.({ ...nextPositions })
  }, [
    disabled,
    dividerPos,
    lastMinWidth,
    onResize,
    onResizeEnd,
    trackWidth
  ])

  const rootClassName = [
    styles['column-container'],
    className
  ].filter(Boolean).join(' ')

  return (
    <div
      ref={wrapperRef}
      className={rootClassName}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => stopDragging(event.pointerId)}
      onPointerCancel={(event) => stopDragging(event.pointerId)}
      style={{
        height: height || undefined,
        padding,
        backgroundColor: backgroundColor || '#f4f5f7',
        ...style
      }}
    >
      <div
        ref={trackRef}
        className={[
          styles['column-track'],
          isResizing ? styles['is-resizing'] : ''
        ].filter(Boolean).join(' ')}
        style={{
          // Keep this element's sizing independent from the pane content.
        } as React.CSSProperties}
      >
        {children.map((child, index) => {
          const key = getColumnKey(index)
          const position = dividerPos[key] ?? (100 / Math.max(1, numberOfColumns))
          const isResizable = index < numberOfColumns - 1
          const nextPosition = dividerPos[getColumnKey(index + 1)] ?? 0
          const pairPosition = position + nextPosition
          const currentValue = pairPosition
            ? Math.round((position / pairPosition) * 100)
            : 50
          const minWidth = resolveMinWidth(
            lastMinWidth,
            columnRefs.current[index]
          )
          const pairWidth = (pairPosition / 100) * trackWidth
          const minValue = pairWidth
            ? Math.min(50, Math.ceil((minWidth / pairWidth) * 100))
            : 0
          const canResizePair = pairWidth >= (minWidth * 2) - 0.5

          return (
            <div
              className={styles.column}
              key={(child as React.ReactElement)?.key ?? key}
              ref={(element) => {
                columnRefs.current[index] = element
              }}
              style={{
                flex: `0 0 ${position}%`,
                minWidth: lastMinWidth,
                height: '100%'
              }}
            >
              {child}

              {isResizable && (
                <button
                  type='button'
                  className={[
                    styles['column-controler'],
                    activeDivider === index ? styles['is-active'] : ''
                  ].filter(Boolean).join(' ')}
                  role='separator'
                  aria-label={`Redimensionar entre las columnas ${index + 1} y ${index + 2}`}
                  aria-orientation='vertical'
                  aria-valuemin={minValue}
                  aria-valuemax={100 - minValue}
                  aria-valuenow={currentValue}
                  aria-valuetext={`${currentValue}% del ancho combinado`}
                  title='Arrastra para redimensionar. Usa las flechas del teclado o haz doble clic para equilibrar.'
                  disabled={disabled || !canResizePair}
                  tabIndex={disabled || !canResizePair ? -1 : 0}
                  onPointerDown={(event) => handlePointerDown(event, index)}
                  onPointerUp={(event) => stopDragging(event.pointerId)}
                  onPointerCancel={(event) => stopDragging(event.pointerId)}
                  onLostPointerCapture={(event) => stopDragging(event.pointerId)}
                  onKeyDown={(event) => updateDividerWithKeyboard(event, index)}
                  onDoubleClick={() => balanceDivider(index)}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const ResisesColumns = React.memo(ResisesColumnsMemo)
