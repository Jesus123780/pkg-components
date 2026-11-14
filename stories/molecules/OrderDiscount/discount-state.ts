export type DiscountType = 'PERCENT' | 'AMOUNT'
export const PREDEFINED_PERCENTS = [1, 2, 5, 10, 15] as const
export const isPredefinedPercent = (value: number): boolean =>
  (PREDEFINED_PERCENTS as readonly number[]).includes(value)

/** Only an actually applied, positive monetary discount is selected. */
export const resolveCommittedDiscount = (
  type: DiscountType | undefined,
  percent: number,
  amount: number,
  canApplyDiscount = true
) => {
  const validAmount = Number.isFinite(amount) && amount > 0
  const validPercent = Number.isFinite(percent) && percent > 0 && percent <= 100
  const mode: DiscountType = type === 'AMOUNT' ? 'AMOUNT' : type === 'PERCENT' || validPercent ? 'PERCENT' : 'AMOUNT'
  const active = canApplyDiscount && validAmount && (mode === 'AMOUNT' || validPercent)
  return { active, mode: active ? mode : 'PERCENT' as DiscountType, percent: active && mode === 'PERCENT' ? percent : 0, amount: active ? amount : 0 }
}

export const canCommitDiscount = (available: boolean, disabled: boolean, type: DiscountType, value: number): boolean =>
  available && !disabled && Number.isFinite(value) && value > 0 && Number.isInteger(value) && (type !== 'PERCENT' || value <= 100)

export const isValidPercentInput = (raw: string): boolean =>
  raw === '' || (/^\d{1,3}$/.test(raw) && Number(raw) <= 100)

export const normalizeAmount = (raw: number | undefined | null): string => {
  if (raw == null || !Number.isFinite(raw)) return ''
  const int = Math.max(0, Math.trunc(raw))
  return int > 0 ? String(int) : ''
}
