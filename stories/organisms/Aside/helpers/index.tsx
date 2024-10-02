import React from 'react'
import { ActiveLink, Icon } from '../../../atoms'
import { AnchorRouter } from '../styled'
import { getGlobalStyle } from '../../../../helpers'
import { useRouter } from 'next/router'
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
  size,
  count = 0,
  mName = '',
  onClick = () => { }
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
    14: 'IconConfig'
  }
  const router = useRouter()
  const currentPath = `/${mPath}` === router.asPath
  return (
    <>
      {mPath !== ''
        ? (
          <ActiveLink activeClassName='active' href={`/${mPath}`}>
            <AnchorRouter style={{
              display: 'flex',
              fontSize: size,
              justifyContent: 'unset'
            }}>
              <div style={{
                minWidth: '30px',
                minHeight: '20px',
                width: '30px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} >
                <Icon
                  size={20}
                  width={20}
                  color={getGlobalStyle(currentPath ? '--color-icons-primary' : '--color-icons-gray')}
                  height={20}
                  icon={icon[mIcon as keyof typeof icon]}
                />
              </div>
              {mName}
              {count > 0
                ? <span className={styles['containerOption_count--notification']}>
                  {count}
                </span>
                : null}
            </AnchorRouter>
          </ActiveLink>
          )
        : (
          <div className={styles.wrapper_custom_link} style={{
            display: 'flex',
            fontSize: size,
            justifyContent: 'unset',
            alignItems: 'center',
            padding: '0px 5px'
          }}>
            <div style={{
              minWidth: '30px',
              minHeight: '20px',
              width: '30px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} >
              <Icon
                size={20}
                width={20}
                color={getGlobalStyle(currentPath ? '--color-icons-primary' : '--color-icons-gray')}
                height={20}
                icon={icon[mIcon as keyof typeof icon]}
              />
            </div>
            <button className={styles.button} onClick={onClick} style={{
              fontSize: size
            }}>
              {mName}
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
