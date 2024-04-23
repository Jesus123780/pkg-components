import React from 'react'
import styles from './Main.module.css'

export const Main: React.FC = () => {
  const BUSINESS_TITLE = process.env.BUSINESS_TITLE

  function getFormattedSpanishDate (): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' }
    const now = new Date()
    return now.toLocaleDateString('es-ES', options).replace(/ de /g, ' • ')
  }

  const formattedDate = getFormattedSpanishDate()

  return (
    <div className={styles.header}>
      <div className={styles.overlay}>
        <div className={styles.wrapperHeader}>
          <div className={styles.categoryTag}>Gestión</div>
          <h1 className={styles.title}>Pasos para registrar un restaurante en {BUSINESS_TITLE}</h1>
          <p className={styles.subtitle}>
          Es muy fácil registrar un restaurante en {BUSINESS_TITLE},
          </p>
          <p className={styles.subtitle}>
          ten a mano los documentos de tu negocio y
          formaliza la inscripción
          </p>
          <p className={styles.date}>{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}
