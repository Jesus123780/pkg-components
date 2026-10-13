'use client'

import { useCallback, useState } from 'react'
import {
  Button,
  Column,
  Icon,
  Overline,
  Row,
  Text
} from '../../atoms'
import { ThemeToggle } from '../../molecules'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

interface OptionsProps {
  userConsent?: NotificationPermission
  pushNotificationSupported: boolean
  userSubscription?: PushSubscription | null
  pushServerSubscriptionId?: string | null
  countOrders: number
  theme: 'light' | 'dark'
  toggleTheme: () => void
  onClickLogout: () => Promise<void> | void
  onClickAskUserPermission?: () => Promise<void> | void
  onClickSubscribeToPushNotification?: () => Promise<void> | void
  /** Legacy prop name. Prefer onClickSubscribeToPushNotification. */
  onClickSusbribeToPushNotification?: () => Promise<void> | void
  onClickSendSubscriptionToPushServer?: () => Promise<void> | void
  onClickSendNotification?: (notification?: any) => Promise<void> | void
  onClickEnablePushNotifications?: () => Promise<void> | void
  loadingPush?: boolean
  errorPush?: Error | null
  setIsOpenOrder: (state: boolean) => void
}

export const Options = ({
  userConsent,
  pushNotificationSupported,
  userSubscription,
  pushServerSubscriptionId,
  countOrders,
  theme,
  toggleTheme,
  onClickLogout,
  onClickAskUserPermission,
  onClickSubscribeToPushNotification,
  onClickSusbribeToPushNotification,
  onClickSendSubscriptionToPushServer,
  onClickSendNotification,
  onClickEnablePushNotifications,
  loadingPush = false,
  errorPush,
  setIsOpenOrder
}: OptionsProps) => {
  const [openIndex, setOpenIndex] = useState<number | false>(false)
  const toggleIndex = (current: number | false, next: number): number | false =>
    current === next ? false : next
  const isConsentGranted = userConsent === 'granted'
  const hasBrowserSubscription = Boolean(userSubscription)
  const hasServerSubscription = Boolean(pushServerSubscriptionId)
  const canSendTest = hasBrowserSubscription && hasServerSubscription && isConsentGranted

  const handleToggle = useCallback(
    (index: number) => setOpenIndex(previous => toggleIndex(previous, index)),
    []
  )

  const handleEnableNotifications = async (): Promise<void> => {
    if (loadingPush) return

    // Preferred atomic flow: permission -> browser subscription -> backend persistence.
    if (onClickEnablePushNotifications) {
      await onClickEnablePushNotifications()
      return
    }

    // Backward-compatible flow for consumers not yet using the updated hook.
    if (!isConsentGranted) {
      if (!onClickAskUserPermission) return
      // Request permission first; let React refresh the props before the next step.
      await onClickAskUserPermission()
      return
    }
    if (!hasBrowserSubscription) {
      const subscribe = onClickSubscribeToPushNotification || onClickSusbribeToPushNotification
      if (subscribe) await subscribe()
    }
    if (!hasServerSubscription && onClickSendSubscriptionToPushServer) {
      await onClickSendSubscriptionToPushServer()
    }
  }

  const handleSendTest = async (): Promise<void> => {
    if (loadingPush || !onClickSendNotification) return
    await onClickSendNotification({
      title: 'Notificación de prueba',
      description: 'Tu aplicación está configurada para recibir notificaciones push.',
      url: '/'
    })
  }

  const permissionDescription = loadingPush && !pushNotificationSupported
    ? 'Comprobando la compatibilidad del navegador...'
    : !pushNotificationSupported
      ? 'Este navegador o contexto no admite notificaciones push. Usa HTTPS o localhost y un navegador compatible.'
    : userConsent === 'denied'
      ? 'El permiso está bloqueado en el navegador. Habilítalo desde los permisos del sitio.'
      : canSendTest
        ? 'Las notificaciones están activas y sincronizadas con el servidor.'
        : isConsentGranted
          ? 'El permiso está concedido. Completa la suscripción para registrar este dispositivo.'
          : 'Activa las notificaciones para recibir novedades y actualizaciones.'

  return (
    <div className={styles.container}>
      <Overline show={Boolean(openIndex)} onClick={() => setOpenIndex(false)} />

      <button
        type='button'
        className={styles.buttonOption}
        onClick={() => setIsOpenOrder(true)}
        aria-label={`Abrir pedidos${countOrders ? ` (${countOrders} pendientes)` : ''}`}
      >
        <Icon icon='IconNotification' size={25} color={getGlobalStyle('--color-icons-primary')} />
        {countOrders > 0 && (
          <span className={styles.notificationCount} aria-label={`${countOrders} pedidos pendientes`}>
            {countOrders}
          </span>
        )}
      </button>

      <button
        type='button'
        className={styles.buttonOption}
        onClick={() => { void onClickLogout() }}
        aria-label='Cerrar sesión'
      >
        <Icon icon='IconLogout' size={20} color={getGlobalStyle('--color-icons-primary')} />
      </button>

      <button
        type='button'
        className={styles.buttonOption}
        onClick={() => handleToggle(2)}
        aria-label='Abrir opciones y notificaciones'
        aria-expanded={openIndex === 2}
      >
        <Icon icon='IconShopping' size={20} color={getGlobalStyle('--color-icons-primary')} />
      </button>

      {/* Use a div instead of nesting a button if ThemeToggle renders its own button. */}
      <div className={styles.buttonOption}>
        <ThemeToggle defaultDark={theme === 'dark'} onChange={toggleTheme} />
      </div>

      <div
        className={`${styles.floatingBox} ${styles.floatingBoxTwo} ${openIndex === 2 ? styles.show : styles.hidden}`}
        role='dialog'
        aria-label='Configuración de notificaciones'
        aria-hidden={openIndex !== 2}
      >
        <Row alignItems='center'>
          <Column>
            <Icon icon='IconNotification' size={20} color={getGlobalStyle('--color-icons-primary')} />
          </Column>
          <Column>
            <Text as='h3' weight='semibold'>Notificaciones push</Text>
            <Text>{permissionDescription}</Text>
            {userConsent && <Text size='sm'>Permiso: {userConsent}</Text>}
            {hasBrowserSubscription && <Text size='sm'>Dispositivo: suscrito</Text>}
            {hasServerSubscription && <Text size='sm'>Servidor: sincronizado</Text>}

            {errorPush && (
              <Text color='primary' size='sm' role='alert'>
                {errorPush.message}
              </Text>
            )}

            <Button
              padding='0'
              width='fit-content'
              disabled={!pushNotificationSupported || userConsent === 'denied' || loadingPush || canSendTest}
              onClick={() => { void handleEnableNotifications() }}
            >
              {loadingPush
                ? 'Procesando...'
                : canSendTest
                  ? 'Notificaciones activas'
                  : isConsentGranted
                    ? 'Completar configuración'
                    : 'Activar notificaciones'}
            </Button>

            {canSendTest && (
              <Button
                padding='0'
                width='fit-content'
                disabled={loadingPush || !onClickSendNotification}
                onClick={() => { void handleSendTest() }}
              >
                {loadingPush ? 'Enviando...' : 'Enviar notificación de prueba'}
              </Button>
            )}
          </Column>
        </Row>

        <div className={styles.option}>
          <Text>Configuración</Text>
          <Icon icon='IconConfig' size={20} color={getGlobalStyle('--color-icons-primary')} />
        </div>
      </div>
    </div>
  )
}
