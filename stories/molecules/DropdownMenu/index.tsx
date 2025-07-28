import React from 'react'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

export interface Option {
  icon?: string
  optionName: string
  action?: () => void
}

interface DropdownMenuProps {
  options?: Option[]
  show: boolean
  position?: { x: number, y: number }
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ options = [], show, position }) => {
  if (!show) return null

  const containerStyle = {
    top: position?.y ?? 0,
    left: position?.x ?? 0
  }

  return (
    <div className={styles.container} style={containerStyle}>
      {options.map((x, i) => (
        <div
          key={`context_menu_option_${i}`}
          className={styles.dropdownItem}
          onClick={x.action ?? (() => true)}
        >
          {(x.icon !== '') && (
            <Icon
              color={getGlobalStyle('--color-icons-black')}
              height={20}
              width={20}
              size={20}
              icon={x.icon ?? 'IconArrowRight'}
            />
          )}
          {x.optionName}
        </div>
      ))}
    </div>
  )
}
