import React from 'react'

export const ErrorBoundary = ({ message }) => {
  return (
    <div>{message}</div>
  )
}

export const AppErrorFallback = () => {
  return (
    <div></div>
  )
}
