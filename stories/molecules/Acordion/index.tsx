'use client'

import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

interface OptionsProps {
  active?: boolean | number | undefined | string
  children?: React.ReactNode
  handleClick: (index: number) => void
  icon?: React.ReactNode
  index?: number | string | boolean
  label: string
  size: number
}

export const Options: React.FC<OptionsProps> = ({
  active = false,
  children,
  handleClick,
  icon = 'none',
  index,
  label,
  size
}) => {
  const refButton = useRef<HTMLDivElement>(null)
  const refMenu = useRef<HTMLDivElement>(null)

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
    if (refButton.current === null || refMenu.current === null) return

    const initialHeight = refButton.current.clientHeight - refMenu.current.clientHeight
    const initialHeightMenu = refMenu.current.scrollHeight

    setMenuState(prevState => ({
      ...prevState,
      height: initialHeight,
      heightMenu: initialHeightMenu
    }))
  }, [])

  useEffect(() => {
    const updatedHeight = active === true
      ? menuState.height + menuState.heightMenu
      : (refButton.current?.clientHeight ?? 0) - (refMenu.current?.clientHeight ?? 0)
    const updatedStatus = active === true ? 'open' : 'close'

    setMenuState(prevState => ({
      ...prevState,
      height: updatedHeight,
      status: updatedStatus
    }))
  }, [active])

  return (
    <div
      id={`menu-id__${index}`}
      onClick={() => { handleClick(index as number) }}
      ref={refButton}
      className={`${styles.optionMenu} ${active === true ? styles.active : ''}`}
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
          <span className={`${styles.span} ${active === true ? styles.active : ''}`}>
            {label}
          </span>
        </div>
        <div className={styles.containerBurger}>
          <button
            style={{
              backgroundColor: getGlobalStyle('--color-base-transparent')
            }}
            className={styles.burgerMenuContainer}
            onClick={(e) => {
              e.stopPropagation()
              handleClick(index as number)
            }}
          >
            <Icon icon={active === true ? 'IconArrowTop' : 'IconArrowBottom'} size={size ?? 15} />
          </button>
        </div>
      </div>

      {children !== null && (
        <div
          ref={refMenu}
          className={styles.menuContent}
          style={{
            height: active === true ? `${menuState.heightMenu}px` : '0px',
            overflow: 'hidden',
            transition: 'height 0.3s ease'
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
