import PropTypes from 'prop-types'
import React, {
  memo,
  useEffect,
  useState
} from 'react'
import {
  IconChart,
  IconHome,
  IconLogo,
  IconShopping,
  IconUser,
  IconWallet
} from '../../../assets/icons'
import {
  Button,
  Overline
} from '../../atoms'

import Link from 'next/link'
import { Options } from '../../molecules'
import { CustomLinkAside } from '../Aside/helpers'
import {
  ButtonGlobalCreate,
  Card,
  ContainerAside,
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
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(null)

  const pathname = location?.pathname === '/dashboard/[...name]'


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

  const links = [
    { href: '/dashboard',
      icon: IconHome,
      size: '15px',
      label: 'Inicio'
    },
    { href: '/pedidos',
      icon: IconShopping,
      size: '15px',
      label: 'Pedidos',
      count: countPedido
    },
    { href: '/horarios',
      icon: IconShopping,
      size: '15px',
      label: 'Horarios'
    },
    { href: '/ventas',
      icon: IconShopping,
      size: '15px',
      label: 'Ventas'
    },
    { href: '/informes',
      icon: IconChart,
      size: '20px',
      label: 'Informes'
    },
    { href: '/clientes',
      icon: IconUser,
      size: '20px',
      label: 'Clientes'
    },
    { href: '/compras',
      icon: IconUser,
      size: '20px',
      label: 'Compras'
    },
    { href: '/categorias',
      icon: IconWallet,
      size: '20px',
      label: 'Categorías'
    },
    { href: '/products',
      icon: IconShopping,
      size: '20px',
      label: 'Productos',
      multiple: [
        {
          href: '/products',
          icon: IconShopping,
          size: '20px',
          label: 'Productos',
          subLinks: [
            { href: '/products',
              icon: IconShopping,
              size: '20px',
              label: 'Productos'
            }
          ]
        }
      ]
    }
  ]

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
  const handleMenu = (index) => {
    setActive((prev) => {
      const state = index === prev ? false : index
      return state
    })
  }
  return (
    <>
      {isMobile &&
          <Overline
            bgColor='rgba(0,0,0,.4)'
            onClick={() => { return setCollapsed(!collapsed) }}
            show={collapsed}
            zIndex='999'
          />
      }
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
                <h1 className='title_store'>
                  {storeName}
                </h1>
              </a>
            </Link>)
            }
            {pathname &&
                <h1 className='title_store'>{storeName}</h1>
            }
            {uState == 1 &&
                <div className='program_state'>
                  <IconLogo color='var(--color-icons-primary)' size='20px' />
                  <h3 className='sub_title_store'>En pausa programada</h3>
                </div>
            }
          </Info>
          <Router>
            {links.map(link => {
              const multiple = link.multiple || []
              return (
                <div key={link.href}>
                  {!multiple.length > 0 &&
                    <CustomLinkAside
                      count={link.count}
                      href={link.href}
                      icon={link.icon}
                      label={link.label}
                      size={link.size}
                    />
                  }
                  {Array.isArray(multiple) &&
                    multiple.map((item, index) => {
                      const {
                        label,
                        href,
                        icon,
                        size
                      } = item || {}
                      return (
                        <Options
                          active={index === active}
                          handleClick={() => { return handleMenu(index) }}
                          icon={icon}
                          index={index}
                          key={href}
                          label={label}
                          path={href}
                        >
                          {item.subLinks?.map((subLink) => {
                            return (<CustomLinkAside
                              href={subLink.href}
                              icon={subLink.icon}
                              key={subLink.href}
                              label={subLink.label}
                              size={size}
                            />)
                          })}
                        </Options>

                      )
                    })
                  }
                </div>
              )})}
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