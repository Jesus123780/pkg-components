import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../utils'

interface SwipeableCardProps {
  children: React.ReactNode
  rightActions?: React.ReactNode
  swipeWidth?: number
  swipeHeight?: number
  autoClose?: boolean
  sticky?: boolean
  shake?: boolean
  delay?: number
  gradientAnimation?: boolean
  style?: React.CSSProperties
  onDelete?: () => void
  onSwipeUp?: () => void
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  rightActions,
  swipeWidth = 100,
  swipeHeight = 80,
  gradientAnimation = false,
  autoClose = false,
  sticky = false,
  shake = false,
  style = {},
  delay = 0,
  onDelete = () => { },
  onSwipeUp = () => { },
}) => {
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [deleteReady, setDeleteReady] = useState(false)
  const [isShake, setIsShake] = useState(false)
  const [direction, setDirection] = useState<'horizontal' | 'vertical' | null>(null)

  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)
  const startOffsetX = useRef<number>(0)
  const startOffsetY = useRef<number>(0)
  const didMove = useRef<boolean>(false) // 👈 nuevo flag

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    startX.current = e.clientX
    startY.current = e.clientY
    startOffsetX.current = offsetX
    startOffsetY.current = offsetY
    didMove.current = false // reinicia
    setIsSwiping(true)
    setIsTransitioning(false)
    setDeleteReady(false)
    setDirection(null)
    document.body.style.userSelect = 'none'
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!isSwiping || startX.current === null || startY.current === null) return

    const diffX = e.clientX - startX.current
    const diffY = e.clientY - startY.current

    // 👉 Si se movió más de 5px, marcar que no fue un click
    if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) didMove.current = true

    // Detección de dirección dominante
    if (!direction) {
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
        setDirection('horizontal')
      } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
        setDirection('vertical')
      } else return
    }

    if (direction === 'horizontal') {
      let newOffset = startOffsetX.current + diffX
      if (newOffset > 0) newOffset = 0

      const deleteThreshold = swipeWidth * 1.6
      const visualThreshold = deleteThreshold * 0.85

      if (newOffset < -visualThreshold && !deleteReady) {
        setDeleteReady(true)
        setIsShake(true)
        setTimeout(() => setIsShake(false), 300)
      } else if (newOffset > -visualThreshold) {
        setDeleteReady(false)
      }

      if (newOffset < -swipeWidth * 1.3) {
        const overflow = -swipeWidth * 1.3 - newOffset
        newOffset = -swipeWidth * 1.3 - overflow * 0.25
      }

      setOffsetX(newOffset)
    }

    if (direction === 'vertical') {
      let newOffsetY = startOffsetY.current + diffY
      if (newOffsetY > 0) newOffsetY = 0
      const deleteThresholdY = swipeHeight * 1.2
      setOffsetY(newOffsetY)

      if (Math.abs(newOffsetY) > deleteThresholdY) {
        setIsSwiping(false)
        setIsTransitioning(true)
        setOffsetY(-swipeHeight * 2)
        setTimeout(() => {
          onSwipeUp?.()
          setOffsetY(0)
        }, 200)
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    document.body.style.userSelect = ''
    if (!isSwiping) return
    setIsSwiping(false)
    setIsTransitioning(true)

    if (direction === 'horizontal') {
      if (offsetX < -swipeWidth * 1.6) {
        setOffsetX(-swipeWidth * 2)
        setTimeout(() => {
          onDelete?.()
          setOffsetX(0)
          setDeleteReady(false)
        }, 200)
        return
      }

      const shouldOpen = Math.abs(offsetX) > swipeWidth / 2
      if (shouldOpen) {
        setOffsetX(-swipeWidth - 8)
        setTimeout(() => setOffsetX(-swipeWidth), 120)
      } else {
        setOffsetX(0)
      }
    } else if (direction === 'vertical') {
      setOffsetY(0)
    }
  }

  // 🚫 Evita clicks después de un drag
  const handleClickCapture = (e: React.MouseEvent) => {
    if (didMove.current) {
      e.stopPropagation()
      e.preventDefault()
      didMove.current = false
    }
  }

  useEffect(() => {
    if (offsetX === -swipeWidth && autoClose) {
      const timer = setTimeout(() => setOffsetX(0), 3000)
      return () => clearTimeout(timer)
    }
  }, [offsetX])

  const progress = Math.min(Math.abs(offsetX) / swipeWidth, 1)
  const startColor = { r: 80, g: 167, b: 115 }
  const endColor = { r: 255, g: 194, b: 194 }

  const red = Math.round(startColor.r + (endColor.r - startColor.r) * progress)
  const green = Math.round(startColor.g + (endColor.g - startColor.g) * progress)
  const blue = Math.round(startColor.b + (endColor.b - startColor.b) * progress)

  const backgroundColor = `rgb(${red}, ${green}, ${blue})`

  const transition = isTransitioning
    ? 'transform 0.4s cubic-bezier(0.25, 1.3, 0.5, 1)'
    : 'transform 0.3s ease'

  const [showActions, setShowActions] = useState(delay === 0)
  useEffect(() => {
    if (delay === 0) return setShowActions(true)

    const timer = setTimeout(() => {
      setShowActions(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`${styles.swipeWrapper} ${(shake && isShake) ? styles.shake : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClickCapture={handleClickCapture} // 👈 evita click del child
      style={{
        transition: deleteReady ? 'cubic-bezier(0.25, 1.25, 0.5, 1) 0.35s' : 'none'
      }}
    >
      <div
        className={styles.hiddenActions}
        style={{
          background: gradientAnimation
            ? backgroundColor
            : getGlobalStyle('--color-base-transparent'),
          transition: 'background 0.25s ease',
          width: sticky
            ? `${Math.max(swipeWidth, Math.abs(offsetX))}px`
            : swipeWidth,
          ...style
        }}
      >
        {showActions ? rightActions : null}
      </div>


      <div
        className={styles.frontContent}
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: isSwiping ? 'none' : transition,
        }}
      >
        {children}
      </div>
    </div>
  )
}
