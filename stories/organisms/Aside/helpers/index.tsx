'use client'

import React, { Children } from 'react'
import { ActiveLink } from '../../../atoms'
import { useRouter } from 'next/navigation'
import styles from './CustomLinkAside.module.css'

interface CustomLinkAsideProps {
  count?: number
  mPath?: string
  mName: string
  size?: string
  mIcon?: number
  onClick?: () => void
}
export const CustomLinkAside: React.FC<CustomLinkAsideProps> = ({
  mPath = '',
  mIcon,
  mName = '',
  children
}) => {
  const icon = {
    [-1]: 'IconBoxes',
    1: 'home',
    2: 'IconTicket',
    3: 'IconStore',
    4: 'time',
    5: 'time',
    6: 'IconTicket',
    7: 'IconChart',
    8: 'IconUser',
    9: 'IconBox',
    10: 'IconTicket',
    11: 'IconTicket',
    12: 'IconTicket',
    13: 'IconTicket',
    14: 'IconConfig',
    15: 'IconInventory'
  }
  const router = useRouter()

  const currentPath = `/${mPath}` === router.asPath

  return (
    <>
          <ActiveLink
            href={`${mPath}`}
            className={styles.linkAside}
            activeClassName={styles.active}
            name={mName}
            mIcon={mIcon}
            currentPath={currentPath}
            icon={icon}
            />
    </>
  )
}
