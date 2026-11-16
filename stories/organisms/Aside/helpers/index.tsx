'use client'

import React from 'react'
import type { PropsWithChildren } from 'react'
import { ActiveLink } from '../../../atoms'
import styles from './CustomLinkAside.module.css'

export interface CustomLinkAsideProps {
  mPath?: string
  mName: string
  isActive?: boolean
  action?: boolean
  mIcon?: string
  onClick?: () => void
  collapsed?: boolean
  motion?: boolean
  disabled?: boolean
  className?: string
}

export const CustomLinkAside: React.FC<PropsWithChildren<CustomLinkAsideProps>> = ({
  mPath = '', mIcon = '', mName, action = false, onClick,
  isActive = false, collapsed = false, motion = true, disabled = false, className
}) => (
  <div className={[
    styles.wrapper, isActive && !action && styles.wrapperActive,
    collapsed && styles.collapsed, !motion && styles.noMotion,
    disabled && styles.disabled, className
  ].filter(Boolean).join(' ')}>
    <ActiveLink
      href={`/${mPath.replace(/^\/+/, '')}`}
      className={styles.link}
      activeClassName={styles.active}
      name={mName}
      mIcon={mIcon}
      action={action}
      onClick={onClick}
      currentPath={isActive && !action}
      disabled={disabled}
      title={mName}
    />
  </div>
)
