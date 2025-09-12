import type { ProductFood } from '../../pages/GenerateSales/types'

export interface TypeModalDetailOrder {
  dataModal: DataModal
  dataStore: DataStore
  disabledPrint: boolean
  edit?: boolean
  isClient: boolean
  loading: boolean
  LoadingStatusOrder: boolean
  openAction: boolean
  pDatCre: PDatCre
  saleError?: boolean
  saleGroup?: boolean
  saleKey: any[]
  stateSale: number
  totalProductsPrice: number
  handleChangeState: () => void
  handleModalItem: (pId: string, ShoppingCardId: string) => void
  handleModalProductSale: () => void
  handleOpenActions: () => void
  handlePrint: () => void
  handleSale: () => void
  handleSaleGroup: () => void
  handleSaleKey: () => void
  onClose: () => void
  onPress: () => void
  setModalItem: (boolean: boolean) => void
}

export interface DataModal {
  __typename: string
  change?: string
  channel: number
  getAllPedidoStore: GetAllPedidoStore[]
  idStore: string
  locationUser: any
  payMethodPState: number
  pCodeRef: string
  pDatCre: string
  pDatMod: string
  pdpId: any
  pPRecoger: any
  pSState: number
  totalProductsPrice: number
}

export interface GetAllPedidoStore {
  __typename: string
  getAllShoppingCard: GetAllShoppingCard
  idStore: string
  payMethodPState: number
  pCodeRef: string
  pDatCre: string
  pDatMod: string
  pdpId: string
  pId: any
  pPRecoger: any
  pPStateP: number
  ShoppingCard: string
}

export interface GetAllShoppingCard {
  __typename: string
  cantProducts: number
  comments: string
  pId: string
  priceProducts: number
  productFood: ProductFood
  ShoppingCard: string
}

export interface DataStore {
  __typename: string
  addressStore: string
  banner: string
  cateStore: CateStore
  catStore: string
  change?: string
  cId: string
  city: City
  createdAt: string
  ctId: string
  deliveryTimeMinutes: number
  department: Department
  description: string
  dId: string
  documentIdentifier: string
  emailStore: string
  getStoreSchedules: GetStoreSchedule[]
  id: string
  idStore: string
  Image: any
  ImageName: any
  neighborhoodStore: string
  NitStore: string
  pais: Pais
  payMethodPState?: string
  scheduleOpenAll: boolean
  secVia: any
  siteWeb: string
  socialRaz: string
  storeName: string
  storeOwner: string
  storePhone: string
  typeContribute: string
  typeRegiments: string
  ULocation: string
  uPhoNum: string
  upLat: string
  upLon: string
  uState: string
  Viaprincipal: string
}

export interface Pais {
  __typename: string
  cCalCod: string
  createdAt: string
  updatedAt: string
  cId: string
  cName: string
  cState: number
}

export interface City {
  __typename: string
  ctId: string
  dId: string
  cName: string
  cState: number
  createdAt: string
  updatedAt: string
}

export interface Department {
  __typename: string
  dId: string
  cId: string
  dName: string
  dState: number
  dDatCre: string
  dDatMod: string
}

export interface GetStoreSchedule {
  __typename: string
  idStore: string
  schId: string
  id: string
  schDay: number
  schHoSta: string
  schHoEnd: string
  schState: number
}

export interface CateStore {
  __typename: string
  catStore: string
  cName: string
  cState: any
  createdAt: any
  updatedAt: any
  csDescription: any
}

export interface PDatCre {
  day: string
  fullDate: string
  hourMinutes12: string
  numberDay: number
  yearMonthDay: string
  hourMinutes24: string
  longDayName: string
  shortDayName: string
  month: string
  year: string
}
