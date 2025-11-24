// Toast.tsx
'use client'

import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import { PColor } from '../../../assets/colors'
import { SwipeableCard } from '../SwipeableCard'
import { Icon, Row, Text } from '../../atoms'
import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'

enum ToastPosition {
  'top-left' = 'top-left',
  'top-right' = 'top-right',
  'bottom-left' = 'bottom-left',
  'bottom-right' = 'bottom-right'
}

export interface ToastItem {
  position?: ToastPosition
  id: number
  title: string
  description: string
  backgroundColor?: 'success' | 'warning' | 'error'
}

export interface ToastProps {
  toastList: ToastItem[]
  position?: ToastPosition
  autoDelete?: boolean
  autoDeleteTime?: number
}

const STACK_THRESHOLD = 0
const VISIBLE_STACK = 5 // number of visible cards when stacked
const OFFSET_Y = 20
const SCALE_STEP = 0.02
const ROTATION_DEG = 0

export const Toast: React.FC<ToastProps> = (props) => {
  const {
    toastList,
    position = ToastPosition['top-right'],
    autoDelete,
    autoDeleteTime = 5000
  } = props

  const [list, setList] = useState<ToastItem[]>([...toastList])
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    setList([...toastList])
  }, [toastList])

  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (autoDelete && toastList.length > 0) {
      intervalRef.current = window.setInterval(() => {
        if (toastList.length > 0) {
          const idToDelete = toastList[0]?.id
          if (typeof idToDelete === 'number') deleteToast(idToDelete)
        }
      }, autoDeleteTime)
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDelete, autoDeleteTime, toastList])

  const deleteToast = (id: number) => {
    try {
      const externalIndex = toastList.findIndex((t) => t.id === id)
      if (externalIndex !== -1) {
        toastList.splice(externalIndex, 1)
      }
    } catch {
      // ignore if prop is immutable
    }
    setList((prev) => prev.filter((t) => t.id !== id))
  }

  const getBackgroundColor = (color?: 'success' | 'warning' | 'error') => {
    switch (color) {
      case 'warning':
        return '#ebbc26'
      case 'error':
        return `${PColor}69`
      default:
        return '#50a773'
    }
  }

  const getIcon = (color?: 'success' | 'warning' | 'error') => {
    switch (color) {
      case 'warning':
        return 'IconWarning'
      case 'error':
        return 'IconError'
      case 'success':
        return 'IconSuccess'
      default:
        return 'IconInfo'
    }
  }

  // Decide if we should use per-item positions or the component-level position
  const hasItemPositions = list.some((t) => t.position !== undefined && t.position !== null)

  // Helper to render a group (for a given corner position)
  const renderGroup = (groupPos: ToastPosition, groupList: ToastItem[]) => {
    if (groupList.length === 0) return null
    const isBottom = groupPos === ToastPosition['bottom-left'] || groupPos === ToastPosition['bottom-right']
    const isLeft = groupPos === ToastPosition['top-left'] || groupPos === ToastPosition['bottom-left']
    const isStacked = groupList.length >= STACK_THRESHOLD
    const stackVisible = isStacked ? groupList.slice(-VISIBLE_STACK) : []

    const containerClass = [
      styles['notification-container'],
      styles[groupPos] ?? '',
      isStacked ? styles['stacked'] : '',
      isBottom ? styles['stack-bottom'] : styles['stack-top'],
      isLeft ? styles['stack-left'] : styles['stack-right']
    ].join(' ').trim()

    return (
      <div key={groupPos} className={containerClass} style={{
        zIndex: getGlobalStyle('--z-index-toast')
      }}>
        {!isStacked && groupList.map((toast, i) => {
          return (
            <SwipeableCard
              key={toast.id}
              swipeWidth={100}
              autoClose={false}
              shake={true}
              gradientAnimation={true}
              onDelete={() => deleteToast(toast.id)}
              delay={1500}
              style={{
                top: 22,
                right: 22,
              }}
              rightActions={groupPos === ToastPosition['bottom-left']
                ? null
                : <div
                  onClick={() => deleteToast(toast.id)}
                  role='button'
                  aria-label={`Eliminar notificación ${toast.title}`}
                  style={{
                    height: 75,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <button
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon icon='IconDelete' color={getGlobalStyle('--color-icons-white')} size={20} />
                  </button>
                </div>
              }
            >
              <div
                className={`${styles.notification} ${styles.toast} ${styles[toast.position ?? groupPos]}`}
                style={{
                  position: 'relative',
                  zIndex: 1000 + i,
                  backgroundColor: getBackgroundColor(toast.backgroundColor),
                  transformOrigin: isBottom ? 'center bottom' : 'center top'
                }}
              >
                <button
                  className={styles['notification-button']}
                  onClick={() => deleteToast(toast.id)}
                  aria-label='Cerrar notificación'
                >
                  <Icon
                    icon='IconCancel'
                    color={getGlobalStyle('--color-icons-white')}
                    size={25}
                  />
                </button>
                <div>
                  <p className={styles['notification-title']}>{toast.title}</p>
                  <p className={styles['notification-message']}>{toast.description}</p>
                </div>
              </div>
            </SwipeableCard>
          )
        })}

        {isStacked && (
          <div className={styles['toast-stack-container']} aria-live='polite'>
            <div className={styles['toast-stack']}>
              {stackVisible.map((toast, idx) => {
                const depth = stackVisible.length - 1 - idx
                const offset = depth * OFFSET_Y
                const translateY = isBottom ? -offset : offset
                const scale = 1 - depth * SCALE_STEP
                const rotate = -depth * ROTATION_DEG
                const opacity = 1 - depth * 0.08
                const zIndex = 2000 + (stackVisible.length - depth)
                const transform = `translateY(${translateY}px) translateZ(0) scale(${scale}) rotate(${rotate}deg)`

                return (
                  <div
                    key={toast.id}
                    className={styles['toast-card']}
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      transition: 'transform 350ms cubic-bezier(0.2,0.9,0.2,1), opacity 250ms linear',
                      pointerEvents: 'auto'
                    }}
                  >
                    <SwipeableCard
                      swipeWidth={100}
                      autoClose={false}
                      gradientAnimation={true}
                      onDelete={() => deleteToast(toast.id)}
                      style={{
                        top: 15,
                        right: 15
                      }}
                      rightActions={groupPos === ToastPosition['bottom-left']
                        ? null
                        : <div
                          onClick={() => deleteToast(toast.id)}
                          role='button'
                          aria-label={`Eliminar notificación ${toast.title}`}
                          style={{
                            height: 70,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <button
                            style={{
                              all: 'unset',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Icon
                              icon='IconDelete'
                              color={getGlobalStyle('--color-icons-white')}
                              size={20}
                            />
                          </button>
                        </div>
                      }
                    >
                      <div
                        className={`${styles.notification} ${styles.toast} ${styles[toast.position ?? groupPos]}`}
                        style={{
                          position: 'relative',
                          zIndex,
                          backgroundColor: getBackgroundColor(toast.backgroundColor),
                          transformOrigin: isBottom ? 'center bottom' : 'center top',
                          minWidth: '300px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                        }}
                      >
                        <Row justifyContent='space-between'>
                          <Row gap='md'>
                            <Icon
                              icon={getIcon(toast.backgroundColor)}
                              color={getGlobalStyle('--color-icons-white')}
                              size={20}
                            />
                            <Text weight='extrabold' color='white' >
                              {String(toast.title)}
                            </Text>
                          </Row>
                          <button
                            className={styles['notification-button']}
                            onClick={() => deleteToast(toast.id)}
                            aria-label='Cerrar notificación'
                          >
                            <Icon
                              icon='IconCancel'
                              color={getGlobalStyle('--color-icons-white')}
                              size={25}
                            />
                          </button>
                        </Row>
                        <>

                          <p className={styles['notification-message']}>
                            {String(toast.description)}
                          </p>
                        </>
                      </div>
                    </SwipeableCard>
                  </div>
                )
              })}
              {groupList.length > VISIBLE_STACK && (
                <div className={styles['toast-stack-counter']} aria-hidden style={{ display: 'none' }}>
                  +{groupList.length - VISIBLE_STACK}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // If any item has its own position, render groups per position using item.position.
  if (hasItemPositions) {
    const posValues = [
      ToastPosition['top-right'],
      ToastPosition['top-left'],
      ToastPosition['bottom-right'],
      ToastPosition['bottom-left']
    ] as ToastPosition[]

    return (
      <>
        {posValues.map((pos) => {
          const groupList = list.filter((t) => (t.position ?? position) === pos)
          return renderGroup(pos, groupList)
        })}
      </>
    )
  }

  // Fallback: no per-item positions — render single container using component-level position
  return renderGroup(position, list)
}
