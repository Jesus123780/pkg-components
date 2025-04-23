'use client'

import React, { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import { ActiveLink } from '../../../atoms'
import styles from './CustomLinkAside.module.css'

/**
 * Props for the CustomLinkAside component.
 * @typedef {Object} CustomLinkAsideProps
 * @property {string} mName - Display name of the link.
 * @property {string} [mPath] - Path the link navigates to.
 * @property {number} [mIcon] - Icon identifier.
 * @property {number} [count] - Optional count badge.
 * @property {string} [size] - Optional size modifier.
 * @property {() => void} [onClick] - Optional click handler.
 */
interface CustomLinkAsideProps {
  count?: number
  mPath?: string
  mName: string
  size?: string
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
}) => {
  const pathname = usePathname()

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

  const isActive = `/${mPath}` === pathname

  return (
    <ActiveLink
      href={`/${mPath}`}
      className={styles.linkAside}
      activeClassName={styles.active}
      name={mName}
      mIcon={mIcon}
      currentPath={isActive}
      icon={iconMap}
    />
  )
}
