'use client'

import Link from 'next/link'
import React from 'react'
import { Icon } from '../Icon'
import { getGlobalStyle } from '../../../helpers'
import clsx from 'clsx'
import styles from './styles.module.css'

export interface ActiveLinkProps {
  activeClassName: string
  className?: string
  href: string
  name?: string
  mIcon: string
  currentPath?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  action?: boolean
  disabled?: boolean
  title?: string
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  activeClassName, className, href, name, currentPath = false,
  mIcon = '', onClick, action = false, disabled = false, title
}) => {
  const active = currentPath && !action
  const color = getGlobalStyle(active ? '--color-icons-primary' : '--color-icons-gray')
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (disabled || action) e.preventDefault()
    if (!disabled && action) onClick?.(e)
  }
  return (
    <Link
      href={href}
      className={clsx(className, active && activeClassName)}
      onClick={handleClick}
      onKeyDown={event => {
        if (action && !disabled && event.key === ' ') {
          event.preventDefault()
          event.currentTarget.click()
        }
      }}
      role={action ? 'button' : undefined}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      aria-label={name}
      title={title}
      style={className ? undefined : { color }}
    >
      <span className={styles.icon} aria-hidden='true'>
        <Icon size={20} width={20} height={20} color={color} icon={mIcon} />
      </span>
      <span className={styles['ellipsis-text']}>{name}</span>
    </Link>
  )
}
