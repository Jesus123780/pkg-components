import React, { FC } from 'react'
import { Row, Text } from '../../atoms'
import styles from './DataDetail.module.css'
interface DataItem {
  [key: string]: string
}

interface DataDataDetailProps {
  data: DataItem[]
}

export const DataDetail: FC<DataDataDetailProps> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div className={styles['detail_info_client']} key={index}>
          {Object.entries(item).map(([key, value]) => (
            <Row key={key}>
              <Text
                size='md2'
                weight='semibold'
                styles={{ marginBottom: '10px' }}
              >
                <Row className={styles['wrap-text']}>
                  {key}: &nbsp; <Text size='md2'>{value}
                  </Text></Row>
              </Text>
            </Row>
          ))}
        </div>
      ))}
    </div>
  )
}
