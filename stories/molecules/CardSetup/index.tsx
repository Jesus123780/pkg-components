import React from 'react'
import { Button, Divider, Text } from '../../atoms'
import styles from './styles.module.css'

interface CardSetupProps {
  title: string
  description: string
  buttonText?: string
  onClick: () => void
}
export const CardSetup: React.FC<CardSetupProps> = ({
  title = '',
  buttonText = 'Llenar',
  description = '',
  onClick
}) => {
  return (
        <div className={styles.container}>
            <Text as='h2'>
                {title}
            </Text>
            <Divider borderBottom />
            <p className={styles.description}>
                {description}
            </p>
            <Button onClick={onClick} primary borderRadius='8px'>
             {buttonText}
            </Button>
        </div>
  )
}
