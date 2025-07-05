'use client'

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from '../../atoms'
import styles from './styles.module.css'

interface ButtonSuccessProps {
  text?: string
  loading?: boolean
  finished?: boolean
  width?: number
  disabled?: boolean
  onClick?: () => void
}

/**
 * Button with progress animation, can be force-finished externally.
 *
 * @param {Object} props
 * @param {string} props.text - Button label text.
 * @param {boolean} props.loading - External trigger to show loading animation.
 * @param {boolean} props.finished - External trigger to stop animation immediately.
 * @param {number} props.width - Button width in px.
 * @param {boolean} props.disabled - Disable the button manually.
 * @param {Function} props.onClick - Click handler.
 * @returns {JSX.Element}
 */
export const ButtonSuccess: React.FC<ButtonSuccessProps> = ({
  text = '',
  loading = false,
  finished = false,
  width = 150,
  disabled = false,
  onClick = () => {}
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'finished'>('idle')
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (finished) {
      // Corta cualquier animación pendiente y marca como finalizado
      if (animationTimeout.current != null) {
        clearTimeout(animationTimeout.current)
      }
      setStatus('finished')
      return
    }

    if (loading) {
      setStatus('loading')
      // Da tiempo para completar la animación (~5.3s total)
      animationTimeout.current = setTimeout(() => {
        setStatus('idle')
        animationTimeout.current = null
      }, 5300)
    }

    return () => {
      if (animationTimeout.current != null) {
        clearTimeout(animationTimeout.current)
        animationTimeout.current = null
      }
    }
  }, [loading, finished])

  const getClass = (): string => {
    if (status === 'loading') return `${styles.button} ${styles.loading}`
    if (status === 'finished') return `${styles.button} ${styles.finished}`
    return styles.button
  }

  return (
    <div className={styles.container} style={{ width }}>
      <button
        type="button"
        className={getClass()}
        disabled={status === 'loading' || disabled}
        onClick={onClick}
      >
        <span className={styles.content} data-text={text}>
          <Text
            size="md"
            color="white"
            weight="bold"
            className={styles.text}
          >
            {text}
          </Text>
        </span>
      </button>
    </div>
  )
}

ButtonSuccess.propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool,
  finished: PropTypes.bool,
  width: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

ButtonSuccess.defaultProps = {
  text: '',
  loading: false,
  finished: false,
  width: 150,
  disabled: false,
  onClick: () => {}
}
