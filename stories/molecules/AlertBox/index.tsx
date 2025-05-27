'use client'

import React, { useEffect, useState } from 'react'
import { AlertContent } from './AlertContent'
import { AlertContentProps } from './types'

export const AlertBox: React.FC<AlertContentProps> = ({ err }) => {
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
