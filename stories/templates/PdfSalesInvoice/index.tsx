import React from 'react'
import {
  Image,
  View,
  pdf
} from '@react-pdf/renderer'
import { PdfContainerDownload } from '../PdfContainer'
import { type InterfacePdfSalesInvoice } from './type'
import {
  Column,
  LogoPDF,
  Row,
  Text
} from '../PDF'
import {
  BGColor,
  PColor,
  SECColor
} from '../../../assets'
import { styles } from './styles'
import { ListPDF } from './List'
import { saveAs } from 'file-saver'
import { generateQRCodeImage } from './helpers'

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
    urlStore,
    change,
    storePhone,
    ref,
    addressStore,
    delivery,
    storeName,
    NitStore
  } = data ?? {
    date: '',
    urlStore: '',
    delivery: '',
    products: [],
    total: 0,
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

  const {
    ccClient,
    clientName,
    clientNumber
  } = client ?? {
    ccClient: null,
    clientName: null,
    clientNumber: null
  }
  console.log(clientNumber)
  const qrDataURL = generateQRCodeImage(urlStore)

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
            <Text>{`Telefono: ${storePhone ?? '(___ _______)'}`}</Text>
            <Text>{`Dirección: ${addressStore}`}</Text>
            <Text>{`Nit: ${NitStore}`}</Text>
            <Text>{`# Referencia: ${ref}`}</Text>
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
            <Text>{`Nombre: ${clientName ?? '____________'}`}</Text>
            <Text>{`Cedula: ${ccClient ?? '(____________)'}`}</Text>
            <Text>{`Telefono: ${clientNumber === '' ? '(___ _______)' : clientNumber}`}</Text>
          </Column>
          <Column style={[{ flexBasis: '50%' }]}>
            <Text>{`Fecha: ${date}`}</Text>
            <Text>{`Cambio: ${change ?? 0}`}</Text>
            <Text>{`Costo de domicilio: ${delivery ?? 0}`}</Text>
          </Column>
        </Row>
        <Row style={{ backgroundColor: `${SECColor}22`, height: '20px', alignItems: 'center' }}>
          <Column
            style={[styles.column, styles.firstColumn, { flexBasis: '10%' }]}
          >
            <Text># 0</Text>
          </Column>
          <Column
            style={[styles.column, styles.otherColumns, { flexBasis: '60%' }]}
          >
            <Text>Nombre</Text>
          </Column>
          <Column
            style={[styles.column, styles.otherColumns, { flexBasis: '10%' }]}
          >
            <Text>Cantidad</Text>
          </Column>
          <Column
            style={[styles.column, styles.otherColumns, { flexBasis: '10%' }]}
          >
            <Text>Precio Unitario</Text>
          </Column>
          <Column
            style={[styles.column, styles.otherColumns, { flexBasis: '10%' }]}
          >
            <Text>Total</Text>
          </Column>
        </Row>
        <Column>
          <ListPDF data={products} numberFormat={numberFormat} />
        </Column>
        <Column style={{ alignItems: 'flex-end' }}>
          <Column style={styles.totalizer}>
            <Column>
              <Text style={{ fontSize: 15 }}>{`Total: $ ${total}`}</Text>
            </Column>
          </Column>
            <Image src={qrDataURL} style={styles.qrImage} />
        </Column>
      </View>
    </PdfContainerDownload>
  )
}
interface PdfSalesInvoiceProps {
  data: InterfacePdfSalesInvoice
  titleFile: string
  numberFormat?: (number: number) => string
}

export const generatePdfDocumentInvoice = async ({
  data,
  titleFile = '',
  numberFormat
}: PdfSalesInvoiceProps) => {
  const blob = await pdf(
    <PdfSalesInvoice data={data} numberFormat={numberFormat} />
  ).toBlob()
  saveAs(blob, titleFile ?? '')
}
