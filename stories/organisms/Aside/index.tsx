'use client'

import React, {
  type Dispatch,
  type SetStateAction,
  memo,
  useEffect,
  useId,
  useRef,
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
  handleOpenGoal?: any
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
  handleClick = (state: boolean) => state,
  handleOpenDeliveryTime = () => {},
  handleOpenGoal = () => {},
  setSalesOpen = () => {},
  handleCollapsedMenu = () => null,
  setShowComponentModal = () => {},
  setIsDragDisabled,
  onDragEnd = () => {}
}) => {
  const [show, setShow] = useState(false)
  const quickId = useId()
  const quickRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const quickOpen = show && !salesOpen && !isMobile && !isCollapsedMenu

  useEffect(() => {
    setShow(false)
  }, [pathname, salesOpen, isMobile, isCollapsedMenu])

  useEffect(() => {
    if (!quickOpen) return
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !quickRef.current?.contains(event.target) && !triggerRef.current?.contains(event.target)) setShow(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShow(false)
        triggerRef.current?.querySelector<HTMLElement>('button, a, [tabindex]')?.focus()
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', escape)
    }
  }, [quickOpen])
  // El interruptor activa el modo de edición; fuera de ese modo se bloquea el arrastre.
  const [isEditingModules, setIsEditingModules] = useState(false)
  useEffect(() => {
    setIsDragDisabled?.(!isEditingModules)
  }, [isEditingModules, setIsDragDisabled])
  const [active, setActive] = useState<boolean | number>(false)
  const [closedActiveGroup, setClosedActiveGroup] = useState<number | null>(null)
  useEffect(() => { setClosedActiveGroup(null) }, [pathname])

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
    setShow(false)
  }

  const modulesArray = modules ?? []

  useEffect(() => {
    function handleKeyDown (event: KeyboardEvent): void {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's' && !event.repeat && !(event.target instanceof HTMLElement && (event.target.isContentEditable || event.target.closest('input, textarea, select')))) {
        event.preventDefault()
        setSalesOpen((prevState: boolean) => !prevState)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setSalesOpen])

  const handleMenu = (index: boolean | number): void => {
    setActive((prev: boolean | number) => {
      return index === prev ? false : index
    })
  }

  const handleClickAction = (path: string): void => {
    const action: Record<string, () => void> = {
      '?time=true': handleOpenDeliveryTime,
      '?goals=true': handleOpenGoal
    }

    action[path]?.()
  }

  const isDashboardRoute = (currentPathname: DashboardPath | string): boolean => {
    return currentPathname.startsWith('/dashboard')
  }

  const hidden = isDashboardRoute(pathname)

  return (
    <>
      {isMobile && (
        <Overline
          bgColor={getGlobalStyle('--color-background-overline')}
          onClick={() => setCollapsed?.(!collapsed)}
          show={collapsed}
          zIndex={getGlobalStyle('--z-index-99999')}
        />
      )}

      <div
        className={`${styles.containerAside} ${isMobile && collapsed ? styles.collapsed : ''}`}
        style={
          isMobile
            ? {
                width: isCollapsedMenu ? '40px' : '80%',
                zIndex: getGlobalStyle('--z-index-99999')
              }
            : {}
        }
      >
        <Column className={styles['sidebar-header-container']}>
          <div
            className={styles.sidebarBody}
          >
            <div>
              <Row className={styles['sidebar-header']}>
                <Column
                  className={styles['sidebar-header-column']}
                  style={isMobile && isCollapsedMenu ? { width: 'min-content' } : {}}
                >
                  {null}
                </Column>

                <Button
                  className={styles['sidebar-header-button']}
                  styles={{
                    border: 'none',
                    padding: '5px 3px'
                  }}
                  onClick={() => handleCollapsedMenu()}
                >
                  <Icon
                    color={getGlobalStyle('--color-icons-gray')}
                    icon='IconAside'
                    size={21}
                  />
                </Button>
              </Row>

              {isElectron && <NavigationButtons />}

              <Portal>
                <div
                  id={quickId}
                  ref={quickRef}
                  aria-hidden={!quickOpen}
                  className={clsx(styles.quick_options, {
                    [styles.visible]: quickOpen,
                    [styles.hidden]: !quickOpen,
                    [styles['quick_options--colapsed']]: isCollapsedMenu
                  })}
                >
                  {!hidden && (
                    <Button
                      border='gray'
                      color='black'
                      iconName='IconBox'
                      iconPosition='right'
                      onClick={() => handleOpenCreateProduct()}
                    >
                      Nuevo producto
                    </Button>
                  )}

                  {!hidden && (
                    <Button
                      border='gray'
                      color='black'
                      iconName='IconCategorie'
                      iconPosition='right'
                      onClick={() => {
                        setShowComponentModal(4)
                        handleClick(4)
                        setShow(false)
                      }}
                    >
                      Categorías
                    </Button>
                  )}

                  <Button
                    border='gray'
                    color='black'
                    iconName='IconSales'
                    iconPosition='right'
                    onClick={() => setSalesOpen((prevState: boolean) => !prevState)}
                  >
                    Ventas
                  </Button>
                </div>
              </Portal>

              {!isCollapsedMenu &&
                typeof dataStore?.storeName === 'string' &&
                dataStore.storeName.trim() !== '' &&
                typeof dataStore?.idStore === 'string' &&
                dataStore.idStore.trim() !== '' && (
                  <Link href={`/dashboard/${dataStore.storeName.replace(/ /g, '-')}/${dataStore.idStore}`}>
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
              )}

              {uState === '1' && (
                <Column>
                  <Text size='sm' align='center'>
                    En pausa programada
                  </Text>
                </Column>
              )}

              {!isCollapsedMenu && (
                <div ref={triggerRef}>
                <Button
                  onClick={() => setShow(previous => !previous)}
                  className={styles.button_global_create}
                >
                  Agregar nuevo
                </Button>
                </div>
              )}
            </div>

            <Column className={styles['sidebar-header-router']}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId='modules'
                  direction='vertical'
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={false}
                >
                  {(provided: any) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={styles.modulesContainer}
                    >
                      {modulesArray.map((module, index) => {
                        const subModules = module?.subModules ?? []
                        const existSubModules = subModules.length > 0
                        const action = module?.mPath?.startsWith('?')
                        const mPath = action === true ? '' : (module?.mPath as string)
                        const isActive = !action && `/${mPath}` === pathname
                        const hasActiveChild = subModules.some((item: any) => `/${item?.smPath}` === pathname)
                        const draggableId = String(module?.mId ?? `module-${index}`)

                        return (
                          <Draggable
                            key={draggableId}
                            draggableId={draggableId}
                            index={index}
                            isDragDisabled={!isEditingModules}
                          >
                            {(dragProvided: any) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                className={clsx(styles.containerOption, { [styles.editing]: isEditingModules, [styles.optionActive]: isActive || hasActiveChild })}
                                style={{
                                  // No sobrescribir transform/position que requiere el drag and drop.
                                  ...dragProvided.draggableProps.style
                                }}
                              >
                                {!existSubModules && (
                                  <CustomLinkAside
                                    onClick={() => handleClickAction(module.mPath as string)}
                                    mPath={mPath}
                                    isActive={isActive}
                                    action={action}
                                    mIcon={module?.mIcon}
                                    mName={module?.mName}
                                    collapsed={isCollapsedMenu}
                                    motion={!isEditingModules}
                                  />
                                )}

                                {existSubModules && !isCollapsedMenu && (
                                  <span
                                    style={{
                                      cursor: 'pointer',
                                      fontSize: '.8rem',
                                      padding: '10px',
                                      display: 'block',
                                      fontWeight: '600',
                                      color: getGlobalStyle('--color-neutral-gray-dark')
                                    }}
                                  >
                                    {module.mName}
                                  </span>
                                )}

                                <div>
                                  {existSubModules && !isCollapsedMenu && (
                                    <Options
                                      size={10}
                                      active={index === active || (active === false && hasActiveChild && closedActiveGroup !== index)}
                                      handleClick={() => {
                                        if (active === false && hasActiveChild && closedActiveGroup !== index) {
                                          setClosedActiveGroup(index)
                                        } else {
                                          setClosedActiveGroup(hasActiveChild && active === index ? index : null)
                                          handleMenu(index)
                                        }
                                      }}
                                      index={active}
                                      icon='IconTicket'
                                      label={module.mName}
                                    >
                                      {subModules.map((item: any, subIndex: number) => (
                                        <div
                                          key={item?.smId ?? `${draggableId}-sub-${subIndex}`}
                                          className={styles.submodule}
                                        >
                                          <CustomLinkAside
                                            mPath={item?.smPath}
                                            mIcon={item?.smIcon}
                                            mName={item?.smName}
                                            isActive={`/${item?.smPath}` === pathname}
                                            motion={!isEditingModules}
                                          />
                                        </div>
                                      ))}
                                    </Options>
                                  )}
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
                checked={isEditingModules}
                id='edit_modules'
                label={isCollapsedMenu ? '' : 'Editar módulos'}
                onChange={() => setIsEditingModules((previous) => !previous)}
                successColor='green'
              />
            </Column>
          </div>

          <Pulse active={connected} />

          <Column
            justifyContent='center'
            alignItems='center'
            className={styles['sidebar-footer']}
            style={isCollapsedMenu ? { display: 'none' } : {}}
          >
            <Text color='gray-dark'>version: {version}</Text>
            <Text color='gray-dark'>UI: {packageJson.version}</Text>
            <Text color='gray-dark'>logical: {logicalVersion}</Text>
          </Column>
        </Column>
      </div>
    </>
  )
}

export const Aside = memo(MemoAside)
