import React, { type ChangeEvent, useEffect, useState } from 'react'
import InputHooks from '../Inputs/InputHooks/InputHooks'
import { Button, Icon, Row, Text } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import { AmountInput } from '../Inputs/AmountInput'
import styles from './styles.module.css'
import { PredefinedPercentButton } from './components/PredefinedPercentButton'
import { canCommitDiscount, isPredefinedPercent, isValidPercentInput, normalizeAmount, PREDEFINED_PERCENTS, resolveCommittedDiscount, type DiscountType } from './discount-state'

export type { DiscountType } from './discount-state'
export interface OrderDiscountChange { type: DiscountType; value: number }
export interface OrderDiscountProps {
  onChange?: (payload: OrderDiscountChange) => void
  discountType?: DiscountType
  discountPercent?: number
  discountAmount?: number
  tabIndex?: number
  /** False when there is no eligible gross amount, not merely when net is zero. */
  canApplyDiscount?: boolean
  /** Temporary interaction lock during checkout; does not erase valid selection. */
  disabled?: boolean
}

export const OrderDiscount: React.FC<OrderDiscountProps> = ({
  onChange, discountType, discountPercent = 0, discountAmount = 0,
  tabIndex = 0, canApplyDiscount = true, disabled = false
}) => {
  const committed = resolveCommittedDiscount(discountType, discountPercent, discountAmount, canApplyDiscount)
  const locked = disabled || !canApplyDiscount
  const [percentInput, setPercentInput] = useState(() => committed.mode === 'PERCENT' && committed.active && !isPredefinedPercent(committed.percent) ? String(committed.percent) : '')
  const [valueInput, setValueInput] = useState(() => committed.mode === 'AMOUNT' && committed.active ? String(committed.amount) : '')
  const [editorReset, setEditorReset] = useState(0)

  // Restore confirmed values on external changes (pending orders, clearing the
  // cart, new discount). Draft input never determines the selected green button.
  useEffect(() => {
    const next = resolveCommittedDiscount(discountType, discountPercent, discountAmount, canApplyDiscount)
    setPercentInput(next.active && next.mode === 'PERCENT' && !isPredefinedPercent(next.percent) ? String(next.percent) : '')
    setValueInput(next.active && next.mode === 'AMOUNT' ? String(next.amount) : '')
    setEditorReset(previous => previous + 1)
  }, [discountType, discountPercent, discountAmount, canApplyDiscount])

  const clearDraft = () => {
    setPercentInput('')
    setValueInput('')
    setEditorReset(previous => previous + 1)
  }
  const commit = (type: DiscountType, value: number) => {
    if (!canCommitDiscount(canApplyDiscount, disabled, type, value) || !onChange) return
    // Suppress only already-confirmed requests, never a rejected attempt.
    if (committed.active && committed.mode === type && (type === 'PERCENT' ? committed.percent : committed.amount) === value) {
      clearDraft()
      return
    }
    clearDraft()
    onChange({ type, value })
  }
  const handleClean = () => {
    if (disabled || !onChange) return
    clearDraft()
    onChange({ type: 'PERCENT', value: 0 })
  }
  const handlePercentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (locked) return
    const raw = e.target.value.trim()
    if (!isValidPercentInput(raw)) return
    setPercentInput(raw)
    if (valueInput !== '') { setValueInput(''); setEditorReset(previous => previous + 1) }
  }
  const handleValueChange = (value: number | undefined) => {
    if (locked) return
    setValueInput(normalizeAmount(value))
    setPercentInput('')
  }
  const displayedDiscount = committed.mode === 'AMOUNT'
    ? `$${committed.amount.toLocaleString('es-CO')}`
    : `${committed.percent}%`
  const percentDraft = Number(percentInput)
  const amountDraft = Number(valueInput)
  const showRemove = committed.active || discountPercent > 0 || discountAmount > 0

  return (
    <div className={styles.wrapper}>
      <Row>
        <Text as='h4' size='2xl' weight='semibold'>Descuento</Text>
        <Icon icon='IconPromo' size={30} color={getGlobalStyle('--color-icons-primary')} />
      </Row>
      <Row className={styles.options}>
        {PREDEFINED_PERCENTS.map(p => (
          <PredefinedPercentButton key={p} percent={p}
            active={committed.active && committed.mode === 'PERCENT' && committed.percent === p}
            disabled={locked}
            onSelect={(value) => commit('PERCENT', value)} />
        ))}
      </Row>
      {!canApplyDiscount && <p className={styles.unavailable} role='status'>Agrega productos con un importe descontable para aplicar un descuento.</p>}
      {showRemove && <Button primary disabled={disabled} onClick={handleClean}>Eliminar descuento</Button>}
      <div className={styles.customWrapper}>
        <InputHooks type='text' title='Otro porcentaje (%), Ej: 25'
          disabled={locked} value={locked && !canApplyDiscount ? '' : percentInput}
          onChange={(e) => handlePercentChange(e as ChangeEvent<HTMLInputElement>)} tabIndex={tabIndex} />
      </div>
      {percentInput !== '' && (percentDraft !== committed.percent || !committed.active) && (
        <Button primary disabled={!canCommitDiscount(canApplyDiscount, disabled, 'PERCENT', percentDraft) && !(percentDraft === 0 && committed.active && !disabled)}
          onClick={() => { if (percentDraft === 0 && committed.active) handleClean(); else commit('PERCENT', percentDraft) }}>Aplicar porcentaje</Button>
      )}
      <div className={styles.customWrapper}>
        <AmountInput key={editorReset} type='text' label='Valor fijo ($), Ej: 10000'
          allowDecimals={false} decimalsLimit={0} allowNegativeValue={false}
          groupSeparator='.' prefix='$' placeholder='$ 0' disabled={locked}
          value={!canApplyDiscount ? '' : valueInput}
          onValueChange={(value) => handleValueChange(value != null ? Number(value) : undefined)} tabIndex={tabIndex + 1} />
      </div>
      <Row>
        <Text as='p' size='md'>Descuento actual: <strong aria-live='polite'>{displayedDiscount}</strong></Text>
        <Icon icon='IconPromo' size={20} color={getGlobalStyle('--color-icons-primary')} />
      </Row>
      {valueInput !== '' && (amountDraft !== committed.amount || committed.mode !== 'AMOUNT' || !committed.active) && (
        <Button primary disabled={!canCommitDiscount(canApplyDiscount, disabled, 'AMOUNT', amountDraft)} onClick={() => commit('AMOUNT', amountDraft)}>Agregar descuento</Button>
      )}
    </div>
  )
}
