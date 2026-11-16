'use client'

import React, { useId, useEffect, useRef } from 'react'
import { Icon } from '../../atoms'
import styles from './styles.module.css'

export interface OptionsProps {
  active?: boolean | number | string
  children?: React.ReactNode
  handleClick: (index: number) => void
  icon?: React.ReactNode
  index?: number | string | boolean
  label: string
  size?: number
  disabled?: boolean
  motion?: boolean
  className?: string
  hasActiveChild?: boolean
}

export const Options: React.FC<OptionsProps> = ({
  active = false, children, handleClick, icon = 'none', index = 0,
  label, size = 15, disabled = false, motion = true, className,
  hasActiveChild = false
}) => {
  const id = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isOpen = active === true
  const hasChildren = React.Children.toArray(children).length > 0
  const triggerId = `options-trigger-${id}`
  const contentId = `options-content-${id}`

  useEffect(() => {
    const content = contentRef.current
    if (!content) return
    if (!isOpen && content.contains(document.activeElement)) {
      buttonRef.current?.focus()
    }
    content.toggleAttribute('inert', !isOpen)
  }, [isOpen, hasChildren])

  const handleToggle = (): void => {
    if (disabled) return
    const parsedIndex = typeof index === 'number' || typeof index === 'string'
      ? Number(index) : 0
    handleClick(Number.isFinite(parsedIndex) ? parsedIndex : 0)
  }

  return (
    <div
      id={`menu-id__${index}`}
      className={[styles.optionMenu, isOpen && styles.active, disabled && styles.disabled,
        !motion && styles.noMotion, hasActiveChild && styles.hasActiveChild, className].filter(Boolean).join(' ')}
      data-state={isOpen ? 'open' : 'closed'}
      data-disabled={disabled}
    >
      <button ref={buttonRef} id={triggerId} type='button' className={styles.row}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-controls={hasChildren ? contentId : undefined}
        disabled={disabled} onClick={handleToggle}>
        <span className={styles.rowContent}>
          {icon !== 'none' && icon != null && (
            <span className={styles.iconContainer} aria-hidden='true'>
              {typeof icon === 'string' ? <Icon icon={icon} width={20} height={20} size={20} /> : icon}
            </span>
          )}
          <span className={styles.span}>{label}</span>
        </span>
        {hasChildren && (
          <span className={styles.containerBurger} aria-hidden='true'>
            <span className={styles.burgerMenuContainer}><Icon icon='IconArrowBottom' size={size} /></span>
          </span>
        )}
      </button>
      {hasChildren && (
        <div ref={contentRef} id={contentId}
          className={[styles.menuContent, isOpen && styles.menuContentOpen].filter(Boolean).join(' ')}
          aria-hidden={!isOpen} aria-labelledby={triggerId} role='group'>
          <div className={styles.menuInner}><div className={styles.menuBody}>{children}</div></div>
        </div>
      )}
    </div>
  )
}
