import PropTypes from 'prop-types'
import React from 'react'
import { PColor } from '../../../../assets/colors'
import { IconSearch } from '../../../../assets/icons'
import styles from './InputQuery.module.css'

export const InputQuery = ({
  dataForm = {
    search: ''
  },
  placeholder = '',
  handleChange = () => { return },
  ...rest
}) => {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        name='search'
        onChange={handleChange}
        placeholder={placeholder}
        type='text'
        value={dataForm.search}
        {...rest}
      />
      <IconSearch
        className={styles.searchIcon}
        color={PColor}
        size={20}
      />
    </div>
  )
}

InputQuery.propTypes = {
  dataForm: PropTypes.object,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string
}
