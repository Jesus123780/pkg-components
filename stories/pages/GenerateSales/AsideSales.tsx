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
import { CheckoutAccountingSummary } from './CheckoutAccountingSummary'
import { formatCheckoutMoney, type CheckoutAccounting, type CheckoutAction } from './checkout-accounting'

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
  accountingSummary?: CheckoutAccounting
  requiredAction?: CheckoutAction
  onReturnToCart?: () => void
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
  accountingSummary,
  requiredAction,
  onReturnToCart,
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

  const panelRef = React.useRef<HTMLDivElement>(null)
  const [highlightedTarget, setHighlightedTarget] = React.useState<string | null>(null)
  const highlightTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(() => () => { if (highlightTimer.current) clearTimeout(highlightTimer.current) }, [])
  React.useEffect(() => { setHighlightedTarget(null) }, [requiredAction?.target, openAside])
  const goToRequiredAction = () => {
    if (!requiredAction) return
    const target = panelRef.current?.querySelector<HTMLElement>(`[data-checkout-target="${requiredAction.target}"]`)
    if (!target) return
    const details = target.querySelector('details')
    if (details) details.open = true
    const focusable = target.querySelector<HTMLElement>('input:not([disabled]):not([type="hidden"]), select:not([disabled]), button:not([disabled]), textarea:not([disabled]), a[href]') ?? target.querySelector<HTMLElement>('summary')
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    target.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    ;(focusable ?? target).focus({ preventScroll: true })
    setHighlightedTarget(requiredAction.target)
    if (highlightTimer.current) clearTimeout(highlightTimer.current)
    highlightTimer.current = setTimeout(() => setHighlightedTarget(null), 1800)
  }
  const targetProps = (target: CheckoutAction['target']) => ({
    'data-checkout-target': target,
    'data-attention': highlightedTarget === target ? 'true' : undefined,
    tabIndex: -1
  })
  const totalLabel = cashCheckout?.amountsValid && cashCheckout.hasItems
    ? formatCheckoutMoney(cashCheckout.total)
    : cashCheckout ? '—' : totalProductPrice == null ? '—' : String(totalProductPrice)
  const blocked = disabled || isSubmittingSale || Boolean(cashCheckout && !cashCheckout.canSubmit)
  const message = requiredAction?.message || (disabled ? 'Agrega productos al carrito.' : isSubmittingSale ? 'Procesando operación…' : checkoutBlocker || cashCheckout?.message || '')
  // The confirmation itself is the actionable instruction; retain other blockers.
  const footerMessage = paymentConfirmationSection && (message === 'Confirma que recibiste el pago.' || message === 'Confirma la venta sin cobro.') ? '' : message
  const customerSelected = Boolean(values.cliId || values.tableId)
  const discountLabel = discountType === 'AMOUNT' && discountAmount > 0 ? 'Valor fijo aplicado' : discountPercent > 0 ? `${discountPercent}% aplicado` : 'Sin descuento'
  return (
    <>
      {overline && <Overline show={openAside} bgColor={getGlobalStyle('--color-background-overline')} zIndex={getGlobalStyle('--z-index-99999')} onClick={closeAside} style={{padding:getGlobalStyle('--spacing-lg')}} />}
      <LateralModal open={openAside} handleClose={closeAside} style={{zIndex:getGlobalStyle('--z-index-modal'),height:'100dvh',maxHeight:'100dvh',minHeight:0,top:0,right:0,display:'flex',flexDirection:'column',width:'min(420px, 100vw)'}}>
        <div className={styles.panel} ref={panelRef}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>PUNTO DE VENTA</span>
            <h2>Completar venta</h2>
            <p>Selecciona cómo recibiste el pago.</p>
          </header>
          <div className={styles.content}>
            {recoverySection && <div {...targetProps('recovery')}>{recoverySection}</div>}
            <section className={styles.payment} aria-label='Medios de pago' {...targetProps('payment')}>
              <h3>Medio de pago</h3>
              <fieldset disabled={isSubmittingSale} className={styles.fields}>
               <PaymentMethods dispatch={handlePaymentDispatch} methods={paymentMethods} payId={payId}/>
              </fieldset>
              {paymentMethods.length===0 && <p className={styles.hint}>No hay medios de pago disponibles todavía.</p>}
              {paymentSettingsSection}
            </section>
            {cashSection && <div {...targetProps('cash-session')}><CheckoutDisclosure title='Caja del turno' summary={cashSectionSummary} required={cashSectionRequired}>{cashSection}</CheckoutDisclosure></div>}
            <div {...targetProps('delivery')}><CheckoutDisclosure title='Entrega' summary={deliverySectionSummary ?? 'Configurar'} required={deliverySectionRequired}>
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
            </CheckoutDisclosure></div>
            <div className={styles.cashFields} {...targetProps('cash-received')}>
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
            <div {...targetProps('discount')}><CheckoutDisclosure title='Descuento' summary={discountLabel}>
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
            </CheckoutDisclosure></div>
            {financialNoticeSection}

          </div>
          <footer className={styles.footer}>
            <CheckoutAccountingSummary checkout={cashCheckout} accounting={accountingSummary} />
            <div className={styles.total}>
              <span>Total a cobrar en POS</span>
              <strong>{totalLabel}</strong>
            </div>
            {paymentConfirmationSection && (
              <div className={styles.confirmation} aria-label='Confirmación del cobro' {...targetProps('confirmation')}>
                {paymentConfirmationSection}
              </div>
            )}
            <div className={styles.messageRegion} role='status' aria-live='polite' aria-atomic='true'>
              {footerMessage && <p className={styles.message}>{footerMessage}</p>}
            </div>
            {requiredAction && blocked && (!disabled || requiredAction.target === 'recovery') && (
              <button type='button' className={styles.actionButton} onClick={goToRequiredAction}>
                <span>{requiredAction.label}</span><span aria-hidden='true'>↗</span>
              </button>
            )}
            {blocked && !requiredAction && onReturnToCart && !isSubmittingSale && !disabled && (
              <button type='button' className={styles.actionButton} onClick={onReturnToCart}>Volver al carrito</button>
            )}
            <Button primary disabled={blocked} width='100%' onClick={handleGenerateSale} iconName='IconSales' iconPosition='right' styles={{justifyContent:'center'}}>
              {isSubmittingSale ? 'Procesando venta…' : 'Revisar y generar venta'}
            </Button>
          </footer>
        </div>
      </LateralModal>
    </>
  )
}
