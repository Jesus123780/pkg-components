interface ExtProductFood {
  __typename: string
  pId: string
  exPid: string
  exState: number
  extraName: string
  extraPrice: number
  state: number
  pDatCre: string
  pDatMod: string
  quantity: number
  newExtraPrice: number
}
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

interface ExtProductFoodOptional {
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
export interface MiniCardProductProps {
  __typename: string
  pId: string
  sizeId: string | null
  colorId: string | null
  cId: string | null
  withQuantity?: boolean
  openQuantity?: boolean
  dId: string | null
  ctId: string | null
  fId: string | null
  pName: string
  getOneTags: any | null
  ProPrice: number
  ProDescuento: string
  free: number
  ProUniDisponibles: any | null
  ProDescription: string
  ProProtegido: any | null
  ProAssurance: any | null
  ValueDelivery: any | null
  ProStar: number
  sTateLogistic: number
  ProImage: string
  ProWidth: any | null
  ProHeight: any | null
  ProLength: string
  ProWeight: string
  ProQuantity: any | null
  ProOutstanding: number
  pDatCre: string
  pDatMod: string
  ProDelivery: number
  ProVoltaje: any | null
  pState: number
  feat: any | null
  area: any | null
  comment: boolean
  edit: boolean
  onClick: () => void
  render: React.ReactNode | null
  tag: any | null
  dataExtra: ExtProductFood[]
  dataOptional: ExtProductFoodOptional[]
  handleDecrement?: () => void
  handleIncrement?: () => void
  handleGetSubItems?: () => void
}
