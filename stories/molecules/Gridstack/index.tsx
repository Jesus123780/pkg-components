'use client'

import React, { useState } from 'react'
import { GridItem } from './components/GridItem'
import styles from './styles.module.css'

export const Gridstack = () => {
  const [items, setItems] = useState([
    { id: 1, x: 0, y: 0, w: 2, h: 2 },
    { id: 2, x: 2, y: 0, w: 2, h: 3 }
  ])
  const gridSize = 50

  // Mover item y detectar colisión
  const moveItem = (movingItem: any, deltaX: number, deltaY: number) => {
    const newX = movingItem.x + Math.round(deltaX / gridSize)
    const newY = movingItem.y + Math.round(deltaY / gridSize)
  
    let newItems = [...items]
  
    // Actualizamos la posición del que movemos
    movingItem.x = newX
    movingItem.y = newY
  
    // Detectar si colisiona
    let collision = newItems.find(
      i =>
        i.id !== movingItem.id &&
        isOverlapping(movingItem, i)
    )
  
    if (collision) {
      // Si hay colisión, mover el item colisionado hacia abajo
      collision.y = movingItem.y + movingItem.h
    }
  
    return newItems
  }

  // Maneja el evento de drag (arrastre)
  const handleDrag = (id: number, deltaX: number, deltaY: number) => {
    setItems(prev => {
      const movingItem = prev.find(item => item.id === id)
      if (!movingItem) return prev
  
      return moveItem({ ...movingItem }, deltaX, deltaY)
    })
  }

  // Maneja el evento de resize (redimensionar)
  const handleResize = (id: number, deltaX: number, deltaY: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              w: Math.max(1, item.w + Math.round(deltaX / gridSize)),
              h: Math.max(1, item.h + Math.round(deltaY / gridSize))
            }
          : item
      )
    )
  }

  // Función para detectar si dos items se superponen
  const isOverlapping = (
    a: { x: number; y: number; w: number; h: number },
    b: { x: number; y: number; w: number; h: number }
  ) => {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    )
  }

  return (
    <div className={styles['grid-container']}>
      {items.map(item => (
        <GridItem
          key={item.id}
          {...item}
          gridSize={gridSize}
          onDrag={handleDrag}
          onResize={handleResize}
        />
      ))}
    </div>
  )
}
