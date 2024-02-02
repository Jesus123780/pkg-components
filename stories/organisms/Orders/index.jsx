import PropTypes from 'prop-types'
import React from 'react'
import { IconClose } from '../../../assets'
import { getGlobalStyle } from '../../../utils'
import { CardOrder } from '../../molecules'
import style from './Orders.module.css'

export const Orders = ({
  isOpen = false,
  deliveryTimeMinutes = null,
  orders = [],
  handleSetIsOpenOrder = () => {
    return 
  },
  handleViewOrder = (pCodeRef) => {
    return pCodeRef
  }
}) => {

  return (
    <div className={`${style.wrapper_order} ${isOpen ? style.slideIn : ''}`}>
      <div className={style.button_cancel}>
        <button
          onClick={() => {
            return handleSetIsOpenOrder()
          }}
        >
          <IconClose color={getGlobalStyle('--color-primary-red')} size={30} />
        </button>

      </div>
      {orders?.map((order, index) => {
        return (
          <CardOrder
            key={index}
            {...order}
            deliveryTimeMinutes={deliveryTimeMinutes}
            handleViewOrder={handleViewOrder}
          />
        )
      })}
    </div>
  )
}
Orders.propTypes = {
  isOpen: PropTypes.bool,
  handleSetIsOpenOrder: PropTypes.func,
  deliveryTimeMinutes: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null])
  ]),
  orders: PropTypes.array,
  handleViewOrder: PropTypes.array
}
