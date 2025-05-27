import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { IconArrowBottom, IconArrowTop } from '../../../assets/icons'
import styles from './DropdownMenu.module.css'

export const DropdownMenuHeader = ({
  index = null,
  array = []
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={styles.container}>
      <header
        className={styles.menuHeader}
        onClick={() => { return setIsOpen(!isOpen) }}
      >
        {index} {!isOpen ? <IconArrowBottom size={15} /> : <IconArrowTop size={15} />}
      </header>
      {isOpen && (
        <nav className={styles.menuItems}>
          {array.map(el => {
            return <a
              className={styles.item}
              href='#'
              key={el}
            >
              {el}
            </a>
          })}
        </nav>
      )}
    </section>
  )
}

DropdownMenuHeader.propTypes = {
  array: PropTypes.array,
  index: PropTypes.string
}
