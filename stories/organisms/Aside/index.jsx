import PropTypes from 'prop-types'
import React, {
  memo,
  useEffect,
  useState
} from 'react'
import {
  IconChart,
  IconHome,
  IconHorario,
  IconLogo,
  IconShopping,
  IconUser,
  IconWallet
} from '../../../assets/icons'
import {
  ActiveLink,
  Button,
  Overline,
  Tooltip
} from '../../atoms'

import Link from 'next/link'
import { BGColor } from '../../../assets/colors'
import {
  AnchorRouter,
  ButtonGlobalCreate,
  Card,
  ContainerAside,
  ContentAction,
  DynamicNav,
  Info,
  LeftNav,
  Router
} from './styled'

const MemoAside = ({
  isMobile = false,
  location = {
    pathname: '/'
  },
  countPedido = 0,
  setCollapsed,
  salesOpen,
  collapsed = false,
  dataStore = {
    storeName: '',
    idStore: '',
    uState: 1
  },
  loading,
  handleClick = () => { return },
  setSalesOpen = () => { return },
  setShowComponentModal = () => { return }
}) => {
  const pathname = location?.pathname === '/dashboard/[...name]'

  const [show, setShow] = useState(false)

  const {
    storeName,
    idStore,
    uState
  } = dataStore || {}
  const handleOpenCreateProduct = () => {
    setShowComponentModal(3)
    handleClick(3)
    setShow(!show)
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        setSalesOpen(!salesOpen)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [salesOpen, setSalesOpen])

  return (
    <>
      {isMobile &&
          <Overline
            bgColor='rgba(0,0,0,.4)'
            onClick={() => { return setCollapsed(!collapsed) }}
            show={collapsed}
            zIndex='999'
          />}
      <ContainerAside collapsed={isMobile ? collapsed : false}>
        <Card>
          <Info>
            <ButtonGlobalCreate onClick={() => { return setShow(!show) }}>
                Agregar Nuevo
            </ButtonGlobalCreate>
            <LeftNav show={show}>
              {location.pathname !== '/products' && <Info>
                <Button onClick={() => { return handleOpenCreateProduct() }}>
                    Productos
                </Button>
              </Info>}
              <Info>
                <Button onClick={() => { return setSalesOpen(!salesOpen) }}>
                    Ventas
                </Button>
              </Info>
              <Info>
                <Button onClick={() => { return setShowComponentModal(4) }}>
                    Categorías
                </Button>
              </Info>
            </LeftNav>
            {(loading) ? null : (!pathname && <Link href={`/dashboard/${storeName?.replace(/\s/g, '-').toLowerCase()}/${idStore}`}>
              <a>
                <h1 className='title_store'>{storeName}</h1>
              </a>
            </Link>)}
            {pathname &&
                <h1 className='title_store'>{storeName}</h1>
            }
            {uState == 1 &&
                <div className='program_state'>
                  <IconLogo color={'var(--color-icons-primary)'} size='20px' />
                  <h3 className='sub_title_store'>En pausa programada</h3>
                </div>
            }
          </Info>
          <Router>
            <ActiveLink activeClassName='active' href='/dashboard'>
              <AnchorRouter><IconHome size='15px' />Inicio</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/pedidos'>
              <AnchorRouter>
                <div className='count_pedidos'>{countPedido}</div>
                <IconShopping size='15px' />Pedidos
              </AnchorRouter>
            </ActiveLink>
            <DynamicNav>
              <ActiveLink activeClassName='active' href='/horarios'>
                <AnchorRouter><IconHorario size='15px' />Horarios</AnchorRouter>
              </ActiveLink>
              <ContentAction onClick={() => { return setShowComponentModal(1) }}>
                <IconHorario color={BGColor} size='15px' />
              </ContentAction>
            </DynamicNav>
            <ActiveLink activeClassName='active' href='/ventas'>
              <AnchorRouter><IconShopping size='15px' />Ventas</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/informes'>
              <AnchorRouter><IconChart size='20px' />Informes</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/clientes'>
              <AnchorRouter>  <IconUser size='20px' />Clientes</AnchorRouter>
            </ActiveLink>
            <Tooltip
              borderRadius='20px'
              bottom='35%'
              left='65%'
              position='top'
              rotate='0deg'
              text='Pronto'
            >
              <ActiveLink activeClassName='active' href='/compras'>
                <AnchorRouter>  <IconUser size='20px' />Compras</AnchorRouter>
              </ActiveLink>
            </Tooltip>
            <ActiveLink activeClassName='active' href='/categorias'>
              <AnchorRouter>  <IconWallet size='20px' />Categorías</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/products'>
              <AnchorRouter>  <IconShopping size='20px' />Productos</AnchorRouter>
            </ActiveLink>
          </Router>
        </Card>
      </ContainerAside>
    </>
  )
}

MemoAside.propTypes = {
  collapsed: PropTypes.any,
  countPedido: PropTypes.any,
  dataStore: PropTypes.object,
  handleClick: PropTypes.func,
  isMobile: PropTypes.any,
  loading: PropTypes.any,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  salesOpen: PropTypes.any,
  setCollapsed: PropTypes.func,
  setSalesOpen: PropTypes.func,
  setShowComponentModal: PropTypes.func
}
export const Aside = memo(MemoAside)