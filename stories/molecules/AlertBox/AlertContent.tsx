import PropTypes from 'prop-types'
import React from 'react'
import { ContainerToast, ContentToast } from './styled'

export const AlertContent = ({ err, closed }) => {
  return (
    <ContainerToast
      closed={closed}
      color={err?.color}
      error={!!err?.message}
    >
      <ContentToast>
        <div>{err?.message || ''}</div>
      </ContentToast>
    </ContainerToast>
  )
}

AlertContent.propTypes = {
  err: PropTypes.shape({
    color: PropTypes.string,
    duration: PropTypes.number,
    message: PropTypes.string
  }),
  closed: PropTypes.bool.isRequired
}
