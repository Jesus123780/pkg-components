export interface ProductFood {
  __typename: string
  pId: string
  sizeId: string | null
  colorId: string | null
  cId: string | null
  dId: string | null
  ctId: string | null
  fId: string | null
  pName: string
  ProPrice: number
  ProDescuento: string
  free: number
  ProUniDisponibles: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProDescription: string
  ProProtegido: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProAssurance: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ValueDelivery: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProStar: number
  sTateLogistic: number
  ProImage: string
  ProWidth: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProHeight: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProLength: string
  ProWeight: string
  ProQuantity: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProOutstanding: number
  pDatCre: string
  pDatMod: string
  ProDelivery: number
  ProVoltaje: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  pState: number
  feat: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  area: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  comment: boolean
  edit: boolean
  onClick: () => void
  render: string
  tag: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  getOneTags: {
    nameTag: string
  }
}

export interface Product {
  pId: string
  pName: string
  unitPrice: number
  ProDescription: string
  ProImage: string
  ProPrice: number
  ProQuantity: number
  free: boolean
  ProDescuento: string
  ValueDelivery: string
  getOneTags: {
    nameTag: string
  } | null
}

interface ExtProductFoodSubOptional {
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

export interface Data {
  PRODUCT: Product[]
  totalPrice: number
  sortBy: null
  itemsInCart: number
  animateType: string
  startAnimateUp: string
  priceRange: number
  counter: number
  totalAmount: number
  payMethodPState: number
  dataOptional?: ExtProductFoodOptional[]
  dataExtra?: ExtProductFood[]
}
