import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

export const CustomLink = ({
  children ,
  href = '/',
  otherProps
}) => {
  return (
    <Link {...otherProps} href={href}>
      {children}
    </Link>
  )
}

CustomLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  otherProps: PropTypes.any
}

