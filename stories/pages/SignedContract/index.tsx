import React from 'react'
import {
  Button,
  Column,
  Image,
  Paragraph,
  Text
} from '../../atoms'
import styles from './SignedContract.module.css'
import ImageAsistan from '../../assets/public/Images/asistant.png'

export const SignedContract = () => {
  return (
    <div className={styles['container']}>
      <Column className={styles['col-1']}>
        <div className={styles['container_icon']}>
          <Text className={styles['title']} align='center' weight='semibold'>
          El contrato ha sido firmado
          </Text>
          <Text className={styles['title']} align='center' weight='semibold'>
          Se ha finalizado el proceso
          </Text>
        </div>
        <div className={styles['text-container']}>
          <Paragraph className={styles.description} styles={{ marginBottom: '30px' }}>
          Le hemos enviado al solicitante un correo electrónico con información importante.
          </Paragraph>
          <Paragraph className={styles.description} styles={{ width: '80%' }}>
          Allí encontrará detalle del crédito, copia del contrato y cotización firmada
          </Paragraph>
          <Column className={styles['container-button']}>
            <Button width='274px'>
              Salir
            </Button>
          </Column>
      </div>
      </Column>

      <Column className={styles['col-2']}>
        <Image src={ImageAsistan} alt='' width='100%' height='100%' />
      </Column>
    </div>
  )
}
