import React from 'react'
import {
  Button,
  Column,
  Image,
  Row,
  Text
} from '../../atoms'
import { CreditMobilLayout } from '../../Layout/CreditMobilLayout'
import { DataDetail } from './ListDetail'
import { deviceInfo, imagesArray } from './helpers/index'
import { Card } from './Card'
import { Carousel } from '../../molecules/Slider'
import phone from '../../assets/public/Images/Phone.png'
import styles from './CreditApplication.module.css'

export const CreditApplicationData = () => {
  const data: { [key: string]: string }[] = [
    {
      Solicitante: 'Pedro José López Ramírez',
      'Número de cédula': 'E-000-00000',
      'Estado del crédito': 'Pendiente de pago',
      'Fecha de aprobación:': '30 de Octubre de 2023',
      'Valor aprobado': '$129.99',
    },
  ]

  return (
    <CreditMobilLayout>
      <div className={styles['container']}>
        <div className={styles['col-1']}>
          <Column>
            <div className={styles['content_carrusel']}>
              <Carousel>
                {imagesArray.map((image, index) => (
                  <Column
                    key={image.id}
                    className={index > 0 ? styles['contain_carrusel'] : ''}
                  >
                    <Image src={phone} alt='' width='80%' height='80%' />
                  </Column>
                ))}
              </Carousel>
            </div>
            <div className={styles['content_text']}>
              <Text
                className={styles['title']}
                size='3xl'
                lineHeight='xl'
                styles={{ margin: '0 0 10px 0' }}
              >
                Redmi Note S11 6GB 128GB gris grafito Xiaomi
              </Text>
              <Text className={styles['model']}>I034-000227</Text>
              <ul>
                {deviceInfo.map((info) => (
                  <li key={info.id}>
                    <Text as='li' className={styles['list_description']}>
                      {`${info.title}: ${info.value}`}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
            <Card />
          </Column>
        </div>
        <div className={styles['col-2']}>
          <Text customSize='4.0625rem' weight='medium' color='blue' styles={{ marginBottom: '1.5rem' }}>
            Solicitud de crédito
          </Text>
          <Column className={styles['content_status']}>
            <Row className={styles['content_status_text']}>
              <Text font='regular' color='white'>
                Calificación aprobada
              </Text>
              <Text font='regular' color='white' align='end'>
                Valida hasta 04 de Noviembre de 2023
              </Text>
            </Row>
          </Column>
          <DataDetail data={data} />
          <Column className={styles['container_button']}>
              <Button styles={{ width: '162px', marginBottom: '40px' }} padding='15px 30px' primary>
                Registrar equipo
              </Button>
              <Button styles={{ width: '162px' }} padding='15px 30px' primary>
                Firmar contrato
              </Button>
          </Column>
        </div>
      </div>
    </CreditMobilLayout>
  )
}
