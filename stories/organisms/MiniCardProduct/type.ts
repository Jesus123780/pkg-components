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
  handleDecrement?: () => void
  handleIncrement?: () => void
}
