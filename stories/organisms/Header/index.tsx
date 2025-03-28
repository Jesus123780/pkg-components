import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import { PColor } from '../../../assets/colors'
import { IconLogo, IconSales } from '../../../assets/icons'
import {
  Column,
  Icon,
  Row,
  Text
} from '../../atoms'
import { AwesomeModal } from '../../organisms'
import { Options } from '../../organisms/HeaderOptions'
import { Burger } from './Burger'
import {
  CtnItemOps,
  HeaderC,
  HeaderWrapperButton
} from './styled'
import { getGlobalStyle } from '../../../helpers'

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
  setSalesOpen = (boolean: boolean) => { return boolean }
}) => {
  return (
    <HeaderC>
      <AwesomeModal
        backdrop='static'
        borderRadius='10px'
        btnCancel={false}
        btnConfirm={false}
        footer={false}
        header={false}
        height={'200px'}
        onCancel={() => { return false }}
        onHide={() => { return false }}
        padding={'30px'}
        show={false}
        size='20%'
        zIndex='9999'
      >
        <Column>
          <Text size='md'>
            Tu session terminara pronto
          </Text>
        </Column>
        <button onClick={() => { }}>
          cancelar
        </button>
        <button onClick={() => { return onClickLogout() }}>
          cerrar session
        </button>
      </AwesomeModal>
      <Row alignItems='center'>
        {isMobile && <Burger handleOpenMenu={handleOpenMenu} />}
        &nbsp;
        &nbsp;
        <Link href={'/dashboard'}>
          {/* <IconLogo color={PColor} size={isMobile ? '50px' : '100px'} /> */}
        </Link>
      </Row>
      <CtnItemOps>
        {/* {!isMobile && <Options
          countOrders={countOrders}
          error={false}
          errorPush={errorPush}
          loading={false}
          loadingPush={loadingPush}
          location={location}
          onClickAskUserPermission={onClickAskUserPermission}
          onClickLogout={onClickLogout}
          pushNotificationSupported={pushNotificationSupported}
          setIsOpenOrder={setIsOpenOrder}
        />
        } */}
        <HeaderWrapperButton onClick={() => { return setSalesOpen(!salesOpen) }}>
          <Icon
            color={getGlobalStyle('--color-primary-red')}
            icon='IconSales'
            size={40}
          />
          <div className='info-sales'>
            <span>Crear una venta</span>
            {loadingCount
              ? <span>Cargando...</span>
              : <span>Total de ventas hoy  {count}</span>
            }
          </div>
        </HeaderWrapperButton>
      </CtnItemOps>
    </HeaderC>
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
