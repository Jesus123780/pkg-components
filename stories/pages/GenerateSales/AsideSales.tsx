import React from 'react'
import {
  AlertInfo,
  AmountInput,
  AsideInfoStore,
  PaymentMethods,
  NewSelect,
  type Methods
} from '../../molecules'
import {
  Divider,
  Overline,
  RippleButton
} from '../../atoms'
import { getGlobalStyle } from '../../../utils'

interface AsideProps {
  openAside?: boolean
  overline?: boolean
  loadingClients?: boolean
  payMethodPState?: number
  storeTables?: any[]
  paymentMethods?: Methods[]
  dataClientes?: any[]
  values?: {
    cliId: string
    ValueDelivery: string
    change: string
    tableId: string
  }
  errors?: {
    change: boolean
    ValueDelivery: boolean
  }
  handleClickAction?: () => void
  useAmountInput?: () => void
  handleCloseAside?: () => void
  handleOpenAside?: () => void
  handleChange?: (e: { target: { name: string, value: any } }) => void
  dispatch?: React.Dispatch<any>
}

export const AsideSales: React.FC<AsideProps> = ({
  openAside = false,
  loadingClients = false,
  payMethodPState = 0,
  paymentMethods = [],
  storeTables = {
    storeTables: []
  },
  dataClientes = {
    data: []
  },
  values = {
    cliId: '',
    change: '',
    tableId: '',
    ValueDelivery: ''
  },
  errors = {
    change: false,
    ValueDelivery: false
  },
  overline = false,
  dispatch = () => { },
  useAmountInput = () => { },
  handleCloseAside = () => { },
  handleOpenAside = () => { },
  handleClickAction = () => { },
  handleChange = () => { }
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
            backdropFilter: 'blur(1px)',
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
          handleClickAction={() => {
            handleClickAction()
          }}
          id='cliId'
          action={false}
          loading={loadingClients}
          name='cliId'
          width='100%'
          onChange={(e) => handleChange({ target: { name: e.target.name, value: e.target.value } })}
          optionName='clientName'
          options={dataClientes?.data ?? []}
          search={true}
          canDelete={true}
          handleClean={() => {
            return handleChange({ target: { name: 'cliId', value: '' } })
          }}
          title='Selecciona un cliente'
          value={values?.cliId ?? ''}
        />
        <Divider marginBottom={getGlobalStyle('--spacing-3xl')} />
        <NewSelect
          name='tableId'
          width='100%'
          optionName='tableName'
          beforeLabel='Mesa'
          options={storeTables?.storeTables ?? []}
          onChange={(e) => handleChange({ target: { name: e.target.name, value: e.target.value } })}
          title='Selecciona una mesa'
          value={values?.tableId ?? ''}
          handleClean={() => {
            return handleChange({ target: { name: 'tableId', value: '' } })
          }}
          canDelete={true}
          id='tableId'
        />
        <PaymentMethods
          dispatch={dispatch}
          methods={paymentMethods}
          payMethodPState={payMethodPState}
        />
        <Divider marginBottom={getGlobalStyle('--spacing-3xl')} />
        <AmountInput
          allowDecimals={true}
          decimalSeparator=','
          decimalsLimit={2}
          disabled={false}
          groupSeparator='.'
          label='Cambio'
          name='change'
          onChange={(value) => {
            handleChange({
              target: {
                name: 'change',
                value
              }
            })
          }}
          placeholder='$ 0.00'
          prefix='$'
          useAmountInput={useAmountInput as any}
          value={values?.change}
        />
        <AmountInput
          allowDecimals={true}
          decimalSeparator=','
          decimalsLimit={2}
          disabled={false}
          groupSeparator='.'
          label='Precio del domicilio'
          name='ValueDelivery'
          onChange={(value) => {
            handleChange({
              target: {
                name: 'ValueDelivery',
                value
              }
            })
          }}
          placeholder='$ 0.00'
          prefix='$'
          useAmountInput={useAmountInput as any}
          value={values?.ValueDelivery}
        />

        <RippleButton
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%'
          }}
          onClick={() => {
            handleOpenAside()
          }}
        >
          Aceptar
        </RippleButton>
      </AsideInfoStore>
    </>
  )
}
