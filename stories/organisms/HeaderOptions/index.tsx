import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { PColor, SECColor } from '../../../assets/colors'
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
import { ButtonOption, FloatingBoxTwo } from './styled'
import { getGlobalStyle } from '../../../helpers'

export const Options = ({
  userConsent,
  pushNotificationSupported,
  onClickSusbribeToPushNotification,
  userSubscription,
  countOrders,
  pushServerSubscriptionId,
  onClickSendNotification,
  onClickSendSubscriptionToPushServer,
  location = {
    push: () => {

    }
  },
  onClickAskUserPermission = () => {

  },
  setIsOpenOrder = (state) => {
    return state
  },
  onClickLogout = () => {

  }
}) => {
  const [show, setShow] = useState(false)

  const handleClick = (index) => {
    setShow(index === show ? false : index)
  }
  const handleSignOut = async () => {
    return onClickLogout()
  }

  const isConsentGranted = userConsent === 'granted'

  return (
    <ContainerOption>
      <Overline
        onClick={() => {
          return setShow(!true)
        }}
        show={show}
      />
      <ButtonOption
        onClick={() => {
          return setIsOpenOrder(true)
        }}
      >
        <IconNotification color={PColor} size='25px' />
        <span className='notification_count'>{countOrders}</span>
      </ButtonOption>
      <ButtonOption
        onClick={async () => {
          return await handleSignOut()
        }}
      >
        <IconLogout color={PColor} size='20px' />
      </ButtonOption>
      <ButtonOption
        onClick={() => {
          return handleClick(2)
        }}
      >
        <IconShopping color={PColor} size='25px' />
      </ButtonOption>
      <ContainerOption>
        <FloatingBoxTwo show={Boolean(show === 2)}>
          <Row alignItems={'center'}>
            <Column
              display={'grid'}
              justifyContent='flex-start'
              margin='0 13px 0 15px'
              width='10%'
            >
              <IconNotification size={20} />
            </Column>
            <Column
              display={'grid'}
              justifyContent='flex-start'
              margin='0 13px 0 15px'
            >
              {pushNotificationSupported && !isConsentGranted && (
                <Text
                  color={SECColor}
                  fontSize='.775rem'
                  margin='0 0 6px 0'
                  textAlign='start'
                >
                  Habilita las notificaciones
                </Text>
              )}
              {isConsentGranted && (
                <Text textAlign='start'>Las notificaciones están activas</Text>
              )}
              {!pushNotificationSupported && (
                <Text>
                  Las notificaciones {!pushNotificationSupported && 'No'} son
                  compatibles con este dispositivo.
                </Text>
              )}
              <Text
                color={SECColor}
                fontSize='.60rem'
                margin={'0 0 9px 0'}
                textAlign='start'
              >
                {' '}
                Consentimiento del usuario para recibir notificaciones{' '}
                {userConsent}.
              </Text>
              <Button
                background='transparent'
                color={PColor}
                disabled={!pushNotificationSupported || isConsentGranted}
                fontSize='.875rem'
                onClick={() => {
                  return onClickAskUserPermission()
                }}
                padding='0'
                width='fit-content'
              >
                {!isConsentGranted && 'Activar'}
              </Button>
              <button
                disabled={
                  !pushNotificationSupported ||
                  !isConsentGranted ||
                  userSubscription
                }
                onClick={onClickSusbribeToPushNotification}
              >
                {userSubscription
                  ? 'Push subscription created'
                  : 'Create Notification subscription'}
              </button>
              <button
                disabled={!userSubscription || pushServerSubscriptionId}
                onClick={onClickSendSubscriptionToPushServer}
              >
                {pushServerSubscriptionId
                  ? 'Subscrption sent to the server'
                  : 'Send subscription to push server'}
              </button>
              {pushServerSubscriptionId && (
                <div>
                  <p>The server accepted the push subscrption!</p>
                  <button onClick={onClickSendNotification}>
                    Send a notification
                  </button>
                </div>
              )}
              {/* <section>
              <h4>Your notification subscription details</h4>
              <pre>
                <code>{JSON.stringify(userSubscription, null, ' ')}</code>
              </pre>
            </section> */}
            </Column>
          </Row>
          <Option Theme={false}>
            <ButtonOption
              onClick={() => {
                return location.push('/configuration')
              }}
              space
            >
              <span>Configuración</span>
              <Icon
            height={20}
            width={20}
            icon="IconFilter"
            size={20}
            color={getGlobalStyle('--color-icons-primary')}
          />
            </ButtonOption>
          </Option>
          <Option Theme={false}>
            <ButtonOption onClick={onClickLogout} space>
              <span>Cerrar sesión</span>
              <IconLogout color={PColor} size='20px' />
            </ButtonOption>
          </Option>
        </FloatingBoxTwo>
      </ContainerOption>
    </ContainerOption>
  )
}

Options.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.any,
    message: PropTypes.any,
    name: PropTypes.any
  }),
  loading: PropTypes.bool,
  location: PropTypes.shape({
    push: PropTypes.func
  }),
  onClickAskUserPermission: PropTypes.func,
  setIsOpenOrder: PropTypes.func,
  onClickLogout: PropTypes.func,
  onClickSendNotification: PropTypes.any,
  onClickSendSubscriptionToPushServer: PropTypes.any,
  onClickSusbribeToPushNotification: PropTypes.any,
  pushNotificationSupported: PropTypes.any,
  pushServerSubscriptionId: PropTypes.any,
  userConsent: PropTypes.string,
  countOrders: PropTypes.number,
  userSubscription: PropTypes.any
}

const ContainerOption = styled.div`
  position: relative;
  width: ${({ width = 'max-content' }) => {
    return width ?? 'max-content'
  }};
`
const Option = styled.div`
  padding: 15px 0px;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: #ffffff1a;
  }
`
