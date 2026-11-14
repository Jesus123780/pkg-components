import React, { useId } from 'react'
import styles from './CashPaymentFields.module.css'

// Structural UI contract: no dependency between pkg-components and pkg-hook.
export interface CashCheckoutView {
  kind: 'cash' | 'non-cash' | 'unknown'
  receivedText: string
  subtotal: number
  delivery: number
  total: number
  received: number | null
  change: number
  missing: number
  canSubmit: boolean
  message: string
  hasItems: boolean
  amountsValid: boolean
}

const format = (amount: number): string => new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0
}).format(amount)

export const CashPaymentFields = ({ checkout, onReceivedChange, disabled = false, tabIndex }: {
  checkout: CashCheckoutView
  onReceivedChange: (value: string) => void
  disabled?: boolean
  tabIndex?: number
}) => {
  const id = useId()
  const editable = checkout.kind === 'cash' && checkout.hasItems && checkout.total > 0 && !disabled
  return (
    <section className={styles.panel} aria-label='Importes del cobro'>
      {checkout.delivery > 0 && <div className={styles.line}><span>Productos</span><span>{format(checkout.subtotal)}</span></div>}
      {checkout.delivery > 0 && <div className={styles.line}><span>Domicilio</span><span>{format(checkout.delivery)}</span></div>}
      <div className={styles.line}><strong>Total a pagar</strong><strong>{checkout.amountsValid ? format(checkout.total) : '—'}</strong></div>
      {checkout.kind === 'cash' && checkout.hasItems && checkout.total > 0 && (
        <>
          <label htmlFor={id}>Efectivo recibido</label>
          <div className={styles.inputRow}>
            <input id={id} className={styles.input} inputMode='numeric' autoComplete='off'
              placeholder='Ej. 100000' tabIndex={tabIndex} value={checkout.receivedText} disabled={!editable}
              aria-describedby={`${id}-status`} aria-invalid={Boolean(checkout.receivedText && checkout.received === null)} maxLength={24}
              onChange={e => onReceivedChange(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') e.preventDefault() }} />
            <button type='button' className={styles.exact} tabIndex={tabIndex} disabled={!editable}
              onClick={() => onReceivedChange(String(checkout.total))}>Pago exacto</button>
          </div>
        </>
      )}
      <div className={styles.line}>
        <strong>Vuelto</strong>
        <output className={checkout.canSubmit ? styles.valid : undefined}>
          {checkout.kind === 'non-cash' ? 'No aplica' : checkout.kind === 'cash' && checkout.canSubmit ? format(checkout.change) : '—'}
        </output>
      </div>
      <div id={`${id}-status`} aria-live='polite' className={styles.status}>
        {checkout.missing > 0 ? `Faltan ${format(checkout.missing)}` : checkout.message}
      </div>
    </section>
  )
}
