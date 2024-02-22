export interface Root {
  __typename: string
  carProId: string
  pState: number
  ProImage: any
  idStore: string
  pName: string
  checked?: boolean
  totalCount: any
  ProDescription: string
  pDatCre: string
  pDatMod: string
  productFoodsAll: ProductFoodsAll[]
}

export interface ProductFoodsAll {
  __typename: string
  pId: string
  sizeId: any
  colorId: any
  carProId: string
  cId: any
  dId: any
  ctId: any
  idStore: string
  caId: any
  fId: any
  pName: string
  ProPrice: number
  ProDescuento: string
  ProUniDisponibles: any
  ProDescription: string
  ProProtegido: any
  ProAssurance: any
  ProImage: string
  ProStar: number
  ProWidth: any
  ProHeight: any
  ProLength: string
  ProWeight: string
  ProQuantity: any
  ProOutstanding: number
  ProDelivery: number
  ProVoltaje: any
  pState: number
  sTateLogistic: number
  pDatCre: string
  pDatMod: string
}
