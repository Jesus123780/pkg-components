'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
interface CustomLinkProps {
  children: React.ReactNode
  href?: string
  otherProps?: any
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  children,
  href = '/',
  otherProps
}) => {
  return (
    <Link href={href}>
      {children}
    </Link>
  )
}

CustomLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  otherProps: PropTypes.any
}
