'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import { Icon } from '../Icon'
import { getGlobalStyle } from '../../../helpers'
import { Row } from '../Row'
import clsx from 'clsx'
import styles from './styles.module.css'

export interface ActiveLinkProps {
  activeClassName: string
  className?: string
  href: string
  name?: string
  mIcon?: number
  currentPath?: boolean
  icon?: Record<string, string>
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  action?: boolean
}

/**
 * ActiveLink - Renders a navigational link with an optional icon.
 * If action is provided, it overrides the default navigation and triggers the action instead.
 *
 * @component
 * @param {ActiveLinkProps} props
 * @returns {JSX.Element}
 */
export const ActiveLink: React.FC<ActiveLinkProps> = ({
  activeClassName,
  className,
  href,
  name,
  currentPath = false,
  mIcon = -1,
  onClick,
  action,
  icon = {}
}) => {
  const color = getGlobalStyle(currentPath ? '--color-icons-primary' : '--color-icons-gray')
  const iconKey = icon[String(mIcon)] ?? icon['-1']

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (action === true) {
      e.preventDefault()
      return onClick?.(e)
    }
  }

  return (
    <Link
      href={href}
      className={clsx(className, activeClassName)}
      onClick={handleClick}
      style={{ color }}
    >
      <Row style={{ marginRight: '10px', width: 'min-content' }}>
        <Icon
          size={20}
          width={20}
          height={20}
          color={color}
          icon={iconKey}
        />
      </Row>
      <span className={styles['ellipsis-text']}>
        {name}
      </span>
    </Link>
  )
}

ActiveLink.defaultProps = {
  className: '',
  mIcon: -1,
  currentPath: false,
  icon: {}
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired
}
