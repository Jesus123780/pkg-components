import React from 'react'
import { Column, Row } from '../../../atoms'
import styles from './Imei.module.css'
import { Input } from '../../../molecules/Inputs/Input'

interface ImeiProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const Imei = ({ onChange }: ImeiProps) => {
  return (
    <Column className={styles['container_imei']}>
    <Row>
      <Input onChange={onChange} placeholder="Ingresa aquí" labelButton='Registrar' />
    </Row>
  </Column>
  )
}
