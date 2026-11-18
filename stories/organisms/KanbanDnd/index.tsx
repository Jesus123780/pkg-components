'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode
} from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DraggableProvided,
  type DraggableStateSnapshot,
  type DropResult,
  type DragStart
} from 'react-beautiful-dnd'
import styles from './styles.module.css'

/** Generic UI contracts. Persistence and Venty-specific logic remain outside pkg-components. */
export interface KanbanItem {
  id: string
}

export interface KanbanColumn<T extends KanbanItem> {
  id: string
  title: string
  description?: string | null
  color?: string
  backgroundColor?: string
  items: T[]
  totalCount?: number
  dropDisabled?: boolean
  emptyLabel?: string
  footer?: ReactNode
}

export interface KanbanMove {
  itemId: string
  sourceColumnId: string
  targetColumnId: string
  sourceIndex: number
  targetIndex: number
}

export interface KanbanRenderItemContext {
  dragging: boolean
  isDropAnimating: boolean
}

export interface KanbanDndProps<T extends KanbanItem> {
  columns: Array<KanbanColumn<T>>
  renderItem: (item: T, context: KanbanRenderItemContext) => ReactNode
  onMove: (move: KanbanMove) => void
  disabled?: boolean
  isItemDragDisabled?: (item: T) => boolean
  ariaLabel?: string
  className?: string
}

/**
 * RBD 13.1.1 uses position:fixed during dragging.
 * CSS transforms on any ancestor create an incorrect positioning context.
 * Droppable.renderClone re-parents the active item into document.body, so
 * app-shell transitions, sidebars, scroll wrappers and CSS animations cannot
 * displace the dragging card.
 */
export function KanbanDnd<T extends KanbanItem>({
  columns,
  renderItem,
  onMove,
  disabled = false,
  isItemDragDisabled,
  ariaLabel = 'Tablero Kanban',
  className = ''
}: KanbanDndProps<T>) {
  const [ready, setReady] = useState(false)
  const activeItemRef = useRef<T | null>(null)

  useEffect(() => {
    setReady(true)
  }, [])

  const findItem = useCallback((id: string): T | undefined => {
    for (const column of columns) {
      const result = column.items.find(item => item.id === id)
      if (result) return result
    }
    return undefined
  }, [columns])

  const handleDragStart = useCallback((start: DragStart) => {
    // Hold the original card so optimistic updates, pagination and sorting
    // cannot unmount the clone while its drop animation is in progress.
    activeItemRef.current = findItem(start.draggableId) ?? null
  }, [findItem])

  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result
    if (!destination || disabled) return
    if (source.droppableId === destination.droppableId) return

    const sourceColumn = columns.find(column => column.id === source.droppableId)
    const targetColumn = columns.find(column => column.id === destination.droppableId)
    if (!sourceColumn || !targetColumn || targetColumn.dropDisabled) return

    const item = sourceColumn.items[source.index] ?? activeItemRef.current
    if (!item || item.id !== draggableId || isItemDragDisabled?.(item)) return

    onMove({
      itemId: draggableId,
      sourceColumnId: source.droppableId,
      targetColumnId: destination.droppableId,
      sourceIndex: source.index,
      targetIndex: destination.index
    })
  }, [columns, disabled, isItemDragDisabled, onMove])

  const renderDraggableCard = (
    item: T | undefined,
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
    isClone: boolean
  ) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={styles.item}
      data-dragging={snapshot.isDragging}
      data-clone={isClone}
      // IMPORTANT: RBD owns position/top/left/transform/transition.
      // Never replace or merge these with drag offsets or custom transforms.
      style={provided.draggableProps.style}
    >
      <div className={styles.itemHeader}>
        <span className={styles.itemLabel}>Mover tarjeta</span>
        <div
          {...(provided.dragHandleProps ?? {})}
          className={styles.handle}
          data-swipe-ignore="true"
          aria-label={item ? `Mover tarjeta ${item.id}` : 'Mover tarjeta'}
          title="Arrastra o pulsa espacio y usa las flechas"
        >
          <span aria-hidden="true">⠿</span>
        </div>
      </div>
      {item && renderItem(item, {
        dragging: snapshot.isDragging,
        isDropAnimating: snapshot.isDropAnimating
      })}
    </div>
  )

  const board = (
    <div className={styles.columns}>
      {columns.map(column => (
        <section
          key={column.id}
          className={styles.column}
          aria-label={`${column.title}, ${column.totalCount ?? column.items.length} elementos`}
          style={{
            '--kanban-color': column.color || 'var(--color-text-black)',
            '--kanban-background': column.backgroundColor || 'var(--color-neutral-gray)'
          } as CSSProperties}
        >
          <header className={styles.header}>
            <span className={styles.indicator} aria-hidden="true" />
            <div className={styles.heading}>
              <h2>{column.title}</h2>
              {column.description && <p title={column.description}>{column.description}</p>}
            </div>
            <span className={styles.count} aria-label={`${column.totalCount ?? column.items.length} elementos`}>
              {column.totalCount ?? column.items.length}
            </span>
          </header>

          {ready ? (
            <Droppable
              droppableId={column.id}
              direction="vertical"
              type="kanban-card"
              isDropDisabled={Boolean(disabled || column.dropDisabled)}
              // RBD's Cloning API re-parents the drag preview OUT of .content.
              getContainerForClone={() => document.body}
              renderClone={(provided, snapshot, rubric) => {
                const cached = activeItemRef.current
                const item = cached?.id === rubric.draggableId
                  ? cached
                  : findItem(rubric.draggableId)

                return renderDraggableCard(item, provided, snapshot, true)
              }}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.list}
                  data-over={snapshot.isDraggingOver}
                >
                  {column.items.length === 0 && (
                    <p className={styles.empty} data-over={snapshot.isDraggingOver}>
                      {column.emptyLabel || 'Sin elementos'}
                    </p>
                  )}
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      isDragDisabled={Boolean(disabled || isItemDragDisabled?.(item))}
                    >
                      {(providedCard, snapshotCard) =>
                        renderDraggableCard(item, providedCard, snapshotCard, false)}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ) : (
            <div className={styles.list} aria-busy="true">
              {column.items.length ? column.items.map(item => (
                <div className={styles.item} key={item.id}>
                  {renderItem(item, { dragging: false, isDropAnimating: false })}
                </div>
              )) : (
                <p className={styles.empty}>{column.emptyLabel || 'Sin elementos'}</p>
              )}
            </div>
          )}
          {column.footer && <footer className={styles.footer}>{column.footer}</footer>}
        </section>
      ))}
    </div>
  )

  return (
    <div
      className={`${styles.board} ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {ready ? (
        <DragDropContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {board}
        </DragDropContext>
      ) : board}
    </div>
  )
}
