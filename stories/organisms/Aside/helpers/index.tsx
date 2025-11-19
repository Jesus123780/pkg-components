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
  mIcon?: string
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
  mIcon = '',
  mName,
  action = false,
  onClick,
  isActive = false
}) => {
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
    />
  )
}
