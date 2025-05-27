'use client'

import React from 'react'
import { ContainerToast, ContentToast } from './styled'
import { type AlertContentProps } from './types'


export const AlertContent: React.FC<AlertContentProps> = ({ err, closed }) => {
  return (
    <>
      <ContainerToast
        closed={closed ? 'true' : undefined}
        color={err?.color}
        error={err?.message !== undefined && err?.message !== ''}
      >
        <ContentToast>
          <div>{err?.message !== undefined && err?.message !== '' ? err.message : ''}</div>
        </ContentToast>
      </ContainerToast>
    </>
  )
}
