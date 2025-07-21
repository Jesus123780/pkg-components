'use client'

import React from 'react'
import type { PropsWithChildren } from 'react'
import { ActiveLink } from '../../../atoms'
import styles from './CustomLinkAside.module.css'

/**
 * Props for the CustomLinkAside component.
 * @typedef {Object} CustomLinkAsideProps
 * @property {string} mName - Display name of the link.
 * @property {string} [mPath] - Path the link navigates to.
 * @property {number} [mIcon] - Icon identifier.
 * @property {() => void} [onClick] - Optional click handler.
 */
interface CustomLinkAsideProps {
  mPath?: string
  mName: string
  isActive?: boolean
  action?: boolean
  mIcon?: number
  onClick?: () => void
}

/**
 * Renders a navigation link with optional icon and active state.
 *
 * @param {CustomLinkAsideProps} props - Props for CustomLinkAside.
 * @returns {JSX.Element}
 */
export const CustomLinkAside: React.FC<PropsWithChildren<CustomLinkAsideProps>> = ({
  mPath = '',
  mIcon = -1,
  mName,
  action = false,
  onClick,
  isActive = false
}) => {
  const iconMap: Record<number, string> = {
    [-1]: 'IconBoxes',
    1: 'home',
    2: 'IconTicket',
    3: 'IconStore',
    4: 'time',
    5: 'time',
    6: 'IconTicket',
    7: 'IconChart',
    8: 'IconUser',
    9: 'IconBox',
    10: 'IconTicket',
    11: 'IconTicket',
    12: 'IconTicket',
    13: 'IconTicket',
    14: 'IconConfig',
    15: 'IconInventory'
  }

  return (
    <ActiveLink
      href={`/${mPath}`}
      className={styles.linkAside}
      activeClassName={styles.active}
      name={mName}
      mIcon={mIcon}
      action={action}
      onClick={onClick}
      currentPath={isActive}
      icon={iconMap}
    />
  )
}
