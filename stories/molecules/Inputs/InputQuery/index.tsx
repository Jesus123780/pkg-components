import React from 'react'
import { PColor } from '../../../../assets/colors'
import { IconSearch } from '../../../../assets/icons'
import styles from './InputQuery.module.css'

interface IInputQuery {
  dataForm: {
    search: string
  }
  placeholder: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputQuery: React.FC<IInputQuery> = ({
  dataForm = {
    search: ''
  },
  placeholder = '',
  handleChange = () => { },
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
