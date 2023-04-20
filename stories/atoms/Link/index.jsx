import React from 'react'
import Link from 'next/link'

export const CustomLink = ({ children , href = '/', otherProps }) => {
  return (
    <Link {...otherProps} href={href}>{children}</Link>
  )
}

