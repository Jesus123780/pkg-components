'use client'

import React, { useState, useRef } from 'react'
import styles from './styles.module.css'

interface GridItemProps {
  id: number
  x: number
  y: number
  w: number
  h: number
  gridSize: number
  onDrag: (id: number, deltaX: number, deltaY: number) => void
  onResize: (id: number, deltaW: number, deltaH: number) => void
}

export const GridItem = ({ id, x, y, w, h, gridSize, onDrag, onResize }: GridItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) return
    setDragging(true)
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const deltaX = e.clientX - startPos.x
      const deltaY = e.clientY - startPos.y
      onDrag(id, deltaX, deltaY)
      setStartPos({ x: e.clientX, y: e.clientY })
    }
    if (resizing) {
      const deltaX = e.clientX - startPos.x
      const deltaY = e.clientY - startPos.y
      onResize(id, deltaX, deltaY)
      setStartPos({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
    setResizing(false)
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setResizing(true)
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, resizing, startPos])

  const style = {
    width: `${w * gridSize}px`,
    height: `${h * gridSize}px`,
    transform: `translate(${x * gridSize}px, ${y * gridSize}px)`,
  }

  return (
    <div
      ref={itemRef}
      onMouseDown={handleMouseDown}
      className={styles.container}
      style={style}
    >
      <div
        className={`${styles.resizeHandle} resize-handle`}
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  )
}
