import React from 'react'
import { Icon } from '../../atoms/Icon'
import {
  Column,
  Image,
  Paragraph,
  Row,
  Text
} from '../../atoms'
import styles from './Home.module.css'
import ImageAsistan from '../../assets/public/Images/asistant.png'
import ImageHand from '../../assets/public/Images/asistant_hand.png'

export const Home = () => {
  return (
    <div className={styles['container']}>
      <Column className={styles['col-1']}>
        <div className={styles['container_icon']}>
          <Icon icon='LogoCMF' />
        </div>
        <div className={styles['text-container']}>

        <Text className={styles['start-title']}>IMPORTANTE:</Text>
        <Row className={styles['row-1']}>
          <Icon icon='IconQrCode' size={68} />
          <Paragraph className={styles.description}>
            Acerca el código QR del cliente al lector para ser registrado
          </Paragraph>
        </Row>
      </div>
      </Column>

      <Column className={styles['col-2']}>
        <Image src={ImageAsistan} alt='' width='100%' height='100%' />
        <div className={styles['col-2_lateral-column']}>
        <div className={styles['contain_image_hand']} >
          <Image src={ImageHand} alt='' className={styles['image_hand']} />
        </div>
        </div>
      </Column>
    </div>
  )
}
