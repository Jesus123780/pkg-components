import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Column, Row, Text } from '../../atoms'
import { AwesomeModal } from '../../organisms/AwesomeModal'
import styles from './DeliveryTime.module.css'

export const DeliveryTime = ({
  isOpen = false,
  setDeliveryTime = (value) => {
    return {
      ...value
    }
  },
  deliveryTime = '',
  setDeliveryTimeOpen = (state) => {
    return state
  }
}) => {
  const [time, setTime] = useState('12:00 AM')

  const handleChange = (newValue) => {
    setTime(newValue)
  }
  return (
    <div>
      <AwesomeModal
        borderRadius='10px'
        btnCancel={false}
        btnConfirm={false}
        customHeight='50vh'
        footer={false}
        header={true}
        height='auto'
        onCancel={() => {
          return setDeliveryTimeOpen()
        }}
        onHide={() => {
          return setDeliveryTimeOpen()
        }}
        padding='30px'
        show={isOpen}
        size='20%'
        zIndex='9999'
      >
        <div className={styles['content']}>
          <Column>
            <Text className={styles['paragrap']}>
              Le dice al cliente cuanto timepo tardara en llegar su pedido, y
              así el cliente podrá decidir si desea o no realizar la compra.
            </Text>
            <Text className={styles['label']}>Tiempo de entrega</Text>
            <Row className={styles['container_input']}>
              <h1>Time Input Example</h1>
              {/* <TimeInput value={time} onChange={handleChange} /> */}
              <p>Selected Time: {time}</p>
              <Text className={styles['label']}>minutos</Text>
            </Row>
          </Column>
          <Column className={styles['actions']}>
            <Button primary>Guardar</Button>
            <Button>Cancelar</Button>
          </Column>
        </div>
      </AwesomeModal>
    </div>
  )
}

DeliveryTime.propTypes = {
  deliveryTime: PropTypes.object,
  isOpen: PropTypes.bool,
  setDeliveryTime: PropTypes.func,
  setDeliveryTimeOpen: PropTypes.func
}
