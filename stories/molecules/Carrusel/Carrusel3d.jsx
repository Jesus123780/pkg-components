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
      <div className='carousel'>
        {React.Children.map(children, (child, i) => (
          <div
            className={styles['card-container']}
            style={{
              '--active': i === active ? 1 : 0,
              '--offset': (active - i) / 3,
              '--direction': Math.sign(active - i),
              '--abs-offset': Math.abs(active - i) / 3,
              pointerEvents: active === i ? 'auto' : 'none',
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
              display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <div>
        <div item>
          <button onClick={moveLeft} disabled={active === 0}>
            Click
          </button>
        </div>

        <div item>
          <button
            onClick={moveRight}
            disabled={active === count - 1}
          >
            Click
          </button>
        </div>
      </div>
    </>
  )
}

Carrusel3D.propTypes = {}
