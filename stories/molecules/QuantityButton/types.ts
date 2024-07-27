export interface QuantityButtonProps {
  border: string
  classNameQuantity: string
  disabled?: boolean
  label?: string
  margin: any
  padding: any
  quantity: number
  showNegativeButton?: boolean
  showPositiveButton?: boolean
  validationOne?: boolean
  validationZero?: boolean
  width?: string
  handleDecrement?: () => void
  handleIncrement?: () => void
}
