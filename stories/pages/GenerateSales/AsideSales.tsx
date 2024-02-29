import React from 'react'
import {
  AsideInfoStore,
  InputHooks,
  NewSelect
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
    valueDelivery: string
    change: string
  }
  data?: {
    payMethodPState: number
  }
  errors?: {
    change: boolean
    valueDelivery: boolean
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
  dataClientes = [],
  values = {
    cliId: '',
    change: ''
  },
  errors = {
    change: false,
    valueDelivery: false
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
          bgColor="rgba(0,0,0,.4)"
          zIndex={getGlobalStyle('--z-index-99999')}
          onClick={() => {
            handleOpenAside()
            handleCloseAside()
          }}
        />
      )}
      <AsideInfoStore
        zIndex={getGlobalStyle('--z-index-high')}
        show={openAside}
        handleClose={() => {
          handleOpenAside()
          handleCloseAside()
        }}
        style={{ height: '100vh' }}
      >
        <Divider marginBottom={'20px'} />
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
          options={dataClientes ?? []}
          search={' '}
          title="Mis clientes"
          value={values?.cliId ?? ''}
        />
        <Divider marginBottom={'20px'} />
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

        <InputHooks
          autoComplete="off"
          error={errors?.change}
          name="change"
          numeric
          onChange={handleChange}
          range={{ min: 0, max: 9 }}
          title="Cambio"
          value={values?.change}
          width="100%"
        />
        <InputHooks
          autoComplete="off"
          error={errors.valueDelivery}
          name="valueDelivery"
          numeric
          onChange={handleChange}
          range={{ min: 0, max: 9 }}
          title="Domicilio"
          value={values?.valueDelivery}
          width="100%"
        />
      </AsideInfoStore>
    </>
  )
}
