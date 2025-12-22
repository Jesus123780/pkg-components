import Link from 'next/link'
import PropTypes from 'prop-types'
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

export const Header = ({
  errorPush,
  loadingPush,
  pushNotificationSupported,
  salesOpen,
  location = {},
  style = {},
  count = 0,
  countOrders = 0,
  isMobile = false,
  loadingCount = false,
  onClickLogout = () => { return null },
  setIsOpenOrder = (boolean: boolean) => { return boolean },
  handleOpenMenu = () => { return null },
  onClickAskUserPermission = () => { return null },
  setSalesOpen = (boolean: boolean) => { return boolean },
  toggleTheme,
  theme
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
        onCancel={() => { return false }}
        onHide={() => { return false }}
        padding={'30px'}
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
            <Text size='2xl'>
              Tu session terminara pronto
            </Text>
          </Row>
          <Divider marginTop={getGlobalStyle('--spacing-4xl')} />
          <Row alignItems='center' justifyContent='space-between'>
            <Button onClick={() => { }}>
              cancelar
            </Button>
            <Button onClick={() => { return onClickLogout() }} primary={true}>
              cerrar session
            </Button>
          </Row>
        </Column>

      </AwesomeModal>
      <Row alignItems='center'>
        {isMobile && <Burger handleOpenMenu={handleOpenMenu} />}
        <Link href={'/dashboard'}>
          <Icon
            icon='IconLogo'
            size={100}
            color={getGlobalStyle('--color-neutral-black')}
          />
        </Link>
      </Row>
      <div className={styles.header_options}>
        {!isMobile && <Options
          countOrders={countOrders}
          error={false}
          errorPush={errorPush}
          loading={false}
          loadingPush={loadingPush}
          location={location}
          theme={theme}
          toggleTheme={toggleTheme}
          onClickAskUserPermission={onClickAskUserPermission}
          onClickLogout={onClickLogout}
          pushNotificationSupported={pushNotificationSupported}
          setIsOpenOrder={setIsOpenOrder}
        />
        }
        <div className={styles.button_action_sale} onClick={() => { return setSalesOpen(!salesOpen) }}>
          <Icon
            color={getGlobalStyle('--color-primary-red')}
            icon='IconSales'
            size={40}
          />
          <div className='info-sales'>
            <Text size='md' font='regular'>
              Crear una venta
            </Text>
            <Divider marginTop={getGlobalStyle('--spacing-xs')} />
            {loadingCount
              ? <Text font='light' size='sm' >
                Cargando...
              </Text>
              : (
                <Text font='light' color='gray-dark' size='sm'>
                  Total de ventas hoy  {count}
                </Text>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
Header.propTypes = {
  count: PropTypes.number,
  countOrders: PropTypes.number,
  errorPush: PropTypes.any,
  handleOpenMenu: PropTypes.func,
  isMobile: PropTypes.bool,
  loading: PropTypes.bool,
  loadingCount: PropTypes.bool,
  loadingPush: PropTypes.bool,
  location: PropTypes.object,
  onClickAskUserPermission: PropTypes.func,
  onClickLogout: PropTypes.func,
  pushNotificationSupported: PropTypes.any,
  salesOpen: PropTypes.bool,
  scrollNav: PropTypes.any,
  setAlertBox: PropTypes.func,
  setIsOpenOrder: PropTypes.func,
  setSalesOpen: PropTypes.func,
  style: PropTypes.object
}
