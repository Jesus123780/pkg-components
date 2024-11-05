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
  editable?: boolean
  hoverFree?: boolean
  editing: boolean
  render: React.ReactNode | null
  handleDecrement?: () => void
  handleComment?: () => void
  handleFreeProducts?: () => void
  handleIncrement?: () => void
  handleSuccessUpdateQuantity?: () => void
  handleCancelUpdateQuantity?: () => void
  handleChangeQuantity?: () => void
  handleToggleEditingStatus?: () => void
  handleGetSubItems?: () => void
}
