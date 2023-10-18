import PropTypes from 'prop-types'
import React from 'react'

export const ButtonContent = ({ children, icon }) => {
  return <span style={{ paddingRight: 10, fontWeight: 500, paddingLeft: icon ? 0 : 10, paddingTop: 10, paddingBottom: 10 }}>{children}</span>
}

ButtonContent.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.any
}
