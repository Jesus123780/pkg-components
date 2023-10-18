import PropTypes from 'prop-types'
import React from 'react'
import { Column } from '../../atoms/Column'
import { Card } from '../CartDissert'

export const List = ({
  list,
  setData,
  listID,
  loadingEditSubOptional = false,
  data,
  selectedItem = {},
  removeOneItem = () => {
    return
  },
  editOneItem = () => {
    return
  }
}) => {
  return (
    <Column margin='10px 0'>
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

List.propTypes = {
  data: PropTypes.any,
  editOneItem: PropTypes.func,
  list: PropTypes.shape({
    cards: PropTypes.shape({
      map: PropTypes.func
    }),
    id: PropTypes.any
  }),
  listID: PropTypes.any,
  loadingEditSubOptional: PropTypes.bool,
  removeOneItem: PropTypes.func,
  selectedItem: PropTypes.object,
  setData: PropTypes.any
}
