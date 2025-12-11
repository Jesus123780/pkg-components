import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import type { JSX } from 'react'
import { orderColumn, OrderColumnInput } from './orderColumn'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

export { Section } from './Section'

export interface TableTitleColumn {
  name: string
  key?: string
  justify?: 'flex-start' | 'flex-end' | 'center'
  width?: string
  arrow?: boolean
  render?: () => JSX.Element | null
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
  }
  renderBody: (data: any[], titles: TableTitleColumn[], indexFirstElem: number) => JSX.Element[]
  handleCheckedAll?: (check: boolean) => void
  enableColumnDrag?: boolean
  enableKeyboardNav?: boolean
  enableColumnResize?: boolean
}

const cellKey = (r: number, c: number) => `${r}:${c}`

export const TableCell: React.FC<{
  row: number
  col: number
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}> = ({ row, col, children, className, style }) => {
  const el = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!el.current) return
    el.current.setAttribute('data-table-cell', cellKey(row, col))
    el.current.tabIndex = 0
    el.current.classList.add(styles.tableCell)
  }, [row, col])

  return (
    <div ref={el} className={className} style={{ outline: 'none', ...style }}>
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
  enableColumnResize = true
}) => {
  const isResizingRef = useRef(false)

  const [columns, setColumns] = useState<TableTitleColumn[]>(
    () => {
      return titles.map(t => ({ ...t }))
    }
  )

  useEffect(() => {
    setColumns(prev => {
      const prevKeys = prev.map(p => p.key ?? p.name)
      const newKeys = titles.map(t => t.key ?? t.name)
      const same =
        prevKeys.length === newKeys.length && prevKeys.every((k, i) => k === newKeys[i])
      if (!same) return titles.map(t => ({ ...t }))
      return prev
    })
  }, [titles])

  type CurrentColumnState = Record<string, number>
  const [currentColumn, setCurrentColumn] = useState<CurrentColumnState>({})
  const handleColumnSortToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setCurrentColumn(prev => ({ ...prev, [name]: checked ? 0 : 1 }))
  }, [])

  const [currentPage] = useState<number>(1)
  const [entriesValue] = useState<number>(100)
  const [indexFirstElem, setIndexFirstElem] = useState<number>(0)
  const [indexLastElem, setIndexLastElem] = useState<number>(entriesValue)

  useEffect(() => {
    const allPages = Math.max(1, Math.ceil((data?.length ?? 0) / entriesValue))
    const last = Math.min(allPages * entriesValue, currentPage * entriesValue)
    const first = Math.max(0, last - entriesValue)
    setIndexFirstElem(first)
    setIndexLastElem(last)
  }, [entriesValue, currentPage, data])

  const containerRef = useRef<HTMLDivElement | null>(null)
  const headerRefs = useRef<Array<HTMLDivElement | null>>([])
  const [columnWidthsPx, setColumnWidthsPx] = useState<number[]>([])

  const parseInitialWidths = useCallback(() => {
    const container = containerRef.current
    const containerWidth = container?.getBoundingClientRect().width ?? 800

    const frWeights: number[] = []
    const resultPx: number[] = []
    let totalFixed = 0
    let totalPercentPx = 0

    columns.forEach((t, i) => {
      const w = (t.width ?? '1fr').trim()
      if (w.endsWith('px')) {
        const n = parseFloat(w.replace('px', '')) || 0
        resultPx[i] = n
        totalFixed += n
      } else if (w.endsWith('%')) {
        const n = parseFloat(w.replace('%', '')) || 0
        const px = (n / 100) * containerWidth
        resultPx[i] = px
        totalPercentPx += px
      } else if (w.endsWith('fr')) {
        const n = parseFloat(w.replace('fr', '')) || 1
        frWeights[i] = n
        resultPx[i] = 0
      } else {
        const n = parseFloat(w) || 0
        if (n > 0) {
          resultPx[i] = n
          totalFixed += n
        } else {
          frWeights[i] = frWeights[i] ?? 1
          resultPx[i] = 0
        }
      }
    })

    const remaining = Math.max(0, containerWidth - totalFixed - totalPercentPx)
    const totalFr = frWeights.reduce((s, v) => s + (v || 0), 0) || 1

    columns.forEach((t, i) => {
      if ((resultPx[i] ?? 0) === 0) {
        const weight = frWeights[i] || 1
        resultPx[i] = (weight / totalFr) * remaining
      }
    })

    const min = 48
    const normalized = resultPx.map(p => Math.max(min, Math.round(p)))
    setColumnWidthsPx(normalized)
  }, [columns])

  useEffect(() => {
    parseInitialWidths()
    const onResize = () => parseInitialWidths()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [parseInitialWidths])

  // --- Mejor lógica de resize: evita "empujar" otras columnas.
  const handleResizeStart = useCallback((mouseDownEvent: React.MouseEvent, leftIndex: number) => {
    if (!enableColumnResize) return
    mouseDownEvent.preventDefault()
    mouseDownEvent.stopPropagation()

    const startX = mouseDownEvent.clientX

    const MIN = 70 // ajustable
    const leftStart = columnWidthsPx[leftIndex]
      ?? headerRefs.current[leftIndex]?.offsetWidth
      ?? 150
    const rightStart = columnWidthsPx[leftIndex + 1]
      ?? headerRefs.current[leftIndex + 1]?.offsetWidth
      ?? 150

    // fija contenedor para evitar reescalado mientras se hace resize
    const totalBefore = columnWidthsPx.reduce((s, v) => s + (v || 0), 0) || (leftStart + rightStart)
    if (containerRef.current) {
      // forzamos un ancho mínimo igual al total de columnas para evitar que el grid reescale.
      containerRef.current.style.minWidth = `${totalBefore}px`

      // permitimos overflow horizontal (si no está)
      containerRef.current.style.overflowX = 'auto'
    }

    isResizingRef.current = true

    const onMouseMove = (ev: MouseEvent) => {
      const dxRaw = ev.clientX - startX

      // límites sin romper columnas adyacentes
      const maxDxPositive = rightStart - MIN
      const maxDxNegative = MIN - leftStart

      const dx = Math.min(Math.max(dxRaw, maxDxNegative), maxDxPositive)

      const newLeft = Math.max(MIN, leftStart + dx)
      const newRight = Math.max(MIN, rightStart - dx)

      setColumnWidthsPx(prev => {
        const copy = [...prev]
        // asegúrate de tener la longitud correcta
        while (copy.length < columns.length) copy.push(150)
        copy[leftIndex] = newLeft
        copy[leftIndex + 1] = newRight
        return copy
      })

      setColumns(prev => {
        const copy = [...prev]
        copy[leftIndex] = { ...copy[leftIndex], width: `${newLeft}px` }
        copy[leftIndex + 1] = { ...copy[leftIndex + 1], width: `${newRight}px` }
        return copy
      })
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      // limpiar bloqueo de layout
      if (containerRef.current) {
        containerRef.current.style.minWidth = ''
        // no tocamos overflow si no era necesario; dejar como estaba
      }
      isResizingRef.current = false
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [columnWidthsPx, columns.length, enableColumnResize])

  const draggingColumnIndex = useRef<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)

  const moveColumn = useCallback((from: number, to: number) => {
    if (from === to) return
    setColumns(prev => {
      const copy = prev.slice()
      const [item] = copy.splice(from, 1)
      copy.splice(to, 0, item)
      return copy
    })
    setColumnWidthsPx(prev => {
      const copy = prev.slice()
      const [w] = copy.splice(from, 1)
      copy.splice(to, 0, w)
      return copy
    })
  }, [])

  const onHeaderPointerDown = (e: React.PointerEvent, index: number) => {
    if (!enableColumnDrag) return
    draggingColumnIndex.current = index
      (e.target as Element).setPointerCapture(e.pointerId)
  }

  useEffect(() => {
    if (!enableColumnDrag) return
    const onPointerMove = (ev: PointerEvent) => {
      if (draggingColumnIndex.current == null) return
      const el = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null
      if (!el) return
      const headerEl = el.closest('[data-col-index]') as HTMLElement | null
      const targetIndex = headerEl ? Number(headerEl.getAttribute('data-col-index')) : null
      if (targetIndex != null && targetIndex !== dragOverIndex.current && targetIndex !== draggingColumnIndex.current) {
        dragOverIndex.current = targetIndex
        moveColumn(draggingColumnIndex.current, targetIndex)
        draggingColumnIndex.current = targetIndex
      }
    }
    const onPointerUp = () => {
      draggingColumnIndex.current = null
      dragOverIndex.current = null
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [enableColumnDrag, moveColumn])

  const onHeaderKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const moveLeft = () => index > 0 && moveColumn(index, index - 1)
    const moveRight = () => index < columns.length - 1 && moveColumn(index, index + 1)

    if ((e.altKey || e.ctrlKey) && e.key === 'ArrowLeft') {
      e.preventDefault()
      moveLeft()
      requestAnimationFrame(() => {
        const el = headerRefs.current[index - 1]
        el?.focus()
      })
    }
    if ((e.altKey || e.ctrlKey) && e.key === 'ArrowRight') {
      e.preventDefault()
      moveRight()
      requestAnimationFrame(() => {
        const el = headerRefs.current[index + 1]
        el?.focus()
      })
    }
  }, [columns.length, moveColumn])

  const focusCell = useCallback((r: number, c: number) => {
    const selector = `[data-table-cell="${cellKey(r, c)}"]`
    const el = containerRef.current?.querySelector(selector) as HTMLElement | null
    if (el) {
      el.focus()
      el.classList.add(styles.cellFocusVisible)
      const onBlur = () => { el.classList.remove(styles.cellFocusVisible); el.removeEventListener('blur', onBlur) }
      el.addEventListener('blur', onBlur)
    }
  }, [])

  const moveFocusBy = useCallback((fromR: number, fromC: number, dr: number, dc: number) => {
    const rowsCount = Math.max(0, Math.ceil((data?.length ?? 0)))
    const colsCount = columns.length
    const nr = Math.max(0, Math.min(rowsCount - 1, fromR + dr))
    const nc = Math.max(0, Math.min(colsCount - 1, fromC + dc))
    focusCell(nr, nc)
  }, [columns.length, data, focusCell])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!enableKeyboardNav) return
    const active = document.activeElement
    if (!containerRef.current?.contains(active)) return
    const attr = (active as HTMLElement)?.getAttribute?.('data-table-cell')
    if (!attr) return
    const [rS, cS] = attr.split(':').map(s => parseInt(s, 10))
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault(); moveFocusBy(rS, cS, 0, 1); break
      case 'ArrowLeft':
        e.preventDefault(); moveFocusBy(rS, cS, 0, -1); break
      case 'ArrowDown':
        e.preventDefault(); moveFocusBy(rS, cS, 1, 0); break
      case 'ArrowUp':
        e.preventDefault(); moveFocusBy(rS, cS, -1, 0); break
      case 'Enter':
        break
      default:
        break
    }
  }, [enableKeyboardNav, moveFocusBy])

  const activeKey = useMemo(() => {
    const k = Object.keys(currentColumn).find(x => currentColumn[x] !== undefined)
    return k ?? ''
  }, [currentColumn])

  const currentColumnForOrder = useMemo<OrderColumnInput>(() => {
    if (!activeKey) return { key: '' }
    return { key: activeKey, [activeKey]: currentColumn[activeKey] } as any
  }, [activeKey, currentColumn])

  const processed = useMemo(() => {
    const filtered = (data ?? []).slice()
    const sorted = filtered.sort((a: any, b: any) => orderColumn(a, b, currentColumnForOrder))
    return sorted.slice(indexFirstElem, indexLastElem)
  }, [data, indexFirstElem, indexLastElem, currentColumnForOrder])

  const gridColumnStyles = useMemo(() => {
    const template = columns.map((c, i) => {
      if (columnWidthsPx.length === columns.length) return `${columnWidthsPx[i]}px`
      return c.width ?? '1fr'
    }).join(' ')
    return ({ gridTemplateColumns: template })
  }, [columns, columnWidthsPx])

  return (
    <>
      {/* OUTER: oculta cualquier overflow fuera del componente (tu pedido) */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        {/* INNER: maneja el scroll horizontal cuando las columnas exceden el ancho */}
        <div className={styles.tableInner} style={{ width: '100%' }}>
          <div
            ref={containerRef}
            onKeyDown={handleKeyDown}
            style={{
              minWidth: 'max-content',
              width: '100%',
              border: `.1px solid ${getGlobalStyle('--color-neutral-gray')}`,
              borderRadius: getGlobalStyle('--border-radius-2xs'),
              userSelect: enableColumnResize ? 'none' : 'auto',
            }}
          >
            {header && (
              <div
                className={`${styles.section} ${styles.headerRow}`}
                style={{ ...gridColumnStyles, borderBottom: `1px solid ${getGlobalStyle('--color-neutral-gray')}`, display: 'grid' }}
                role="row"
              >
                {columns.map((col, i) => {
                  const containerW = containerRef.current?.getBoundingClientRect().width ?? (typeof window !== 'undefined' ? window.innerWidth : 1000)
                  const minW = 48
                  const pxRaw = columnWidthsPx[i] ?? 0
                  const totalPx = columnWidthsPx.reduce((s, v) => s + (v ?? 0), 0)
                  let clampedPx = Math.max(minW, Math.round(pxRaw))

                  // SOLO escalar cuando NO estamos en resize — así no se "empujan" otras columnas
                  if (!isResizingRef.current && totalPx > 0 && totalPx > containerW) {
                    const scale = containerW / totalPx
                    clampedPx = Math.max(minW, Math.round(pxRaw * scale))
                  }

                  const widthStyle = (columnWidthsPx.length === columns.length)
                    ? `${clampedPx}px`
                    : (col.width ?? '1fr')

                  return (
                    <div
                      key={col.key ?? col.name}
                      ref={el => headerRefs.current[i] = el}
                      className={styles.section__content}
                      style={{
                        justifyContent: col.justify ?? 'flex-start',
                        backgroundColor: bgRow,
                        cursor: pointer ? 'pointer' : 'default',
                        position: 'relative',
                        width: widthStyle,
                        minWidth: widthStyle
                      }}
                      data-col-index={i}
                      role="columnheader"
                      aria-colindex={i + 1}
                      tabIndex={0}
                      onPointerDown={(e) => onHeaderPointerDown(e, i)}
                      onKeyDown={(e) => onHeaderKeyDown(e, i)}
                      onFocus={(ev) => (ev.currentTarget.classList.add(styles.headerFocus))}
                      onBlur={(ev) => (ev.currentTarget.classList.remove(styles.headerFocus))}
                    >
                      {(col.render != null)
                        ? col.render()
                        : (
                          <label htmlFor={col.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className={styles.title}>
                              {col.name}
                            </span>
                          </label>
                        )}
                      {Boolean(col.arrow) && (
                        <label className={styles.arrow_label} htmlFor={col.key}>
                          <input
                            style={{ position: 'absolute', opacity: 0, top: -1, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                            id={col.key}
                            name={col.key}
                            onChange={(e) => handleColumnSortToggle(e)}
                            ref={null as any}
                            type='checkbox'
                          />
                          <button style={{ height: getGlobalStyle('--spacing-lg'), backgroundColor: getGlobalStyle('--color-base-transparent') }}>
                            <Icon icon='IconArrowTop' color={currentColumn?.[`${col.key}`] === 0 ? getGlobalStyle('--color-icons-black') : getGlobalStyle('--color-icons-gray')} size={15} />
                          </button>
                          <button style={{ height: getGlobalStyle('--spacing-lg'), backgroundColor: getGlobalStyle('--color-base-transparent') }}>
                            <Icon icon='IconArrowBottom' color={currentColumn?.[`${col.key}`] === 1 ? getGlobalStyle('--color-icons-black') : getGlobalStyle('--color-icons-gray')} size={15} />
                          </button>
                        </label>
                      )}
                      {enableColumnResize && i < columns.length - 1 && (
                        <div
                          role="separator"
                          aria-orientation="vertical"
                          onMouseDown={(e) => handleResizeStart(e, i)}
                          className={styles.resizer}
                          aria-label={`Resize column ${col.name}`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {renderBody(processed, columns, indexFirstElem)}
          </div>
        </div>
      </div>
    </>
  )
}
