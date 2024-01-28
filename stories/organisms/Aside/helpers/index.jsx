import PropTypes from 'prop-types'
import React from 'react'
import { ActiveLink } from '../../../atoms'
import { AnchorRouter } from '../styled'

export const CustomLinkAside = ({
  href,
  icon: IconComponent,
  size,
  label = ''
}) => {
  return (
    <ActiveLink activeClassName='active' href={href}>
      <AnchorRouter>
        <IconComponent size={size} />
        {label}
      </AnchorRouter>
    </ActiveLink>
  )
}

CustomLinkAside.propTypes = {
  count: PropTypes.number,
  href: PropTypes.string,
  icon: PropTypes.any,
  label: PropTypes.any,
  size: PropTypes.number
}
