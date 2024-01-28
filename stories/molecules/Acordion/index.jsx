import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import { IconArrowBottom, IconArrowTop } from '../../../assets/icons'
import {
  ContainerBurger,
  MenuLeft,
  OptionMenu,
  Row,
  Span
} from './Styled'

export const Options = ({
  index,
  active = false,
  children,
  label,
  path,
  icon: IconComponent,
  handleClick = () => { return }
}) => {
  const refButton = useRef()
  const refMenu = useRef()
  const location = useRouter()

  const [menuState, setMenuState] = useState({
    height: 0,
    heightMenu: 0,
    status: 'close'
  })

  useEffect(() => {
    if (!refButton?.current || !refMenu?.current) return
    const initialHeight = refButton?.current?.clientHeight - refMenu?.current?.clientHeight
    const initialHeightMenu = refMenu.current.clientHeight

    setMenuState(prevState => {return {
      ...prevState,
      height: initialHeight,
      heightMenu: initialHeightMenu
    }})

    if (location.pathname.includes(path)) {
      handleClick(index)
    }
  }, [])

  useEffect(() => {
    const updatedHeight = active
      ? (menuState.height + menuState.heightMenu)
      : (refButton?.current?.clientHeight - refMenu?.current?.clientHeight)
    const updatedStatus = active ? 'open' : 'close'

    setMenuState(prevState => {return {
      ...prevState,
      height: updatedHeight,
      status: updatedStatus
    }})
  }, [active])

  return (
    <MenuLeft
      active={active}
      height={menuState?.height}
      id={`menu-id__${index}`}
      index={index}
      onClick={handleClick}
      ref={refButton}
    >
      <Row active={active}>
        <div style={{ display: 'flex' }}>

          {IconComponent && <IconComponent size={20} style={{ marginRight: '10px' }} />}

          <Span active={active}>{label}</Span>
        </div>
        <ContainerBurger>
          <div
            className='BurgerMenu__container'
            onClick={() => {return handleClick(index)}}
            role='button'
          >
            {active
              ? <IconArrowTop color={'#252525'} size={15} />
              : <IconArrowBottom color={'#25252569'} size={15} />
            }
          </div>
        </ContainerBurger>
      </Row>
      <OptionMenu active={active} ref={refMenu}>
        {children}
      </OptionMenu>
    </MenuLeft>
  )
}


Options.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.any,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}
