'use-client'

import PropTypes from 'prop-types'
import React from 'react'
import { Options } from '../../../molecules'
import styles from './FAQ.module.css'

interface FAQSectionProps {
  active?: number | boolean
  handleMenu?: (index: number) => void
}
export const FAQSection: React.FC<FAQSectionProps> = ({ handleMenu = (index) => { return index }, active }) => {
  const faqs = [
    { question: 'Crear un menú y tener claro el horario de atención.', answer: 'Respuesta a la pregunta 1...' }
  ]

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.faqTitle}>
        PREGUNTAS FRECUENTES
      </h2>
      <p className={styles.faqSubtitle}>
        Te acercamos las preguntas más frecuentes que hacen nuestros clientes...
      </p>
      {/* {faqs.map((faq, index) => {
        return (
        <Options
          active={index === active}
          handleClick={() => { return handleMenu(index) }}
          icon='none'
          index={index}
          key={'/'}
          label={faq.question}
          path={'/'}
          size='medium' // Added the required 'size' property
        >
          <div className={styles.answer}>
            <p>{faq.answer}</p>
          </div>
        </Options>
        )
      })} */}
    </div>
  )
}

FAQSection.propTypes = {
  active: PropTypes.any,
  handleMenu: PropTypes.func
}

export default FAQSection
