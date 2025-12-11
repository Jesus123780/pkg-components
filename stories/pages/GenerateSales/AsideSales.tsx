import React from 'react'
import {
  AlertInfo,
  AmountInput,
  PaymentMethods,
  NewSelect,
  type Methods,
  OrderDiscount,
  LateralModal
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
  payId?: string
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
  discount?: number
  handleClickAction?: () => void
  handleCloseAside?: () => void
  handleOpenAside?: () => void
  handleChange?: (e: { target: { name: string, value: any } }) => void
  dispatch?: React.Dispatch<any>
}

export const AsideSales: React.FC<AsideProps> = ({
  openAside = false,
  loadingClients = false,
  payId = '',
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
  discount = 0,
  dispatch = () => { },
  handleCloseAside = () => { },
  handleOpenAside = () => { },
  handleClickAction = () => { },
  handleChange = () => { }
}) => {
  const handleDiscount = (percent: number): void => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: percent });
  };
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
      <LateralModal
        open={openAside}
        handleClose={() => {
          handleOpenAside()
          handleCloseAside()
        }}
        style={{ 
          padding: getGlobalStyle('--spacing-xs'),
          zIndex: getGlobalStyle('--z-index-modal'),
          height: '100%',
          top: 0,
          right: 0
        }}
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
          payId={payId}
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
          onValueChange={(value) => {
            handleChange({
              target: {
                name: 'change',
                value
              }
            })
          }}
          placeholder='$ 0.00'
          prefix='$'
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
          onValueChange={(value) => {
            handleChange({
              target: {
                name: 'ValueDelivery',
                value
              }
            })
          }}
          placeholder='$ 0.00'
          prefix='$'
          value={values?.ValueDelivery}
        />
        <OrderDiscount onChange={handleDiscount} initialValue={discount} />
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
      </LateralModal>
    </>
  )
}
