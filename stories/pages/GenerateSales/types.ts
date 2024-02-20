import type { ExtProductFoodOptional } from '../../organisms/MiniCardProduct/type'

export interface ProductFood {
  __typename: string
  pId: string
  sizeId: string | null
  colorId: string | null
  cId: string | null
  dId: string | null
  ctId: string | null
  unitPrice?: number | undefined
  fId: string | null
  pName: string
  ProPrice: number
  ProDescuento: string
  free?: boolean
  ProUniDisponibles: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProDescription: string
  ProProtegido: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProAssurance: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ValueDelivery: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProStar: number
  sTateLogistic?: number
  ProImage: string
  ProWidth?: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProHeight?: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProLength?: string
  ProWeight?: string
  ProQuantity?: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  ProOutstanding?: number
  pDatCre?: string
  pDatMod?: string
  ProDelivery?: number
  ProVoltaje?: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  pState?: number
  feat?: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  area?: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  comment: boolean
  edit: boolean
  onClick: () => void
  render: React.ReactNode | null
  tag: any | null // Reemplaza 'any' por el tipo correcto si es conocido
  getOneTags: {
    nameTag: string
  }
  dataExtra?: ExtProductFood[]
  dataOptional?: ExtProductFoodOptional[]

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
  PRODUCT: ProductFood[]
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
