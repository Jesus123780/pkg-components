import PropTypes from 'prop-types'
import React from 'react'

export const ErrorBoundary = ({ message }) => {
  return <div>{message}</div>
}

ErrorBoundary.propTypes = {
  message: PropTypes.any
}

export const AppErrorFallback = () => {
  return <div></div>
}
