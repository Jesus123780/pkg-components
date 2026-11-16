import React from 'react'
import type { CashCheckoutView } from './CashPaymentFields'
import { formatCheckoutMoney, type CheckoutAccounting } from './checkout-accounting'
import styles from './AsideSales.module.css'

/** Display only: all amounts come from the checkout hook, never from UI arithmetic. */
export function CheckoutAccountingSummary({ checkout, accounting }: {
  checkout?: CashCheckoutView
  accounting?: CheckoutAccounting
}) {
  if (!checkout?.hasItems || !checkout.amountsValid) return null
  const hasDiscount = accounting && accounting.discount > 0
  const cash = checkout.kind === 'cash' && checkout.total > 0
  const received = checkout.received !== null && Number.isFinite(checkout.received)
  const money = formatCheckoutMoney
  return <dl className={styles.accounting} aria-label='Resumen contable de la venta'>
    {hasDiscount && <><div><dt>Subtotal bruto</dt><dd>{money(accounting.gross)}</dd></div>
      <div><dt>Descuento</dt><dd>− {money(accounting.discount)}</dd></div></>}
    <div><dt>Mercancía neta</dt><dd>{money(checkout.subtotal)}</dd></div>
    {checkout.delivery > 0 && <div><dt>Domicilio cobrado en POS</dt><dd>{money(checkout.delivery)}</dd></div>}
    {cash && <><div><dt>Efectivo recibido</dt><dd>{received ? money(checkout.received!) : '—'}</dd></div>
      <div><dt>{checkout.missing > 0 ? 'Faltante por recibir' : 'Vuelto'}</dt><dd>{checkout.missing > 0 ? money(checkout.missing) : received && checkout.received! >= checkout.total ? money(checkout.change) : '—'}</dd></div></>}
  </dl>
}
