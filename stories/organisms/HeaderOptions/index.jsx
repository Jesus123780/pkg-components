import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { PColor, SECColor } from '../../../assets/colors'
import {
    IconChart,
    IconLogout,
    IconMessageMain,
    IconNotification,
    IconShopping,
    IconUser
} from '../../../assets/icons'
import {
    ActiveLink,
    Button,
    Column,
    Overline,
    Row,
    Text
} from '../../atoms'
import { ButtonOption, FloatingBoxTwo } from './styled'

export const Options = ({
  userConsent,
  pushNotificationSupported,
  onClickSusbribeToPushNotification,
  userSubscription,
  pushServerSubscriptionId,
  onClickSendNotification,
  onClickSendSubscriptionToPushServer,
  location = {
    push: () => {
      return
    }
  },
  onClickAskUserPermission = () => {
    return
  },
  onClickLogout = () => {
    return
  }
}) => {
  const [show, setShow] = useState(false)

  const handleClick = (index) => {
    setShow(index === show ? false : index)
  }
  const handleSignOut = async () => {
    await onClickLogout()
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
      <ButtonOption>
        <Enlace href='/messages'>
          <a>
            <IconMessageMain color={PColor} size='25px' />
          </a>
        </Enlace>
      </ButtonOption>
      <ButtonOption onClick={handleSignOut}>
        <IconLogout color={PColor} size='20px' />
      </ButtonOption>
      <ButtonOption
        onClick={() => {
          return handleClick(2)
        }}
      >
        <IconShopping color={PColor} size='25px' />
      </ButtonOption>
      <ButtonOption>
        <Enlace href='/informes'>
          <IconChart color={PColor} size='29px' />
        </Enlace>
      </ButtonOption>
      <ContainerOption>
        <FloatingBoxTwo show={show === 2}>
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
              {isConsentGranted && <Text textAlign='start'>Las notificaciones están activas</Text>}
              {!pushNotificationSupported && <Text>Las notificaciones {!pushNotificationSupported && 'No'} son compatibles con este dispositivo.</Text>}
              <Text
                color={SECColor}
                fontSize='.60rem'
                margin={'0 0 9px 0'}
                textAlign='start'
              >
                {' '}
                Consentimiento del usuario para recibir notificaciones {userConsent}.
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
              <button disabled={!pushNotificationSupported || !isConsentGranted || userSubscription} onClick={onClickSusbribeToPushNotification}>
                {userSubscription ? 'Push subscription created' : 'Create Notification subscription'}
              </button>
              <button disabled={!userSubscription || pushServerSubscriptionId} onClick={onClickSendSubscriptionToPushServer}>
                {pushServerSubscriptionId ? 'Subscrption sent to the server' : 'Send subscription to push server'}
              </button>
              {pushServerSubscriptionId && (
                <div>
                  <p>The server accepted the push subscrption!</p>
                  <button onClick={onClickSendNotification}>Send a notification</button>
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
              <IconUser color={PColor} size='25px' />
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
  onClickLogout: PropTypes.func,
  onClickSendNotification: PropTypes.any,
  onClickSendSubscriptionToPushServer: PropTypes.any,
  onClickSusbribeToPushNotification: PropTypes.any,
  pushNotificationSupported: PropTypes.any,
  pushServerSubscriptionId: PropTypes.any,
  userConsent: PropTypes.string,
  userSubscription: PropTypes.any
}

const ContainerOption = styled.div`
  position: relative;
  width: ${({ width }) => {
    return width ? width : 'max-content'
  }};
`
const Enlace = styled(ActiveLink)`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background-color: #1b18181a;
  }
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
