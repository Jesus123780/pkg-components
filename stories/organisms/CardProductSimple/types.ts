export interface CardProductSimpleProps {
  dataExtra?: Array<{ extraPrice: number, extraName: string }>
  dataOptional?: Array<{ ExtProductFoodsSubOptionalAll: Array<{ OptionalSubProName: string }> }>
  decrement?: boolean
  del?: boolean
  edit?: boolean
  fileInputRef?: any
  free?: boolean
  handleFree?: boolean
  height?: string | number
  increment?: boolean
  index?: number
  pId?: any
  pName?: string
  ProDescription?: any
  ProDescuento?: number | string
  ProImage?: string
  ProPrice?: any
  ProQuantity?: any
  sum?: boolean
  tag?: { tag: string }
  ValueDelivery?: number
  accept: string[]
  dispatch?: () => void
  handleDecrement?: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleDelete?: () => void
  handleFreeProducts?: () => void
  handleIncrement?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClick?: () => void
  onFileInputChange?: () => void
  onTargetClick?: () => void
  handleEdit?: () => void
}

export interface IButton {
  icon: string
  onClick: () => void
  className: string
}
