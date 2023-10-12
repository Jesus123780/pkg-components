import React from 'react';
import { Column } from '../../atoms/Column'
import { Card } from '../CartDissert'

export const List = ({
    list,
    setData,
    listID,
    loadingEditSubOptional = false,
    data,
    selectedItem = {},
    removeOneItem = () => { return },
    editOneItem = () => { return }
  }) => {
    return (
      <Column margin='10px 0'>
        {list?.cards?.map((card, index) => {
          return (
            <Column key={card?.id}>
              <Card
                card={card}
                data={data}
                id={list?.id}
                index={index}
                key={card?.id}
                loadingEditSubOptional={loadingEditSubOptional}
                list={list}
                listID={listID}
                editOneItem={editOneItem}
                selectedItem={selectedItem}
                removeOneItem={removeOneItem}
                setData={setData}
              />
            </Column>
          )
        })}
      </Column>
    )
  }