import React from 'react'
import { Column } from '../../atoms/Column'
import { Card } from '../CartDissert'

interface ListProps {
  data: any
  editOneItem: () => void
  list: {
    cards: any[]
    id: any
  }
  listID: any
  loadingEditSubOptional: boolean
  removeOneItem: () => void
  selectedItem: {
    id: string
  }
  setData: () => void
}

export const List: React.FC<ListProps> = ({
  list = {
    id: '',
    cards: []
  },
  setData = () => {

  },
  listID = '',
  loadingEditSubOptional = false,
  data,
  selectedItem = {
    id: ''
  },
  removeOneItem = () => {

  },
  editOneItem = () => {

  }
}) => {
  return (
    <Column>
      {list?.cards?.map((card, index) => {
        return (
          <Column key={card?.id}>
            <Card
              card={card}
              data={data}
              editOneItem={editOneItem}
              id={list?.id}
              index={index}
              key={card?.id}
              list={list}
              listID={listID}
              loadingEditSubOptional={loadingEditSubOptional}
              removeOneItem={removeOneItem}
              selectedItem={selectedItem}
              setData={setData}
            />
          </Column>
        )
      })}
    </Column>
  )
}
