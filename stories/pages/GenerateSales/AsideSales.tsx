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
  Button,
  Column,
  Divider,
  Overline
} from '../../atoms'

import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'
import { CashPaymentFields, type CashCheckoutView } from './CashPaymentFields'

interface AsideProps {
  openAside?: boolean
  disabled: boolean
  isSubmittingSale?: boolean
  overline?: boolean
  loadingClients?: boolean
  payId?: string
  storeTables?: any[]
  paymentMethods?: Methods[]
  paymentKind?: 'cash' | 'non-cash' | 'unknown'
  cashCheckout?: CashCheckoutView
  onCashReceivedChange?: (value: string) => void
  dataClientes?: any[]

  client?: {
    clientName: string
    ccClient?: string
  }

  totalProductPrice?: string | number
  discountableSubtotal?: number

  values?: {
    cliId: string
    valueDelivery: string
    change: string
    tableId: string
  }

  errors?: {
    change: boolean
    valueDelivery: boolean
  }

  discountType?: 'PERCENT' | 'AMOUNT'
  discountPercent?: number
  discountAmount?: number
  discountResetKey?: number | string

  handleSave?: () => void
  handleClickAction?: () => void
  handleCloseAside?: () => void
  handleOpenAside?: () => void

  handleChange?: (e: {
    target: {
      name: string
      value: any
    }
  }) => void

  dispatch?: React.Dispatch<any>
}

export const AsideSales: React.FC<AsideProps> = ({
  openAside = false,
  disabled,
  isSubmittingSale = false,
  loadingClients = false,
  payId = '',
  paymentMethods = [],
  paymentKind,
  cashCheckout,
  onCashReceivedChange,
  storeTables = [],
  dataClientes = [],
  values = {
    cliId: '',
    change: '',
    tableId: '',
    valueDelivery: ''
  },
  overline = false,
  discountableSubtotal,
  discountType = 'PERCENT',
  discountPercent = 0,
  discountAmount = 0,
  discountResetKey = 0,
  dispatch = () => {},
  handleSave = () => {},
  handleCloseAside = () => {},
  handleOpenAside = () => {},
  handleClickAction = () => {},
  handleChange = () => {}
}) => {
  // Fallback for older consumers; the new POS supplies paymentKind from useSales.
  const resolveMethodKind = (id: string) => {
    const name = paymentMethods.find(method => method.id === id)?.name
    const normalized = typeof name === 'string'
      ? name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase().replace(/\s+/g, ' ')
      : ''
    return normalized
      ? /^(efectivo|cash|pago en efectivo|dinero en efectivo)$/.test(normalized) ? 'cash' : 'non-cash'
      : 'unknown'
  }
  const resolvedKind = paymentKind ?? resolveMethodKind(payId)
  const canEditChange = resolvedKind === 'cash' && !isSubmittingSale

  // Existing standalone consumers that do not supply paymentKind also clear
  // the old value. With the new hook, cleanup is centralized in useSales.
  React.useEffect(() => {
    if (paymentKind !== undefined || resolvedKind !== 'non-cash' || values.change == null || values.change === '') return
    handleChange({ target: { name: 'change', value: '' } })
  }, [paymentKind, resolvedKind, values.change, handleChange])

  // Backwards compatibility for consumers without the updated useSales hook.
  // Use the NEXT selected ID, not the previous payment method.
  const handlePaymentDispatch: React.Dispatch<any> = (action) => {
    if (paymentKind === undefined && action?.type === 'PAYMENT_METHOD' &&
        resolveMethodKind(action.payload) === 'non-cash') {
      handleChange({ target: { name: 'change', value: '' } })
    }
    dispatch(action)
  }

  // Empty cart is always ineligible. An omitted subtotal is a legacy consumer;
  // do not guess eligibility from a localized/formatted net total.
  const canApplyDiscount = !disabled && (discountableSubtotal === undefined ||
    (Number.isFinite(discountableSubtotal) && discountableSubtotal > 0))

  const handleDiscount = (payload: {
    type: string
    value: number
  }): void => {
    if (isSubmittingSale || (payload.value > 0 && !canApplyDiscount)) return
    dispatch({
      type: 'APPLY_DISCOUNT',
      payload
    })
  }

  const closeAside = (): void => {
    handleOpenAside()
    handleCloseAside()
  }

  const handleGenerateSale = (): void => {
    if (disabled || isSubmittingSale || (cashCheckout && !cashCheckout.canSubmit)) return
    handleOpenAside()
    handleSave()
  }

  return (
    <>
      {overline && (
        <Overline
          show={openAside}
          bgColor={getGlobalStyle('--color-background-overline')}
          zIndex={getGlobalStyle('--z-index-99999')}
          onClick={closeAside}
          style={{
            padding: getGlobalStyle('--spacing-lg')
          }}
        />
      )}

      <LateralModal
        open={openAside}
        handleClose={closeAside}
        style={{
          padding: getGlobalStyle('--spacing-xs'),
          zIndex: getGlobalStyle('--z-index-modal'),

          // Altura limitada al viewport.
          height: '100dvh',
          maxHeight: '100dvh',
          minHeight: 0,

          top: 0,
          right: 0,

          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Column
          className={styles.panel}
          justifyContent='space-between'
          style={{
            height: '100%',
            maxHeight: '100%',
            minHeight: 0,
            flex: '1 1 auto'
          }}
        >
          {/* =========================================
              CONTENIDO DESPLAZABLE
          ========================================= */}

          <Column className={styles.content} style={{
            overflow: 'auto',
            height: 'min-content'
          }}>
            <Divider
              marginBottom={getGlobalStyle('--spacing-3xl')}
            />

            <AlertInfo
              message='Selecciona a un cliente para la venta'
              type='warning'
            />

            <Divider
              marginBottom={getGlobalStyle('--spacing-3xl')}
            />

            <NewSelect
              handleClickAction={handleClickAction}
              id='cliId'
              tabIndex={0}
              action={false}
              beforeLabel='Cliente'
              loading={loadingClients}
              name='cliId'
              onChange={(e) => {
                handleChange({
                  target: {
                    name: String(e.target.name),
                    value: e.target.value
                  }
                })
              }}
              optionName={['clientName', 'clientLastName']}
              options={dataClientes}
              canDelete
              handleClean={() => {
                handleChange({
                  target: {
                    name: 'cliId',
                    value: ''
                  }
                })
              }}
              title='Selecciona un cliente'
              value={values.cliId ?? ''}
            />

            <Divider
              marginBottom={getGlobalStyle('--spacing-3xl')}
            />

            <NewSelect
              name='tableId'
              optionName='tableName'
              tabIndex={1}
              options={storeTables}
              onChange={(e) => {
                handleChange({
                  target: {
                    name: String(e.target.name),
                    value: e.target.value
                  }
                })
              }}
              title='Selecciona una mesa'
              value={values.tableId ?? ''}
              handleClean={() => {
                handleChange({
                  target: {
                    name: 'tableId',
                    value: ''
                  }
                })
              }}
              canDelete
              id='tableId'
            />

            <PaymentMethods
              dispatch={handlePaymentDispatch}
              methods={paymentMethods}
              payId={payId}
            />

            <Divider
              marginBottom={getGlobalStyle('--spacing-3xl')}
            />

            {cashCheckout && onCashReceivedChange ? (
              <CashPaymentFields checkout={cashCheckout} onReceivedChange={onCashReceivedChange} disabled={isSubmittingSale} tabIndex={2} />
            ) : (
              <AmountInput
              key={resolvedKind === 'cash' ? 'change-cash' : 'change-disabled'}
              allowDecimals
              decimalSeparator=','
              tabIndex={2}
              decimalsLimit={2}
              disabled={!canEditChange}
              groupSeparator='.'
              label='Cambio'
              name='change'
              onValueChange={(value) => {
                if (!canEditChange) return
                handleChange({
                  target: {
                    name: 'change',
                    value
                  }
                })
              }}
              placeholder='$ 0.00'
              prefix='$'
              value={resolvedKind === 'cash' ? (values.change ?? '') : ''}
            />
            )}

            <AmountInput
              allowDecimals
              decimalSeparator=','
              decimalsLimit={3}
              tabIndex={3}
              disabled={false}
              groupSeparator='.'
              label='Precio del domicilio'
              name='valueDelivery'
              onValueChange={(value) => {
                handleChange({
                  target: {
                    name: 'valueDelivery',
                    value
                  }
                })
              }}
              placeholder='$ 0.00'
              prefix='$'
              value={values.valueDelivery}
            />

            <OrderDiscount
              key={discountResetKey}
              tabIndex={4}
              onChange={handleDiscount}
              canApplyDiscount={canApplyDiscount}
              disabled={isSubmittingSale}
              discountType={discountType}
              discountPercent={discountPercent}
              discountAmount={discountAmount}
            />
          </Column>

          {/* =========================================
              FOOTER INDEPENDIENTE DEL SCROLL
          ========================================= */}

          <div className={styles.footer}>
            <Button
              primary
              disabled={disabled || isSubmittingSale || Boolean(cashCheckout && !cashCheckout.canSubmit)}
              width='100%'
              tabIndex={8}
              onClick={handleGenerateSale}
              iconName='IconSales'
              iconPosition='right'
              styles={{
                justifyContent: 'center'
              }}
            >
              {isSubmittingSale ? 'Procesando venta…' : 'Generar venta'}
            </Button>
          </div>
        </Column>
      </LateralModal>
    </>
  )
}