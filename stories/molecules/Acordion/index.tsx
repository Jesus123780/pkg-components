'use client'

import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IconArrowBottom, IconArrowTop } from '../../../assets/icons'
import { getGlobalStyle } from '../../../helpers'
import { Icon } from '../../atoms'
import styles from './styles.module.css'

interface OptionsProps {
  active?: boolean | number | undefined | string
  children?: React.ReactNode
  handleClick: (index: number) => void
  icon?: React.ReactNode
  index?: number | string | boolean
  label: string
  size: string
  path: string
}

export const Options: React.FC<OptionsProps> = ({
  active = false,
  children,
  handleClick,
  icon = 'none',
  index,
  label,
  size,
  path
}) => {
  const refButton = useRef<HTMLDivElement>(null)
  const refMenu = useRef<HTMLDivElement>(null)
  const location = useRouter()
  const pathname = usePathname()

  const [menuState, setMenuState] = useState<{
    height: number
    heightMenu: number
    status: string
  }>({
    height: 0,
    heightMenu: 0,
    status: 'close'
  })

  useEffect(() => {
    if (!refButton.current || !refMenu.current) return

    const initialHeight = refButton.current.clientHeight - refMenu.current.clientHeight
    const initialHeightMenu = refMenu.current.clientHeight

    setMenuState(prevState => ({
      ...prevState,
      height: initialHeight,
      heightMenu: initialHeightMenu
    }))
  }, [])

  useEffect(() => {
    const updatedHeight = active
      ? menuState.height + menuState.heightMenu
      : refButton.current?.clientHeight - refMenu.current?.clientHeight
    const updatedStatus = active ? 'open' : 'close'

    setMenuState(prevState => ({
      ...prevState,
      height: updatedHeight,
      status: updatedStatus
    }))
  }, [active])

  return (
    <div
      id={`menu-id__${index}`}
      onClick={() => { handleClick(index) }}
      ref={refButton}
      className={styles.optionMenu + (active ? ` ${styles.active}` : '')}
    >
      <div className={styles.row}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              minWidth: '30px',
              minHeight: '20px',
              width: '30px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon
              color={getGlobalStyle('--color-icons-gray')}
              height={20}
              icon={String(icon)}
              size={20}
              width={20}
            />
          </div>
          <span className={`${styles.span} ${active ? styles.active : ''}`}>
            {label}
          </span>
        </div>
        <div className={styles.containerBurger}>
          <button
            style={{
              backgroundColor: getGlobalStyle('--color-base-transparent')
            }}
            className={styles.burgerMenuContainer}
            onClick={() => { handleClick(index) }}
          >
            <Icon icon={active === true ? 'IconArrowTop' : 'IconArrowBottom' } size={15} />
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
