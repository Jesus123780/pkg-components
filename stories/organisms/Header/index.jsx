import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import { PColor } from '../../../assets/colors'
import { IconLogo, IconSales } from '../../../assets/icons'
import { Column, Row, Text } from '../../atoms'
import { AwesomeModal } from '../../organisms'
import { Options } from '../../organisms/HeaderOptions'
import { Burger } from './Burger'
import {
  CtnItemOps,
  HeaderC,
  HeaderWrapperButton
} from './styled'

export const Header = ({
  scrollNav,
  errorPush,
  loadingPush,
  pushNotificationSupported,
  salesOpen,
  location = {},
  style = {},
  count = 0,
  isMobile = false,
  loadingCount = false,
  onClickLogout = () => { return },
  handleOpenMenu = () => { return },
  onClickAskUserPermission = () => { return },
  setSalesOpen = () => { return }
}) => {
  return (
    <HeaderC scrollNav={scrollNav} style={style} >
      <AwesomeModal
        backdrop='static'
        borderRadius='10px'
        btnCancel={false}
        btnConfirm={false}
        footer={false}
        header={false}
        height={'200px'}
        onCancel={() => { return false }}
        onHide={() => { return }}
        padding={'30px'}
        show={false}
        size='20%'
        zIndex='9999'
      >
        <Column>
          <Text size='20px'>
            Tu session terminara pronto
          </Text>
        </Column>
        <button onClick={() => { return }}>
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
          <a>
            <IconLogo color={PColor} size={isMobile ? '40px' : '80px'} />
          </a>
        </Link>
      </Row>
      <CtnItemOps>
        {!isMobile
          && <Options
            error={false}
            errorPush={errorPush}
            loading={false}
            loadingPush={loadingPush}
            location={location}
            onClickAskUserPermission={onClickAskUserPermission}
            onClickLogout={onClickLogout}
            pushNotificationSupported={pushNotificationSupported}
          />
        }
        <HeaderWrapperButton onClick={() => { return setSalesOpen(!salesOpen) }} style={style}>
          <IconSales size={30} />
          <div className='info-sales'>
            <span>Crear una venta</span>
            {loadingCount ? <span>Cargando...</span> : <span>Total de ventas hoy  {count}</span>}
          </div>
        </HeaderWrapperButton>
      </CtnItemOps>
    </HeaderC>
  )
}
Header.propTypes = {
  count: PropTypes.number,
  error: PropTypes.bool,
  errorPush: PropTypes.any,
  handleOpenMenu: PropTypes.func,
  isMobile: PropTypes.bool,
  loading: PropTypes.bool,
  loadingCount: PropTypes.bool,
  loadingPush: PropTypes.any,
  location: PropTypes.object,
  onClickAskUserPermission: PropTypes.func,
  onClickLogout: PropTypes.func,
  pushNotificationSupported: PropTypes.any,
  salesOpen: PropTypes.bool,
  scrollNav: PropTypes.any,
  setAlertBox: PropTypes.any,
  setSalesOpen: PropTypes.func,
  style: PropTypes.object
}
