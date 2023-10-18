import PropTypes from 'prop-types'
import React, { useRef } from 'react'
// import styles from './DraggableContainer.module.css';


export const DraggableContainer = ({
  children,
  isOpen,
  dragRatio = 0.5,
  halfScreen = false,
  minFullscreenTranslation = 0,
  modalRef = null,
  onClose,
  ...props
}) => {

  const dragProps = useRef()

  const handleDragStart = (e) => {
    e.preventDefault()
    document.body.style.overflowY = 'hidden'
    const { clientX, clientY } = e.touches[0]
    const { offsetTop, offsetLeft } = modalRef.current
    const { left, top } = modalRef.current.getBoundingClientRect()

    dragProps.current = {
      dragStartLeft: left - offsetLeft,
      dragStartTop: top - offsetTop,
      dragStartX: clientX,
      dragStartY: clientY,
      transalteY: 0
    }

    window.addEventListener('touchmove', handleDrag, false)
    window.addEventListener('touchend', handleDragEnd, false)
  }

  const handleDragEnd = () => {
    document.body.style.overflowY = 'scroll'
    const translateAmount = dragProps.current.transalteY
    const bodyHeight = halfScreen ? document.body.clientHeight / 4 : document.body.clientHeight
    const maxTranslation = dragRatio * bodyHeight

    if (minFullscreenTranslation && translateAmount > maxTranslation) {
      const originTranslateAmount = minFullscreenTranslation !== 0 ? translateAmount : minFullscreenTranslation

      const animation = modalRef.current.animate(
        [
          { transform: `translateY(${originTranslateAmount}px)` },
          { transform: `translateY(${minFullscreenTranslation}px)` }
        ],
        {
          duration: 200
        }
      )

      animation.addEventListener('finish', () => {
        dragProps.current.transalteY = minFullscreenTranslation
        modalRef.current.style.transform = `translateY(${minFullscreenTranslation}px)`
      })

      animation.addEventListener('finish', () => {
        onClose()
      })
    }

    if (translateAmount < maxTranslation && translateAmount > 0) {
      const animation = modalRef.current.animate(
        [
          { transform: `translateY(${translateAmount}px)` },
          { transform: `translateY(0px)` }
        ],
        {
          duration: 200
        }
      )
      animation.addEventListener('finish', () => {
        dragProps.current.transalteY = 0
        modalRef.current.style.transform = 'translateY(0px)'
      })
    }
    const minBottomDrag = window.screen.height - (window.screen.height * 0.3)
    if (translateAmount > minBottomDrag)
      onClose()
    window.removeEventListener('touchmove', handleDrag, false)
    window.removeEventListener('touchend', handleDragEnd, false)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    if (!e.touches?.length) return

    const { clientY } = e.touches[0]
    dragProps.current.transalteY =
            dragProps.current.dragStartTop + clientY - dragProps.current.dragStartY

    if (dragProps.current.transalteY < 0) dragProps.current.transalteY = 0

    modalRef.current.style.transform = `translateY(${dragProps.current.transalteY}px)`
  }

  return (
    <div>{children}</div>
  )

}

DraggableContainer.propTypes = {
  children: PropTypes.any,
  dragRatio: PropTypes.number,
  halfScreen: PropTypes.bool,
  isOpen: PropTypes.any,
  minFullscreenTranslation: PropTypes.number,
  modalRef: PropTypes.shape({
    current: PropTypes.shape({
      animate: PropTypes.func,
      getBoundingClientRect: PropTypes.func,
      offsetLeft: PropTypes.any,
      offsetTop: PropTypes.any,
      style: PropTypes.shape({
        transform: PropTypes.any
      })
    })
  }),
  onClose: PropTypes.func
}
