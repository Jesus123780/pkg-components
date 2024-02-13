import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { BGColor, PColor } from '../../../assets/colors'
import { IconClose } from './../../../assets/icons/index'
import styles from './styles.module.css'


export const Toast = (props) => {
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
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id)
      }
    }, autoDeleteTime)

    return () => {
      clearInterval(interval)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastList, autoDelete, autoDeleteTime, list])

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => {return e.id === id})
    const toastListItem = toastList.findIndex((e) => {return e.id === id})
    list.splice(listItemIndex, 1)
    toastList.splice(toastListItem, 1)
    setList([...list])
  }
  const [divPosition, setDivPosition] = useState(0)

  const handleDrag = (event) => {
    setDivPosition(event.clientX)
  }
  const handleDragEnd = (event, id) => {
    if (window.innerWidth - event.clientX > window.innerWidth / 2) {
      deleteToast(id)
    }
  }

  const backgroundColor = {
    success: '#50a773',
    warning: '#ebbc26',
    error: `${PColor}69`
  }

  return (
    <div className={styles[`notification-container ${ position }`]}>
      {list.map((toast, i) => {return (
        <div
          className={`${ styles.notification } ${ styles.toast } ${ styles[position] }`}
          draggable
          key={i}
          onDrag={handleDrag}
          onDragEnd={(e) => {return handleDragEnd(e, toast.id)}}
          style={{
            position: 'relative',
            left: `${ divPosition }px`,
            transition: 'left 0.5s ease-in-out',
            backgroundColor: backgroundColor[toast?.backgroundColor] ?? '#50a773'
          }}
        >
          <button className={styles['notification-button']} onClick={() => {return deleteToast(toast.id)}}>
            <IconClose color={BGColor} size={30} />
          </button>
          <div>
            <p className={styles['notification-title']}>{toast.title}</p>
            <p className={styles['notification-message']}>{toast.description}</p>
          </div>
        </div>
      )})}
    </div>
  )
}

Toast.propTypes = {
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number,
  position: PropTypes.string,
  toastList: PropTypes.array.isRequired
}

Toast.defaultProps = {
  position: 'top-right'
}
