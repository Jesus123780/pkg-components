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
  /** Client currently selected for the sale. */
  client?: {
    clientName: string
    ccClient?: string
  }
  /** Formatted total price of the sale (e.g. "$ 93,10"). */
  totalProductPrice?: string | number
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
  discountPercent?: number
  discountAmount?: number
  /** Key that changes when the cart is fully cleared (e.g. REMOVE_ALL_PRODUCTS),
   *  forcing OrderDiscount to remount and reset its internal input state. */
  discountResetKey?: number | string
  handleSave?: () => void
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
  storeTables = [],
  dataClientes = [],
  values = {
    cliId: '',
    change: '',
    tableId: '',
    ValueDelivery: ''
  },
  overline = false,
  discountPercent = 0,
  discountAmount = 0,
  discountResetKey = 0,
  dispatch = () => { },
  handleSave = () => { },
  handleCloseAside = () => { },
  handleOpenAside = () => { },
  handleClickAction = () => { },
  handleChange = () => { }
}) => {
  const handleDiscount = (payload: { type: string, value: number }): void => {
    dispatch({ type: 'APPLY_DISCOUNT', payload })
  }

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
          tabIndex={0}
          action={false}
          beforeLabel='Cliente'
          loading={loadingClients}
          name='cliId'
          onChange={(e) => {
            handleChange({ target: { name: String(e.target.name), value: e.target.value } })
          }}
          optionName={['clientName', 'clientLastName']}
          options={dataClientes ?? []}
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
          optionName='tableName'
          tabIndex={1}
          options={storeTables ?? []}
          onChange={(e) => {
            return handleChange({ target: { name: String(e.target.name), value: e.target.value } })
          }}
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
          tabIndex={2}
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
          decimalsLimit={3}
          tabIndex={3}
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
        <OrderDiscount
          key={discountResetKey}
          tabIndex={4}
          onChange={handleDiscount}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
        />
        <RippleButton
          tabIndex={8}
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%'
          }}
          onClick={() => {
            handleOpenAside()
            handleSave()
          }}
        >
          Continuar
        </RippleButton>
      </LateralModal>
    </>
  )
}
