import React from 'react'
import { ActiveLink } from '../../../atoms'
import { AnchorRouter } from '../styled'
import styles from './CustomLinkAside.module.css'

interface CustomLinkAsideProps {
  count?: number
  href?: string
  icon?: React.ReactNode
  label: string
  onClick?: () => void
  size?: number
}
export const CustomLinkAside: React.FC<CustomLinkAsideProps> = ({
  href = '',
  icon: IconComponent,
  size,
  count = 0,
  label = '',
  onClick = () => { }
}) => {
  return (
    <>
      {href
        ? (
        <ActiveLink activeClassName='active' href={href}>
          <AnchorRouter>
            <IconComponent size={size} />
            {label}
            {count > 0
              ? <span className={styles['containerOption_count--notification']}>
              {count}
            </span>
              : null}
          </AnchorRouter>
        </ActiveLink>
          )
        : (
        <div className={styles.wrapper_custom_link}>
          <button className={styles.button} onClick={onClick}>
            <IconComponent size={size} />
            {label}
          </button>
          {count > 0
            ? <span className={styles['containerOption_count--notification']}>
            {count}
          </span>
            : null}
        </div>
          )}
    </>
  )
}
