'use client'

import React from 'react'
import type { PropsWithChildren } from 'react'

import { ActiveLink } from '../../../atoms'

import styles from './CustomLinkAside.module.css'

interface CustomLinkAsideProps {
  mPath?: string
  mName: string
  isActive?: boolean
  action?: boolean
  mIcon?: string
  onClick?: () => void
}

/**
 * Navigation link used inside the Aside.
 *
 * The visual interaction is intentionally isolated in this component:
 * - hover animation
 * - active state
 * - underline animation
 * - icon interaction
 *
 * This keeps the Aside component focused on navigation and state,
 * while this component owns the visual behavior of an individual item.
 */
export const CustomLinkAside: React.FC<
  PropsWithChildren<CustomLinkAsideProps>
> = ({
  mPath = '',
  mIcon = '',
  mName,
  action = false,
  onClick,
  isActive = false
}) => {
  return (
    <div
      className={[
        styles.wrapper,
        isActive ? styles.wrapperActive : ''
      ].filter(Boolean).join(' ')}
    >
      <ActiveLink
        href={`/${mPath}`}
        className={styles.link}
        activeClassName={styles.active}
        name={mName}
        mIcon={mIcon}
        action={action}
        onClick={onClick}
        currentPath={isActive}
      />
    </div>
  )
}
