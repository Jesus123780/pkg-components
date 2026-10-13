'use client'

import Link from 'next/link'
import React from 'react'
import {
  Column,
  Divider,
  Icon,
  Row,
  Button,
  Text
} from '../../atoms'
import { AwesomeModal } from '../../organisms'
import { Options } from '../../organisms/HeaderOptions'
import { Burger } from './Burger'
import { getGlobalStyle } from '../../../helpers'
import { MODAL_SIZES } from '../AwesomeModal/constanst'
import styles from './styles.module.css'

export interface HeaderProps {
  errorPush?: Error | null
  loadingPush?: boolean
  pushNotificationSupported?: boolean
  userConsent?: NotificationPermission
  userSubscription?: PushSubscription | null
  pushServerSubscriptionId?: string | null
  onClickAskUserPermission?: () => Promise<void> | void
  onClickSubscribeToPushNotification?: () => Promise<void> | void
  onClickSusbribeToPushNotification?: () => Promise<void> | void
  onClickSendSubscriptionToPushServer?: () => Promise<void> | void
  onClickSendNotification?: (notification?: any) => Promise<void> | void
  onClickEnablePushNotifications?: () => Promise<void> | void
  salesOpen?: boolean
  location?: unknown
  style?: React.CSSProperties
  count?: number
  countOrders?: number
  isMobile?: boolean
  loadingCount?: boolean
  onClickLogout?: () => Promise<void> | void
  setIsOpenOrder?: (open: boolean) => void
  handleOpenMenu?: () => void
  setSalesOpen?: (open: boolean) => void
  toggleTheme?: () => void
  theme?: 'light' | 'dark'
}

export const Header: React.FC<HeaderProps> = ({
  errorPush = null,
  loadingPush = false,
  pushNotificationSupported = false,
  userConsent,
  userSubscription = null,
  pushServerSubscriptionId = null,
  onClickAskUserPermission = () => undefined,
  onClickSubscribeToPushNotification = () => undefined,
  onClickSusbribeToPushNotification,
  onClickSendSubscriptionToPushServer = () => undefined,
  onClickSendNotification = () => undefined,
  onClickEnablePushNotifications,
  salesOpen = false,
  location: _location,
  style = {},
  count = 0,
  countOrders = 0,
  isMobile = false,
  loadingCount = false,
  onClickLogout = () => undefined,
  setIsOpenOrder = () => undefined,
  handleOpenMenu = () => undefined,
  setSalesOpen = () => undefined,
  toggleTheme = () => undefined,
  theme = 'light'
}) => {
  return (
    <div className={styles.header_container} style={style}>
      <AwesomeModal
        backdrop='static'
        borderRadius='10px'
        btnCancel={false}
        btnConfirm={false}
        footer={false}
        header={false}
        height='min-content'
        customHeight='min-content'
        onCancel={() => false}
        onHide={() => false}
        padding='30px'
        show={false}
        size={MODAL_SIZES.small}
        zIndex='9999'
      >
        <Column className={styles['modal-content']} alignItems='center'>
          <Row alignItems='center' justifyContent='center'>
            <Icon
              icon='IconInfo'
              size={20}
              color={getGlobalStyle('--color-primary-red')}
            />
            <Text size='2xl'>Tu sesión terminará pronto</Text>
          </Row>
          <Divider marginTop={getGlobalStyle('--spacing-4xl')} />
          <Row alignItems='center' justifyContent='space-between'>
            <Button onClick={() => undefined}>Cancelar</Button>
            <Button onClick={() => { void onClickLogout() }} primary>
              Cerrar sesión
            </Button>
          </Row>
        </Column>
      </AwesomeModal>

      <Row alignItems='center'>
        {isMobile && <Burger handleOpenMenu={handleOpenMenu} />}
        <Link href='/dashboard' aria-label='Ir al dashboard'>
          <Icon
            icon='IconLogo'
            size={100}
            color={getGlobalStyle('--color-neutral-black')}
          />
        </Link>
      </Row>

      <div className={styles.header_options}>
        {!isMobile && (
          <Options
            countOrders={countOrders}
            theme={theme}
            toggleTheme={toggleTheme}
            onClickLogout={onClickLogout}
            setIsOpenOrder={setIsOpenOrder}
            userConsent={userConsent}
            pushNotificationSupported={pushNotificationSupported}
            userSubscription={userSubscription}
            pushServerSubscriptionId={pushServerSubscriptionId}
            loadingPush={loadingPush}
            errorPush={errorPush}
            onClickAskUserPermission={onClickAskUserPermission}
            onClickSubscribeToPushNotification={onClickSubscribeToPushNotification}
            onClickSusbribeToPushNotification={onClickSusbribeToPushNotification}
            onClickSendSubscriptionToPushServer={onClickSendSubscriptionToPushServer}
            onClickSendNotification={onClickSendNotification}
            onClickEnablePushNotifications={onClickEnablePushNotifications}
          />
        )}

        <div
          className={styles.button_action_sale}
          onClick={() => setSalesOpen(!salesOpen)}
          role='button'
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setSalesOpen(!salesOpen)
            }
          }}
        >
          <Icon
            color={getGlobalStyle('--color-primary-red')}
            icon='IconSales'
            size={40}
          />
          <div className='info-sales'>
            <Text size='md' font='regular'>Crear una venta</Text>
            <Divider marginTop={getGlobalStyle('--spacing-xs')} />
            {loadingCount
              ? <Text font='light' size='sm'>Cargando...</Text>
              : (
                <Text font='light' color='gray-dark' size='sm'>
                  Total de ventas hoy {count}
                </Text>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}
