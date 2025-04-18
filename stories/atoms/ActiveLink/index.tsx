'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import { Icon } from '../Icon'
import { getGlobalStyle } from '../../../helpers'

export interface ActiveLinkProps {
  activeClassName: string
  className?: string
  href: string
  name?: string
  mIcon?: number
  currentPath?: boolean
  icon?: Record<string, string>
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  activeClassName,
  className,
  href,
  name,
  currentPath,
  mIcon,
  icon = {
  }
}) => {
  return (
    <>
     <Link href={href} className={`${className} ${activeClassName}`}>
     <Icon
        size={20}
        width={20}
        color={getGlobalStyle(currentPath === true ? '--color-icons-primary' : '--color-icons-gray')}
        height={20}
        icon={mIcon !== undefined ? icon[String(mIcon)] : icon['-1']}
      />
        {name}
      </Link>
    </>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired
}
