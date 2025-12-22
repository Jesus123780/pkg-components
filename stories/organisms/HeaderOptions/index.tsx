'use client'

import { useState, useCallback } from 'react'
import { toggleIndex } from './helpers'
import {
  IconLogout,
  IconNotification,
  IconShopping
} from '../../../assets/icons'
import {
  Button,
  Column,
  Icon,
  Overline,
  Row,
  Text
} from '../../atoms'
import { ThemeToggle } from '../../molecules'
import { PColor, SECColor } from '../../../assets/colors'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

interface OptionsProps {
  userConsent: NotificationPermission
  pushNotificationSupported: boolean
  userSubscription?: PushSubscription | null
  pushServerSubscriptionId?: string | null
  countOrders: number
  theme: 'light' | 'dark'
  toggleTheme: () => void
  onClickLogout: () => Promise<void> | void
  onClickAskUserPermission: () => void
  onClickSusbribeToPushNotification: () => void
  onClickSendSubscriptionToPushServer: () => void
  onClickSendNotification: () => void
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
  onClickSusbribeToPushNotification,
  onClickSendSubscriptionToPushServer,
  onClickSendNotification,
  setIsOpenOrder
}: OptionsProps) => {
  const [openIndex, setOpenIndex] = useState<number | false>(false)

  const isConsentGranted = userConsent === 'granted'

  const handleToggle = useCallback(
    (index: number) => setOpenIndex(prev => toggleIndex(prev, index)),
    []
  )

  return (
    <div className={styles.container}>
      <Overline show={!!openIndex} onClick={() => setOpenIndex(false)} />

      <button
        className={styles.buttonOption}
        onClick={() => setIsOpenOrder(true)}
      >
        <Icon
          icon='IconNotification'
          size={25}
          color={getGlobalStyle('--color-icons-primary')}
        />
        {!!countOrders && (
          <span className={styles.notificationCount}>
            {countOrders}
          </span>
        )}
      </button>

      <button
        className={styles.buttonOption}
        onClick={() => onClickLogout()}
      >
        <Icon
          icon='IconLogout'
          size={20}
          color={getGlobalStyle('--color-icons-primary')}
        />
      </button>

      <button
        className={styles.buttonOption}
        onClick={() => handleToggle(2)}
      >
        <Icon
          icon='IconShopping'
          size={20}
          color={getGlobalStyle('--color-icons-primary')}
        />
      </button>

      <button className={styles.buttonOption}>
        <ThemeToggle
          defaultDark={theme === 'dark'}
          onChange={toggleTheme}
        />
      </button>

      <div
        className={`${styles.floatingBox} ${styles.floatingBoxTwo} ${openIndex === 2 ? styles.show : styles.hidden
          }`}
      >
        <Row alignItems='center'>
          <Column>
            <Icon
              icon='IconNotification'
              size={20}
              color={getGlobalStyle('--color-icons-primary')}
            />
          </Column>

          <Column>
            {!isConsentGranted && pushNotificationSupported && (
              <Text>
                Habilita las notificaciones
              </Text>
            )}

            {isConsentGranted && (
              <Text>Las notificaciones están activas</Text>
            )}

            <Text
            >
              Consentimiento: {userConsent}
            </Text>

            <Button
              disabled={!pushNotificationSupported || isConsentGranted}
              padding='0'
              width='fit-content'
              onClick={onClickAskUserPermission}
            >
              Activar
            </Button>

            <button
              onClick={onClickSusbribeToPushNotification}
            >
              Crear subscripción
            </button>

            <button
              disabled={!userSubscription || !!pushServerSubscriptionId}
              onClick={onClickSendSubscriptionToPushServer}
            >
              Enviar al servidor
            </button>

            {pushServerSubscriptionId && (
              <button onClick={onClickSendNotification}>
                Enviar notificación
              </button>
            )}
          </Column>
        </Row>

        <div className={styles.option}>
          <Text>
            Configuración
          </Text>
          <Icon
            icon='IconConfig'
            size={20}
            color={getGlobalStyle('--color-icons-primary')}
          />
        </div>
      </div>
    </div>
  )
}
