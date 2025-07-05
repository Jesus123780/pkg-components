import Link from 'next/link'
import React from 'react'
import { IconLogo, PColor } from '../../../../assets'
import { ButtonHeader } from '../ButtonHeader'
import styles from './styles.module.css'
import { ROUTES } from '../../../../utils'

interface HeaderProps {
  handleLogin?: () => void
  handleRegister?: () => void
  isMobile?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  handleLogin = () => {
    return null
  },
  handleRegister = () => {
    return null
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
            <Link href={ROUTES.login}>
              Vender
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href={ROUTES.register}>
              Primeros pasos
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
