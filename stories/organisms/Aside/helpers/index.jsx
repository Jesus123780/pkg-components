import PropTypes from 'prop-types'
import React from 'react'
import { ActiveLink } from '../../../atoms'
import { AnchorRouter } from '../styled'
import styles from './CustomLinkAside.module.css'
export const CustomLinkAside = ({
  href,
  icon: IconComponent,
  size,
  count = 0,
  label = '',
  onClick = () => { return }
}) => {
  console.log('🚀 ~ onClick:', onClick)
  return (
    <>
      {href ? (
        <ActiveLink activeClassName='active' href={href}>
          <AnchorRouter>
            <IconComponent size={size} />
            {label}
            {count ? <span className={styles['containerOption_count--notification']}>
              {count}
            </span> : null}
          </AnchorRouter>
        </ActiveLink>
      ) : (
        <div className={styles.wrapper_custom_link}>
          <button className={styles.button} onClick={onClick}>
            <IconComponent size={size} />
            {label}
          </button>
          {count ? <span className={styles['containerOption_count--notification']}>
            {count}
          </span> : null}
        </div>
      )}
    </>
  )
}

CustomLinkAside.propTypes = {
  count: PropTypes.number,
  href: PropTypes.string,
  icon: PropTypes.object,
  label: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number
}
