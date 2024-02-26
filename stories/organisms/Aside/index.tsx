import React, {
  memo,
  useEffect,
  useState
} from 'react'
import {
  IconBox,
  IconBuys,
  IconCategorie,
  IconChart,
  IconHome,
  IconLogo,
  IconShopping,
  IconStore,
  IconTicket,
  IconTime,
  IconUser
} from '../../../assets/icons'
import {
  Button,
  Overline
} from '../../atoms'

import Link from 'next/link'
import { Options } from '../../molecules'
import { CustomLinkAside } from '../Aside/helpers'
import { Portal } from '../Portal'
import {
  ButtonGlobalCreate,
  Card,
  ContainerAside,
  Info,
  LeftNav,
  Router
} from './styled'
import { getGlobalStyle } from '../../../utils'
interface MemoAsideProps {
  isMobile?: boolean
  location?: any
  countOrders?: number
  setCollapsed?: any
  salesOpen?: boolean
  collapsed?: boolean
  dataStore?: any
  loading?: boolean
  handleClick?: any
  handleOpenDeliveryTime?: any
  setSalesOpen?: any
  setShowComponentModal?: any

}
const MemoAside: React.FC<MemoAsideProps> = ({
  isMobile = false,
  location = {
    pathname: '/'
  },
  countOrders = 0,
  setCollapsed,
  salesOpen,
  collapsed = false,
  dataStore = {
    storeName: '',
    idStore: '',
    uState: 1
  },
  loading = false,
  handleClick = (state: boolean) => { return state },
  handleOpenDeliveryTime = () => { },
  setSalesOpen = (state: boolean) => { return state },
  setShowComponentModal = (state: boolean) => { return state }
}) => {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState<boolean>(false)
  const pathname = location?.pathname === '/dashboard/[...name]'
  interface DataStore {
    storeName: string
    idStore: string
    uState: number
  }
  const {
    storeName,
    idStore,
    uState
  }: DataStore = dataStore ?? {
    storeName: '',
    idStore: '',
    uState: 1
  }

  const handleOpenCreateProduct = (): void => {
    setShowComponentModal(3)
    handleClick(3)
    setShow(!show)
  }

  const links = [
    {
      href: '/dashboard',
      icon: IconHome,
      size: '25px',
      label: 'Home'
    },
    {
      href: '/pedidos',
      icon: IconTicket,
      size: '25px',
      label: 'Pedidos',
      count: countOrders ?? 0
    },
    {
      href: idStore !== '' ? `/dashboard/${storeName}/${idStore}` : '/dashboard',
      icon: IconStore,
      size: '25px',
      label: 'Perfil'
    },
    {
      href: '/horarios',
      icon: IconTime,
      size: '25px',
      label: 'Horarios'
    },
    {
      icon: IconTime,
      size: '25px',
      label: 'Tiempo de entrega',
      onClick: handleOpenDeliveryTime
    },
    {
      href: '/ventas',
      icon: IconTicket,
      size: '25px',
      label: 'Ventas'
    },
    {
      href: '/informes',
      icon: IconChart,
      size: '25px',
      label: 'Informes'
    },
    {
      href: '/clientes',
      icon: IconUser,
      size: '25px',
      label: 'Clientes'
    },
    {
      href: '/compras',
      icon: IconBuys,
      size: '25px',
      label: 'Compras'
    },
    {
      href: '/categorias',
      icon: IconBox,
      size: '25px',
      label: 'Categorías'
    },
    {
      href: '/products',
      icon: IconShopping,
      size: '25px',
      label: 'Productos',
      multiple: [
        {
          href: '/products',
          icon: IconTicket,
          size: '20px',
          label: 'Productos',
          subLinks: [
            {
              href: '/products',
              icon: IconTicket,
              size: '20px',
              label: 'Productos'
            }
          ]
        }
      ]
    }
  ]

  useEffect(() => {
    function handleKeyDown (event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        setSalesOpen(!salesOpen)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [salesOpen])

  const handleMenu = (index) => {
    setActive((prev: boolean) => {
      const state = index === prev ? false : index
      return state
    })
  }

  return (
    <>
      {isMobile &&
          <Overline
            bgColor='rgba(0, 0, 0, 0.162)'
            onClick={() => { return setCollapsed(!collapsed) }}
            show={collapsed}
            zIndex='999'
          />
      }
      <Overline
        bgColor='rgba(0, 0, 0, 0.162)'
        onClick={() => { setShow(!show) }}
        show={show}
        zIndex={getGlobalStyle('--z-index-99999')}
      />
      <ContainerAside collapsed={isMobile ? collapsed : false}>
        <Card>
          <Info>
            <ButtonGlobalCreate onClick={() => { setShow(!show) }}>
                Agregar Nuevo
            </ButtonGlobalCreate>
            <Portal>
              <LeftNav show={show && !salesOpen}>
                {location?.pathname !== '/products' && <Info>
                  <Button border='gray' color='black' onClick={() => { handleOpenCreateProduct() }}>
                      Productos
                  </Button>
                </Info>}
                {location?.pathname === '/products' && <Info>
                  <Button
                    border='gray' color='black'
                    onClick={() => {
                      setShowComponentModal(4)
                      handleClick(4)
                    }}
                  >
                      Categorías
                  </Button>
                </Info>}
                <Info>
                  <Button border='gray' color='black' onClick={() => { return setSalesOpen(!salesOpen) }}>
                      Ventas
                  </Button>
                </Info>
              </LeftNav>
            </Portal>
            {(loading)
              ? null
              : (!pathname && <Link href={`/dashboard/${storeName?.replace(/\s/g, '-').toLowerCase()}/${idStore}`}>
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
                  {Boolean(multiple.length === 0) &&
                    <CustomLinkAside
                      count={link.count}
                      href={link.href}
                      icon={link.icon}
                      label={link.label}
                      size={link.size}
                      {...link}
                    />
                  }
                  {Array.isArray(multiple) &&
                    multiple.map((item, index) => {
                      const {
                        label,
                        href,
                        icon
                      } = item || {}
                      return (
                        <Options
                          active={Boolean(index === active)}
                          handleClick={() => { handleMenu(index) }}
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
                              size={subLink.size}
                              {...subLink}

                            />)
                          })}
                        </Options>

                      )
                    })
                  }
                </div>
              )
            })}
          </Router>
        </Card>
      </ContainerAside>
    </>
  )
}

export const Aside = memo(MemoAside)
