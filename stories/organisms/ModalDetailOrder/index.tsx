import React from 'react'

import type { TypeModalDetailOrder } from './type'
import { AwesomeModal } from '../AwesomeModal'

export const MemoModalDetailOrder: React.FC<TypeModalDetailOrder> = ({
  open,
  onHide
}) => {

  return (
    <AwesomeModal
      title='Detalle de la orden'
      show={open}
      onHide={onHide}
      height='calc(100% - 40px)'
      customHeight='calc(100% - 40px)'
    >
      Hola
    </AwesomeModal>
  )
}

export const ModalDetailOrder = React.memo(MemoModalDetailOrder, (prev, next) => (
  prev.open === next.open
))
