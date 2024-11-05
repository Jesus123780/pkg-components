import React from 'react'
import {
  Column,
  Icon,
  Row,
  Text
} from '../../atoms'
import styles from './styles.module.css'

interface PlaceholderProps {
  onClick?: () => void
}

const arrayIcons = ['IconFolder']

export const Placeholder: React.FC<PlaceholderProps> = ({ onClick = () => { } }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        <div className={styles.button_icon}>
          <Column justifyContent='center' alignItems='center'>
            <Text>
               Buscar archivo
            </Text>
            <Row alignItems='center' justifyContent='center'>
              {arrayIcons.map((icon, index) => (
                <Icon key={index} icon={icon} size={40} />
              ))}

            </Row>
          </Column>
        </div>
      </button>
    </div>
  )
}
