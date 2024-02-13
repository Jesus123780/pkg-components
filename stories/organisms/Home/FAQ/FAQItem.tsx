import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { IconArrowBottom, IconArrowTop } from '../../../../assets'
import styles from './FAQ.module.css'

export const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {return setIsOpen(!isOpen)}

  return (
    <div className={styles.faqItem} onClick={toggleOpen}>
      <div className={styles.faqQuestion}>
        {question}
        {isOpen ? (
          <IconArrowTop color={'#252525'} size={15} />
        ) : (
          <IconArrowBottom color={'#25252569'} size={15} />
        )}
      </div>
      <div className={`${styles.faqAnswer} ${isOpen ? 'open' : ''}`}>
        {answer}
      </div>
    </div>
  )
}

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired
}
