import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  IconDelete,
  IconEdit,
  IconLoading,
  IconMiniCheck
} from '../../../assets/icons'
import { Column } from '../../atoms/Column'
import styles from './styles.module.css'

export const Card = ({
  card = {
    title: '',
    id: ''
  },
  listID,
  loadingEditSubOptional = false,
  selectedItem = {
    id: ''
  },
  removeOneItem = () => {},
  editOneItem = () => {}
}) => {
  const [editingCardId, setEditingCardId] = useState(null)

  const [editedTitle, setEditedTitle] = useState(card?.title)

  const handleEditCard = (cardId) => {
    setEditingCardId(cardId)
    editOneItem({ listID, id: card.id })
  }

  const handleSaveClick = () => {
    setEditingCardId(null)
    if (!card?.id) return
    editOneItem({ listID, id: card?.id, title: editedTitle || card?.title })
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
      <div className={styles['contentCard']}>
        <Column>
          {isEditing ? (
            <input
              className={styles['contentCard__input']}
              onChange={(e) => {
                return setEditedTitle(e.target.value)
              }}
              type='text'
              value={editedTitle}
            />
          ) : (
            <h3 className={styles['title_card']}>{card?.title}</h3>
          )}
        </Column>
        <div className={styles['contentCard__actions']}>
          <button
            className={styles['contentCard__button']}
            onClick={() => {
              return removeOneItem({ listID, id: card.id })
            }}
            title='eliminar'
            type='button'
          >
            <IconDelete color='var(--color-primary-red)' size='23px' />
          </button>
          <button
            className={styles['contentCard__button']}
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
            {loadingEditSubOptional ? <IconLoading /> : isEditing ? <IconMiniCheck color='var(--color-alvi-icons-success)' size='23px' /> : <IconEdit color='var(--color-primary-red)' size='23px' />}
          </button>
        </div>
      </div>
    </Column>
  )
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  }),
  editOneItem: PropTypes.func,
  index: PropTypes.number,
  listID: PropTypes.any,
  loadingEditSubOptional: PropTypes.bool,
  removeOneItem: PropTypes.func,
  selectedItem: PropTypes.object
}
