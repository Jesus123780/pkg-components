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
  Divider,
  Icon,
  Overline,
  Row,
  Text
} from '../../atoms'
import {
  NavigationButtons,
  Options,
  ToggleSwitch
} from '../../molecules'
import { CustomLinkAside } from '../Aside/helpers'
import { Portal } from '../Portal'
import {
  Info,
  LeftNav
} from './styled'
import { getGlobalStyle } from '../../../utils'
import packageJson from '../../../package.json'
import {
  DragDropContext,
  Droppable,
  Draggable
} from 'react-beautiful-dnd'
import styles from './styles.module.css'
import Link from 'next/link'
import clsx from 'clsx'

interface MemoAsideProps {
  collapsed?: boolean
  isColapsedMenu?: boolean
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
  handleColapsedMenu?: () => void
  setIsDragDisabled?: Dispatch<SetStateAction<boolean>>
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
  isColapsedMenu = false,
  dataStore = {
    storeName: '',
    idStore: '',
    uState: 1
  },
  modules = [],
  handleClick = (state: boolean) => { return state },
  handleOpenDeliveryTime = () => { },
  setSalesOpen = (state: boolean) => { return state },
  handleColapsedMenu = () => { return null },
  setShowComponentModal = (state: boolean) => { return state },
  onDragEnd = (result: any) => { return result }
}) => {
  const [show, setShow] = useState(false)
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
    function handleKeyDown (event: KeyboardEvent): void {
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
              width: isColapsedMenu ? '40px' : '80%',
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
            <Info>
              <Row className={styles['sidebar-header']}>
                <Column className={styles['sidebar-header-column']} style={(isMobile && isColapsedMenu) ? { width: 'min-content' } : {}}>
                  {null}
                </Column>
                <Button
                  className={styles['sidebar-header-button']}
                  styles={{
                    border: 'none',
                    padding: getGlobalStyle('--spacing-md')
                  }}
                  onClick={() => { handleColapsedMenu() }}
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
                      [styles['quick_options--colapsed'] as string]: isColapsedMenu
                    }
                  )}>
                  <Button
                    border='gray'
                    color='black'
                    iconName='IconBox'
                    iconPosition='right'
                    onClick={() => { handleOpenCreateProduct() }}>
                    Nuevo producto
                  </Button>
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
              {!isColapsedMenu &&
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
              {!isColapsedMenu &&
                <Button onClick={() => { setShow(!show) }} className={styles.button_global_create}>
                  Agregar nuevo
                </Button>
              }
            </Info>
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
                                    hiddenTextLink={isColapsedMenu}
                                    size={existSubModules ? '.8rem' : '.9rem'}
                                    mPath={onAction === true ? '' : module?.mPath as string}
                                    mIcon={module?.mIcon}
                                    mName={module?.mName}
                                  />
                                }
                                {(existSubModules && !isColapsedMenu) &&
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
                                  {(existSubModules && !isColapsedMenu) &&
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
                label={isColapsedMenu ? '' : 'Editar módulos'}
                onChange={() => setIsDragDisabled(!isDragDisabled)}
                successColor='green'
              />
            </Column>
          </div>
          <Column
            justifyContent='center'
            alignItems='center'
            className={styles['sidebar-footer']}
            style={isColapsedMenu ? { display: 'none' } : {}}
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
