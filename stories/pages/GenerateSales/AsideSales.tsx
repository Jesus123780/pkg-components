import React from 'react'
import {
  AlertInfo,
  AsideInfoStore,
  NewSelect,
  NumberFormatBase,
  currencyFormat
} from '../../molecules'
import {
  Button,
  Divider,
  Overline
} from '../../atoms'
import { getGlobalStyle } from '../../../utils'

interface AsideProps {
  openAside?: boolean
  overline?: boolean
  loadingClients?: boolean
  dataClientes?: any[]
  values?: {
    cliId: string
    ValueDelivery: string
    change: string
  }
  data?: {
    payMethodPState: number
  }
  errors?: {
    change: boolean
    ValueDelivery: boolean
  }
  paymentMethodTransfer?: boolean
  handleClickAction?: () => void
  handleCloseAside?: () => void
  handleOpenAside?: () => void
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  dispatch?: React.Dispatch<any>
}

export const AsideSales: React.FC<AsideProps> = ({
  openAside = false,
  loadingClients = false,
  paymentMethodTransfer = false,
  dataClientes = {
    data: []
  },
  values = {
    cliId: '',
    change: '',
    ValueDelivery: ''
  },
  errors = {
    change: false,
    ValueDelivery: false
  },
  data = {
    payMethodPState: 0
  },
  overline = false,
  dispatch = () => {},
  handleCloseAside = () => {},
  handleOpenAside = () => {},
  handleClickAction = () => {},
  handleChange = () => {}
}) => {
  return (
    <>
      {overline && (
        <Overline
          show={openAside}
          bgColor={getGlobalStyle('--color-background-overline')}
          zIndex={getGlobalStyle('--z-index-99999')}
          onClick={() => {
            handleOpenAside()
            handleCloseAside()
          }}
          style={React.useMemo(() => ({
            padding: getGlobalStyle('--spacing-lg')
          }), [])}
        />
      )}
      <AsideInfoStore
        zIndex={getGlobalStyle('--z-index-high')}
        show={openAside}
        handleClose={() => {
          handleOpenAside()
          handleCloseAside()
        }}
        style={{ height: '100vh', padding: getGlobalStyle('--spacing-xs') }}
      >
        <Divider marginBottom={getGlobalStyle('--spacing-3xl')} />
        <AlertInfo message='Selecciona a un cliente para la venta' type='warning' />
        <Divider marginBottom={getGlobalStyle('--spacing-3xl')} />
        <NewSelect
          action={true}
          handleClickAction={() => {
            handleClickAction()
          }}
          id="cliId"
          loading={loadingClients}
          name="cliId"
          width="100%"
          onChange={handleChange}
          optionName="clientName"
          options={dataClientes?.data ?? []}
          search={true}
          title="Mis clientes"
          value={values?.cliId ?? ''}
        />
        <Divider marginBottom={getGlobalStyle('--spacing-3xl')} />
        <Button
          primary={paymentMethodTransfer}
          onClick={() => {
            dispatch({ type: 'PAYMENT_METHOD_TRANSACTION' })
          }}
        >
          TRANSFERENCIA
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: 'PAYMENT_METHOD_MONEY' })
          }}
          primary={!paymentMethodTransfer}
        >
          EFECTIVO
        </Button>
        <Divider marginBottom={getGlobalStyle('--spacing-3xl')} />

        <NumberFormatBase
          defaultValue={0}
          format={currencyFormat}
          label='Cambio'
          name='change'
          onChangeDefault={(e) => {
            handleChange({
              target: {
                name: 'change',
                value: e.floatValue
              }
            })
          }}
          value={values?.change}
        />
        <NumberFormatBase
          defaultValue={0}
          autoComplete="off"
          error={errors.ValueDelivery}
          format={currencyFormat}
          label='Domicilio'
          name='ValueDelivery'
          onChangeDefault={(e) => {
            handleChange({
              target: {
                name: 'ValueDelivery',
                value: e.floatValue
              }
            })
          }}
          value={values?.ValueDelivery}
        />
      </AsideInfoStore>
    </>
  )
}
