import Image from 'next/image'
import React from 'react'
import Sales from '../../../../assets/images/sales.webp'
import styles from './RegistrationSteps.module.css'

export const RegistrationSteps = () => {
  const BUSINESS_TITLE = process.env.BUSINESS_TITLE

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>¿Cómo registrarme en la plataforma de {BUSINESS_TITLE} Restaurantes?</h2>
      <p className={styles.description}>
        Te contamos el proceso y los requisitos que necesitas para poder hacer el proceso.
        A diario los dueños de restaurantes creen en {BUSINESS_TITLE} por ser una empresa estable y consolidada en el mercado.
      </p>
      <ul className={styles.list}>
        <li className={styles.listItem}>¿Porque escoger {BUSINESS_TITLE} como el aliado para tu restaurante?</li>
        <li className={styles.listItem}>Documentos para registrarte en {BUSINESS_TITLE} Restaurantes</li>
        <li className={styles.listItem}>Crear un menú y tener claro el horario de atención.</li>
        <li className={styles.listItem}>Y listo.</li>
      </ul>
      <div className={styles.imageContainer}>
        <Image
          alt='Imagen descriptiva'
          height={700}
          layout='responsive'
          objectFit='cover'
          src={Sales}
          width={1000}
        />
      </div>
    </div>
  )
}


