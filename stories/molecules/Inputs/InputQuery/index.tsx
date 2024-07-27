import React from 'react'
import { PColor } from '../../../../assets/colors'
import { IconSearch } from '../../../../assets/icons'
import clsx, { type ClassValue } from 'clsx'
import styles from './InputQuery.module.css'

interface IInputQuery {
  dataForm: {
    search: string
  }
  placeholder: string
  className?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputQuery: React.FC<IInputQuery> = ({
  dataForm = {
    search: ''
  },
  placeholder = '',
  handleChange = () => { },
  className,
  ...rest
}) => {
  return (
    <div className={clsx(styles.searchContainer as ClassValue, className as ClassValue)}>
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
