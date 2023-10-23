import Link from 'next/link'
import PropTypes from 'prop-types'
import React, { Children } from 'react'

export const ActiveLink = ({
  children,
  activeClassName = '',
  asPath,
  ...props
}) => {
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
  href: PropTypes.string.isRequired,
  asPath: PropTypes.string.isRequired
}
