import React from 'react'

export interface ButtonContentProps {
  children: React.ReactNode
  icon?: React.ReactNode
}

export const ButtonContent: React.FC<ButtonContentProps> = ({ children, icon }) => {
  return (
    <span style={{ paddingRight: 10, fontWeight: 500, paddingLeft: icon ? 0 : 10, paddingTop: 10, paddingBottom: 10 }}>
      {children}
    </span>
  )
}
