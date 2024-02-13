import React from 'react'
import {
  Column,
  Row,
  Text
} from '../../../../atoms'
import { PaymentInfoProps } from './helpers'

interface IPaymentInfoProps {
  paymentInfo?: PaymentInfoProps[]
}

export const PaymentInfo: React.FC<IPaymentInfoProps> = ({ paymentInfo = [] }) => (
    <div>
      {paymentInfo.map((item, index) => (
        <Row key={index}>
          {item.columns.map((column, colIndex) => {
            console.log(column)
            return (
            <Column key={colIndex}>
              {column.texts.map((text, textIndex) => (
                <Text
                  key={textIndex}
                  weight={text.weight}
                  size={text.size}
                  lineHeight={text.lineHeight}
                 >
                  {text.content}
                </Text>
              ))}
            </Column>
          )})}
        </Row>
      ))}
    </div>
  );
