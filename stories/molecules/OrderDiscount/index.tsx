import React, { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

const PREDEFINED_PERCENTS = [1, 2, 5, 10, 15]

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
   * Active discount type coming from the global sales state. This is the single
   * source of truth to decide whether the panel shows the PERCENT or the AMOUNT
   * selection. It MUST be used instead of inferring the mode from
   * `discountAmount`, because a PERCENT discount also produces a positive
   * `discountAmount` (the money actually discounted).
   */
  discountType?: DiscountType
  /**
   * Initial percentage discount.
   */
  discountPercent?: number
  /**
   * Initial fixed discount amount.
   */
  discountAmount?: number
  tabIndex?: number
}

/**
 * Resolve the active mode from the props provided by the global sales state.
 *
 * Priority:
 *  1. Explicit `discountType` (authoritative — set by the reducer).
 *  2. Fallback heuristic for legacy callers that don't pass `discountType`:
 *     only treat it as AMOUNT when there is an amount but no percent.
 */
const resolveMode = (
  discountType: DiscountType | undefined,
  discountPercent: number,
  discountAmount: number
): DiscountType => {
  if (discountType === DiscountTypes.AMOUNT) return DiscountTypes.AMOUNT
  if (discountType === DiscountTypes.PERCENT) return DiscountTypes.PERCENT
  // Legacy fallback: percent wins when present, so a predefined button that was
  // selected keeps its highlight even though a money amount was also stored.
  if (discountPercent > 0) return DiscountTypes.PERCENT
  if (discountAmount > 0) return DiscountTypes.AMOUNT
  return DiscountTypes.PERCENT
}

/**
 * OrderDiscount Component
 * - Memoized child components
 * - Stable callbacks
 * - Emits only when value actually changes
 * - Restores its full visual state from props (global sales state) so it never
 *   loses the active selection when the lateral panel is closed and reopened.
 *
 * NOTE: JSDoc is in English and validation is strict.
 */
export const OrderDiscount: React.FC<OrderDiscountProps> = ({
  onChange,
  discountType,
  discountPercent = 0,
  discountAmount = 0,
  tabIndex = 0
}) => {
  const getInternalTabIndex = (
    offset = 0
  ): number | undefined => {
    return tabIndex === undefined
      ? undefined
      : tabIndex + offset
  }

  const predefinedPercents = useMemo(() => PREDEFINED_PERCENTS, [])

  const initialMode = resolveMode(discountType, discountPercent, discountAmount)
  const [mode, setMode] = useState<DiscountType>(initialMode)
  const [percent, setPercent] = useState<number>(
    initialMode === DiscountTypes.PERCENT ? discountPercent : 0
  )
  // If the active percentage matches a predefined button, the input field stays
  // empty — the active button is the visual indicator, not the text field.
  const [percentInput, setPercentInput] = useState<string>(() => {
    if (initialMode !== DiscountTypes.PERCENT || discountPercent <= 0) return ''
    return PREDEFINED_PERCENTS.includes(discountPercent) ? '' : String(discountPercent)
  })
  const [valueInput, setValueInput] = useState<string>(
    initialMode === DiscountTypes.AMOUNT && discountAmount > 0 ? String(discountAmount) : ''
  )

  // avoid emitting identical payloads repeatedly
  const lastEmitRef = useRef<OrderDiscountChange | null>(null)

  // Keep the local display state in sync with the global sales state. The
  // lateral panel unmounts this component when it closes, so on every remount
  // (and on any external change, e.g. retrieving a pending order) we rebuild
  // the visual state from the authoritative props. This is what guarantees the
  // discount selection (predefined button check, typed values) is never lost
  // when the panel is closed and reopened.
  useEffect(() => {
    const nextMode = resolveMode(discountType, discountPercent, discountAmount)

    if (discountPercent === 0 && discountAmount === 0) {
      // Parent cleared everything (e.g. REMOVE_ALL_PRODUCTS / no discount).
      setMode(DiscountTypes.PERCENT)
      setPercent(0)
      setPercentInput('')
      setValueInput('')
      lastEmitRef.current = null
      return
    }

    setMode(nextMode)

    if (nextMode === DiscountTypes.PERCENT) {
      setPercent(discountPercent)
      setPercentInput(
        discountPercent > 0 && !PREDEFINED_PERCENTS.includes(discountPercent)
          ? String(discountPercent)
          : ''
      )
      setValueInput('')
    } else {
      setPercent(0)
      setPercentInput('')
      setValueInput(discountAmount > 0 ? String(discountAmount) : '')
    }
    // Reflect the committed value so we don't immediately re-emit it.
    lastEmitRef.current = nextMode === DiscountTypes.PERCENT
      ? { type: DiscountTypes.PERCENT, value: discountPercent }
      : { type: DiscountTypes.AMOUNT, value: discountAmount }
  }, [discountType, discountPercent, discountAmount])

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
   * Fixed-amount discounts are whole pesos only. The POS operates in Colombian
   * pesos WITHOUT cents and the backend `DiscountInput.value` is an integer, so
   * we never keep decimals here (a "50,20" entry would be truncated downstream
   * and desync the UI from what is actually charged/accounted). We normalize to
   * a non-negative integer.
   */
  const normalizeAmount = (raw: number | undefined | null): string => {
    if (raw == null || !Number.isFinite(raw)) return ''
    const int = Math.max(0, Math.trunc(raw))
    return int > 0 ? String(int) : ''
  }

  const handleSelectPercent = useCallback((value: number) => {
    setMode(DiscountTypes.PERCENT)
    setPercent(value)
    // Keep the manual text field clear — the active button is the visual indicator
    setPercentInput('')
    setValueInput('')
    safeEmit({ type: DiscountTypes.PERCENT, value })
  }, [safeEmit])

  const handlePercentChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim()
    if (!isValidPercentInput(raw)) return

    setMode(DiscountTypes.PERCENT)
    setPercentInput(raw)
    setValueInput('')
    setPercent(raw === '' ? 0 : Number(raw))
    // No emit here — the user must click "Aplicar porcentaje" to commit
  }, [])

  /**
   * Receives the already-parsed numeric value from AmountInput's onValueChange
   * (not the raw string event), so grouping separators and formatting are
   * handled by the input and we only deal with a clean number. We store the
   * integer part (whole pesos).
   */
  const handleValueChange = useCallback((value: number | undefined) => {
    setMode(DiscountTypes.AMOUNT)
    setValueInput(normalizeAmount(value))
    setPercent(0)
    setPercentInput('')
    // No emit here — the user must click "Agregar descuento" to commit
  }, [])

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

  const handleApplyPercent = useCallback(() => {
    const num = Number(percentInput || 0)
    if (Number.isNaN(num) || num < 0 || num > 100) return
    safeEmit({ type: DiscountTypes.PERCENT, value: num })
  }, [percentInput, safeEmit])

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

      {(discountPercent > 0 || discountAmount > 0) && (
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
          tabIndex={getInternalTabIndex(0)}
        />
      </div>

      {percentInput !== '' && !predefinedPercents.includes(Number(percentInput)) && (
        <Button primary onClick={handleApplyPercent}>
          Aplicar porcentaje
        </Button>
      )}

      <div className={styles.customWrapper}>
        <AmountInput
          type='text'
          label='Valor fijo ($), Ej: 10000'
          // Whole pesos only: the POS has no cents and the backend expects an
          // integer discount, so decimals are disabled by design.
          allowDecimals={false}
          decimalsLimit={0}
          allowNegativeValue={false}
          groupSeparator='.'
          prefix='$'
          placeholder='$ 0'
          value={valueInput !== '' ? valueInput : undefined}
          defaultValue={discountAmount > 0 ? discountAmount : undefined}
          onValueChange={(value) => handleValueChange(value != null ? Number(value) : undefined)}
          tabIndex={getInternalTabIndex(1)}
        />
      </div>

      <Row>
        <Text as='p' size='md'>
          Descuento actual:{' '}
          <strong>{displayedDiscount}</strong>
        </Text>
        <Icon icon='IconPromo' size={20} color={getGlobalStyle('--color-icons-primary')} />
      </Row>

      {valueInput !== '' && (
        <Button primary onClick={handleAddAmount}>
          Agregar descuento
        </Button>
      )}
    </div>
  )
}
