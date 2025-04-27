'use client'

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
  Column,
  Icon,
  Overline,
  Text
} from '../../atoms'
import { NavigationButtons, Options, ToggleSwitch } from '../../molecules'
import { CustomLinkAside } from '../Aside/helpers'
import { Portal } from '../Portal'
import {
  ButtonGlobalCreate,
  Card,
  Info,
  LeftNav,
  Router
} from './styled'
import { getGlobalStyle } from '../../../utils'
import packageJson from '../../../package.json'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from './styles.module.css'

interface MemoAsideProps {
  collapsed?: boolean
  dataStore?: any
  handleClick?: any
  handleOpenDeliveryTime?: any
  isMobile?: boolean
  loading?: boolean
  location?: any
  salesOpen?: boolean
  setCollapsed?: any
  setShowComponentModal?: any
  version: string
  logicalVersion: string
  modules?: any[]
  setSalesOpen?: Dispatch<SetStateAction<boolean>>
  onDragEnd?: (result: any) => void
  isElectron?: boolean
}
const MemoAside: React.FC<MemoAsideProps> = ({
  isElectron = false,
  isMobile = false,
  location = {
    pathname: '/'
  },
  version = '0.0.0',
  logicalVersion = '0.0.0',
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
  setShowComponentModal = (state: boolean) => { return state },
  onDragEnd = (result: any) => { return result }
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
        setSalesOpen((prevState: boolean) => !(prevState))
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
  const [isDragDisabled, setIsDragDisabled] = useState(false)
  return (
    <>
      {isMobile &&
        <Overline
          bgColor={getGlobalStyle('--color-background-overline')}
          onClick={() => { return setCollapsed(!collapsed) }}
          show={collapsed}
          zIndex={getGlobalStyle('--z-index-99999')}
        />
      }
      {!isMobile && <Overline
        bgColor={getGlobalStyle('--color-background-overline')}
        onClick={() => { setShow(!show) }}
        show={show}
        zIndex={getGlobalStyle('--z-index-99999')}
      />}
      <div
        className={`${styles.containerAside} ${isMobile && collapsed ? styles.collapsed : ''}`}
        style={isMobile ? { zIndex: getGlobalStyle('--z-index-99999') } : {}}
      >
        <Card>
          <div style={{
            overflowY: 'hidden',
            overflowX: 'hidden',
            height: '100%'
          }}>
            <Info>
              {isElectron && <NavigationButtons />}
              <ButtonGlobalCreate onClick={() => { setShow(!show) }}>
                Agregar nuevo
              </ButtonGlobalCreate>
              <Portal>
                <LeftNav show={show && salesOpen === false}>
                  {location?.pathname !== '/products' &&
                    <Info>
                      <Button border='gray' color='black' onClick={() => { handleOpenCreateProduct() }}>
                        Nuevo producto
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
                : null
              }
              <h1 className='title_store'>{storeName}</h1>
              {uState === '1' &&
                <div className='program_state'>
                  <IconLogo color='var(--color-icons-primary)' size='20px' />
                  <h3 className='sub_title_store'>En pausa programada</h3>
                </div>
              }
            </Info>
            <Router>
              <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="modules" direction="vertical">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={styles.modulesContainer}
                    >
                      {modulesArray?.map((module, index) => {
                        const subModules = module?.subModules ?? []
                        const existSubModules = Boolean(subModules.length > 0)
                        const onAction = module?.mPath?.startsWith('?')

                        return (
                          <Draggable isDragDisabled={!isDragDisabled} key={module.mId} draggableId={module.mId} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={styles.containerOption}
                              >
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
                                      active={index === active}
                                      handleClick={() => { handleMenu(index) }}
                                      index={active}
                                      icon='IconTicket'
                                      size='.9rem'
                                      label={module.mName}
                                      path={`/${module.mPath}`}
                                    >
                                      {subModules?.map((item: any) => {
                                        return (
                                          <div key={item.smId} style={{ marginLeft: '20px', width: '90%', marginTop: '10px' }} >
                                            <CustomLinkAside
                                              size='.8rem'
                                              mPath={item?.smPath}
                                              mIcon={-1}
                                              mName={item?.smName}
                                            />
                                          </div>
                                        )
                                      })}
                                    </Options>
                                  }
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <ToggleSwitch
                checked={isDragDisabled}
                id='edit_modules'
                label='Editar módulos'
                onChange={() => setIsDragDisabled(!isDragDisabled)}
                successColor='green'
              />
            </Router>
          </div>
          <Text color='gray-dark'>
            version: {version}
          </Text>
          <Text color='gray-dark'>
            UI: {packageJson.version}
          </Text>
          <Text color='gray-dark'>
            logical: {logicalVersion}
          </Text>
        </Card>
      </div>
    </>
  )
}

export const Aside = memo(MemoAside, (prevProps, nextProps) => {
  return prevProps.collapsed === nextProps.collapsed &&
    prevProps.dataStore?.storeName === nextProps.dataStore?.storeName &&
    prevProps.location?.pathname === nextProps.location?.pathname &&
    prevProps.salesOpen === nextProps.salesOpen &&
    prevProps.setSalesOpen === nextProps.setSalesOpen &&
    prevProps.modules === nextProps.modules
})
