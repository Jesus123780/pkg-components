import React, { useEffect, useRef, useState } from 'react'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

export interface Option {
  icon?: string
  optionName: string
  action?: () => void
  disabled?: boolean
  shortcut?: string
  separatorBefore?: boolean
}

interface DropdownMenuProps {
  options?: Option[]
  show: boolean
  position?: { x: number, y: number }
  onClose?: () => void
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options = [],
  show,
  position,
  onClose
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ top: 0, left: 0 })

  // Adjust position to keep inside viewport
  useEffect(() => {
    if (!show || !position) return

    const menu = menuRef.current
    if (!menu) return

    const { innerWidth, innerHeight } = window
    const menuWidth = menu.offsetWidth
    const menuHeight = menu.offsetHeight

    const newLeft = (position.x + menuWidth > innerWidth)
      ? position.x - menuWidth
      : position.x

    const newTop = (position.y + menuHeight > innerHeight)
      ? position.y - menuHeight
      : position.y

    setCoords({ top: newTop, left: newLeft })
  }, [show, position])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose?.()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }

    if (show) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      ref={menuRef}
      className={`${styles.container} ${styles.animate}`}
      style={{ top: coords.top, left: coords.left }}
      role="menu"
      aria-label="Context menu"
    >
      {options.map((option, i) => (
        <React.Fragment key={`option_${i}`}>
          {option.separatorBefore && <div className={styles.separator} />}
          <div
            role="menuitem"
            tabIndex={-1}
            className={`${styles.dropdownItem} ${option.disabled ? styles.disabled : ''}`}
            onClick={() => {
              if (!option.disabled) {
                option.action?.()
                onClose?.()
              }
            }}
          >
            {option.icon && (
              <Icon
                color={getGlobalStyle('--color-icons-black')}
                height={20}
                width={20}
                size={20}
                icon={option.icon}
              />
            )}
            <span className={styles.optionText}>{option.optionName}</span>
            {option.shortcut && (
              <span className={styles.shortcut}>{option.shortcut}</span>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
