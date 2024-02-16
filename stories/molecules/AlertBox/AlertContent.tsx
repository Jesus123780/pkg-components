import React from 'react'
import { ContainerToast, ContentToast } from './styled'
import { AlertContentProps } from './types'

export const AlertContent: React.FC<AlertContentProps> = ({ err, closed }) => {
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