import { type ProductFood } from '../../pages/GenerateSales/types'

interface ExtProductFoodSubOptional {
  __typename: string
  pId: string
  opExPid: string | null
  idStore: string
  opSubExPid: string
  OptionalSubProName: string
  exCodeOptionExtra: string
  exCode: string
  state: number
  pDatCre: string
  pDatMod: string
  check: boolean
}

export interface ExtProductFoodOptional {
  __typename: string
  pId: string
  opExPid: string
  OptionalProName: string
  state: number
  code: string
  numbersOptionalOnly: number
  pDatCre: string
  required: number
  pDatMod: string
  ExtProductFoodsSubOptionalAll: ExtProductFoodSubOptional[]
}
export interface MiniCardProductProps extends ProductFood {
  withQuantity?: boolean
  showDot?: boolean
  openQuantity?: boolean
  manageStock?: boolean
  editable?: boolean
  stock?: number
  showInfo?: boolean
  hoverFree?: boolean
  editing?: boolean
  withStock?: boolean
  free?: boolean
  canDelete?: boolean
  render: React.ReactNode | null
  style?: React.CSSProperties & {
    quantity_container?: React.CSSProperties
  }
  handleDecrement?: () => void
  handleComment?: () => void
  handleDelete?: () => void
  handleFreeProducts?: () => void
  handleIncrement?: () => void
  handleSuccessUpdateQuantity?: () => void
  handleCancelUpdateQuantity?: () => void
  handleChangeQuantity?: (event: { target: { name: string, value: string | number } }) => void
  handleToggleEditingStatus?: () => void
  handleGetSubItems?: () => void
}
