'use client'

import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { BGColor, PColor } from '../../../assets/colors'
import { IconClose } from './../../../assets/icons/index'
import styles from './styles.module.css'
import { SwipeableCard } from '../SwipeableCard'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../utils'

export interface ToastItem {
  position: any
  id: number
  title: string
  description: string
  backgroundColor?: 'success' | 'warning' | 'error'
}

export interface ToastProps {
  toastList: ToastItem[]
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  autoDelete?: boolean
  autoDeleteTime?: number
}

export const Toast: React.FC<ToastProps> = (props) => {
  const {
    toastList,
    position,
    autoDelete,
    autoDeleteTime
  } = props
  const [list, setList] = useState(toastList)

  useEffect(() => {
    setList([...toastList])
  }, [toastList])

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && (toastList.length > 0) && (list.length > 0)) {
        deleteToast(toastList[0].id)
      }
    }, autoDeleteTime)

    return () => {
      clearInterval(interval)
    }
  }, [toastList, autoDelete, autoDeleteTime, list])

  const deleteToast = (id: number) => {
    const listItemIndex = list.findIndex((e) => { return e.id === id })
    const toastListItem = toastList.findIndex((e) => { return e.id === id })
    list.splice(listItemIndex, 1)
    toastList.splice(toastListItem, 1)
    setList([...list])
  }

  const backgroundColor = {
    success: '#50a773',
    warning: '#ebbc26',
    error: `${PColor}69`
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
  return (
    <div className={styles[`notification-container ${position}`]}>
      {list.map((toast, i) => {
        return (
          <SwipeableCard
            key={i}
            swipeWidth={100}
            autoClose={true}
            
            gradientAnimation={true}
            onDelete={() => deleteToast(toast.id)}
            rightActions={
              <div
                style={{
                  height: 75,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <button
                  onClick={() => deleteToast(toast.id)}
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
              className={`${styles.notification} ${styles.toast} ${styles[toast.position ?? position]}`}
              style={{
                position: 'relative',
                zIndex: 1000 + i,
                backgroundColor: getBackgroundColor(toast.backgroundColor),
              }}
            >
              <button
                className={styles['notification-button']}
                onClick={() => deleteToast(toast.id)}
              >
                <IconClose color={BGColor} size={30} />
              </button>
              <div>
                <p className={styles['notification-title']}>{toast.title}</p>
                <p className={styles['notification-message']}>{toast.description}</p>
              </div>
            </div>
          </SwipeableCard>

        )
      })}
    </div>
  )
}

Toast.propTypes = {
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number,
  toastList: PropTypes.array.isRequired
}

Toast.defaultProps = {
  position: 'top-right'
}
