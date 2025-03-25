'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'
import React, { type ReactElement } from 'react'

export interface ActiveLinkProps {
  activeClassName: string
  children: ReactElement
  href: string
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ href }) => {
  return (
    <Link href={href}>
      {href}
    </Link>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired
}
