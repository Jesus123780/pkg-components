import React from 'react'
import {
    Button,
    Column,
    Row,
    Text
} from '../../../atoms'
import styles from './Scan.module.css'

export const Scan = () => {
  return (
    <Column className={styles['container_scan']}>
      <Row>
        <Text weight='extrabold' customSize='1.5625rem'>
          Escanea el código IMEI
        </Text>
        <Button
            width='207px'
            padding='20px 35px'
            primary
        >
          Escanear aquí
        </Button>
      </Row>
    </Column>
  )
}
