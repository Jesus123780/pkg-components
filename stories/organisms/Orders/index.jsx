import PropTypes from 'prop-types'
import React from 'react'
import { CardOrder } from '../../molecules'
import style from './Orders.module.css'

export const Orders = ({
  isOpen = false,
  deliveryTimeMinutes = null,
  orders = []
}) => {

  return (
    <div className={`${style.wrapper_order} ${isOpen ? style.slideIn : ''}`}>
      {orders?.map((order, index) => {
        return (
          <CardOrder
            key={index}
            {...order}
            deliveryTimeMinutes={deliveryTimeMinutes}
          />
        )
      })}
    </div>
  )
}
Orders.propTypes = {
  isOpen: PropTypes.bool,
  deliveryTimeMinutes: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null])
  ]),
  orders: PropTypes.array
}
