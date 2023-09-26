import React, { useState } from 'react';
import {
  IconDelete,
  IconEdit,
  IconMiniCheck,
  Loading
} from '../../../assets/icons';
import { Column } from '../../atoms/Column';
import './styles.css';

export const Card = ({
  card,
  listID,
  index = 0,
  loadingEditSubOptional = false,
  selectedItem = {},
  removeOneItem = () => {},
  editOneItem = () => {},
}) => {
  const [editingCardId, setEditingCardId] = useState(null);

  const [editedTitle, setEditedTitle] = useState(card.title);

  const handleEditCard = (cardId) => {
    setEditingCardId(cardId);
    editOneItem({ listID, id: card.id });
  };

  const handleSaveClick = () => {
    // Perform the action to save the edited title
    // For simplicity, let's just log the edited title here
    console.log('Edited title:', editedTitle);
    setEditingCardId(null)
    editOneItem({ listID, id: card.id, title: editedTitle });
  };
  const isEditing = editingCardId === selectedItem?.id;
  return (
    <Column>
      <div className='content-card content-card-flex'>
        <Column>
          {isEditing ? (
            <input
              type='text'
              className='content-card__input'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <h3 className='title_card'>{card?.title}</h3>
          )}
        </Column>
        <div className='content-card__actions'>
          <button
            className='content-card__button'
            type='button'
            title='eliminar'
            onClick={() => {
              return removeOneItem({ listID, id: card.id });
            }}
          >
            <IconDelete color='var(--color-primary-red)' size='23px' />
          </button>
          <button
            className='content-card__button'
            onClick={isEditing ? () => { return handleSaveClick() } : () => { handleEditCard(card.id) }}
          >
          {loadingEditSubOptional ? <Loading /> : (isEditing ? <IconMiniCheck color='var(--color-alvi-icons-success)' size='23px' /> : <IconEdit color='var(--color-primary-red)' size='23px' />)}
          </button>
        </div>
      </div>
    </Column>
  );
};
