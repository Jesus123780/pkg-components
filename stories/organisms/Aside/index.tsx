import React, {
  type Dispatch,
  type SetStateAction,
  memo,
  useEffect,
  useState
} from 'react'
import { IconLogo } from '../../../assets/icons'
import {
  Button,
  Overline,
  Text
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
  collapsed?: boolean
  countOrders?: number
  dataStore?: any
  handleClick?: any
  handleOpenDeliveryTime?: any
  isMobile?: boolean
  loading?: boolean
  location?: any
  salesOpen?: boolean
  setCollapsed?: any
  setShowComponentModal?: any
  version?: string
  modules?: any[]
  setSalesOpen?: Dispatch<SetStateAction<boolean>>
}
const MemoAside: React.FC<MemoAsideProps> = ({
  isMobile = false,
  location = {
    pathname: '/'
  },
  countOrders = 0,
  version = '0.0.0',
  setCollapsed,
  salesOpen,
  collapsed = false,
  dataStore = {
    storeName: '',
    idStore: '',
    uState: 1
  },
  loading = false,
  modules = [],
  handleClick = (state: boolean) => { return state },
  handleOpenDeliveryTime = () => { },
  setSalesOpen = (state: boolean) => { return state },
  setShowComponentModal = (state: boolean) => { return state }
}) => {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState<boolean | number>(false)
  const pathname = location?.pathname === '/dashboard/[...name]'
  interface DataStore {
    storeName: string
    idStore: string
    uState: number | string
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

  const modulesArray = modules?.map((module) => {
    return module
  })

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        setSalesOpen(prevState => !(prevState))
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [salesOpen])

  const handleMenu = (index: boolean | number): void => {
    setActive((prev: boolean | number) => {
      const state = index === prev ? false : index
      return state
    })
  }
  const handleClickAction = (path: string): void => {
    const action: Record<string, () => void> = {
      '?time=true': handleOpenDeliveryTime
    }
    action[path]?.()
  }
  return (
    <>
      {isMobile &&
        <Overline
          bgColor={getGlobalStyle('--color-background-overline')}
          onClick={() => { return setCollapsed(!collapsed) }}
          show={collapsed}
          zIndex='999'
        />
      }
      <Overline
        bgColor={getGlobalStyle('--color-background-overline')}
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
              <LeftNav show={show && salesOpen === false}>
                {location?.pathname !== '/products' &&
                  <Info>
                    <Button border='gray' color='black' onClick={() => { handleOpenCreateProduct() }}>
                      Productos
                    </Button>
                  </Info>
                }
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
                  <Button
                    border='gray'
                    color='black'
                    onClick={() => { return setSalesOpen(salesOpen ?? false) }}
                  >
                    Ventas
                  </Button>
                </Info>
              </LeftNav>
            </Portal>
            {(loading)
              ? null
              : (!pathname && <Link href={`/dashboard/${storeName?.replace(/\s/g, '-').toLowerCase()}/${idStore}`}>
                <h1 className='title_store'>
                  {storeName}
                </h1>
              </Link>)
            }
            {pathname &&
              <h1 className='title_store'>{storeName}</h1>
            }
            {uState === '1' &&
              <div className='program_state'>
                <IconLogo color='var(--color-icons-primary)' size='20px' />
                <h3 className='sub_title_store'>En pausa programada</h3>
              </div>
            }
          </Info>
          <Router>
            {modulesArray?.map((module: any, index) => {
              const subModules = module?.subModules ?? []
              const existSubModules = Boolean(subModules.length > 0)
              const onAction = module?.mPath?.startsWith('?')
              return (
                <div key={module.mId}>
                  {!existSubModules &&
                    <CustomLinkAside
                      count={0}
                      onClick={() => {
                        handleClickAction(module.mPath as string)
                      }}
                      size={existSubModules ? '.8rem' : '.9rem'}
                      mPath={onAction === true ? '' : module?.mPath as string}
                      mIcon={module?.mIcon}
                      mName={module?.mName}
                    />
                  }
                  {existSubModules &&
                    <span style={{
                      cursor: 'pointer',
                      fontSize: '.8rem',
                      padding: '10px',
                      display: 'block',
                      fontWeight: '600',
                      color: '#bebdbe'
                    }}>
                      {module.mName}
                    </span>
                  }
                  <div>
                    {existSubModules &&
                      <Options
                        active={Boolean(index === active)}
                        handleClick={() => { handleMenu(index) }}
                        index={index}
                        icon='IconTicket'
                        size='.9rem'
                        label={module.mName}
                        path={`/${module.mPath}`}
                      >
                        {subModules?.map((item: any, index: number) => {
                          return (
                            <div key={item.smId}
                              style={{
                                marginLeft: '20px',
                                width: '90%',
                                marginTop: '10px'
                              }} >
                              <CustomLinkAside
                                size='.8rem'
                                mPath={item?.smPath}
                                mIcon={-1}
                                mName={item?.smName}
                              />
                            </div>
                          )
                        })}

                      </Options>}
                  </div>

                </div>
              )
            })}
          </Router>
          <Text color='gray-dark'>
            {version}
          </Text>
        </Card>
      </ContainerAside>
    </>
  )
}

export const Aside = memo(MemoAside)
