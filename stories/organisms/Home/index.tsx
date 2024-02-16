'use-client'
'use client'
import React, { useState } from 'react'
import { FAQSection } from './FAQ'
// import { Header } from './Header'
// import { Main } from './Main'
// import { RegistrationSteps } from './RegistrationSteps'
import styles from './styles.module.css'

export const HomeMain = (props) => {
  // const [menu, setMenu] = useState(0)
  // const faqs = [
  //   { question: 'Crear un menú y tener claro el horario de atención.', answer: 'Respuesta a la pregunta 1...' }
  // ]
  // const handleMenu = (index) => {
  //   return setMenu((prevState) => {
  //     return index === prevState ? !prevState : index
  //   })
  // }
  const [first, setfirst] = useState(false)
  return (
    <>
      {/* <Header {...props} /> */}
      {/* <Main /> */}
      <div className={styles.container}>
        {/* <RegistrationSteps /> */}
        {/* <FAQSection
          // active={menu}
          // faqs={faqs}
          // handleMenu={handleMenu}
          // {...props}
        /> */}
      </div>
    </>
  )
}
