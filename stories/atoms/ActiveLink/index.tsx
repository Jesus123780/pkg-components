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
  hiddenTextLink?: boolean
  icon?: Record<string, string>
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  activeClassName,
  className,
  href,
  name,
  currentPath,
  mIcon,
  icon = {}
}) => {
  const color = getGlobalStyle(currentPath === true ? '--color-icons-primary' : '--color-icons-gray')
  const iconKey = mIcon !== undefined ? icon[String(mIcon)] : icon['-1']

  return (
    <Link href={href} className={clsx(className, activeClassName)} style={{ color }}>
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
  hiddenTextLink: false,
  icon: {}
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired
}
