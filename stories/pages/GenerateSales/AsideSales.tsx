import React from 'react'
import { AsideInfoStore, InputHooks, NewSelect } from '../../molecules'
import { Button, Divider } from '../../atoms'
import { getGlobalStyle } from '../../../utils'

interface AsideProps {
  openAside?: boolean
  handleCloseAside?: () => void
  loadingClients?: boolean
  dataClientes?: any[]
  handleClickAction?: () => void
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  values?: {
    cliId: string
  }
  dispatch?: React.Dispatch<any>
  data?: {
    payMethodPState: number
  }
  errors?: {
    change: boolean
    valueDelivery: boolean
  }
}

export const AsideSales: React.FC<AsideProps> = ({
  openAside = false,
  loadingClients = false,
  dataClientes = [],
  values = {
    cliId: ''
  },
  errors = {
    change: false,
    valueDelivery: false
  },
  data = {
    payMethodPState: 0
  },
  dispatch = () => {},
  handleCloseAside = () => {},
  handleClickAction = () => {},
  handleChange = () => {}
}) => {
  return (
    <AsideInfoStore
      zIndex={getGlobalStyle('--z-index-99999')}
      show={openAside}
      handleClose={handleCloseAside}
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
        primary
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
  )
}
