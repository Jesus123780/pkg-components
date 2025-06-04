import React from 'react'
import styles from './styles.module.css'
import { Button, Column, Row, Tag, Text } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'

interface IChoicesHeader {
  deleting?: boolean
  description?: string
  edit?: boolean
  label?: string
  title: string
  handleDelete?: () => void
  handleEdit?: () => void
}

export const ChoicesHeader: React.FC<IChoicesHeader> = ({
  deleting = false,
  description = 'Elige tus opciones preferidas',
  edit = false,
  label = '',
  title = 'Opciones',
  handleDelete = () => { },
  handleEdit = () => { }
}) => {
  return (
        <Column style={{
          marginBottom: getGlobalStyle('--spacing-xl')
        }}>
            <div className={styles.garnishChoicesHeader}>
                <div className={styles.content}>
                    <div>
                        <Text as='h4' className={styles.title}>
                            {title !== '' ? title : 'Opciones'}
                        </Text>
                        <span className={styles.titleDesc}>
                            {description}
                        </span>
                    </div>
                    {label !== '' && <Tag label={label} />}
                </div>
            </div>
            <div className={styles.garnishChoices}>
                <Row justifyContent='space-between' alignItems='center'>
                    {deleting &&
                        <Button
                            title='Editar'
                            className={styles.button_action}
                            iconName='IconEdit'
                            iconPosition='right'
                            styles={{
                              borderColor: getGlobalStyle('--color-base-transparent')
                            }}
                            onClick={handleEdit}
                            type='button'
                        >
                        </Button>
                    }
                    {edit &&
                        <Button
                            className={styles.button_action}
                            title='Eliminar'
                            iconName='IconDelete'
                            iconPosition='right'
                            styles={{
                              borderColor: getGlobalStyle('--color-base-transparent')
                            }}
                            onClick={handleDelete}
                            type='button'
                        >
                        </Button>
                    }
                </Row>
            </div>
        </Column>
  )
}
