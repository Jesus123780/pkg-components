import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react'
import InputHooks from '../Inputs/InputHooks/InputHooks'
import {
  Button,
  Icon,
  Row,
  Text
} from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import { AmountInput } from '../Inputs/AmountInput'
import styles from './styles.module.css'
import { PredefinedPercentButton } from './components/PredefinedPercentButton'

export type DiscountType = 'PERCENT' | 'AMOUNT'

enum DiscountTypes {
  PERCENT = 'PERCENT',
  AMOUNT = 'AMOUNT'
}

export interface OrderDiscountChange {
  type: DiscountType
  value: number
}

/**
 * Props for the OrderDiscount component.
 */
export interface OrderDiscountProps {
  /**
   * Fired every time the discount changes.
   */
  onChange?: (payload: OrderDiscountChange) => void

  /**
   * Initial percentage discount.
   */
  discountPercent?: number
  /**
   * Initial fixed discount amount.
   */
  discountAmount?: number
}



/**
 * OrderDiscount Component
 * - Memoized child components
 * - Stable callbacks
 * - Emits only when value actually changes
 *
 * NOTE: JSDoc is in English and validation is strict.
 */
export const OrderDiscount: React.FC<OrderDiscountProps> = ({
  onChange,
  discountPercent = 0,
  discountAmount = 0
}) => {
  const predefinedPercents = useMemo(() => [1, 2, 5, 10, 15], [])
  const [mode, setMode] = useState<DiscountType>(
    discountAmount > 0 ? DiscountTypes.AMOUNT : DiscountTypes.PERCENT
  )
  const [percent, setPercent] = useState<number>(discountPercent)
  const [percentInput, setPercentInput] = useState<string>(
    discountPercent > 0 ? String(discountPercent) : ''
  )
  const [valueInput, setValueInput] = useState<string>(
    discountAmount > 0 ? String(discountAmount) : ''
  )

  // avoid emitting identical payloads repeatedly
  const lastEmitRef = useRef<OrderDiscountChange | null>(null)

  const safeEmit = useCallback((payload: OrderDiscountChange) => {
    const last = lastEmitRef.current
    if (last && last.type === payload.type && last.value === payload.value) return
    lastEmitRef.current = payload
    onChange?.(payload)
  }, [onChange])

  /**
   * Validate percent string: allow empty or integer 0-100 up to 3 digits.
   */
  const isValidPercentInput = (raw: string) => {
    return raw === '' || (/^\d{1,3}$/.test(raw) && Number(raw) >= 0 && Number(raw) <= 100)
  }

  /**
   * Validate amount input: digits only (no separators)
   */
  const isValidAmountInput = (raw: string) => {
    return raw === '' || /^\d*$/.test(raw)
  }

  const handleSelectPercent = useCallback((value: number) => {
    setMode(DiscountTypes.PERCENT)
    setPercent(value)
    setPercentInput(String(value))
    setValueInput('')
    safeEmit({ type: DiscountTypes.PERCENT, value })
  }, [safeEmit])

  const handlePercentChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim()
    if (!isValidPercentInput(raw)) return

    setMode(DiscountTypes.PERCENT)
    setPercentInput(raw)
    setValueInput('')

    if (raw === '') {
      setPercent(0)
      safeEmit({ type: DiscountTypes.PERCENT, value: 0 })
      return
    }

    const num = Number(raw)
    setPercent(num)
    safeEmit({ type: DiscountTypes.PERCENT, value: num })
  }, [safeEmit])

  const handleValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim()
    if (!isValidAmountInput(raw)) return

    setMode(DiscountTypes.AMOUNT)
    setValueInput(raw)
    setPercent(0)
    setPercentInput('')

    if (raw === '') {
      safeEmit({ type: DiscountTypes.AMOUNT, value: 0 })
      return
    }

    const num = Number(raw)
    // guard negative or NaN
    if (Number.isNaN(num) || num < 0) {
      safeEmit({ type: DiscountTypes.AMOUNT, value: 0 })
      return
    }

    safeEmit({ type: DiscountTypes.AMOUNT, value: num })
  }, [safeEmit])

  const handleClean = useCallback(() => {
    setMode(DiscountTypes.PERCENT)
    setPercent(0)
    setPercentInput('')
    setValueInput('')
    safeEmit({ type: DiscountTypes.PERCENT, value: 0 })
  }, [safeEmit])

  const displayedDiscount = useMemo(() => {
    if (mode === DiscountTypes.PERCENT) return `${percent}%`
    const amount = Number(valueInput || 0)
    return `$${amount.toLocaleString('es-CO')}`
  }, [mode, percent, valueInput])

  const handleAddAmount = useCallback(() => {
    const num = Number(valueInput || 0)
    if (Number.isNaN(num) || num < 0) return
    safeEmit({ type: DiscountTypes.AMOUNT, value: num })
  }, [valueInput, safeEmit])

  return (
    <div className={styles.wrapper}>
      <Row>
        <Text
          as='h4'
          size='2xl'
          weight='semibold'
        >
          Descuento
        </Text>
        <Icon
          icon='IconPromo'
          size={30}
          color={getGlobalStyle('--color-icons-primary')}
        />
      </Row>

      <Row className={styles.options}>
        {predefinedPercents.map((p) => (
          <PredefinedPercentButton
            key={p}
            percent={p}
            active={mode === DiscountTypes.PERCENT && percent === p}
            onSelect={handleSelectPercent}
          />
        ))}
      </Row>

      {!(discountPercent > 0 || discountAmount > 0) && (
        <Button primary onClick={handleClean}>
          Eliminar descuento
        </Button>
      )}

      <div className={styles.customWrapper}>
        <InputHooks
          type='text'
          title='Otro porcentaje (%), Ej: 25'
          value={percentInput}
          onChange={(e) => handlePercentChange(e as ChangeEvent<HTMLInputElement>)}
        />
      </div>

      <div className={styles.customWrapper}>
        <AmountInput
          type='text'
          label='Valor fijo ($), Ej: 10000'
          value={valueInput}
          defaultValue={discountAmount}
          onChange={handleValueChange}
        />
      </div>

      <Text as='p' size='md'>
        Descuento actual:{' '}
        <strong>{displayedDiscount}</strong>
      </Text>

      {valueInput !== '' && (
        <Button primary onClick={handleAddAmount}>
          Agregar descuento
        </Button>
      )}
    </div>
  )
}
