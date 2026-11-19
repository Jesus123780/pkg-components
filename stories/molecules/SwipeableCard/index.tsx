import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import styles from './styles.module.css'

export type SwipeSide = 'left' | 'right'
export type SwipeDirection = 'left' | 'right' | 'up' | 'down'
export type HorizontalDirections = 'left' | 'right' | 'both' | 'none'
export type VerticalDirections = 'up' | 'down' | 'both' | 'none'
export type SwipeMotion = 'spring' | 'smooth' | 'snappy' | 'none'

type SwipeAxis = 'horizontal' | 'vertical'

export interface SwipeDetails {
  direction: SwipeDirection
  axis: SwipeAxis
  offsetX: number
  offsetY: number
  progress: number
}

export interface SwipeableCardHandle {
  /** Reveal the action panel on the specified side. */
  open: (side?: SwipeSide) => void
  /** Close the card without triggering an action. */
  close: () => void
  /** Abort the active gesture and return to the closed state. */
  reset: () => void
}

export interface SwipeableCardProps {
  children: React.ReactNode
  rightActions?: React.ReactNode
  leftActions?: React.ReactNode

  /** Reveal width for rightActions (swipe left). @default 100 */
  swipeWidth?: number
  /** Reveal width for leftActions (swipe right). Defaults to swipeWidth. */
  leftSwipeWidth?: number
  /** Vertical swipe base distance. @default 80 */
  swipeHeight?: number
  /** @default 'left', or 'both' when leftActions are supplied */
  swipeDirections?: HorizontalDirections
  /** @default 'up' if onSwipeUp is supplied; otherwise 'none' */
  verticalSwipe?: VerticalDirections
  /** Allow vertical touch gestures, disabling native scrolling on the card. @default false */
  enableVerticalTouch?: boolean

  /** Fraction of the action width required to open. @default 0.5 */
  openThreshold?: number
  /** Full-swipe distance as a multiple of action width. @default 1.6 */
  fullSwipeThreshold?: number
  /** Minimum physical swipe distance to execute an action, in px. @default 72 */
  minFullSwipeDistance?: number
  /** Sides on which onDelete may run. Default: left (legacy), or both when swipeDirections='both' explicitly. */
  deleteDirections?: HorizontalDirections
  /** Vertical swipe distance as a multiple of swipeHeight. @default 1.2 */
  verticalThreshold?: number
  /** Pixels before direction locking. @default 10 */
  activationDistance?: number
  /** Resistance beyond the maximum drag distance, 0..1. @default 0.25 */
  resistance?: number
  /** Run full-swipe callbacks after the exit animation. @default true */
  allowFullSwipe?: boolean

  /** Uncontrolled initial open panel. */
  defaultOpen?: SwipeSide | null
  /** Controlled open panel. null = closed; undefined = uncontrolled. */
  open?: SwipeSide | null
  /** Fired when the settled open panel changes. */
  onOpenChange?: (side: SwipeSide | null) => void

  /** Existing API: close automatically after revealing a panel. @default false */
  autoClose?: boolean
  /** @default 3000 */
  autoCloseDelay?: number
  /** Keep the actions panel growing with drag distance. @default false */
  sticky?: boolean
  /** Vibrate when approaching the deletion threshold. @default false */
  shake?: boolean
  /** Fraction of full-swipe threshold at which the pre-delete warning/shake begins (0..1). @default 0.85 */
  shakeThreshold?: number
  /** Delays rendering action children, in milliseconds. @default 0 */
  delay?: number
  /** Existing green-to-pink action background interpolation. @default false */
  gradientAnimation?: boolean

  /** Motion preset. @default 'spring' */
  motion?: SwipeMotion
  /** Settle/open animation duration in milliseconds. @default 400 */
  animationDuration?: number
  /** Full-swipe exit duration in milliseconds. @default 240 */
  exitDuration?: number
  /** Optional tilt in degrees while dragging. @default 0 */
  rotateOnSwipe?: number
  /** Optional amount to reduce scale at full drag, e.g. 0.03. @default 0 */
  scaleOnSwipe?: number
  /** Return duration for completed vertical swipes; uses an overshooting spring. @default 440 */
  verticalBounceDuration?: number

  /** @default false */
  disabled?: boolean
  /** Let the wrapper respond to Arrow keys, Escape and Home. @default true */
  keyboard?: boolean
  /** Do not initiate swipes from buttons, anchors and form controls. @default true */
  ignoreInteractiveElements?: boolean
  /** Close when an action button is clicked. @default false (legacy) */
  closeOnActionClick?: boolean
  /** Close when clicking outside. @default false */
  closeOnOutsideClick?: boolean
  /** Opt in to Delete/Backspace triggering onDelete. @default false */
  deleteOnKeyboard?: boolean

  /** Legacy style: applied to the RIGHT actions container, not the wrapper. */
  style?: React.CSSProperties
  wrapperStyle?: React.CSSProperties
  leftActionsStyle?: React.CSSProperties
  className?: string
  contentClassName?: string
  actionsClassName?: string
  leftActionsClassName?: string
  ariaLabel?: string
  testId?: string

  /** Called after a qualifying full swipe on an enabled deletion direction. Legacy handlers can ignore direction. */
  onDelete?: (direction: 'left' | 'right') => void
  /** Legacy callback after a completed swipe up. */
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onFullSwipeLeft?: () => void
  onFullSwipeRight?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeStart?: (details: SwipeDetails) => void
  onSwipeMove?: (details: SwipeDetails) => void
  onSwipeEnd?: (details: SwipeDetails) => void
  onSwipeCancel?: () => void
}

interface PointerGesture {
  pointerId: number
  x: number
  y: number
  startX: number
  startY: number
  axis: SwipeAxis | null
  moved: boolean
}

const INTERACTIVE_SELECTOR =
  'button, a, input, textarea, select, option, label, [contenteditable="true"], [data-no-swipe], [role="button"], [role="link"]'

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

const sideForOffset = (offset: number): SwipeSide | null =>
  offset < 0 ? 'right' : offset > 0 ? 'left' : null

const easing: Record<SwipeMotion, string> = {
  spring: 'cubic-bezier(0.2, 1.25, 0.45, 1)',
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
  snappy: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  none: 'linear'
}

/** Accessible, bidirectional swipe-to-reveal with optional full/vertical actions. */
export const SwipeableCard = forwardRef<SwipeableCardHandle, SwipeableCardProps>(
  function SwipeableCard(
    {
      children,
      rightActions,
      leftActions,
      swipeWidth = 100,
      leftSwipeWidth,
      swipeHeight = 80,
      swipeDirections,
      verticalSwipe,
      enableVerticalTouch = false,
      openThreshold = 0.5,
      fullSwipeThreshold = 1.6,
      minFullSwipeDistance = 72,
      deleteDirections,
      verticalThreshold = 1.2,
      activationDistance = 10,
      resistance = 0.25,
      allowFullSwipe = true,
      defaultOpen = null,
      open,
      onOpenChange,
      autoClose = false,
      autoCloseDelay = 3000,
      sticky = false,
      shake = false,
      shakeThreshold = 0.85,
      delay = 0,
      gradientAnimation = false,
      motion = 'spring',
      animationDuration = 400,
      exitDuration = 240,
      rotateOnSwipe = 0,
      scaleOnSwipe = 0,
      verticalBounceDuration = 440,
      disabled = false,
      keyboard = true,
      ignoreInteractiveElements = true,
      closeOnActionClick = false,
      closeOnOutsideClick = false,
      deleteOnKeyboard = false,
      style,
      wrapperStyle,
      leftActionsStyle,
      className,
      contentClassName,
      actionsClassName,
      leftActionsClassName,
      ariaLabel = 'Tarjeta deslizable',
      testId,
      onDelete,
      onSwipeUp,
      onSwipeDown,
      onFullSwipeLeft,
      onFullSwipeRight,
      onSwipeLeft,
      onSwipeRight,
      onSwipeStart,
      onSwipeMove,
      onSwipeEnd,
      onSwipeCancel
    },
    ref
  ) {
    const rightWidth = Math.max(1, swipeWidth)
    const leftWidth = Math.max(1, leftSwipeWidth ?? swipeWidth)
    const verticalHeight = Math.max(1, swipeHeight)
    const horizontal = swipeDirections ?? (leftActions ? 'both' : 'left')
    const vertical = verticalSwipe ?? (onSwipeUp ? 'up' : 'none')
    // Preserve legacy left-delete by default; explicitly opting into 'both'
    // automatically enables full-swipe deletion on both sides.
    const deletion = deleteDirections ?? (swipeDirections === 'both' ? 'both' : 'left')
    const deleteLeft = deletion === 'left' || deletion === 'both'
    const deleteRight = deletion === 'right' || deletion === 'both'
    // Explicit deleteDirections opts into deletion even when a right-side full-swipe
    // callback is present. Without it, preserve the right callback's legacy precedence.
    const deleteOnRightFullSwipe = deleteRight && Boolean(onDelete) &&
      (deleteDirections !== undefined || !onFullSwipeRight)
    const leftFullThreshold = Math.max(0, minFullSwipeDistance, rightWidth * Math.max(1, fullSwipeThreshold))
    const rightFullThreshold = Math.max(0, minFullSwipeDistance, leftWidth * Math.max(1, fullSwipeThreshold))
    const controlled = open !== undefined

    const getSnapX = useCallback(
      (side: SwipeSide | null) =>
        side === 'right' ? -rightWidth : side === 'left' ? leftWidth : 0,
      [rightWidth, leftWidth]
    )

    const [internalOpen, setInternalOpen] = useState<SwipeSide | null>(defaultOpen)
    const currentOpen = controlled ? (open ?? null) : internalOpen
    const [offsetX, setOffsetX] = useState(() => getSnapX(open ?? defaultOpen))
    const [offsetY, setOffsetY] = useState(0)
    const [dragging, setDragging] = useState(false)
    const [removing, setRemoving] = useState(false)
    const [verticalPhase, setVerticalPhase] = useState<'lifting' | 'returning' | null>(null)
    const [ready, setReady] = useState(false)
    const [nearDelete, setNearDelete] = useState(false)
    const [shaking, setShaking] = useState(false)
    const [showActions, setShowActions] = useState(delay === 0)

    const rootRef = useRef<HTMLDivElement>(null)
    const rightPanelRef = useRef<HTMLDivElement>(null)
    const leftPanelRef = useRef<HTMLDivElement>(null)
    const gestureRef = useRef<PointerGesture | null>(null)
    const offsetXRef = useRef(offsetX)
    const offsetYRef = useRef(offsetY)
    const openRef = useRef(currentOpen)
    const readyRef = useRef(false)
    const nearDeleteRef = useRef(false)
    const shakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const suppressClickUntilRef = useRef(0)
    const pendingTimers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())
    const mountedRef = useRef(false)

    const writeX = useCallback((next: number) => {
      offsetXRef.current = next
      setOffsetX(next)
    }, [])
    const writeY = useCallback((next: number) => {
      offsetYRef.current = next
      setOffsetY(next)
    }, [])

    const schedule = useCallback((callback: () => void, milliseconds: number) => {
      const id = setTimeout(() => {
        pendingTimers.current.delete(id)
        if (mountedRef.current) callback()
      }, Math.max(0, milliseconds))
      pendingTimers.current.add(id)
      return id
    }, [])

    useEffect(() => {
      mountedRef.current = true
      return () => {
        mountedRef.current = false
        pendingTimers.current.forEach(clearTimeout)
        pendingTimers.current.clear()
        shakeTimerRef.current = null
      }
    }, [])

    useEffect(() => {
      openRef.current = currentOpen
      if (!gestureRef.current && !removing) writeX(getSnapX(currentOpen))
    }, [currentOpen, getSnapX, removing, writeX])

    useEffect(() => {
      setShowActions(delay <= 0)
      if (delay <= 0) return
      const id = setTimeout(() => setShowActions(true), delay)
      return () => clearTimeout(id)
    }, [delay])

    const settle = useCallback(
      (side: SwipeSide | null) => {
        if (disabled || removing) return
        const previous = openRef.current
        openRef.current = side
        if (!controlled) setInternalOpen(side)
        writeX(getSnapX(side))
        writeY(0)
        setReady(false)
        readyRef.current = false
        setNearDelete(false)
        nearDeleteRef.current = false
        if (previous !== side) onOpenChange?.(side)
      },
      [controlled, disabled, getSnapX, onOpenChange, removing, writeX, writeY]
    )

    const close = useCallback(() => settle(null), [settle])
    const openPanel = useCallback(
      (side: SwipeSide = 'right') => {
        if (side === 'right' && !['left', 'both'].includes(horizontal)) return
        if (side === 'left' && !['right', 'both'].includes(horizontal)) return
        settle(side)
      },
      [horizontal, settle]
    )

    const reset = useCallback(() => {
      pendingTimers.current.forEach(clearTimeout)
      pendingTimers.current.clear()
      gestureRef.current = null
      setDragging(false)
      setRemoving(false)
      setVerticalPhase(null)
      setReady(false)
      setNearDelete(false)
      setShaking(false)
      readyRef.current = false
      nearDeleteRef.current = false
      shakeTimerRef.current = null
      const previous = openRef.current
      openRef.current = null
      if (!controlled) setInternalOpen(null)
      writeX(0)
      writeY(0)
      if (previous !== null) onOpenChange?.(null)
    }, [controlled, onOpenChange, writeX, writeY])

    useImperativeHandle(ref, () => ({ open: openPanel, close, reset }), [openPanel, close, reset])

    useEffect(() => {
      if (!autoClose || !currentOpen || dragging || removing || disabled) return
      const id = setTimeout(close, Math.max(0, autoCloseDelay))
      return () => clearTimeout(id)
    }, [autoClose, autoCloseDelay, close, currentOpen, disabled, dragging, removing])

    useEffect(() => {
      if (!closeOnOutsideClick || !currentOpen) return
      const onDown = (event: PointerEvent) => {
        if (rootRef.current && !rootRef.current.contains(event.target as Node)) close()
      }
      document.addEventListener('pointerdown', onDown)
      return () => document.removeEventListener('pointerdown', onDown)
    }, [close, closeOnOutsideClick, currentOpen])

    // Inert panels cannot receive keyboard focus while concealed.
    useEffect(() => {
      if (rightPanelRef.current) rightPanelRef.current.inert = currentOpen !== 'right'
      if (leftPanelRef.current) leftPanelRef.current.inert = currentOpen !== 'left'
    }, [currentOpen, showActions])

    const canHorizontal = horizontal !== 'none'
    const canVertical = vertical !== 'none'
    const canLeft = horizontal === 'left' || horizontal === 'both'
    const canRight = horizontal === 'right' || horizontal === 'both'
    const canUp = vertical === 'up' || vertical === 'both'
    const canDown = vertical === 'down' || vertical === 'both'

    const details = useCallback(
      (axis: SwipeAxis, x: number, y: number): SwipeDetails => {
        const direction: SwipeDirection = axis === 'horizontal'
          ? (x <= 0 ? 'left' : 'right')
          : (y <= 0 ? 'up' : 'down')
        const width = x <= 0 ? rightWidth : leftWidth
        return {
          axis,
          direction,
          offsetX: x,
          offsetY: y,
          progress: clamp(Math.abs(axis === 'horizontal' ? x / width : y / verticalHeight), 0, 1)
        }
      },
      [leftWidth, rightWidth, verticalHeight]
    )

    // Direction describes pointer travel, even when closing an already-open panel.
    const gestureDetails = useCallback(
      (gesture: PointerGesture, x: number, y: number): SwipeDetails => {
        const base = details(gesture.axis!, x, y)
        const delta = gesture.axis === 'horizontal' ? x - gesture.startX : y - gesture.startY
        return {
          ...base,
          direction: gesture.axis === 'horizontal'
            ? (delta < 0 ? 'left' : 'right')
            : (delta < 0 ? 'up' : 'down')
        }
      },
      [details]
    )

    const setReadyState = useCallback((next: boolean) => {
      if (readyRef.current === next) return
      readyRef.current = next
      setReady(next)
    }, [])

    const stopShake = useCallback(() => {
      if (shakeTimerRef.current !== null) {
        clearTimeout(shakeTimerRef.current)
        pendingTimers.current.delete(shakeTimerRef.current)
        shakeTimerRef.current = null
      }
      setShaking(false)
    }, [])

    const setNearDeleteState = useCallback(
      (next: boolean) => {
        if (nearDeleteRef.current === next) return
        nearDeleteRef.current = next
        setNearDelete(next)
        if (!next) {
          stopShake()
        } else if (shake) {
          // A short haptic-like shake BEFORE reaching the deletion boundary.
          // Re-entry after backing out of the warning zone re-triggers it.
          stopShake()
          setShaking(true)
          shakeTimerRef.current = schedule(() => {
            shakeTimerRef.current = null
            setShaking(false)
          }, 300)
        }
      },
      [schedule, shake, stopShake]
    )

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || removing || verticalPhase || gestureRef.current) return
      if (event.isPrimary === false || (event.pointerType === 'mouse' && event.button !== 0)) return
      const target = event.target as Element
      if (target.closest('[data-swipe-action-panel]')) return
      if (ignoreInteractiveElements && target.closest(INTERACTIVE_SELECTOR)) return

      gestureRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        startX: offsetXRef.current,
        startY: offsetYRef.current,
        axis: null,
        moved: false
      }
    }

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      const gesture = gestureRef.current
      if (!gesture || event.pointerId !== gesture.pointerId || removing) return
      const dx = event.clientX - gesture.x
      const dy = event.clientY - gesture.y
      const distance = Math.max(0, activationDistance)

      if (!gesture.axis) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < distance) return
        if (Math.abs(dx) > Math.abs(dy) && canHorizontal) {
          gesture.axis = 'horizontal'
        } else if (Math.abs(dy) > Math.abs(dx) && canVertical &&
          (event.pointerType !== 'touch' || enableVerticalTouch)) {
          gesture.axis = 'vertical'
        } else {
          // Leave native vertical scrolling and other unhandled gestures alone.
          return
        }
        setDragging(true)
        try { event.currentTarget.setPointerCapture?.(event.pointerId) } catch { /* unsupported */ }
        onSwipeStart?.({
          ...details(gesture.axis, gesture.startX, gesture.startY),
          direction: gesture.axis === 'horizontal'
            ? (dx < 0 ? 'left' : 'right')
            : (dy < 0 ? 'up' : 'down')
        })
      }

      gesture.moved = true
      if (gesture.axis === 'horizontal') {
        let next = gesture.startX + dx
        if (!canRight) next = Math.min(0, next)
        if (!canLeft) next = Math.max(0, next)

        const maxLeft = Math.max(rightWidth * 1.8, leftFullThreshold * 1.1)
        const maxRight = Math.max(leftWidth * 1.8, rightFullThreshold * 1.1)
        const elastic = clamp(resistance, 0, 1)
        if (next < -maxLeft) next = -maxLeft - (-next - maxLeft) * elastic
        if (next > maxRight) next = maxRight + (next - maxRight) * elastic

        writeX(next)
        writeY(0)
        const side = sideForOffset(next)
        const eligible = allowFullSwipe && (side === 'right'
          ? Boolean(onFullSwipeLeft || (deleteLeft && onDelete))
          : side === 'left' && Boolean(onFullSwipeRight || deleteOnRightFullSwipe))
        const threshold = side === 'right' ? leftFullThreshold : rightFullThreshold
        const distanceToAction = Math.abs(next)
        // Warning starts BEFORE the true boundary; releasing early never deletes.
        setNearDeleteState(Boolean(eligible && distanceToAction >= threshold * clamp(shakeThreshold, 0.01, 1)))
        setReadyState(Boolean(eligible && distanceToAction >= threshold))
        onSwipeMove?.(gestureDetails(gesture, next, 0))
      } else {
        let next = gesture.startY + dy
        if (!canUp) next = Math.max(0, next)
        if (!canDown) next = Math.min(0, next)
        const maxY = verticalHeight * 2
        if (Math.abs(next) > maxY) {
          next = Math.sign(next) * (maxY + (Math.abs(next) - maxY) * clamp(resistance, 0, 1))
        }
        writeY(next)
        onSwipeMove?.(gestureDetails(gesture, 0, next))
      }
      event.stopPropagation()
    }

    const exitHorizontal = (side: SwipeSide) => {
      setRemoving(true)
      setReadyState(false)
      setNearDeleteState(false)
      const distance = Math.max(rootRef.current?.offsetWidth ?? 0, rightWidth, leftWidth) + 48
      writeX(side === 'right' ? -distance : distance)
      schedule(() => {
        if (side === 'right') {
          onFullSwipeLeft?.()
          if (deleteLeft) onDelete?.('left')
        } else {
          // Explicit deleteDirections chooses deletion; otherwise a custom
          // right full-swipe action (e.g. archive) takes precedence. Never both.
          if (deleteOnRightFullSwipe) onDelete?.('right')
          else onFullSwipeRight?.()
        }
        setRemoving(false)
        settle(null)
      }, motion === 'none' ? 0 : exitDuration)
    }

    const bounceVertical = (direction: 'up' | 'down') => {
      // Vertical gestures invoke an action, but NEVER remove or fade the card.
      // Keep the dragged position and lift a little more before springing home.
      const sign = direction === 'up' ? -1 : 1
      const extraLift = Math.min(24, Math.round(verticalHeight * 0.2))
      const peak = Math.max(Math.abs(offsetYRef.current) + extraLift, verticalHeight * 1.35)
      const liftMs = motion === 'none' ? 0 : 90
      const returnMs = motion === 'none' ? 0 : Math.max(0, verticalBounceDuration)

      setVerticalPhase('lifting')
      writeY(sign * peak)

      schedule(() => {
        setVerticalPhase('returning')
        writeY(0)
        if (direction === 'up') onSwipeUp?.()
        else onSwipeDown?.()
      }, liftMs)

      schedule(() => setVerticalPhase(null), liftMs + returnMs)
    }

    const finishGesture = (cancelled = false) => {
      const gesture = gestureRef.current
      if (!gesture) return
      gestureRef.current = null
      setDragging(false)
      if (!gesture.axis) return
      if (gesture.moved) suppressClickUntilRef.current = Date.now() + 450
      const current = gestureDetails(gesture, offsetXRef.current, offsetYRef.current)
      if (cancelled) {
        writeX(getSnapX(openRef.current))
        writeY(0)
        setReadyState(false)
        setNearDeleteState(false)
        onSwipeCancel?.()
        return
      }
      onSwipeEnd?.(current)

      if (gesture.axis === 'horizontal') {
        const side = sideForOffset(offsetXRef.current)
        const width = side === 'right' ? rightWidth : leftWidth
        const canExit = allowFullSwipe && Boolean(side) &&
          (side === 'right'
            ? Boolean(onFullSwipeLeft || (deleteLeft && onDelete))
            : Boolean(onFullSwipeRight || deleteOnRightFullSwipe))
        const threshold = side === 'right' ? leftFullThreshold : rightFullThreshold
        setReadyState(false)
        setNearDeleteState(false)
        if (side && canExit && Math.abs(offsetXRef.current) >= threshold) {
          exitHorizontal(side)
          return
        }
        // With no action panel to reveal, a short swipe must bounce back.
        const hasPanel = side === 'right' ? rightActions !== undefined : leftActions !== undefined
        if (side && hasPanel && Math.abs(offsetXRef.current) >= width * clamp(openThreshold, 0, 1)) {
          settle(side)
          if (side === 'right' && current.direction === 'left') onSwipeLeft?.()
          else if (side === 'left' && current.direction === 'right') onSwipeRight?.()
        } else {
          settle(null)
        }
      } else {
        setReadyState(false)
        setNearDeleteState(false)
        const y = offsetYRef.current
        const isUp = y < 0
        const valid = isUp ? canUp && Boolean(onSwipeUp) : canDown && Boolean(onSwipeDown)
        if (valid && Math.abs(y) >= verticalHeight * verticalThreshold) {
          bounceVertical(isUp ? 'up' : 'down')
        } else {
          writeY(0)
        }
      }
    }

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      if (gestureRef.current?.pointerId !== event.pointerId) return
      finishGesture()
    }
    const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
      if (gestureRef.current?.pointerId !== event.pointerId) return
      finishGesture(true)
    }

    const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
      if (Date.now() <= suppressClickUntilRef.current) {
        event.preventDefault()
        event.stopPropagation()
        suppressClickUntilRef.current = 0
      }
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnActionClick && (event.target as Element).closest('[data-swipe-action-panel]')) {
        close()
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!keyboard || disabled || removing) return
      // Escape also works while focus is on an exposed action button.
      if (event.key === 'Escape' || (event.key === 'Home' && event.target === event.currentTarget)) {
        if (currentOpen) {
          event.preventDefault()
          close()
        }
        return
      }
      // Do not steal arrow/navigation keys from nested controls.
      if (event.target !== event.currentTarget) return
      if (event.key === 'ArrowLeft' && canLeft) {
        event.preventDefault()
        openPanel('right')
      } else if (event.key === 'ArrowRight' && canRight) {
        event.preventDefault()
        openPanel('left')
      } else if ((event.key === 'Delete' || event.key === 'Backspace') &&
        deleteOnKeyboard && allowFullSwipe && onDelete && (deleteLeft || deleteRight)) {
        event.preventDefault()
        exitHorizontal(deleteLeft ? 'right' : 'left')
      }
    }

    const progress = clamp(Math.abs(offsetX) / (offsetX < 0 ? rightWidth : leftWidth), 0, 1)
    const red = Math.round(80 + (255 - 80) * progress)
    const green = Math.round(167 + (194 - 167) * progress)
    const blue = Math.round(115 + (194 - 115) * progress)
    const animatedBackground = gradientAnimation ? `rgb(${red}, ${green}, ${blue})` : 'transparent'
    const tilt = rotateOnSwipe * clamp(offsetX / (offsetX < 0 ? rightWidth : leftWidth), -1, 1)
    const scale = 1 - clamp(scaleOnSwipe, 0, 0.2) * progress

    const draggingState = dragging ? styles.dragging : ''
    const rightVisible = showActions && currentOpen === 'right'
    const leftVisible = showActions && currentOpen === 'left'

    return (
      <div
        ref={rootRef}
        data-testid={testId}
        data-state={removing ? 'leaving' : verticalPhase ? `vertical-${verticalPhase}` : dragging ? 'dragging' : currentOpen ? `open-${currentOpen}` : 'closed'}
        data-ready={ready ? 'true' : 'false'}
        data-delete-zone={ready ? 'ready' : nearDelete ? 'approaching' : 'idle'}
        className={[
          styles.swipeWrapper,
          draggingState,
          ready ? styles.ready : '',
          nearDelete ? styles.warning : '',
          shaking ? styles.shake : '',
          removing ? styles.removing : '',
          verticalPhase === 'lifting' ? styles.verticalLifting : '',
          verticalPhase === 'returning' ? styles.verticalReturning : '',
          disabled ? styles.disabled : '',
          className ?? ''
        ].filter(Boolean).join(' ')}
        style={{
          ...wrapperStyle,
          touchAction: canVertical && enableVerticalTouch ? 'none' : 'pan-y',
          ['--swipe-duration' as string]: `${motion === 'none' ? 0 : Math.max(0, animationDuration)}ms`,
          ['--swipe-exit-duration' as string]: `${motion === 'none' ? 0 : Math.max(0, exitDuration)}ms`,
          ['--swipe-vertical-return-duration' as string]: `${motion === 'none' ? 0 : Math.max(0, verticalBounceDuration)}ms`,
          ['--swipe-vertical-lift-duration' as string]: `${motion === 'none' ? 0 : 90}ms`,
          ['--swipe-ease' as string]: easing[motion]
        } as React.CSSProperties}
        role="group"
        aria-label={ariaLabel}
        tabIndex={keyboard && !disabled ? 0 : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={() => { if (gestureRef.current) finishGesture(true) }}
        onClickCapture={handleClickCapture}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {leftActions !== undefined && (
          <div
            ref={leftPanelRef}
            data-swipe-action-panel="left"
            className={[styles.hiddenActions, styles.leftActions, actionsClassName, leftActionsClassName].filter(Boolean).join(' ')}
            aria-hidden={!leftVisible}
            style={{
              width: sticky ? Math.max(leftWidth, offsetX) : leftWidth,
              background: animatedBackground,
              pointerEvents: leftVisible ? 'auto' : 'none',
              ...leftActionsStyle
            }}
          >
            {showActions ? leftActions : null}
          </div>
        )}
        {rightActions !== undefined && (
          <div
            ref={rightPanelRef}
            data-swipe-action-panel="right"
            className={[styles.hiddenActions, styles.rightActions, actionsClassName].filter(Boolean).join(' ')}
            aria-hidden={!rightVisible}
            style={{
              width: sticky ? Math.max(rightWidth, -offsetX) : rightWidth,
              background: animatedBackground,
              pointerEvents: rightVisible ? 'auto' : 'none',
              ...style
            }}
          >
            {showActions ? rightActions : null}
          </div>
        )}
        <div
          className={[styles.frontContent, contentClassName].filter(Boolean).join(' ')}
          style={{
            transform: `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${tilt}deg) scale(${scale})`
          }}
        >
          {children}
        </div>
        <span className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">
          {ready ? 'Suelta para confirmar la acción' :
            nearDelete ? 'Continúa deslizando para confirmar la acción' :
              currentOpen === 'right' ? 'Acciones de la derecha disponibles' :
                currentOpen === 'left' ? 'Acciones de la izquierda disponibles' : ''}
        </span>
      </div>
    )
  }
)

SwipeableCard.displayName = 'SwipeableCard'
