import { motion, usePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import React from 'react'
import { Column } from '../../atoms/Column'
import { Card } from '../CartDissert'

export const List = ({
  list = {
    cards: []
  },
  setData = () => {
    return
  },
  listID = '',
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
  const transition = { type: 'spring', stiffness: 300, damping: 30 }

  const [isPresent, safeToRemove] = usePresence()

  const animations = {
    layout: true,
    initial: 'out',
    style: {
      position: isPresent ? 'static' : 'absolute'
    },
    animate: isPresent ? 'in' : 'out',
    whileTap: 'tapped',
    variants: {
      in: { y: 0, opacity: 1 },
      out: { y: 30, opacity: 0, zIndex: -1 }
    },
    onAnimationComplete: () => {return !isPresent && safeToRemove()},
    transition
  }
  return (
    <Column margin='10px 0'>
      {list?.cards?.map((card, index) => {
        return (
          <motion.div {...animations} key={card?.id} >
            <Column>
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
          </motion.div>
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
