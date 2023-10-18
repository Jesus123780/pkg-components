import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AlertContent } from './AlertContent'

export const AlertBox = ({ err }) => {
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    if (err) {
      const timeOut = setTimeout(() => {
        return setClosed(true)
      }, (err.duration || 7000) / 2)
      return () => {
        clearTimeout(timeOut)
        setClosed(false)
      }
    }
  }, [err])

  return (
    <div
      onClick={() => {
        return setClosed(true)
      }}
    >
      <AlertContent closed={closed} err={err} />
    </div>
  )
}

AlertBox.propTypes = {
  err: PropTypes.shape({
    color: PropTypes.string,
    duration: PropTypes.number,
    message: PropTypes.string
  })
}
