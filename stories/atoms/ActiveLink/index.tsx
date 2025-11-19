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
  mIcon: string
  currentPath?: boolean
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
  mIcon = '',
  onClick,
  action
}) => {
  const color = getGlobalStyle(currentPath ? '--color-icons-primary' : '--color-icons-gray')

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
          icon={mIcon}
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
