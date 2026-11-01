'use client'

import React from 'react'
import styles from './styles.module.css'
import { useSlideTransition } from './useSlideTransition'
import { Portal } from '../../organisms'
import { Overline } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'

export type SlideDirection = 'left' | 'right' | 'top' | 'bottom'

export interface LateralModalProps {
  open: boolean
  direction?: SlideDirection
  children: React.ReactNode
  style?: React.CSSProperties
  handleClose?: () => void
  ariaLabel?: string
  className?: string
  duration?: number
}

/**
 * LateralModal
 *
 * Reusable slide-in panel that animates using transform only.
 */
export const LateralModal: React.FC<LateralModalProps> = ({
  open,
  direction = 'right',
  children,
  style = {},
  handleClose = () => {
    // no-op default
    // eslint-disable-next-line no-console
    console.warn('LateralModal: handleClose not provided')
  },
  ariaLabel = 'Lateral panel',
  className = '',
  duration = 400
}) => {
  const safeOpen = typeof open === 'boolean' ? open : Boolean(open)
  if (typeof open !== 'boolean') {
    // eslint-disable-next-line no-console
    console.error(
      `LateralModal: "open" expected boolean but received ${typeof open}. Coercing to ${safeOpen}.`
    )
  }

  const allowed: SlideDirection[] = ['left', 'right', 'top', 'bottom']
  const safeDirection: SlideDirection = allowed.includes(direction) ? direction : 'right'
  if (direction !== safeDirection) {
    // eslint-disable-next-line no-console
    console.warn(
      `LateralModal: Unsupported direction "${direction}", falling back to "${safeDirection}".`
    )
  }

  const { mounted, stage } = useSlideTransition({ open: safeOpen, duration })

  // keyboard Escape support
  React.useEffect(() => {
    if (!mounted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        try {
          handleClose()
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('LateralModal: error in handleClose callback', err)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mounted, handleClose])

  if (!mounted) return null

  const dirClass = (() => {
    switch (safeDirection) {
      case 'left':
        return styles['modal--left']
      case 'top':
        return styles['modal--top']
      case 'bottom':
        return styles['modal--bottom']
      case 'right':
      default:
        return styles['modal--right']
    }
  })()

  const stageClass = (() => {
    switch (stage) {
      case 'entering':
        return styles['modal--entering']
      case 'entered':
        return styles['modal--entered']
      case 'exiting':
        return styles['modal--exiting']
      default:
        return ''
    }
  })()

  const transitionStyle: React.CSSProperties = {
    transition: `transform ${duration}ms cubic-bezier(.22,.9,.2,1)`,
    ...style,
    height: style.height ?? `calc(100vh - 85px)`
  }

  return (
    <Portal>
      {/* overlay + modal inside same portal to avoid stacking/context issues */}
      <Overline
        show={safeOpen}
        bgColor={getGlobalStyle('--color-background-overline')}
        zIndex={getGlobalStyle('--z-index-high')}
        onClick={handleClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-hidden={!safeOpen}
        className={`${styles.modal} ${dirClass} ${stageClass} ${className}`.trim()}
        style={transitionStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {children ?? null}
      </div>
    </Portal>
  )
}

export default LateralModal
