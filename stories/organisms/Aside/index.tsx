'use client'

import React, {
  type Dispatch,
  type SetStateAction,
  memo,
  useEffect,
  useState
} from 'react'
import {
  Button,
  Column,
  Icon,
  Overline,
  Row,
  Text
} from '../../atoms'
import {
  NavigationButtons,
  Options,
  Pulse,
  ToggleSwitch
} from '../../molecules'
import { CustomLinkAside } from '../Aside/helpers'
import { Portal } from '../Portal'
import { getGlobalStyle } from '../../../utils'
import packageJson from '../../../package.json'
import {
  DragDropContext,
  Droppable,
  Draggable
} from 'react-beautiful-dnd'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './styles.module.css'

type DashboardPath =
  | `/dashboard/${string}/${string}` // para /dashboard/[business]/[id]
  | `/dashboard/${string}` // para /dashboard/[business]
  | '/dashboard'

interface MemoAsideProps {
  collapsed?: boolean
  isCollapsedMenu?: boolean
  dataStore?: any
  handleClick?: any
  handleOpenDeliveryTime?: any
  isMobile?: boolean
  loading?: boolean
  salesOpen?: boolean
  connected: boolean
  setCollapsed?: any
  setShowComponentModal?: any
  version: string
  logicalVersion: string
  modules?: any[]
  setSalesOpen?: Dispatch<SetStateAction<boolean>>
  onDragEnd?: (result: any) => void
  isElectron?: boolean
  handleCollapsedMenu?: () => void
  pathname: DashboardPath | string
  setIsDragDisabled?: Dispatch<SetStateAction<boolean>>
}
const MemoAside: React.FC<MemoAsideProps> = ({
  isElectron = false,
  isMobile = false,
  pathname,
  version = '0.0.0',
  logicalVersion = '0.0.0',
  setCollapsed,
  salesOpen,
  connected = false,
  collapsed = false,
  isCollapsedMenu = false,
  dataStore = {
    storeName: '',
    idStore: '',
    uState: 1
  },
  modules = [],
  handleClick = (state: boolean) => { return state },
  handleOpenDeliveryTime = () => { },
  setSalesOpen = (state: boolean) => { return state },
  handleCollapsedMenu = () => { return null },
  setShowComponentModal = (state: boolean) => { return state },
  onDragEnd = (result: any) => { return result }
}) => {
  const [show, setShow] = useState(false)
  const [isDragDisabled, setIsDragDisabled] = useState(false)
  const [active, setActive] = useState<boolean | number>(false)
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
      '?time=true': handleOpenDeliveryTime,
      '?goals=true': handleOpenDeliveryTime
    }
    action[path]?.()
  }

  const isDashboardRoute = (pathname: DashboardPath | string): boolean => {
    return pathname.startsWith('/dashboard')
  }
  const hidden = isDashboardRoute(pathname)

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
      {/* {!isMobile &&
        // <Overline
        //   bgColor={getGlobalStyle('--color-background-overline')}
        //   onClick={() => { setShow(!show) }}
        //   show={show}
        //   zIndex={getGlobalStyle('--z-index-999')}get
        // />
      } */}
      <div
        className={`${styles.containerAside} ${isMobile && collapsed ? styles.collapsed : ''}`}
        style={isMobile
          ? {
            width: isCollapsedMenu ? '40px' : '80%',
            zIndex: getGlobalStyle('--z-index-99999')
          }
          : {}
        }
      >
        <Column className={styles['sidebar-header-container']}>
          <div style={{
            overflowY: 'hidden',
            overflowX: 'hidden',
            height: '100%'
          }}>
            <div>
              <Row className={styles['sidebar-header']}>
                <Column className={styles['sidebar-header-column']} style={(isMobile && isCollapsedMenu) ? { width: 'min-content' } : {}}>
                  {null}
                </Column>
                <Button
                  className={styles['sidebar-header-button']}
                  styles={{
                    border: 'none',
                    padding: getGlobalStyle('--spacing-md')
                  }}
                  onClick={() => { handleCollapsedMenu() }}
                >
                  <Icon
                    color={getGlobalStyle('--color-icons-gray')}
                    icon='IconAside'
                    size={20}
                  />
                </Button>
              </Row>
              {isElectron && <NavigationButtons />}
              <Portal>
                <div
                  className={clsx(
                    styles.quick_options as string,
                    {
                      [styles.visible]: show && salesOpen === false,
                      [styles.hidden]: !show || salesOpen === true,
                      [styles['quick_options--colapsed'] as string]: isCollapsedMenu
                    }
                  )}>
                  {!hidden &&
                    <Button
                      border='gray'
                      color='black'
                      iconName='IconBox'
                      iconPosition='right'
                      onClick={() => { handleOpenCreateProduct() }}>
                      Nuevo producto
                    </Button>
                  }
                  {!hidden &&
                    <Button
                      border='gray'
                      color='black'
                      iconName='IconCategorie'
                      iconPosition='right'
                      onClick={() => {
                        setShowComponentModal(4)
                        handleClick(4)
                      }}
                    >
                      Categorías
                    </Button>
                  }
                  <Button
                    border='gray'
                    color='black'
                    iconName='IconSales'
                    iconPosition='right'
                    onClick={() => { return setSalesOpen(salesOpen ?? false) }}
                  >
                    Ventas
                  </Button>
                </div>
              </Portal>
              {!isCollapsedMenu &&
                typeof dataStore?.storeName === 'string' && dataStore.storeName.trim() !== '' &&
                typeof dataStore?.idStore === 'string' && dataStore.idStore.trim() !== '' &&
                <Link href={`/dashboard/${dataStore?.storeName.replace(/ /g, '-')}/${dataStore.idStore}`}>
                  <Text
                    as='h2'
                    lineHeight='sm'
                    className={styles['sidebar-header-text']}
                    size='3xl'
                    align='center'
                  >
                    {storeName}
                  </Text>
                </Link>
              }
              {uState === '1' &&
                <Column>
                  <Text size='sm' align='center'>
                    En pausa programada
                  </Text>
                </Column>
              }
              {!isCollapsedMenu &&
                <Button onClick={() => { setShow(!show) }} className={styles.button_global_create}>
                  Agregar nuevo
                </Button>
              }
            </div>
            <Column className={styles['sidebar-header-router']}>
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
                        const action = module?.mPath?.startsWith('?')
                        const mPath = action === true ? '' : module?.mPath as string
                        const isActive = `/${mPath}` === pathname
                        return (
                          <Draggable isDragDisabled={!isDragDisabled} key={module.mId} draggableId={module.mId} index={index}>
                            {(provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined, draggableProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>, dragHandleProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> }) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={styles.containerOption}
                                style={{
                                  borderLeft: `2px solid ${getGlobalStyle(isActive ? '--color-primary-red' : '--color-base-transparent')}`
                                }}
                              >

                                {(!existSubModules) &&
                                  <CustomLinkAside
                                    onClick={() => {
                                      handleClickAction(module.mPath as string)
                                    }}
                                    mPath={mPath}
                                    isActive={isActive}
                                    action={action}
                                    mIcon={module?.mIcon}
                                    mName={module?.mName}
                                  />
                                }
                                {(existSubModules && !isCollapsedMenu) &&
                                  <span style={{
                                    cursor: 'pointer',
                                    fontSize: '.8rem',
                                    padding: '10px',
                                    display: 'block',
                                    fontWeight: '600',
                                    color: getGlobalStyle('--color-neutral-gray-dark')
                                  }}>
                                    {module.mName}
                                  </span>
                                }
                                <div>
                                  {(existSubModules && !isCollapsedMenu) &&
                                    <Options
                                      active={index === active}
                                      handleClick={() => { handleMenu(index) }}
                                      index={active}
                                      icon='IconTicket'
                                      label={module.mName}
                                      path={`/${module.mPath}`}
                                    >
                                      {subModules?.map((item: any) => {
                                        return (
                                          <div key={item.smId} style={{ marginLeft: '20px', width: '90%', marginTop: '10px' }} >
                                            <CustomLinkAside
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
                label={isCollapsedMenu ? '' : 'Editar módulos'}
                onChange={() => setIsDragDisabled(!isDragDisabled)}
                successColor='green'
              />
            </Column>
          </div>
          <Pulse
            active={connected}
          />
          <Column
            justifyContent='center'
            alignItems='center'
            className={styles['sidebar-footer']}
            style={isCollapsedMenu ? { display: 'none' } : {}}
          >
            <Text color='gray-dark'>
              version: {version}
            </Text>
            <Text color='gray-dark'>
              UI: {packageJson.version}
            </Text>
            <Text color='gray-dark'>
              logical: {logicalVersion}
            </Text>
          </Column>
        </Column>
      </div>
    </>
  )
}

export const Aside = memo(MemoAside)
