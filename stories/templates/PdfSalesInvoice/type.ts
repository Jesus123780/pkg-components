import { type ProductFood } from '../../pages/GenerateSales/types'

export interface InterfacePdfSalesInvoice {
  srcLogo: string
  addressStore: string
  storePhone: string | null
  date: string
  urlStore?: string
  client: Client
  ref: string
  products: ProductFood[]
  total: string
  change: string
  NitStore: string
  delivery: string
  storeName: string
}

export interface Client {
  clientName: string | null
  clientNumber: string | null
  ccClient: string | null
}
