import type { Dispatch, SetStateAction } from 'react'
import type { ProductFood } from '../../pages/GenerateSales/types'

export interface TypeModalDetailOrder {
  dataModal: DataModal
  dataStore: DataStore
  disabledPrint: boolean
  loading: boolean
  openAction: boolean
  saleError?: boolean
  pDatCre: PDatCre
  saleGroup?: boolean
  LoadingStatusOrder: boolean
  edit?: boolean
  isClient: boolean
  saleKey: any[]
  totalProductsPrice: string
  handleModalItem: (pId: string, ShoppingCardId: string) => void
  handlePrint: () => void
  handleSale: () => void
  handleModalProductSale: () => void
  handleSaleGroup: () => void
  handleSaleKey: () => void
  handleOpenActions: () => void
  setModalItem: (boolean: boolean) => void
  onClose: () => void
  onPress: () => void
  HandleChangeState: () => void
  setStateSale: Dispatch<SetStateAction<string>>
  stateSale: string | null
}

export interface DataModal {
  __typename: string
  pdpId: any
  idStore: string
  pCodeRef: string
  payMethodPState: number
  pPRecoger: any
  change?: string
  totalProductsPrice: number
  pSState: number
  pDatCre: string
  channel: number
  locationUser: any
  pDatMod: string
  getAllPedidoStore: GetAllPedidoStore[]
}

export interface GetAllPedidoStore {
  __typename: string
  pdpId: string
  pId: any
  idStore: string
  ShoppingCard: string
  pCodeRef: string
  pPStateP: number
  payMethodPState: number
  pPRecoger: any
  pDatCre: string
  pDatMod: string
  getAllShoppingCard: GetAllShoppingCard
}

export interface GetAllShoppingCard {
  __typename: string
  ShoppingCard: string
  comments: string
  cantProducts: number
  pId: string
  productFood: ProductFood
  priceProducts: number
}

export interface DataStore {
  __typename: string
  cId: string
  id: string
  deliveryTimeMinutes: number
  scheduleOpenAll: boolean
  dId: string
  idStore: string
  ctId: string
  change?: string
  payMethodPState?: string
  neighborhoodStore: string
  Viaprincipal: string
  catStore: string
  storeOwner: string
  storeName: string
  ImageName: any
  emailStore: string
  storePhone: string
  socialRaz: string
  Image: any
  banner: string
  documentIdentifier: string
  uPhoNum: string
  ULocation: string
  upLat: string
  upLon: string
  uState: string
  siteWeb: string
  description: string
  createdAt: string
  secVia: any
  NitStore: string
  typeRegiments: string
  typeContribute: string
  addressStore: string
  pais: Pais
  city: City
  department: Department
  getStoreSchedules: GetStoreSchedule[]
  cateStore: CateStore
}

export interface Pais {
  __typename: string
  cId: string
  cName: string
  cCalCod: string
  cState: number
  cDatCre: string
  cDatMod: string
}

export interface City {
  __typename: string
  ctId: string
  dId: string
  cName: string
  cState: number
  cDatCre: string
  cDatMod: string
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
  cDatCre: any
  cDatMod: any
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
