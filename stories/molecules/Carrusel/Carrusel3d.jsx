import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles.module.css'

export const Carrusel3D = (props) => {
  const {
    children,
    active,
    moveRight,
    moveLeft,
    maxView
  } = props
  const MAX_VISIBILITY = maxView ?? 3
  const count = React.Children.count(children)
  return (
    <>
      <div className={styles['carousel']}>
        {React.Children.map(children, (child, i) => {return (
          <div
            className={styles['card-container']}
            style={{
              '--active': i === active ? 1 : 0,
              '--offset': (active - i) / 3,
              '--direction': Math.sign(active - i),
              '--abs-offset': Math.abs(active - i) / 3,
              pointerEvents: active === i ? 'auto' : 'none',
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
              display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block'
            }}
          >
            {child}
          </div>
        )})}
      </div>
      <div>
        <div>
          <button disabled={active === 0} onClick={moveLeft}>
            Click
          </button>
        </div>

        <div>
          <button
            disabled={active === count - 1}
            onClick={moveRight}
          >
            Click
          </button>
        </div>
      </div>
    </>
  )
}

Carrusel3D.propTypes = {
  active: PropTypes.number,
  children: PropTypes.any,
  maxView: PropTypes.number,
  moveLeft: PropTypes.any,
  moveRight: PropTypes.any
}
