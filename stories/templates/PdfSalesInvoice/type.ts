import { type ProductFood } from '../../pages/GenerateSales/types'

export interface InterfacePdfSalesInvoice {
  srcLogo: string
  addressStore: string
  storePhone: string
  date: string
  client: Client
  ref: string
  products: ProductFood[]
  total: string
  change: string
  NitStore: string
  storeName: string
}

export interface Client {
  clientName: string
  clientNumber: string
  ccClient: string
}
