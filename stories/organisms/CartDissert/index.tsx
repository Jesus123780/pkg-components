import React, { useState } from 'react'
import {
  IconDelete,
  IconEdit,
  IconLoading,
  IconMiniCheck
} from '../../../assets/icons'
import { Column } from '../../atoms/Column'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'

interface CardProps {
  card?: {
    title: string
    id: string
  }
  listID: any
  loadingEditSubOptional?: boolean
  selectedItem?: {
    id: string
  }
  removeOneItem: (args: any) => any
  editOneItem: () => void
}

export const Card: React.FC<CardProps> = ({
  card = {
    title: '',
    id: ''
  },
  listID,
  loadingEditSubOptional = false,
  selectedItem = {
    id: ''
  },
  removeOneItem = (args) => { return args },
  editOneItem = (args: any) => { return args }
}) => {
  const [editingCardId, setEditingCardId] = useState<string | null>(null)

  const [editedTitle, setEditedTitle] = useState(card?.title)

  const handleEditCard = (cardId: string): void => {
    setEditingCardId(cardId)
    editOneItem({ listID, id: card.id })
  }

  const handleSaveClick = (): void => {
    setEditingCardId(null)
    if (card?.id === '' || card?.id === null) return
    editOneItem({ listID, id: card?.id, title: editedTitle ?? card?.title })
  }
  const isEditing = editingCardId === selectedItem?.id

  return (
    <Column
      style={{
        position: 'relative',
        height: '70px',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className={styles.contentCard}>
        <Column>
          {isEditing
            ? (
            <input
              className={styles.contentCard__input}
              onChange={(e) => {
                return setEditedTitle(e.target.value)
              }}
              type='text'
              value={editedTitle}
            />
              )
            : (
            <h3 className={styles.title_card}>{card?.title}</h3>
              )}
        </Column>
        <div className={styles.contentCard__actions}>
          <button
            className={styles.contentCard__button}
            onClick={() => {
              return removeOneItem({ listID, id: card.id })
            }}
            title='eliminar'
            type='button'
          >
            <IconDelete color='var(--color-primary-red)' size='23px' />
          </button>
          <button
            className={styles.contentCard__button}
            onClick={
              isEditing
                ? () => {
                    return handleSaveClick()
                  }
                : () => {
                    handleEditCard(card.id)
                  }
            }
          >
            {loadingEditSubOptional ? <IconLoading /> : isEditing ? <IconMiniCheck color={getGlobalStyle('--color-icons-success')} size='23px' /> : <IconEdit color='var(--color-primary-red)' size='23px' />}
          </button>
        </div>
      </div>
    </Column>
  )
}
