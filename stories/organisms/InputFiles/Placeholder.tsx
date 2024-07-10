import React from 'react'
import { Column, Icon } from '../../atoms'
import styles from './styles.module.css'

interface PlaceholderProps {
  onClick?: () => void
}

export const Placeholder: React.FC<PlaceholderProps> = ({ onClick = () => { } }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        <div className={styles.button_icon}>
          <Column justifyContent='center' alignItems='center'>
            Buscar Archivo
            <Icon icon='IconFileUpload' size={40} />
          </Column>
        </div>
      </button>
    </div>
  )
}
