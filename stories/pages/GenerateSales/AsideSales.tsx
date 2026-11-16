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

  handleSave?: () => void | boolean
  handleClickAction?: () => void
  handleCloseAside?: () => void
  handleOpenAside?: (open?: boolean) => void

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
    if (!openAside || isSubmittingSale) return
    handleOpenAside(false)
    handleCloseAside()
  }

  const handleGenerateSale = (): void => {
    if (!openAside || disabled || isSubmittingSale || (cashCheckout && !cashCheckout.canSubmit)) return
    // A rejected preview keeps the checkout visible. Legacy void callbacks
    // still work; the current parent returns a boolean explicitly.
    if (handleSave() === false) return
    handleOpenAside(false)
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
    ; (focusable ?? target).focus({ preventScroll: true })
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
  const customerFieldsRef = React.useRef<HTMLFieldSetElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const nextFieldFrame = React.useRef<number | null>(null)
  const revealFrame = React.useRef<number | null>(null)
  const [activeSelector, setActiveSelector] = React.useState<'cliId' | 'tableId' | null>(null)
  const hasCustomer = Boolean(values.cliId)
  const hasTable = Boolean(values.tableId)
  const customerSummary = hasCustomer && hasTable ? '2 seleccionados' : hasCustomer ? 'Cliente seleccionado' : hasTable ? 'Mesa seleccionada' : 'Opcional'

  React.useEffect(() => {
    if (!openAside || isSubmittingSale) setActiveSelector(null)
    return () => {
      if (nextFieldFrame.current !== null) window.cancelAnimationFrame(nextFieldFrame.current)
      if (revealFrame.current !== null) window.cancelAnimationFrame(revealFrame.current)
      nextFieldFrame.current = null
      revealFrame.current = null
    }
  }, [openAside, isSubmittingSale])

  // Scroll only the checkout content, never the footer or the document.
  React.useEffect(() => {
    if (!activeSelector || !openAside || isSubmittingSale) return
    revealFrame.current = window.requestAnimationFrame(() => {
      revealFrame.current = null
      const content = contentRef.current
      const field = customerFieldsRef.current?.querySelector<HTMLElement>(`[data-selection-field="${activeSelector}"]`)
      if (!content || !field || !field.getClientRects().length) return
      const viewport = content.getBoundingClientRect()
      const bounds = field.getBoundingClientRect()
      const margin = 12
      const available = Math.max(0, content.clientHeight - margin * 2)
      // When the expanded selector is taller than the viewport, show its input first.
      const delta = bounds.height > available || bounds.top < viewport.top + margin
        ? bounds.top - viewport.top - margin
        : Math.max(0, bounds.bottom - viewport.bottom + margin)
      if (Math.abs(delta) > 1) content.scrollBy({ top: delta, behavior: 'auto' })
    })
    return () => {
      if (revealFrame.current !== null) window.cancelAnimationFrame(revealFrame.current)
      revealFrame.current = null
    }
  }, [activeSelector, openAside, isSubmittingSale])

  const handleSelectorOpen = (field: 'cliId' | 'tableId', open: boolean) => {
    setActiveSelector(previous => open ? field : previous === field ? null : previous)
  }

  const focusTableSelector = () => {
    if (!openAside || isSubmittingSale || hasTable || storeTables.length === 0) return
    const fieldset = customerFieldsRef.current
    const customerInput = fieldset?.querySelector<HTMLInputElement>('input[name="cliId"]')
    // Do not hijack focus when a selection was committed by leaving the field.
    if (!customerInput || document.activeElement !== customerInput) return
    if (nextFieldFrame.current !== null) window.cancelAnimationFrame(nextFieldFrame.current)
    nextFieldFrame.current = window.requestAnimationFrame(() => {
      nextFieldFrame.current = null
      const tableInput = fieldset?.querySelector<HTMLInputElement>('input[name="tableId"]')
      if (document.activeElement !== customerInput || !tableInput || tableInput.matches(':disabled') || !tableInput.getClientRects().length) return
      tableInput.focus({ preventScroll: true })
    })
  }
  const discountLabel = discountType === 'AMOUNT' && discountAmount > 0 ? 'Valor fijo aplicado' : discountPercent > 0 ? `${discountPercent}% aplicado` : 'Sin descuento'
  return (
    <>
      {overline && <Overline show={openAside} bgColor={getGlobalStyle('--color-background-overline')} zIndex={getGlobalStyle('--z-index-99999')} onClick={closeAside} style={{ padding: getGlobalStyle('--spacing-lg') }} />}
      <LateralModal open={openAside} handleClose={closeAside} style={{ zIndex: getGlobalStyle('--z-index-modal'), height: '100dvh', maxHeight: '100dvh', minHeight: 0, top: 0, right: 0, display: 'flex', flexDirection: 'column', width: 'min(420px, 100vw)' }}>
        <div className={styles.panel} ref={panelRef}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>PUNTO DE VENTA</span>
            <h2>Completar venta</h2>
            <p>Selecciona cómo recibiste el pago.</p>
          </header>
          <div className={styles.content} ref={contentRef}>
            {recoverySection && <div {...targetProps('recovery')}>{recoverySection}</div>}
            <section className={styles.payment} aria-label='Medios de pago' {...targetProps('payment')}>
              <h3>Medio de pago</h3>
              <fieldset disabled={isSubmittingSale} className={styles.fields}>
                <PaymentMethods dispatch={handlePaymentDispatch} methods={paymentMethods} payId={payId} />
              </fieldset>
              {paymentMethods.length === 0 && <p className={styles.hint}>No hay medios de pago disponibles todavía.</p>}
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
              {cashCheckout && onCashReceivedChange
                ? (
                  <CashPaymentFields checkout={cashCheckout} onReceivedChange={onCashReceivedChange} disabled={isSubmittingSale} tabIndex={0} compact />
                  )
                : (
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
            <CheckoutDisclosure title='Cliente y mesa' summary={customerSummary} completed={hasCustomer && hasTable}>
              <fieldset ref={customerFieldsRef} className={styles.customerFields} disabled={isSubmittingSale}>
                <div className={styles.selectionField} data-selection-field='cliId'>
                  <div className={styles.selectionLabel}>
                    <label htmlFor='cliId'>Cliente</label>
                    <span className={hasCustomer ? styles.selectionCompleted : styles.optionalLabel}>{hasCustomer ? '✓ Seleccionado' : 'Opcional'}</span>
                  </div>
                  <NewSelect
                    id='cliId'
                    name='cliId'
                    ariaLabel='Selecciona un cliente'
                    placeholder='Buscar cliente'
                    tabIndex={0}
                    disabled={isSubmittingSale}
                    action={false}
                    loading={loadingClients}
                    optionName={['clientName', 'clientLastName']}
                    options={dataClientes}
                    canDelete
                    autoSelectDefault={false}
                    emptyMessage='No se encontraron clientes.'
                    value={values.cliId ?? ''}
                    handleClickAction={handleClickAction}
                    onOpenChange={open => handleSelectorOpen('cliId', open)}
                    onValueChange={(value, option) => {
                      if (isSubmittingSale) return
                      const next = String(value ?? '')
                      handleChange({ target: { name: 'cliId', value: next } })
                      if (option && next && next !== values.cliId) focusTableSelector()
                    }}
                  />
                </div>
                <div className={styles.selectionField} data-selection-field='tableId'>
                  <div className={styles.selectionLabel}>
                    <label htmlFor='tableId'>Mesa</label>
                    <span className={hasTable ? styles.selectionCompleted : styles.optionalLabel}>{hasTable ? '✓ Seleccionada' : 'Opcional'}</span>
                  </div>
                  <NewSelect
                    id='tableId'
                    name='tableId'
                    ariaLabel='Selecciona una mesa'
                    placeholder='Buscar mesa'
                    tabIndex={0}
                    disabled={isSubmittingSale}
                    optionName='tableName'
                    options={storeTables}
                    value={values.tableId ?? ''}
                    canDelete
                    autoSelectDefault={false}
                    emptyMessage='No hay mesas disponibles.'
                    onOpenChange={open => handleSelectorOpen('tableId', open)}
                    onValueChange={value => {
                      if (isSubmittingSale) return
                      handleChange({ target: { name: 'tableId', value: String(value ?? '') } })
                    }}
                  />
                </div>
                <p className={styles.selectionHint} role='status'>
                  {hasCustomer && hasTable ? 'Cliente y mesa configurados.' : 'Puedes continuar sin seleccionar cliente o mesa.'}
                </p>
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
            <div className={styles.footerAccounting}>
              <CheckoutAccountingSummary checkout={cashCheckout} accounting={accountingSummary} />
            </div>
            <div className={styles.total}>
              <span>Total a cobrar en POS</span>
              <strong>{totalLabel}</strong>
            </div>
            <div className={styles.footerControls}>
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
            </div>
            <Button primary disabled={blocked} width='100%' onClick={handleGenerateSale} iconName='IconSales' iconPosition='right' styles={{ justifyContent: 'center' }}>
              {isSubmittingSale ? 'Procesando venta…' : 'Revisar y generar venta'}
            </Button>
          </footer>
        </div>
      </LateralModal>
    </>
  )
}
