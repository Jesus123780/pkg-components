/*
 * src/components/Table/Table.tsx
 *
 * Header-focused improvements:
 * - Smooth column reordering with collision detection (pointer events, pointer capture)
 * - Tri-state sorting (none -> asc -> desc -> none) with visual affordance hooks
 * - Column resizing via a right-edge resize handle (px-based after resize)
 * - Transitions/animations on non-dragged headers to make collisions smooth
 * - Defensive checks and JSDoc for exported items (English)
 *
 * Notes:
 * - This file replaces only the header-related logic; the rest of the component keeps
 *   backwards-compatible API.
 * - Some CSS classes are referenced below (resizeHandle, draggingColumn, shiftColumn, headerTransition).
 *   Add them to your styles.module.css if you want exact visuals. Suggested CSS is included at the end
 *   of this file as a comment.
 */

import React, { JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'
import { orderColumn as defaultOrderColumn } from './orderColumn'

export { Section } from './Section'

/**
 * Column description used by Table.
 */
export interface TableTitleColumn {
  name: string
  key?: string
  justify?: 'flex-start' | 'flex-end' | 'center'
  width?: string
  arrow?: boolean
  render?: () => JSX.Element | null
  /** stable id used for persistence/tracking */
  id?: string
}

/**
 * Table public props (backwards-compatible).
 */
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
  }
  renderBody: (data: any[], titles: TableTitleColumn[], indexFirstElem: number) => JSX.Element[] | JSX.Element
  handleCheckedAll?: (check: boolean) => void

  /* New optional props (non-breaking) */
  enableDrag?: boolean
  enableKeyboardNav?: boolean
  storageKey?: string
  onColumnsChange?: (newOrder: TableTitleColumn[]) => void
  controlled?: boolean
}

/**
 * Small wrapper component to mark a cell for Table's keyboard navigation.
 * Use this inside your renderBody for each cell to allow robust keyboard navigation.
 *
 * @param props.row row index (0-based)
 * @param props.col column index (0-based)
 */
export const TableCell: React.FC<React.PropsWithChildren<{ row: number; col: number }>> = ({ children, row, col }) => {
  return (
    <div
      role="gridcell"
      tabIndex={-1}
      data-table-cell
      data-table-row={row}
      data-table-col={col}
      className={styles.cell}
    >
      {children}
    </div>
  )
}

/**
 * Reorder immutable array helper.
 * @param arr array
 * @param from index
 * @param to index
 */
const reorderArray = <T,>(arr: T[], from: number, to: number): T[] => {
  if (from === to) return arr.slice()
  const copy = arr.slice()
  const [m] = copy.splice(from, 1)
  copy.splice(to, 0, m)
  return copy
}

/**
 * Helper to cycle sort state: 0 (none) -> 1 (asc) -> -1 (desc) -> 0
 */
const nextSortState = (curr: number | undefined): number => {
  if (curr === undefined || curr === 0) return 1
  if (curr === 1) return -1
  return 0
}

/**
 * Table component.
 */
export const Table: React.FC<TableProps> = ({
  titles = [],
  bgRow,
  data = [],
  pointer = false,
  renderBody,
  header = true,
  enableDrag = true,
  enableKeyboardNav = true,
  storageKey,
  onColumnsChange,
  controlled = false
}) => {
  // Defensive typing/validation
  useEffect(() => {
    if (!Array.isArray(titles)) {
      // developer-friendly message
      // eslint-disable-next-line no-console
      console.error('[Table] prop `titles` should be an array. Received:', titles)
    }
  }, [titles])

  const normalized = useMemo(() => {
    return (Array.isArray(titles) ? titles : []).map((t, i) => ({
      id: t.id ?? String(i),
      width: t.width ?? '1fr',
      justify: t.justify ?? 'flex-start',
      ...t
    }))
  }, [titles])

  // Initialize columns (persisted order if provided)
  const initialColumns = useMemo(() => {
    if (storageKey) {
      try {
        const raw = localStorage.getItem(storageKey)
        if (raw) {
          const ids: string[] = JSON.parse(raw)
          const mapped = ids.map((id) => normalized.find((n) => n.id === id)).filter(Boolean) as TableTitleColumn[]
          const remaining = normalized.filter((n) => !ids.includes(n.id))
          return [...mapped, ...remaining]
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[Table] failed to read storageKey:', err)
      }
    }
    return normalized
  }, [normalized, storageKey])

  const [columns, setColumns] = useState<TableTitleColumn[]>(initialColumns)

  // Keep columns in sync when controlled or titles change
  useEffect(() => {
    if (controlled) {
      setColumns(initialColumns)
    } else {
      setColumns((prev) => {
        const prevIds = prev.map((p) => p.id)
        const newIds = normalized.map((n) => n.id)
        if (prevIds.join('|') === newIds.join('|')) return prev
        const mapped = prevIds.map((id) => normalized.find((n) => n.id)).filter(Boolean) as TableTitleColumn[]
        const remaining = normalized.filter((n) => !prevIds.includes(n.id))
        return [...mapped, ...remaining]
      })
    }
  }, [normalized, initialColumns, controlled])

  // Persist on change (opt-in)
  useEffect(() => {
    if (!storageKey) return
    try {
      const ids = columns.map((c) => c.id)
      localStorage.setItem(storageKey, JSON.stringify(ids))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[Table] failed to persist column order', err)
    }
  }, [columns, storageKey])

  // Expose change to parent
  useEffect(() => {
    if (typeof onColumnsChange === 'function') {
      onColumnsChange(columns)
    }
  }, [columns, onColumnsChange])

  // Grid style for header columns (used to compute widths)
  const gridTemplate = useMemo(() => columns.map((c) => c.width ?? '1fr').join(' '), [columns])

  /* -----------------------
     Drag & keyboard reorder + Resize
     ----------------------- */
  const headerRowRef = useRef<HTMLDivElement | null>(null)
  const headerRefs = useRef<Array<HTMLDivElement | null>>([])
  const pointerDragging = useRef(false)

  type DragInfoRef = {
    fromIndex: number
    startPointerX: number
    startOffsetWithinHeader: number
    headerRowLeft: number
    headerRects: { left: number; width: number; center: number }[]
    draggedWidth: number
  } | null

  const dragInfoRef = useRef<DragInfoRef>(null)

  const [liveDrag, setLiveDrag] = useState<{ draggingIndex: number | null; currentX: number; targetIndex: number | null }>(
    { draggingIndex: null, currentX: 0, targetIndex: null }
  )

  // resizing
  const resizingRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null)
  const resizingPointer = useRef(false)

  const handleResizePointerDown = useCallback((ev: React.PointerEvent, index: number) => {
    // prevent starting column reorder at the same time
    ev.stopPropagation()
    const headerEl = headerRefs.current[index]
    if (!headerEl || !headerRowRef.current) return
    ev.currentTarget.setPointerCapture?.(ev.pointerId)
    resizingPointer.current = true

    const rect = headerEl.getBoundingClientRect()
    resizingRef.current = { index, startX: ev.clientX, startWidth: rect.width }

    // visual flag
    headerEl.setAttribute('data-resizing', 'true')
  }, [])

  const handleResizeMove = useCallback((ev: PointerEvent) => {
    if (!resizingPointer.current || !resizingRef.current) return
    const info = resizingRef.current
    const dx = ev.clientX - info.startX
    const newWidth = Math.max(40, info.startWidth + dx) // min width guard
    setColumns((prev) => {
      const copy = prev.slice()
      const col = { ...copy[info.index] }
      // set px width to keep stability after resize
      col.width = `${Math.round(newWidth)}px`
      copy[info.index] = col
      return copy
    })
  }, [])

  const handleResizeUp = useCallback(() => {
    if (!resizingPointer.current || !resizingRef.current) return
    const info = resizingRef.current
    const headerEl = headerRefs.current[info.index]
    if (headerEl) headerEl.removeAttribute('data-resizing')
    resizingRef.current = null
    resizingPointer.current = false
  }, [])

  const handlePointerDown = useCallback((ev: React.PointerEvent, index: number) => {
    // if resize handle captured event earlier, don't start drag
    if ((ev.target as HTMLElement).closest(`.${styles.resizeHandle}`)) return
    if (!enableDrag) return
    const headerEl = headerRefs.current[index]
    const headerRow = headerRowRef.current
    if (!headerEl || !headerRow) return

    ev.currentTarget.setPointerCapture?.(ev.pointerId)
    pointerDragging.current = true

    const headerRowRect = headerRow.getBoundingClientRect()
    const headerRect = headerEl.getBoundingClientRect()
    const headerRects = headerRefs.current.map((h) => {
      if (!h) return { left: 0, width: 0, center: 0 }
      const r = h.getBoundingClientRect()
      return { left: r.left - headerRowRect.left, width: r.width, center: r.left - headerRowRect.left + r.width / 2 }
    })

    dragInfoRef.current = {
      fromIndex: index,
      startPointerX: ev.clientX,
      startOffsetWithinHeader: ev.clientX - headerRect.left,
      headerRowLeft: headerRowRect.left,
      headerRects,
      draggedWidth: headerRect.width
    }

    setLiveDrag({ draggingIndex: index, currentX: ev.clientX - headerRowRect.left, targetIndex: index })
    // set aria
    headerEl.setAttribute('aria-grabbed', 'true')
  }, [enableDrag])

  const handlePointerMove = useCallback((ev: PointerEvent) => {
    if (!pointerDragging.current || !dragInfoRef.current) return
    const info = dragInfoRef.current
    const headerRow = headerRowRef.current
    if (!headerRow) return
    const localX = ev.clientX - info.headerRowLeft
    let newTarget = info.fromIndex
    for (let i = 0; i < info.headerRects.length; i += 1) {
      if (localX > info.headerRects[i].center) newTarget = i
    }
    setLiveDrag((s) => {
      if (s.draggingIndex === info.fromIndex && s.targetIndex === newTarget && s.currentX === localX) return s
      return { draggingIndex: info.fromIndex, currentX: localX, targetIndex: newTarget }
    })
  }, [])

  const handlePointerUp = useCallback(() => {
    if (!pointerDragging.current || !dragInfoRef.current) {
      setLiveDrag({ draggingIndex: null, currentX: 0, targetIndex: null })
      return
    }
    const info = dragInfoRef.current
    const finalTarget = liveDrag.targetIndex ?? info.fromIndex
    if (typeof finalTarget === 'number' && finalTarget !== info.fromIndex) {
      setColumns((prev) => reorderArray(prev, info.fromIndex, finalTarget))
    }
    const headerEl = headerRefs.current[info.fromIndex]
    if (headerEl) headerEl.removeAttribute('aria-grabbed')
    dragInfoRef.current = null
    pointerDragging.current = false
    setLiveDrag({ draggingIndex: null, currentX: 0, targetIndex: null })
  }, [liveDrag.targetIndex])

  // attach global pointer listeners while dragging/resizing
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      handlePointerMove(e)
      handleResizeMove(e)
    }
    const onPointerUp = (e: PointerEvent) => {
      handlePointerUp()
      handleResizeUp()
    }
    if (pointerDragging.current || resizingPointer.current) {
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)
    }
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }, [handlePointerMove, handlePointerUp, handleResizeMove, handleResizeUp, liveDrag.draggingIndex])

  // Keyboard column reorder: Alt|Ctrl + ArrowLeft/ArrowRight moves focused header
  const handleHeaderKeyDown = useCallback((ev: React.KeyboardEvent, idx: number) => {
    const modifier = ev.altKey || ev.ctrlKey
    if (!modifier) return
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
      ev.preventDefault()
      const targetIndex = ev.key === 'ArrowLeft' ? Math.max(0, idx - 1) : Math.min(columns.length - 1, idx + 1)
      if (targetIndex !== idx) {
        setColumns((prev) => reorderArray(prev, idx, targetIndex))
        setTimeout(() => {
          headerRefs.current[targetIndex]?.focus()
        }, 0)
      }
    }
  }, [columns.length])

  /* -----------------------
     Cell keyboard navigation
     ----------------------- */
  const containerRef = useRef<HTMLDivElement | null>(null)

  const focusCell = useCallback((row: number, col: number) => {
    const selector = `[data-table-cell][data-table-row="${row}"][data-table-col="${col}"]`
    const el = containerRef.current?.querySelector<HTMLElement>(selector)
    if (el) el.focus()
  }, [])

  const moveFocusRelative = useCallback((current: HTMLElement | null, dx: number, dy: number) => {
    if (!current) return
    const r = Number(current.getAttribute('data-table-row') ?? '-1')
    const c = Number(current.getAttribute('data-table-col') ?? '-1')
    if (r < 0 || c < 0) return
    const newRow = Math.max(0, r + dy)
    const newCol = Math.max(0, Math.min(columns.length - 1, c + dx))
    focusCell(newRow, newCol)
  }, [columns.length, focusCell])

  const handleContainerKeyDown = useCallback((ev: React.KeyboardEvent) => {
    if (!enableKeyboardNav) return
    const active = document.activeElement as HTMLElement | null
    if (active?.hasAttribute('data-table-cell')) {
      if (ev.key === 'ArrowRight') { ev.preventDefault(); moveFocusRelative(active, 1, 0) }
      if (ev.key === 'ArrowLeft') { ev.preventDefault(); moveFocusRelative(active, -1, 0) }
      if (ev.key === 'ArrowDown') { ev.preventDefault(); moveFocusRelative(active, 0, 1) }
      if (ev.key === 'ArrowUp') { ev.preventDefault(); moveFocusRelative(active, 0, -1) }
      if (ev.key === 'Tab') {
        ev.preventDefault()
        const r = Number(active.getAttribute('data-table-row') ?? '0')
        const c = Number(active.getAttribute('data-table-col') ?? '0')
        if (ev.shiftKey) {
          if (c > 0) focusCell(r, c - 1)
          else focusCell(Math.max(0, r - 1), columns.length - 1)
        } else {
          if (c < columns.length - 1) focusCell(r, c + 1)
          else focusCell(r + 1, 0)
        }
      }
      if (ev.key === 'Enter') {
        ev.preventDefault()
        active.click?.()
      }
    } else {
      if ((ev.altKey || ev.ctrlKey) && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) {
        const headerEl = document.activeElement as HTMLElement
        if (headerEl && headerEl.dataset && headerEl.dataset.tableHeaderIndex) {
          const idx = Number(headerEl.dataset.tableHeaderIndex)
          handleHeaderKeyDown(ev as unknown as React.KeyboardEvent, idx)
        }
      }
    }
  }, [columns.length, enableKeyboardNav, focusCell, handleHeaderKeyDown, moveFocusRelative])

  /* -----------------------
     Sorting
     ----------------------- */
  const [currentColumnState, setCurrentColumnState] = useState<Record<string, number>>({})
  const handleColumnSortToggle = useCallback((key?: string) => {
    if (!key) return
    setCurrentColumnState((prev) => ({ ...prev, [key]: nextSortState(prev[key]) }))
  }, [])

  /* -----------------------
     Pagination / properties (kept to preserve API)
     ----------------------- */
  const [properties, setProperties] = useState({
    currentPage: 1,
    entriesValue: 100,
    pages: [] as number[],
    indexFirstElem: 0,
    indexLastElem: 0
  })

  useEffect(() => {
    const allPages = Math.max(1, Math.ceil((data?.length ?? 0) / properties.entriesValue))
    const pagesArr = Array.from({ length: allPages }, (_, i) => i + 1)
    const indexLastElem = properties.currentPage * properties.entriesValue
    const indexFirstElem = indexLastElem - properties.entriesValue
    setProperties((p) => ({ ...p, pages: pagesArr, indexFirstElem, indexLastElem }))
  }, [properties.entriesValue, properties.currentPage, data])

  const visibleData = useMemo(() => {
    const start = properties.indexFirstElem
    const end = properties.indexLastElem
    return Array.isArray(data) ? data.slice(start, end) : []
  }, [data, properties.indexFirstElem, properties.indexLastElem])

  // Sorting helper usage preserved from original API
  useEffect(() => {
    // keep defaultOrderColumn behavior: user can adapt to new tri-state numeric values (1/-1/0)
  }, [])

  /* -----------------------
     Render
     ----------------------- */

  const computeShiftStyle = (index: number): React.CSSProperties | undefined => {
    if (liveDrag.draggingIndex === null) return undefined
    const from = liveDrag.draggingIndex
    const to = liveDrag.targetIndex ?? from
    if (from === to) return undefined
    if (index > from && index <= to) {
      const shiftedWidth = headerRefs.current[from]?.getBoundingClientRect().width ?? 0
      return { transform: `translateX(${-shiftedWidth}px)`, transition: 'transform 160ms cubic-bezier(.2,.8,.2,1)', willChange: 'transform' }
    }
    if (index < from && index >= to) {
      const shiftedWidth = headerRefs.current[from]?.getBoundingClientRect().width ?? 0
      return { transform: `translateX(${shiftedWidth}px)`, transition: 'transform 160ms cubic-bezier(.2,.8,.2,1)', willChange: 'transform' }
    }
    return undefined
  }

  return (
    <div
      className={styles.tableWrapper}
      onKeyDown={handleContainerKeyDown}
      ref={containerRef}
    >
      <div
        style={{
          minWidth: 'max-content',
          width: '100%',
          border: `.1px solid ${getGlobalStyle('--color-neutral-gray')}`,
          borderRadius: getGlobalStyle('--border-radius-2xs'),
          overflow: 'auto hidden'
        }}
      >
        {header && (
          <div
            role="row"
            aria-rowindex={1}
            className={styles.headerRow}
            ref={headerRowRef}
            style={{ gridTemplateColumns: gridTemplate, borderBottom: `1px solid ${getGlobalStyle('--color-neutral-gray')}` }}
          >
            {columns.map((col, i) => {
              const isDragged = liveDrag.draggingIndex === i
              const draggedLeftStyle = isDragged && dragInfoRef.current
                ? {
                    position: 'absolute' as const,
                    left: `${liveDrag.currentX - (dragInfoRef.current.startOffsetWithinHeader ?? 0)}px`,
                    width: `${dragInfoRef.current.draggedWidth}px`,
                    top: 0,
                    zIndex: 1000,
                    transform: 'translateZ(0)'
                  }
                : undefined

              const shiftStyle = (!isDragged) ? computeShiftStyle(i) : undefined

              // sort indicator helper
              const sortState = col.key ? currentColumnState[col.key] ?? 0 : 0
              const sortLabel = sortState === 1 ? '▲' : sortState === -1 ? '▼' : ''

              return (
                <div
                  key={col.id}
                  role="columnheader"
                  data-table-header
                  data-table-header-index={i}
                  ref={(el) => (headerRefs.current[i] = el)}
                  tabIndex={0}
                  className={`${styles.tableHeaderColumn} ${isDragged ? styles.draggingColumn : (shiftStyle ? styles.shiftColumn : '')} ${styles.headerTransition}`}
                  style={{
                    justifyContent: col.justify ?? 'flex-start',
                    cursor: enableDrag || pointer ? 'grab' : (pointer ? 'pointer' : 'default'),
                    ...(isDragged ? draggedLeftStyle : {}),
                    ...(shiftStyle ?? {}),
                    userSelect: 'none'
                  }}
                  onPointerDown={(e) => handlePointerDown(e, i)}
                  onKeyDown={(ev) => handleHeaderKeyDown(ev, i)}
                  onClick={() => handleColumnSortToggle(col.key)}
                  aria-grabbed={(liveDrag.draggingIndex === i) ? 'true' : 'false'}
                >
                  <div className={styles.headerContent} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                      {col.render ? col.render() : <span className={styles.title}>{col.name}</span>}
                      {Boolean(col.arrow) && (
                        <div className={styles.arrowLabel} aria-hidden>
                          <button type="button" className={styles.iconBtn} aria-label={`sort-${col.key}-up`} onClick={() => setCurrentColumnState((prev) => ({ ...prev, [col.key ?? '']: 1 }))}>
                            ▲
                          </button>
                          <button type="button" className={styles.iconBtn} aria-label={`sort-${col.key}-down`} onClick={() => setCurrentColumnState((prev) => ({ ...prev, [col.key ?? '']: -1 }))}>
                            ▼
                          </button>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div aria-hidden style={{ fontSize: 12 }}>{sortLabel}</div>

                      {/* resize handle: small area at the right edge of the header */}
                      <div
                        className={styles.resizeHandle}
                        role="separator"
                        aria-orientation="vertical"
                        onPointerDown={(e) => handleResizePointerDown(e, i)}
                        onClick={(e) => e.stopPropagation()}
                        title="Resize column"
                        style={{ touchAction: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Body rendering: leave layout to renderBody rows (each row can be a grid). */}
        <div role="grid" aria-rowcount={visibleData.length} className={styles.bodyContainer}>
          {renderBody(
            (visibleData ?? []).slice().sort((a, b) => defaultOrderColumn(a, b, currentColumnState)),
            columns,
            properties.indexFirstElem
          )}
        </div>
      </div>

      {/* Suggested styles that you should add to styles.module.css for best UX */}
      {/*
      .headerTransition { transition: transform 160ms cubic-bezier(.2,.8,.2,1), left 120ms linear; }
      .draggingColumn { box-shadow: 0 6px 18px rgba(0,0,0,.12); opacity: .98; cursor: grabbing; }
      .shiftColumn { will-change: transform; }
      .resizeHandle { width: 10px; height: 100%; cursor: col-resize; display: inline-block; }
      */}
    </div>
  )
}
