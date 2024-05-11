import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { type ReactElement } from 'react'

interface ActiveLinkProps {
  activeClassName: string
  children: ReactElement
  href: string
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  activeClassName = '',
  ...props
}) => {
  const router = useRouter()

  const { asPath } = router

  const child = React.Children.only(children)
  const childClassName = child.props.className ?? ''
  const className =
    asPath === props.href ? `${childClassName} ${activeClassName}`.trim() : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className ?? null
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired
}
