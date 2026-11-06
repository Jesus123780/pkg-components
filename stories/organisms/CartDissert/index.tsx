'use client'

import React, { useState } from 'react'
import { Column } from '../../atoms/Column'
import { Icon } from '../../atoms'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'

interface CardActionArgs {
  listID: any
  id: string
  title?: string
}

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
  removeOneItem: (args: CardActionArgs) => any
  editOneItem: (args: CardActionArgs) => any
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
  removeOneItem = (args) => args,
  editOneItem = (args) => args
}) => {
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [editedTitle, setEditedTitle] = useState(card?.title)
  const [isRemoving, setIsRemoving] = useState(false)

  const isEditing = editingCardId === selectedItem?.id

  const handleEditCard = (cardId: string): void => {
    setEditingCardId(cardId)
    editOneItem({ listID, id: card.id })
  }

  const handleSaveClick = (): void => {
    setEditingCardId(null)

    if (card?.id === '' || card?.id === null) return

    editOneItem({
      listID,
      id: card.id,
      title: editedTitle ?? card.title
    })
  }

  const handleRemoveClick = (): void => {
    if (isRemoving) return

    setIsRemoving(true)
  }

  const handleAnimationEnd = (
    event: React.AnimationEvent<HTMLDivElement>
  ): void => {
    if (!isRemoving || event.target !== event.currentTarget) return

    removeOneItem({ listID, id: card.id })
  }

  const cardClassName = [
    styles.contentCard,
    isEditing ? styles.contentCardEditing : '',
    isRemoving ? styles.contentCardRemoving : ''
  ]
    .filter(Boolean)
    .join(' ')

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
      <div
        className={cardClassName}
        onAnimationEnd={handleAnimationEnd}
      >
        <Column>
          {isEditing
            ? (
              <input
                className={styles.contentCard__input}
                onChange={(e) => setEditedTitle(e.target.value)}
                type='text'
                value={editedTitle}
                autoFocus
              />
              )
            : (
              <h3 className={styles.title_card}>
                {card?.title}
              </h3>
              )}
        </Column>

        <div className={styles.contentCard__actions}>
          <button
            aria-label='Eliminar elemento'
            className={styles.contentCard__button}
            disabled={isRemoving}
            onClick={handleRemoveClick}
            title='Eliminar'
            type='button'
          >
            <Icon
              icon='IconDelete'
              color='var(--color-icons-error)'
              size={25}
            />
          </button>

          <button
            aria-label={isEditing ? 'Guardar cambios' : 'Editar elemento'}
            className={styles.contentCard__button}
            disabled={loadingEditSubOptional || isRemoving}
            onClick={isEditing
              ? handleSaveClick
              : () => handleEditCard(card.id)}
            title={isEditing ? 'Guardar' : 'Editar'}
            type='button'
          >
            {loadingEditSubOptional
              ? (
                <Icon
                  icon='IconLoading'
                  size={20}
                  color={getGlobalStyle('--color-icons-primary')}
                />
                )
              : isEditing
                ? (
                  <Icon
                    icon='IconMiniCheck'
                    color='var(--color-icons-success)'
                    size={25}
                  />
                  )
                : (
                  <Icon
                    icon='IconEdit'
                    color='var(--color-icons-primary)'
                    size={25}
                  />
                  )}
          </button>
        </div>
      </div>
    </Column>
  )
}
