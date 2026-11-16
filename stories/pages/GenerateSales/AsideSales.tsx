import React from 'react'

import {
  AmountInput,
  PaymentMethods,
  NewSelect,
  type Methods,
  OrderDiscount,
  LateralModal
} from '../../molecules'

import {
  Button,
  Overline
} from '../../atoms'

import { getGlobalStyle } from '../../../utils'
import styles from './AsideSales.module.css'
import { CheckoutDisclosure } from './CheckoutDisclosure'
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
  deliverySection?: React.ReactNode
  cashSection?: React.ReactNode
  cashSectionSummary?: string
  cashSectionRequired?: boolean
  deliverySectionSummary?: string
  deliverySectionRequired?: boolean
  paymentConfirmationSection?: React.ReactNode
  paymentSettingsSection?: React.ReactNode
  recoverySection?: React.ReactNode
  financialNoticeSection?: React.ReactNode
  checkoutBlocker?: string
  cashCheckout?: CashCheckoutView
  onCashReceivedChange?: (value: string, mode?: 'manual' | 'exact') => void
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
  deliverySection,
  cashSection,
  cashSectionSummary,
  cashSectionRequired,
  deliverySectionSummary,
  deliverySectionRequired,
  paymentConfirmationSection,
  paymentSettingsSection,
  recoverySection,
  financialNoticeSection,
  checkoutBlocker,
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
  totalProductPrice,
  discountableSubtotal,
  discountType = 'PERCENT',
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
    if (isSubmittingSale) return
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
    if (isSubmittingSale) return
    handleOpenAside()
    handleCloseAside()
  }

  const handleGenerateSale = (): void => {
    if (disabled || isSubmittingSale || (cashCheckout && !cashCheckout.canSubmit)) return
    handleOpenAside()
    handleSave()
  }

  const totalLabel = cashCheckout?.amountsValid && cashCheckout.hasItems
    ? new Intl.NumberFormat('es-CO', {style:'currency',currency:'COP',minimumFractionDigits:2,maximumFractionDigits:2}).format(cashCheckout.total)
    : cashCheckout ? '—' : totalProductPrice == null ? '—' : String(totalProductPrice)
  const blocked = disabled || isSubmittingSale || Boolean(cashCheckout && !cashCheckout.canSubmit)
  const message = disabled ? 'Agrega productos al carrito.' : isSubmittingSale ? 'Procesando operación…' : checkoutBlocker || cashCheckout?.message || ''
  const customerSelected = Boolean(values.cliId || values.tableId)
  const discountLabel = discountType === 'AMOUNT' && discountAmount > 0 ? 'Valor fijo aplicado' : discountPercent > 0 ? `${discountPercent}% aplicado` : 'Sin descuento'
  return (
    <>
      {overline && <Overline show={openAside} bgColor={getGlobalStyle('--color-background-overline')} zIndex={getGlobalStyle('--z-index-99999')} onClick={closeAside} style={{padding:getGlobalStyle('--spacing-lg')}} />}
      <LateralModal open={openAside} handleClose={closeAside} style={{zIndex:getGlobalStyle('--z-index-modal'),height:'100dvh',maxHeight:'100dvh',minHeight:0,top:0,right:0,display:'flex',flexDirection:'column',width:'min(420px, 100vw)'}}>
        <div className={styles.panel}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>PUNTO DE VENTA</span>
            <h2>Completar venta</h2>
            <p>Selecciona cómo recibiste el pago.</p>
          </header>
          <div className={styles.content}>
            {recoverySection}
            <section className={styles.payment} aria-label='Medios de pago'>
              <h3>Medio de pago</h3>
              <fieldset disabled={isSubmittingSale} className={styles.fields}>
               <PaymentMethods dispatch={handlePaymentDispatch} methods={paymentMethods} payId={payId}/>
              </fieldset>
              {paymentMethods.length===0 && <p className={styles.hint}>No hay medios de pago disponibles todavía.</p>}
              {paymentSettingsSection}
            </section>
            {cashSection && <CheckoutDisclosure title='Caja del turno' summary={cashSectionSummary} required={cashSectionRequired}>{cashSection}</CheckoutDisclosure>}
            <CheckoutDisclosure title='Entrega' summary={deliverySectionSummary ?? 'Configurar'} required={deliverySectionRequired}>
              {deliverySection ?? (
            <AmountInput
              allowDecimals
              decimalSeparator=','
              decimalsLimit={2}
              allowNegativeValue={false}
              tabIndex={0}
              disabled={isSubmittingSale}
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
            )}
            </CheckoutDisclosure>
            <CheckoutDisclosure title='Cliente y mesa' summary={customerSelected ? 'Seleccionados' : 'Sin seleccionar'}>
              <fieldset className={styles.fields} disabled={isSubmittingSale}>
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
                <NewSelect
              name='tableId'
              optionName='tableName'
              tabIndex={0}
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
              </fieldset>
            </CheckoutDisclosure>
            <CheckoutDisclosure title='Descuento' summary={discountLabel}>
              <OrderDiscount
              key={discountResetKey}
              tabIndex={0}
              onChange={handleDiscount}
              canApplyDiscount={canApplyDiscount}
              disabled={isSubmittingSale}
              discountType={discountType}
              discountPercent={discountPercent}
              discountAmount={discountAmount}
            />
            </CheckoutDisclosure>
            {financialNoticeSection}
            <div className={styles.cashFields}>
              {cashCheckout && onCashReceivedChange ? (
              <CashPaymentFields checkout={cashCheckout} onReceivedChange={onCashReceivedChange} disabled={isSubmittingSale} tabIndex={0} compact />
            ) : (
              <AmountInput
                key={resolvedKind === 'cash' ? 'change-cash' : 'change-disabled'}
                allowDecimals
                decimalSeparator=','
                tabIndex={0}
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
            </div>
            {paymentConfirmationSection && <div className={styles.confirmation}>{paymentConfirmationSection}</div>}
          </div>
          <footer className={styles.footer}>
            <div className={styles.total}><span>Total a cobrar en POS</span><strong>{totalLabel}</strong></div>
            {message && <p className={styles.message} role='status' aria-live='polite'>{message}</p>}
            <Button primary disabled={blocked} width='100%' onClick={handleGenerateSale} iconName='IconSales' iconPosition='right' styles={{justifyContent:'center'}}>
              {isSubmittingSale ? 'Procesando venta…' : 'Revisar y generar venta'}
            </Button>
          </footer>
        </div>
      </LateralModal>
    </>
  )
}
