'use client'

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'

import { PColor } from '../../../assets/colors'
import { SwipeableCard } from '../SwipeableCard'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../utils'

import styles from './styles.module.css'

/**
 * Supported toast positions.
 *
 * The original four positions are preserved and extended
 * to support a complete 3x3 notification layout.
 */
export enum ToastPosition {
  'top-left' = 'top-left',
  'top-center' = 'top-center',
  'top-right' = 'top-right',

  'center-left' = 'center-left',
  center = 'center',
  'center-right' = 'center-right',

  'bottom-left' = 'bottom-left',
  'bottom-center' = 'bottom-center',
  'bottom-right' = 'bottom-right'
}

/**
 * Supported toast colors.
 */
export type ToastBackgroundColor =
  | 'success'
  | 'warning'
  | 'error'

/**
 * Supported toast identifiers.
 */
export type ToastId = string | number

/**
 * Public toast item.
 *
 * `createdAt` and `sequence` are optional so existing consumers
 * remain compatible. When omitted, Toast assigns them internally.
 */
export interface ToastItem {
  position?: ToastPosition | string | null
  id: ToastId
  title: string
  description: string
  backgroundColor?: ToastBackgroundColor | string

  /**
   * Timestamp when the notification was created.
   * Used to preserve real auto-delete timing.
   */
  createdAt?: number

  /**
   * Monotonic numeric order used to determine
   * appearance and removal ordering.
   */
  sequence?: number
}

/**
 * Internal lifecycle of a toast.
 */
type ToastLifecycle =
  | 'visible'
  | 'queued'
  | 'exiting'

/**
 * Internal runtime representation.
 */
interface RuntimeToastItem extends ToastItem {
  createdAt: number
  sequence: number
  lifecycle: ToastLifecycle

  /**
   * Indicates whether the item is still present
   * in the parent/context state.
   */
  parentPresent: boolean
}

/**
 * CSS custom properties used by the component.
 */
type ToastCSSProperties = React.CSSProperties & {
  [key: `--${string}`]: string | number
}

/**
 * Toast component configuration.
 */
export interface ToastProps {
  toastList: ToastItem[]
  position?: ToastPosition
  autoDelete?: boolean
  autoDeleteTime?: number
  visibleCounter?: boolean
  deleteToast: (id: string) => void

  /**
   * Number of cards visible in the stack.
   */
  maxVisible?: number

  /**
   * Vertical distance between stacked cards.
   */
  stackOffsetY?: number

  /**
   * Scale reduction for each card behind the active card.
   */
  stackScaleStep?: number

  /**
   * Threshold at which stacking starts.
   *
   * Defaults to 0 to preserve existing behavior.
   */
  stackThreshold?: number

  /**
   * Duration of the exit animation.
   */
  exitAnimationDuration?: number

  /**
   * Delay between consecutive removals.
   */
  exitStagger?: number

  /**
   * Pause auto-delete when the user hovers/focuses the toast.
   */
  pauseOnHover?: boolean

  /**
   * Display auto-delete progress bar.
   */
  showProgress?: boolean

  /**
   * Clicking the toast body dismisses it.
   */
  dismissOnClick?: boolean

  /**
   * Render into a root directly under document.body.
   *
   * This prevents parent stacking contexts from breaking z-index.
   */
  usePortal?: boolean

  /**
   * Preserved for backwards compatibility.
   *
   * The stack no longer lifts/reorders cards on hover.
   */
  stackHoverLift?: boolean

  /**
   * Preserved for backwards compatibility.
   *
   * The stack no longer scales cards on hover.
   */
  stackHoverScale?: number

  /**
   * Duration of stack reposition transitions.
   */
  stackTransitionDuration?: number

  /**
   * Width of the toast.
   *
   * Can be a CSS width value:
   *
   * `520px`
   * `40rem`
   * `min(620px, calc(100vw - 24px))`
   * `90vw`
   *
   * The default is responsive.
   */
  toastWidth?: React.CSSProperties['width']
}

const DEFAULT_VISIBLE_STACK = 5
const DEFAULT_OFFSET_Y = 20
const DEFAULT_SCALE_STEP = 0.02
const DEFAULT_EXIT_DURATION = 350
const DEFAULT_EXIT_STAGGER = 90
const DEFAULT_STACK_TRANSITION_DURATION = 520
const DEFAULT_STACK_HOVER_SCALE = 1.015

/**
 * Small grace period before restarting auto-delete.
 *
 * Helps avoid abrupt resume when pointer briefly leaves
 * a toast during a stack transition.
 */
const HOVER_RESUME_GRACE = 120

const COLOR_MAP: Record<string, string> = {
  success: '#50a773',
  warning: '#ebbc26',
  error: `${PColor}69`
}

const ICON_MAP: Record<string, string> = {
  success: 'IconSuccess',
  warning: 'IconWarning',
  error: 'IconError'
}

/**
 * Converts any ToastId to a stable string key.
 *
 * @param id Toast identifier.
 * @returns Normalized identifier.
 */
const getToastKey = (id: ToastId): string => {
  return String(id)
}

/**
 * Resolves an arbitrary position to a supported ToastPosition.
 *
 * @param value Candidate position.
 * @param fallback Fallback position.
 * @returns Valid toast position.
 */
const resolvePosition = (
  value: ToastItem['position'],
  fallback: ToastPosition
): ToastPosition => {
  if (
    value === ToastPosition['top-left'] ||
    value === ToastPosition['top-center'] ||
    value === ToastPosition['top-right'] ||
    value === ToastPosition['center-left'] ||
    value === ToastPosition.center ||
    value === ToastPosition['center-right'] ||
    value === ToastPosition['bottom-left'] ||
    value === ToastPosition['bottom-center'] ||
    value === ToastPosition['bottom-right']
  ) {
    return value
  }

  return fallback
}

/**
 * Returns the background color associated with a toast type.
 *
 * @param color Toast color.
 * @returns CSS color value.
 */
const getBackgroundColor = (
  color?: ToastItem['backgroundColor']
): string => {
  if (!color) {
    return COLOR_MAP.success
  }

  return COLOR_MAP[color] ?? COLOR_MAP.success
}

/**
 * Returns the icon associated with a toast type.
 *
 * @param color Toast color.
 * @returns Icon identifier.
 */
const getIcon = (
  color?: ToastItem['backgroundColor']
): string => {
  return ICON_MAP[color ?? 'success'] ?? 'IconInfo'
}

/**
 * Determines whether a position is located on the bottom.
 *
 * @param position Toast position.
 * @returns True when position is bottom-left,
 * bottom-center or bottom-right.
 */
const isBottomPosition = (
  position: ToastPosition
): boolean => {
  return (
    position === ToastPosition['bottom-left'] ||
    position === ToastPosition['bottom-center'] ||
    position === ToastPosition['bottom-right']
  )
}

/**
 * Determines whether a position is located on the left.
 *
 * @param position ToastPosition.
 * @returns True when position is a left-side position.
 */
const isLeftPosition = (
  position: ToastPosition
): boolean => {
  return (
    position === ToastPosition['top-left'] ||
    position === ToastPosition['center-left'] ||
    position === ToastPosition['bottom-left']
  )
}

/**
 * Returns the animation direction class for a toast.
 *
 * @param position Toast position.
 * @param lifecycle Current toast lifecycle.
 * @returns CSS module class.
 */
const getMotionClass = (
  position: ToastPosition,
  lifecycle: ToastLifecycle
): string => {
  if (lifecycle === 'queued') {
    return ''
  }

  const prefix =
    lifecycle === 'exiting'
      ? 'exit'
      : 'enter'

  return styles[`${prefix}-${position}`] ?? ''
}

/**
 * Toast component.
 */
export const Toast: React.FC<ToastProps> = ({
  toastList,
  position = ToastPosition['top-right'],
  autoDelete = false,
  visibleCounter = false,
  autoDeleteTime = 5000,
  deleteToast,
  maxVisible = DEFAULT_VISIBLE_STACK,
  stackOffsetY = DEFAULT_OFFSET_Y,
  stackScaleStep = DEFAULT_SCALE_STEP,
  stackThreshold = 0,
  exitAnimationDuration = DEFAULT_EXIT_DURATION,
  exitStagger = DEFAULT_EXIT_STAGGER,
  pauseOnHover = true,
  showProgress = true,
  dismissOnClick = false,
  usePortal = true,
  stackHoverLift = false,
  stackHoverScale = DEFAULT_STACK_HOVER_SCALE,
  stackTransitionDuration =
    DEFAULT_STACK_TRANSITION_DURATION,
  toastWidth = 'min(560px, calc(100vw - 24px))'
}) => {
  const [list, setList] = useState<RuntimeToastItem[]>([])

  const [hoveredIds, setHoveredIds] =
    useState<Set<string>>(new Set())

  const [portalRoot, setPortalRoot] =
    useState<HTMLElement | null>(null)

  /**
   * Stores metadata across prop updates.
   */
  const metadataRef = useRef<
    Map<
      string,
      {
        sequence: number
        createdAt: number
      }
    >
  >(new Map())

  /**
   * Monotonic appearance counter.
   */
  const sequenceRef = useRef(0)

  /**
   * Latest runtime state for callbacks/timers.
   */
  const listRef = useRef<RuntimeToastItem[]>([])

  /**
   * Auto-delete timers.
   */
  const autoDeleteTimersRef = useRef<
    Record<
      string,
      ReturnType<typeof setTimeout>
    >
  >({})

  /**
   * Absolute auto-delete deadlines.
   */
  const autoDeleteDeadlinesRef = useRef<
    Record<string, number>
  >({})

  /**
   * Remaining duration while a toast is paused.
   */
  const pausedRemainingRef = useRef<
    Record<string, number>
  >({})

  /**
   * Persistent progress offsets.
   */
  const progressDelayRef = useRef<
    Record<
      string,
      {
        signature: string
        delay: number
      }
    >
  >({})

  /**
   * Queue of toasts waiting for exit animation.
   */
  const pendingExitRef = useRef<Set<string>>(
    new Set()
  )

  /**
   * Prevents multiple exit animations at once.
   */
  const exitProcessingRef = useRef(false)

  /**
   * Finish-animation timers.
   */
  const exitFinishTimersRef = useRef<
    Record<
      string,
      ReturnType<typeof setTimeout>
    >
  >({})

  /**
   * Gap timer between consecutive exits.
   */
  const exitGapTimerRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null)

  /**
   * Hover resume timers.
   */
  const hoverResumeTimersRef = useRef<
    Record<
      string,
      ReturnType<typeof setTimeout>
    >
  >({})

  /**
   * Created portal root.
   */
  const portalOwnedRef = useRef(false)

  /**
   * Keeps listRef synchronized.
   */
  useEffect(() => {
    listRef.current = list
  }, [list])

  /**
   * Keeps the preserved hover configuration available
   * without changing visual stack behavior.
   */
  useEffect(() => {
    void stackHoverLift
    void stackHoverScale
  }, [stackHoverLift, stackHoverScale])

  /**
   * Creates an isolated portal root directly under body.
   *
   * @returns Optional cleanup function.
   */
  useEffect(() => {
    if (!usePortal) {
      setPortalRoot(null)
      return
    }

    if (
      typeof document === 'undefined' ||
      !document.body
    ) {
      return
    }

    const root =
      document.createElement('div')

    root.dataset.toastPortal = 'true'

    Object.assign(root.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '2147483647',
      isolation: 'isolate',
      overflow: 'visible'
    })

    document.body.appendChild(root)

    portalOwnedRef.current = true

    setPortalRoot(root)

    return () => {
      if (portalOwnedRef.current) {
        root.remove()
        portalOwnedRef.current = false
      }

      setPortalRoot(null)
    }
  }, [usePortal])

  /**
   * Cleanup timers on unmount.
   */
  useEffect(() => {
    return () => {
      Object.values(
        autoDeleteTimersRef.current
      ).forEach((timerId) => {
        globalThis.clearTimeout(timerId)
      })

      Object.values(
        exitFinishTimersRef.current
      ).forEach((timerId) => {
        globalThis.clearTimeout(timerId)
      })

      Object.values(
        hoverResumeTimersRef.current
      ).forEach((timerId) => {
        globalThis.clearTimeout(timerId)
      })

      if (exitGapTimerRef.current) {
        globalThis.clearTimeout(
          exitGapTimerRef.current
        )
      }

      autoDeleteTimersRef.current = {}
      exitFinishTimersRef.current = {}
      hoverResumeTimersRef.current = {}
      autoDeleteDeadlinesRef.current = {}
      pausedRemainingRef.current = {}
      progressDelayRef.current = {}
    }
  }, [])

  /**
   * Gets or creates persistent metadata for a toast.
   *
   * @param toast Incoming toast.
   * @returns Persistent metadata.
   */
  const getMetadata = useCallback(
    (toast: ToastItem) => {
      const key = getToastKey(toast.id)

      const existing =
        metadataRef.current.get(key)

      const createdAt =
        typeof toast.createdAt === 'number'
          ? toast.createdAt
          : existing?.createdAt ??
            Date.now()

      const sequence =
        typeof toast.sequence === 'number'
          ? toast.sequence
          : existing?.sequence ??
            sequenceRef.current++

      sequenceRef.current = Math.max(
        sequenceRef.current,
        sequence + 1
      )

      const metadata = {
        createdAt,
        sequence
      }

      metadataRef.current.set(
        key,
        metadata
      )

      return metadata
    },
    []
  )

  /**
   * Synchronizes incoming parent state
   * with local runtime state.
   */
  useEffect(() => {
    setList((previous) => {
      const previousById = new Map(
        previous.map((item) => [
          getToastKey(item.id),
          item
        ])
      )

      const incomingIds = new Set<string>()

      const next: RuntimeToastItem[] = []

      toastList.forEach((toast) => {
        const key =
          getToastKey(toast.id)

        const previousItem =
          previousById.get(key)

        const metadata =
          getMetadata(toast)

        incomingIds.add(key)

        next.push({
          ...previousItem,
          ...toast,
          createdAt:
            metadata.createdAt,
          sequence:
            metadata.sequence,
          lifecycle:
            previousItem?.lifecycle ??
            'visible',
          parentPresent: true
        })
      })

      previous.forEach((item) => {
        const key =
          getToastKey(item.id)

        if (incomingIds.has(key)) {
          return
        }

        if (
          item.lifecycle ===
          'visible'
        ) {
          next.push({
            ...item,
            lifecycle: 'queued',
            parentPresent: false
          })

          return
        }

        next.push({
          ...item,
          parentPresent: false
        })
      })

      return next.sort(
        (a, b) =>
          a.sequence - b.sequence
      )
    })
  }, [toastList, getMetadata])

  /**
   * Clears an auto-delete timer.
   *
   * @param key Normalized toast id.
   */
  const clearAutoDeleteTimer =
    useCallback((key: string) => {
      const timer =
        autoDeleteTimersRef.current[key]

      if (timer) {
        globalThis.clearTimeout(timer)

        delete autoDeleteTimersRef.current[
          key
        ]
      }
    }, [])

  /**
   * Clears a hover resume timer.
   *
   * @param key Normalized toast id.
   */
  const clearHoverResumeTimer =
    useCallback((key: string) => {
      const timer =
        hoverResumeTimersRef.current[key]

      if (timer) {
        globalThis.clearTimeout(timer)

        delete hoverResumeTimersRef.current[
          key
        ]
      }
    }, [])

  /**
   * Final physical removal.
   *
   * @param id Toast identifier.
   */
  const finishDelete = useCallback(
    (id: ToastId) => {
      const key = getToastKey(id)

      clearAutoDeleteTimer(key)
      clearHoverResumeTimer(key)

      if (
        exitFinishTimersRef.current[key]
      ) {
        globalThis.clearTimeout(
          exitFinishTimersRef.current[key]
        )

        delete exitFinishTimersRef.current[
          key
        ]
      }

      const existingItem =
        listRef.current.find(
          (item) =>
            getToastKey(item.id) ===
            key
        )

      setList((previous) =>
        previous.filter(
          (item) =>
            getToastKey(item.id) !==
            key
        )
      )

      metadataRef.current.delete(key)

      delete autoDeleteDeadlinesRef.current[
        key
      ]

      delete pausedRemainingRef.current[
        key
      ]

      delete progressDelayRef.current[
        key
      ]

      setHoveredIds((previous) => {
        if (!previous.has(key)) {
          return previous
        }

        const next = new Set(previous)

        next.delete(key)

        return next
      })

      if (
        existingItem?.parentPresent !==
        false
      ) {
        deleteToast(String(id))
      }
    },
    [
      clearAutoDeleteTimer,
      clearHoverResumeTimer,
      deleteToast
    ]
  )

  /**
   * Processes exit queue sequentially.
   */
  const processExitQueue =
    useCallback(() => {
      if (
        exitProcessingRef.current
      ) {
        return
      }

      const pendingItems =
        listRef.current
          .filter((item) =>
            pendingExitRef.current.has(
              getToastKey(item.id)
            )
          )
          .sort(
            (a, b) =>
              a.sequence - b.sequence
          )

      if (
        pendingItems.length === 0
      ) {
        return
      }

      const nextToast =
        pendingItems[0]

      const key =
        getToastKey(nextToast.id)

      pendingExitRef.current.delete(
        key
      )

      exitProcessingRef.current =
        true

      clearAutoDeleteTimer(key)

      setList((previous) =>
        previous.map((item) =>
          getToastKey(item.id) ===
          key
            ? {
                ...item,
                lifecycle: 'exiting'
              }
            : item
        )
      )

      exitFinishTimersRef.current[
        key
      ] = globalThis.setTimeout(() => {
        finishDelete(nextToast.id)

        exitGapTimerRef.current =
          globalThis.setTimeout(() => {
            exitGapTimerRef.current =
              null

            exitProcessingRef.current =
              false

            processExitQueue()
          }, exitStagger)
      }, exitAnimationDuration)
    }, [
      clearAutoDeleteTimer,
      exitAnimationDuration,
      exitStagger,
      finishDelete
    ])

  /**
   * Converts a visible toast into a queued exit.
   *
   * @param id Toast identifier.
   */
  const requestDeleteById =
    useCallback(
      (id: ToastId) => {
        const key =
          getToastKey(id)

        const target =
          listRef.current.find(
            (item) =>
              getToastKey(item.id) ===
              key
          )

        if (!target) {
          return
        }

        if (
          target.lifecycle !==
          'visible'
        ) {
          return
        }

        clearAutoDeleteTimer(key)
        clearHoverResumeTimer(key)

        delete autoDeleteDeadlinesRef.current[
          key
        ]

        delete pausedRemainingRef.current[
          key
        ]

        pendingExitRef.current.add(key)

        setList((previous) =>
          previous.map((item) =>
            getToastKey(item.id) ===
            key
              ? {
                  ...item,
                  lifecycle: 'queued'
                }
              : item
          )
        )
      },
      [
        clearAutoDeleteTimer,
        clearHoverResumeTimer
      ]
    )

  /**
   * Whenever queued items exist,
   * feed them to the exit processor.
   */
  useEffect(() => {
    list.forEach((item) => {
      if (
        item.lifecycle ===
        'queued'
      ) {
        pendingExitRef.current.add(
          getToastKey(item.id)
        )
      }
    })

    processExitQueue()
  }, [list, processExitQueue])

  /**
   * Arms an auto-delete timer.
   *
   * @param toast Toast item.
   * @param delay Delay until deletion.
   */
  const scheduleAutoDelete =
    useCallback(
      (
        toast: RuntimeToastItem,
        delay: number
      ) => {
        const key =
          getToastKey(toast.id)

        clearAutoDeleteTimer(key)

        autoDeleteTimersRef.current[
          key
        ] = globalThis.setTimeout(() => {
          delete autoDeleteTimersRef.current[
            key
          ]

          delete autoDeleteDeadlinesRef.current[
            key
          ]

          requestDeleteById(toast.id)
        }, Math.max(0, delay))
      },
      [
        clearAutoDeleteTimer,
        requestDeleteById
      ]
    )

  /**
   * Synchronizes auto-delete timers.
   */
  useEffect(() => {
    if (!autoDelete) {
      Object.keys(
        autoDeleteTimersRef.current
      ).forEach((key) => {
        clearAutoDeleteTimer(key)
      })

      autoDeleteDeadlinesRef.current = {}

      return
    }

    const now = Date.now()

    list.forEach((toast) => {
      const key =
        getToastKey(toast.id)

      if (
        toast.lifecycle !==
          'visible' ||
        !toast.parentPresent
      ) {
        clearAutoDeleteTimer(key)

        delete autoDeleteDeadlinesRef.current[
          key
        ]

        return
      }

      if (
        autoDeleteDeadlinesRef.current[
          key
        ] === undefined
      ) {
        autoDeleteDeadlinesRef.current[
          key
        ] =
          toast.createdAt +
          autoDeleteTime
      }

      if (
        !autoDeleteTimersRef.current[
          key
        ] &&
        !hoveredIds.has(key)
      ) {
        const remaining =
          autoDeleteDeadlinesRef.current[
            key
          ] - now

        scheduleAutoDelete(
          toast,
          remaining
        )
      }
    })

    Object.keys(
      autoDeleteTimersRef.current
    ).forEach((key) => {
      const exists = list.some(
        (item) =>
          getToastKey(item.id) ===
            key &&
          item.lifecycle ===
            'visible'
      )

      if (!exists) {
        clearAutoDeleteTimer(key)
      }
    })
  }, [
    autoDelete,
    autoDeleteTime,
    clearAutoDeleteTimer,
    hoveredIds,
    list,
    scheduleAutoDelete
  ])

  /**
   * Pauses auto-delete on hover/focus.
   *
   * @param id Toast identifier.
   */
  const pauseAutoDelete =
    useCallback(
      (id: ToastId) => {
        if (
          !autoDelete ||
          !pauseOnHover
        ) {
          return
        }

        const key =
          getToastKey(id)

        clearHoverResumeTimer(key)

        const toast =
          listRef.current.find(
            (item) =>
              getToastKey(item.id) ===
                key &&
              item.lifecycle ===
                'visible'
          )

        if (!toast) {
          return
        }

        const deadline =
          autoDeleteDeadlinesRef
            .current[key]

        if (
          deadline !== undefined
        ) {
          pausedRemainingRef.current[
            key
          ] = Math.max(
            0,
            deadline - Date.now()
          )
        }

        clearAutoDeleteTimer(key)

        setHoveredIds((previous) => {
          if (previous.has(key)) {
            return previous
          }

          const next = new Set(previous)

          next.add(key)

          return next
        })
      },
      [
        autoDelete,
        clearAutoDeleteTimer,
        clearHoverResumeTimer,
        pauseOnHover
      ]
    )

  /**
   * Resumes auto-delete after hover/focus.
   *
   * @param id Toast identifier.
   */
  const resumeAutoDelete =
    useCallback(
      (id: ToastId) => {
        if (
          !autoDelete ||
          !pauseOnHover
        ) {
          return
        }

        const key =
          getToastKey(id)

        clearHoverResumeTimer(key)

        hoverResumeTimersRef.current[
          key
        ] =
          globalThis.setTimeout(() => {
            delete hoverResumeTimersRef.current[
              key
            ]

            setHoveredIds((previous) => {
              if (!previous.has(key)) {
                return previous
              }

              const next = new Set(previous)

              next.delete(key)

              return next
            })

            const toast =
              listRef.current.find(
                (item) =>
                  getToastKey(
                    item.id
                  ) === key &&
                  item.lifecycle ===
                    'visible'
              )

            if (!toast) {
              return
            }

            const remaining =
              pausedRemainingRef.current[
                key
              ] ??
              Math.max(
                0,
                toast.createdAt +
                  autoDeleteTime -
                  Date.now()
              )

            delete pausedRemainingRef.current[
              key
            ]

            autoDeleteDeadlinesRef.current[
              key
            ] =
              Date.now() +
              remaining

            if (remaining <= 0) {
              requestDeleteById(id)
              return
            }

            scheduleAutoDelete(
              toast,
              remaining
            )
          }, HOVER_RESUME_GRACE)
      },
      [
        autoDelete,
        autoDeleteTime,
        clearHoverResumeTimer,
        pauseOnHover,
        requestDeleteById,
        scheduleAutoDelete
      ]
    )

  /**
   * Handles focus leaving the toast.
   *
   * @param event Focus event.
   * @param id Toast identifier.
   */
  const handleToastBlur =
    useCallback(
      (
        event: React.FocusEvent<HTMLDivElement>,
        id: ToastId
      ) => {
        const nextTarget =
          event.relatedTarget as
            | Node
            | null

        if (
          nextTarget &&
          event.currentTarget.contains(
            nextTarget
          )
        ) {
          return
        }

        resumeAutoDelete(id)
      },
      [resumeAutoDelete]
    )

  /**
   * Handles toast click.
   *
   * @param event Mouse event.
   * @param id Toast identifier.
   */
  const handleToastClick =
    useCallback(
      (
        event: React.MouseEvent<HTMLDivElement>,
        id: ToastId
      ) => {
        if (!dismissOnClick) {
          return
        }

        if (event.defaultPrevented) {
          return
        }

        requestDeleteById(id)
      },
      [
        dismissOnClick,
        requestDeleteById
      ]
    )

  /**
   * Returns a stable progress animation delay.
   *
   * @param toast Toast item.
   * @returns Negative animation delay in milliseconds.
   */
  const getProgressDelay =
    useCallback(
      (
        toast: RuntimeToastItem
      ): number => {
        const key =
          getToastKey(toast.id)

        const signature =
          `${toast.createdAt}:${autoDeleteTime}`

        const cached =
          progressDelayRef.current[
            key
          ]

        if (
          cached &&
          cached.signature ===
            signature
        ) {
          return cached.delay
        }

        const elapsed = Math.max(
          0,
          Date.now() -
            toast.createdAt
        )

        const delay = -Math.min(
          elapsed,
          autoDeleteTime
        )

        progressDelayRef.current[
          key
        ] = {
          signature,
          delay
        }

        return delay
      },
      [autoDeleteTime]
    )

  /**
   * Shared toast visual renderer.
   *
   * Keeping one visual implementation prevents the
   * stacked and non-stacked versions from behaving differently.
   *
   * @param toast Toast item.
   * @param groupPosition Toast group position.
   * @param isHovered Whether the toast is hovered.
   * @returns Toast content.
   */
  const renderToastVisual =
    useCallback(
      (
        toast: RuntimeToastItem,
        groupPosition: ToastPosition,
        isHovered: boolean
      ) => {
        const isBottom =
          isBottomPosition(
            groupPosition
          )

        const progressDelay =
          getProgressDelay(toast)

        const backgroundColor =
          getBackgroundColor(
            toast.backgroundColor
          )

        return (
          <SwipeableCard
            swipeWidth={100}
            autoClose={false}
            shake={true}
            gradientAnimation={true}
            onDelete={() =>
              requestDeleteById(
                toast.id
              )
            }
            delay={1500}
            style={{
              top: 15,
              right: 15
            }}
            rightActions={
              groupPosition ===
              ToastPosition['bottom-left']
                ? null
                : (
                  <div
                    className={
                      styles[
                        'toast-delete-action'
                      ]
                    }
                    onClick={(event) => {
                      event.stopPropagation()

                      requestDeleteById(
                        toast.id
                      )
                    }}
                    role='button'
                    aria-label={`Eliminar notificación ${toast.title}`}
                  >
                    <button
                      type='button'
                      className={
                        styles[
                          'toast-delete-action-button'
                        ]
                      }
                      aria-label={`Eliminar notificación ${toast.title}`}
                    >
                      <Icon
                        icon='IconDelete'
                        color={getGlobalStyle(
                          '--color-icons-white'
                        )}
                        size={20}
                      />
                    </button>
                  </div>
                )
            }
          >
            <div
              className={`${styles.notification} ${styles.toast}`}
              style={
                {
                  '--toast-background':
                    backgroundColor,
                  '--toast-width':
                    typeof toastWidth ===
                    'number'
                      ? `${toastWidth}px`
                      : toastWidth,
                  backgroundColor
                } satisfies ToastCSSProperties
              }
            >
              <div
                className={
                  styles['toast-header']
                }
              >
                <div
                  className={
                    styles[
                      'toast-title-wrapper'
                    ]
                  }
                >
                  <span
                    className={
                      styles[
                        'toast-icon'
                      ]
                    }
                  >
                    <Icon
                      icon={getIcon(
                        toast.backgroundColor
                      )}
                      color={getGlobalStyle(
                        '--color-icons-white'
                      )}
                      size={20}
                    />
                  </span>

                  <p
                    className={
                      styles[
                        'notification-title'
                      ]
                    }
                  >
                    {String(
                      toast.title
                    )}
                  </p>
                </div>

                <button
                  type='button'
                  className={
                    styles[
                      'notification-button'
                    ]
                  }
                  onClick={(event) => {
                    event.stopPropagation()

                    requestDeleteById(
                      toast.id
                    )
                  }}
                  aria-label={`Cerrar notificación ${toast.title}`}
                >
                  <Icon
                    icon='IconCancel'
                    color={getGlobalStyle(
                      '--color-icons-white'
                    )}
                    size={25}
                  />
                </button>
              </div>

              <p
                className={
                  styles[
                    'notification-message'
                  ]
                }
              >
                {String(
                  toast.description
                )}
              </p>

              {autoDelete &&
                showProgress &&
                toast.lifecycle ===
                  'visible' && (
                  <div
                    className={
                      styles[
                        'toast-progress-track'
                      ]
                    }
                    aria-hidden='true'
                  >
                    <div
                      className={
                        styles[
                          'toast-progress'
                        ]
                      }
                      style={{
                        animationDuration:
                          `${autoDeleteTime}ms`,
                        animationDelay:
                          `${progressDelay}ms`
                      }}
                    />
                  </div>
                )}
            </div>
          </SwipeableCard>
        )
      },
      [
        autoDelete,
        autoDeleteTime,
        getProgressDelay,
        requestDeleteById,
        showProgress,
        toastWidth
      ]
    )

  /**
   * Renders a single toast motion wrapper.
   *
   * @param toast Toast item.
   * @param groupPosition Toast group position.
   * @param stacked Whether the toast belongs to a stack.
   * @param isHovered Whether the toast is hovered.
   * @param depth Stack depth.
   * @param counter Number of hidden toasts.
   * @returns Toast motion element.
   */
  const renderToastMotion =
    useCallback(
      (
        toast: RuntimeToastItem,
        groupPosition: ToastPosition,
        stacked = false,
        isHovered = false,
        depth = 0,
        counter = 0
      ) => {
        const isLeft =
          isLeftPosition(
            groupPosition
          )

        const motionClass =
          getMotionClass(
            groupPosition,
            toast.lifecycle
          )

        const stackScale = Math.max(
          0.88,
          1 -
            depth *
              stackScaleStep
        )

        const stackOpacity =
          Math.max(
            0.66,
            1 -
              depth *
                0.08
          )

        const offset =
          depth *
          stackOffsetY

        const translateY =
          isBottomPosition(
            groupPosition
          )
            ? -offset
            : offset

        const cardStyle:
          ToastCSSProperties = {
          '--toast-sequence':
            toast.sequence,
          '--toast-direction':
            isLeft ? -1 : 1,
          '--toast-exit-duration':
            `${exitAnimationDuration}ms`,
          '--stack-y':
            `${translateY}px`,
          '--stack-scale':
            stackScale,
          '--stack-opacity':
            stackOpacity,
          '--stack-hover-scale': 1,
          '--stack-transition-duration':
            `${stackTransitionDuration}ms`,
          '--toast-width':
            typeof toastWidth ===
            'number'
              ? `${toastWidth}px`
              : toastWidth
        }

        const motionElement = (
          <div
            className={`${styles['toast-motion']} ${motionClass}`}
            data-lifecycle={
              toast.lifecycle
            }
            data-sequence={
              toast.sequence
            }
            data-paused={
              isHovered
            }
            onPointerEnter={() =>
              pauseAutoDelete(
                toast.id
              )
            }
            onPointerLeave={() =>
              resumeAutoDelete(
                toast.id
              )
            }
            onFocusCapture={() =>
              pauseAutoDelete(
                toast.id
              )
            }
            onBlurCapture={(event) =>
              handleToastBlur(
                event,
                toast.id
              )
            }
            onClick={(event) =>
              handleToastClick(
                event,
                toast.id
              )
            }
          >
            {renderToastVisual(
              toast,
              groupPosition,
              isHovered
            )}
          </div>
        )

        if (!stacked) {
          return (
            <div
              key={getToastKey(
                toast.id
              )}
              className={
                styles[
                  'toast-motion-container'
                ]
              }
            >
              {motionElement}
            </div>
          )
        }

        return (
          <div
            key={getToastKey(
              toast.id
            )}
            className={
              styles['toast-card']
            }
            data-anchor={
              depth === 0
            }
            data-depth={depth}
            data-lifecycle={
              toast.lifecycle
            }
            data-sequence={
              toast.sequence
            }
            data-paused={
              isHovered
            }
            data-hovered={
              isHovered
            }
            style={cardStyle}
          >
            {motionElement}

            {depth === 0 &&
              visibleCounter &&
              counter > 0 && (
                <div
                  className={
                    styles[
                      'toast-stack-counter'
                    ]
                  }
                  aria-hidden='true'
                >
                  +{counter}
                </div>
              )}
          </div>
        )
      },
      [
        exitAnimationDuration,
        handleToastBlur,
        handleToastClick,
        pauseAutoDelete,
        renderToastVisual,
        resumeAutoDelete,
        stackHoverLift,
        stackHoverScale,
        stackOffsetY,
        stackScaleStep,
        stackTransitionDuration,
        toastWidth,
        visibleCounter
      ]
    )

  /**
   * Builds a visual group for a corner/center position.
   *
   * @param groupPosition Position being rendered.
   * @param groupList Toasts assigned to that position.
   * @returns Toast group.
   */
  const renderGroup = useCallback(
    (
      groupPosition: ToastPosition,
      groupList: RuntimeToastItem[]
    ): React.ReactNode => {
      if (
        groupList.length === 0
      ) {
        return null
      }

      /**
       * Chronological order:
       * oldest -> newest.
       */
      const orderedList = [
        ...groupList
      ].sort(
        (a, b) =>
          a.sequence - b.sequence
      )

      const isBottom =
        isBottomPosition(
          groupPosition
        )

      const isStacked =
        groupList.length >
        stackThreshold

      /**
       * Latest items stay at the front of the stack.
       */
      const stackVisible =
        isStacked
          ? orderedList.slice(
              -maxVisible
            )
          : orderedList

      const hiddenCount =
        Math.max(
          0,
          groupList.length -
            maxVisible
        )

      const containerClass = [
        styles[
          'notification-container'
        ],
        styles[groupPosition] ??
          '',
        isStacked
          ? styles.stacked
          : '',
        isBottom
          ? styles['stack-bottom']
          : styles['stack-top'],
        isLeftPosition(
          groupPosition
        )
          ? styles['stack-left']
          : styles['stack-right']
      ]
        .join(' ')
        .trim()

      return (
        <div
          key={groupPosition}
          className={
            containerClass
          }
          style={
            {
              zIndex: 2147483647,
              '--toast-width':
                typeof toastWidth ===
                'number'
                  ? `${toastWidth}px`
                  : toastWidth,
              '--stack-offset-y':
                `${stackOffsetY}px`,
              '--stack-transition-duration':
                `${stackTransitionDuration}ms`
            } as ToastCSSProperties
          }
          aria-live='polite'
          aria-atomic='false'
        >
          {!isStacked &&
            orderedList.map(
              (toast) =>
                renderToastMotion(
                  toast,
                  groupPosition
                )
            )}

          {isStacked && (
            <div
              className={
                styles[
                  'toast-stack-container'
                ]
              }
              aria-live='polite'
            >
              <div
                className={
                  styles['toast-stack']
                }
                style={
                  {
                    '--toast-width':
                      typeof toastWidth ===
                      'number'
                        ? `${toastWidth}px`
                        : toastWidth,
                    '--stack-offset-y':
                      `${stackOffsetY}px`,
                    '--stack-transition-duration':
                      `${stackTransitionDuration}ms`
                  } as ToastCSSProperties
                }
              >
                {stackVisible.map(
                  (
                    toast,
                    idx
                  ) => {
                    /**
                     * Newest = depth 0.
                     * Older cards have larger depth.
                     */
                    const depth =
                      stackVisible.length -
                      1 -
                      idx

                    const key =
                      getToastKey(
                        toast.id
                      )

                    return renderToastMotion(
                      toast,
                      groupPosition,
                      true,
                      hoveredIds.has(
                        key
                      ),
                      depth,
                      hiddenCount
                    )
                  }
                )}
              </div>
            </div>
          )}
        </div>
      )
    },
    [
      hoveredIds,
      maxVisible,
      renderToastMotion,
      stackOffsetY,
      stackThreshold,
      stackTransitionDuration,
      toastWidth
    ]
  )

  /**
   * Determines groups.
   */
  const renderedGroups =
    useMemo(() => {
      const hasItemPositions =
        list.some(
          (toast) =>
            toast.position !==
              undefined &&
            toast.position !==
              null
        )

      if (
        hasItemPositions
      ) {
        const positions = [
          ToastPosition['top-right'],
          ToastPosition['top-center'],
          ToastPosition['top-left'],

          ToastPosition['center-right'],
          ToastPosition.center,
          ToastPosition['center-left'],

          ToastPosition['bottom-right'],
          ToastPosition['bottom-center'],
          ToastPosition['bottom-left']
        ]

        return positions.map(
          (groupPosition) => {
            const groupList =
              list.filter(
                (toast) =>
                  resolvePosition(
                    toast.position,
                    position
                  ) ===
                  groupPosition
              )

            return renderGroup(
              groupPosition,
              groupList
            )
          }
        )
      }

      return renderGroup(
        position,
        list
      )
    }, [
      list,
      position,
      renderGroup
    ])

  if (usePortal) {
    if (!portalRoot) {
      return null
    }

    return createPortal(
      renderedGroups,
      portalRoot
    )
  }

  return <>{renderedGroups}</>
}

export default Toast