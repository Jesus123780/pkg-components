import React from 'react'
import {
  Column,
  Row,
  Text
} from '../PDF'
import { View } from '@react-pdf/renderer'
import type { ProductFood } from '../../pages/GenerateSales/types'
import { styles } from './styles'

interface ListPDFProps {
  data: ProductFood[]
  numberFormat?: (number: number) => string
}

export const ListPDF: React.FC<ListPDFProps> = ({
  data = [],
  numberFormat = (number: number) => number.toFixed(2)
}) => {
  return (
    <View>
      {data?.map((product: ProductFood, index: number) => {
        const {
          pId,
          pName,
          ProPrice,
          ProQuantity,
          free,
          unitPrice,
          dataOptional,
          dataExtra
        } = product ?? {
          pId: '',
          pName: '',
          dataOptional: [],
          dataExtra: [],
          ProPrice: 0,
          ProQuantity: 0,
          free: false,
          unitPrice: 0
        }
        return (
          <Row key={pId} style={styles.item}>
            <Column style={[styles.column, styles.firstColumn, { flexBasis: '10%' }]}>
              <Text>{`${index + 1}`}</Text>
            </Column>
            <Column
              style={[styles.column, { flexBasis: '60%', alignItems: 'start' }]}
              title="container_info_client"
            >
              <Text style={styles.name}>
                {pName ?? ''}
              </Text>
              <Row style={styles.card_sub_items}>
                {dataExtra?.map((subItem, idx) => {
                  const subItemName = `${subItem?.quantity}x ${subItem?.extraName}`
                  const formattedPrice = `$ ${numberFormat(
                    subItem.newExtraPrice ?? 0
                  )}`
                  const isLastItem = idx === dataExtra.length - 1
                  return (
                    <Text style={{ fontSize: '6px' }} key={subItem.exPid}>
                      {` - ${subItemName} ${formattedPrice} ${
                        isLastItem ? '' : ', '
                      }`}
                    </Text>
                  )
                })}
                {Array.isArray(dataOptional) &&
                  dataOptional.length > 0 &&
                  ' - '}
                {dataOptional?.map((productItem, idx) => {
                  const subItems =
                    productItem?.ExtProductFoodsSubOptionalAll ?? []
                  const isLastItem = idx === dataOptional.length - 1
                  return subItems.map((subItem, index) => (
                    <Text key={index} style={{ fontSize: '6px' }}>
                      {`- ${subItem?.OptionalSubProName !== null
                        ? `1x ${subItem?.OptionalSubProName}`
                        : ''}${isLastItem ? '' : ', '}`}
                    </Text>
                  ))
                })}
              </Row>
            </Column>
            <Column
              style={[styles.column, styles.otherColumns, { flexBasis: '10%' }]}
            >
              <Text>{ProQuantity ?? ''}</Text>
            </Column>
            <Column
              style={[styles.column, styles.otherColumns, { flexBasis: '10%' }]}
            >
              <Text>
                {(free === true)
                  ? 'Gratis'
                  : `${numberFormat(unitPrice ?? 0)}`
                  }
              </Text>
            </Column>
            <Column
              style={[styles.column, styles.otherColumns, { flexBasis: '10%' }]}
            >
              <Text>{numberFormat(ProPrice as number)}</Text>
            </Column>
          </Row>
        )
      })}
    </View>
  )
}
