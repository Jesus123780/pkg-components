import React from 'react'
import { View, pdf } from '@react-pdf/renderer'
import { PdfContainer, PdfContainerDownload } from '../PdfContainer'
import { type InterfacePdfSalesInvoice } from './type'
import {
  Column,
  LogoPDF,
  Row,
  Text
} from '../PDF'
import { BGColor, PColor, SECColor } from '../../../assets'
import { styles } from './styles'
import { ListPDF } from './List'
import { saveAs } from 'file-saver'

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
    addressStore: '',
    storeName: '',
    NitStore: ''
  }
  console.log('🚀 ~ products:', products)

  const { ccClient, clientName, clientNumber } = client ?? {
    ccClient: '',
    clientName: '',
    clientNumber: ''
  }

  return (
    <PdfContainerDownload>
      <View style={styles.container}>
        <Row style={styles.header}>
          <Column style={styles.header_col} title="container_logo">
            <LogoPDF color={PColor} size={50} />
          </Column>
          <Column style={styles.header_col} title="container_info_app">
            <Text>{process.env.BUSINESS_TITLE ?? 'app'}</Text>
            <Text>Dirección: Carrera 11</Text>
            <Text>Nit: 10989874-12</Text>
          </Column>
          <Column style={styles.header_col} title="container_info_client_store">
            <Text>{process.env.BUSINESS_TITLE ?? storeName}</Text>
            <Text>{`Telefono: ${storePhone}`}</Text>
            <Text>{`Dirección: ${addressStore}`}</Text>
            <Text>{`Nit: ${NitStore}`}</Text>
            <Text># Referencia: </Text>
          </Column>
        </Row>
        <Row style={styles.info}>
          <Column
            style={[{ flexBasis: '50%' }, styles.centeredText]}
            title="container_info_client"
          >
            <Text style={{ color: BGColor }}>IMFORMACION DEL CLIENTE</Text>
          </Column>
          <Column style={[{ flexBasis: '50%' }, styles.centeredText]}>
            <Text style={{ color: BGColor }}>OBSERVACIONES</Text>
          </Column>
        </Row>
        <Row
          style={[{ borderRadius: 5, padding: 10 }, styles.bordered]}
          title="container_data"
        >
          <Column style={[{ flexBasis: '50%' }]}>
            <Text>{`Nombre: ${clientName}`}</Text>
            <Text>{`Cedula: ${ccClient}`}</Text>
            <Text>{`Telefono: ${clientNumber}`}</Text>
          </Column>
          <Column style={[{ flexBasis: '50%' }]}>
            <Text>{`Fecha: ${date}`}</Text>
            <Text>{`Cambio: ${change ?? 0}`}</Text>
          </Column>
        </Row>
        <Row style={{ backgroundColor: `${SECColor}69` }}>
          <Column style={[styles.column, styles.firstColumn]}>
            <Text>
              #
            </Text>
          </Column>
          <Column style={[styles.column, styles.otherColumns]}>
            <Text>Nombre</Text>
          </Column>
          <Column style={[styles.column, styles.otherColumns]}>
            <Text>Cantidad</Text>
          </Column>
          <Column style={[styles.column, styles.otherColumns]}>
            <Text>Precio Unitario</Text>
          </Column>
          <Column style={[styles.column, styles.otherColumns]}>
            <Text>Total</Text>
          </Column>
        </Row>
        <Column style={{ height: '80%' }} >
          <ListPDF data={products} />
        </Column>
        <Column style={{ alignItems: 'flex-end' }}>
          <Column style={styles.totalizer} >
            <Column>
              <Text style={{ fontSize: 15 }}>
              {`Iva: ${0}`}
              </Text>
            </Column>
            <Column>
              <Text style={{ fontSize: 15 }}>
                {`Total: $ ${total}`}
              </Text>
            </Column>
          </Column>
        </Column>
      </View>
    </PdfContainerDownload>
  )
}
interface PdfSalesInvoiceProps {
  data: InterfacePdfSalesInvoice
  titleFile?: string
  numberFormat?: (number: number) => string
}

export const generatePdfDocumentInvoice = async ({ data, titleFile = '' }: PdfSalesInvoiceProps) => {
  const blob = await pdf((
    <PdfSalesInvoice data={data} numberFormat={() => {
      return '1000'
    }} />
  )).toBlob()
  saveAs(blob, titleFile ?? '')
}
