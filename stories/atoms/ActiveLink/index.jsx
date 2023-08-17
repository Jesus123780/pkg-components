import React, { Children } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export const ActiveLink = ({ 
  children, 
  activeClassName = '', 
  ...props
}) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''
  const className = asPath === props.href ? `${childClassName} ${activeClassName}`.trim() : childClassName
  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired
}


