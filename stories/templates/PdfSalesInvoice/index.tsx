import { Text, View, Image } from '@react-pdf/renderer'
import React from 'react'
import { styles } from './styles'
import { PdfContainer } from '../PdfContainer'
import { type InterfacePdfSalesInvoice } from './type'

interface PdfSalesInvoiceProps {
  data: InterfacePdfSalesInvoice
  numberFormat?: (number: number) => string
}
export const PdfSalesInvoice: React.FC<PdfSalesInvoiceProps> = ({
  data,
  numberFormat = (number) => {
    return number
  }
}) => {
  const {
    date,
    products,
    total,
    client,
    change,
    storePhone,
    srcLogo,
    addressStore,
    storeName,
    NitStore
  } = data ?? {
    date: '',
    products: [],
    total: 1000,
    client: {
      ccClient: '',
      clientName: '',
      clientNumber: ''
    },
    change: 0,
    storePhone: '',
    srcLogo: '',
    addressStore: '',
    storeName: '',
    NitStore: ''
  }

  const { ccClient, clientName, clientNumber } = client ?? {
    ccClient: '',
    clientName: '',
    clientNumber: ''
  }

  return (
    <PdfContainer>
      <View style={styles.container}>
        <Text>Hola</Text>
      </View>
    </PdfContainer>
  )
}
