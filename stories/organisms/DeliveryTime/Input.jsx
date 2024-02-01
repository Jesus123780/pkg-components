import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles.module.css'

export const TimeInput = ({ value, onChange }) => {

  const handleChange = (event) => {
    const inputValue = event.target.value
    if (inputValue === '' || (!isNaN(inputValue) && parseInt(inputValue) >= 1 && parseInt(inputValue) <= 60)) {
      onChange(inputValue === '' ? null : parseInt(inputValue))
    }
  }
  

  return (
    <div className={styles.inputContainer}>
      <input 
        className={styles.inputField}
        id='input_date'
        onChange={handleChange}
        placeholder=' '
        type='number'
        value={value}
      />
      <label className={styles.label} htmlFor='input_date'>Minutos (1-60)</label>
    </div>
  )
}

TimeInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
}
