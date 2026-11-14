import React, { useId, useState } from 'react'

import { AmountInput } from '../../molecules'
import styles from './CashPaymentFields.module.css'
import { getGlobalStyle } from '../../../helpers'
import { Button } from '../../atoms'

// Structural UI contract: no dependency between pkg-components and pkg-hook.
export interface CashCheckoutView {
  kind: 'cash' | 'non-cash' | 'unknown'
  receivedMode?: 'manual' | 'exact'
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
  integrityDebug?: string
}

const moneyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const inputFormatter = new Intl.NumberFormat('es-CO', {
  useGrouping: false,
  maximumFractionDigits: 2
})

/** The hook receives ungrouped es-CO text, never formatted currency. */
const toReceivedText = (value: number): string => inputFormatter.format(value)

export const CashPaymentFields = ({
  checkout,
  onReceivedChange,
  disabled = false,
  tabIndex
}: {
  checkout: CashCheckoutView
  onReceivedChange: (value: string, mode?: 'manual' | 'exact') => void
  disabled?: boolean
  tabIndex?: number
}) => {
  const id = useId()
  const showCash = checkout.kind === 'cash' && checkout.hasItems && checkout.amountsValid && checkout.total > 0
  const editable = showCash && !disabled
  const exact = checkout.receivedMode === 'exact'

  // AmountInput preserves its internal formatted draft after typing. Remount
  // only for external changes (another checkout panel, reset, exact payment),
  // not for the keystrokes that this input itself emitted. This keeps the caret.
  const [inputSync, setInputSync] = useState({ value: checkout.receivedText, revision: 0 })
  if (inputSync.value !== checkout.receivedText) {
    setInputSync({ value: checkout.receivedText, revision: inputSync.revision + 1 })
  }

  const emitReceived = (next: string, mode: 'manual' | 'exact' = 'manual'): void => {
    if (!editable) return
    setInputSync(previous => ({
      value: next,
      revision: previous.revision + (mode === 'exact' ? 1 : 0)
    }))
    onReceivedChange(next, mode)
  }

  return (
    <section className={styles.panel} aria-label='Importes del cobro'>
      {checkout.delivery > 0 && (
        <>
          <div className={styles.line}>
            <span>Neto de mercancía</span>
            <span>{moneyFormatter.format(checkout.subtotal)}</span>
          </div>
          <div className={styles.line}>
            <span>Domicilio cobrado en POS</span>
            <span>{moneyFormatter.format(checkout.delivery)}</span>
          </div>
        </>
      )}
      <div className={styles.line}>
        <strong>Total a cobrar en POS</strong>
        <strong>{checkout.amountsValid ? moneyFormatter.format(checkout.total) : '—'}</strong>
      </div>
      {showCash && (
        <>
          <label htmlFor={id}>Efectivo recibido</label>
          <div className={styles.inputRow}>
            <div className={styles.inputField}>
              <AmountInput
                key={inputSync.revision}
                id={id}
                name='cashReceived'
                autoComplete='off'
                placeholder='$ 0,00'
                prefix='$'
                decimalSeparator=','
                groupSeparator='.'
                allowDecimals
                allowNegativeValue={false}
                decimalsLimit={2}
                decimalScale={2}
                formatValueOnBlur={false}
                tabIndex={tabIndex}
                value={checkout.receivedText}
                disabled={!editable}
                aria-describedby={`${id}-status`}
                aria-invalid={Boolean(checkout.receivedText && checkout.received === null) || checkout.missing > 0}
                maxLength={24}
                onValueChange={(value, _name, details) => {
                  if (!editable) return
                  // The component emits a number during typing/abbreviations;
                  // details.float is also numeric when blur emits a string.
                  const numeric = details?.float ?? (typeof value === 'number' ? value : null)
                  emitReceived(typeof numeric === 'number' && Number.isFinite(numeric) && numeric >= 0
                    ? toReceivedText(numeric)
                    : '')
                }}
                onKeyDown={e => { if (e.key === 'Enter') e.preventDefault() }}
              />
            </div>
            <Button
              type='button'
              padding={getGlobalStyle('--spacing-xl')}
              className={`${styles.exact} ${exact ? styles.exactActive : ''}`}
              tabIndex={tabIndex}
              disabled={!editable}
              iconName='IconExactPayment'
              iconPosition='left'
              onClick={() => emitReceived(toReceivedText(checkout.total), 'exact')}
            >
              Pago exacto
            </Button>
          </div>
          {exact && (
            <span className={styles.exactHint} role='status'>
              Pago exacto activo. Se ajusta al total; edita el efectivo para salir de este modo.
            </span>
          )}
        </>
      )}
      <div className={styles.line}>
        <strong>Vuelto</strong>
        <output className={checkout.canSubmit ? styles.valid : undefined}>
          {checkout.kind === 'non-cash'
            ? 'No aplica'
            : checkout.kind === 'cash' && checkout.canSubmit
              ? moneyFormatter.format(checkout.change)
              : '—'}
        </output>
      </div>
      <div id={`${id}-status`} aria-live='polite' className={styles.status}>
        {checkout.missing > 0 ? `Faltan ${moneyFormatter.format(checkout.missing)}` : checkout.message}
      </div>
      {checkout.integrityDebug && (
        <details className={styles.diagnostics}>
          <summary>Ver diagnóstico financiero</summary>
          <p>Selecciona y copia el JSON para soporte. No contiene datos del cliente.</p>
          <textarea
            aria-label='Diagnóstico financiero del carrito'
            value={checkout.integrityDebug}
            readOnly
            rows={6}
            onFocus={event => event.currentTarget.select()}
          />
        </details>
      )}
    </section>
  )
}
