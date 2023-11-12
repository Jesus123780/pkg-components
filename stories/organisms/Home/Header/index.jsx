import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import { IconLogo, PColor } from '../../../../assets'
import { ButtonHeader } from '../ButtonHeader'
import styles from './styles.module.css'

export const Header = ({
  handleLogin = () => {
    return
  },
  handleRegister = () => {
    return
  },
  isMobile = false
}) => {
  return (
    <div style={{ margin: '0 0 90px 0' }}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <IconLogo
            color={PColor}
            size={isMobile ? 50 : 90}
          />
        </div>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link href='/entrar'>
              <a>Vender</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/register'>
              <a>Primeros pasos</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/contact'>
              <a
                href={process.env.MAIN_URL_BASE}
                rel='noopener noreferrer'
                target='_blank'
              >
              Comprar
              </a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <ButtonHeader onClick={handleLogin} primary>
              Entrar
            </ButtonHeader>
          </li>
          <li>
            <ButtonHeader onClick={handleRegister}>Registrar</ButtonHeader>
          </li>
        </ul>
      </div>
    </div>
  )
}

Header.propTypes = {
  handleLogin: PropTypes.func,
  handleRegister: PropTypes.func,
  isMobile: PropTypes.bool,
  logo: PropTypes.string
}
