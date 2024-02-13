import PropTypes from 'prop-types'
import {
  Text,
  View,
  Image
} from '@react-pdf/renderer'
import React from 'react'
import { styles } from './styles'
import { PdfContainer } from '../PdfContainer'

export const PdfSalesInvoice = ({ data, numberFormat = (number) => { return number } }) => {
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
  } = data || {}

  const {
    ccClient,
    clientName,
    clientNumber
  } = client || {}

  return (
    <PdfContainer>
      <View style={styles.section}>
        <View style={styles.row}>
          <Image src={srcLogo} style={styles.logo} />
          <Text style={styles.storeName}>{storeName}</Text>
        </View>
        <Text style={styles.address}>{addressStore}</Text>
        <Text style={styles.storePhone}>Teléfono: {storePhone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Factura de Venta</Text>
        <Text style={styles.subtitle}>Fecha: {date}</Text>
        <Text style={styles.subtitle}>NIT: {NitStore}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.clientInfo}>Nombre del Cliente: {clientName}</Text>
        <Text style={styles.clientInfo}>CC del Cliente: {ccClient}</Text>
        <Text style={styles.clientInfo}>Teléfono del Cliente: {clientNumber}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.tableHeader}>Productos</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Nombre</Text>
            <Text style={styles.tableCellHeader}>Cantidad</Text>
            <Text style={styles.tableCellHeader}>Precio Unitario</Text>
            <Text style={styles.tableCellHeader}>Total</Text>
          </View>
          {products?.map(product => {return (
            <View key={product.pId} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.pName}</Text>
              <Text style={styles.tableCell}>{product.ProQuantity}</Text>
              <Text style={styles.tableCell}>{numberFormat(product.unitPrice)}</Text>
              <Text style={styles.tableCell}>{numberFormat(product.ProPrice)}</Text>
            </View>
          )})}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.total}>Total: {total}</Text>
        {change && <Text style={styles.change}>Cambio: {change}</Text>}
      </View>

    </PdfContainer>
  )
}

PdfSalesInvoice.propTypes = {
  data: PropTypes.object,
  numberFormat: PropTypes.func
}
