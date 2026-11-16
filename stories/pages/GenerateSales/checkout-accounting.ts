export interface CheckoutAccounting {
  gross: number
  discount: number
  net: number
}

export type CheckoutActionTarget = 'payment' | 'cash-session' | 'delivery' | 'cash-received' | 'confirmation' | 'recovery' | 'discount'
export interface CheckoutAction {
  target: CheckoutActionTarget
  label: string
  message: string
}

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', minimumFractionDigits: 2, maximumFractionDigits: 2
})
export const formatCheckoutMoney = (value: number): string => Number.isFinite(value) ? formatter.format(value) : '—'
