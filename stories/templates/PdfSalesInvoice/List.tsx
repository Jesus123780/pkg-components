import React from 'react'
import { styles } from './styles'
import { Column, Row, Text } from '../PDF'
import { View } from '@react-pdf/renderer'
import type { ProductFood } from '../../pages/GenerateSales/types'

interface ListPDFProps {
  data: ProductFood[]
}
export const ListPDF: React.FC<ListPDFProps> = ({ data = [] }) => {
  return (
    <View>
      {data?.map((product: ProductFood, index: number) => {
        const { pId, pName, ProPrice, ProQuantity, free, unitPrice } =
          product ?? {
            pId: '',
            pName: '',
            ProPrice: 0,
            ProQuantity: 0,
            free: false,
            unitPrice: 0
          }
        return (
          <Row key={pId}>
            <Column style={[styles.column, styles.firstColumn]}>
              <Text>{`# ${index + 1}`}</Text>
            </Column>
            <Column
              style={[{ flexBasis: '40%' }, styles.column]}
              title="container_info_client"
            >
              <Text>{pName ?? '' }</Text>
            </Column>
            <Column
              style={[{ flexBasis: '10%' }, styles.column, styles.otherColumns]}
            >
              <Text>{ProQuantity ?? '' }</Text>
            </Column>
            <Column
              style={[{ flexBasis: '10%' }, styles.column, styles.otherColumns]}
            >
              <Text>{free ? 'Gratis' : (unitPrice ?? '') }</Text>
            </Column>
            <Column
              style={[{ flexBasis: '10%' }, styles.column, styles.otherColumns]}
            >
              <Text>{ProPrice ?? '' }</Text>
            </Column>
          </Row>
        )
      })}
    </View>
  )
}
