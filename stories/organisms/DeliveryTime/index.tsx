import PropTypes from 'prop-types'
import React from 'react'
import {
  Button,
  Column,
  Row,
  Text
} from '../../atoms'
import { AwesomeModal } from '../../organisms/AwesomeModal'
import { TimeInput } from './Input'
import { getGlobalStyle } from '../../../utils'
import styles from './DeliveryTime.module.css'

interface DeliveryTimeProps {
  isOpen?: boolean
  handleDeliveryTimeChange?: (value: string) => void
  deliveryTime?: string
  loading?: boolean
  setDeliveryTimeOpen?: () => void
  createDeliveryTime?: (number: string) => void

}
export const DeliveryTime: React.FC<DeliveryTimeProps> = ({
  isOpen = false,
  handleDeliveryTimeChange = (value) => {
    return value
  },
  deliveryTime = '',
  loading = false,
  setDeliveryTimeOpen = () => {
  },
  createDeliveryTime = (number) => {
    return number
  }
}) => {
  return (
    <div>
      <AwesomeModal
        borderRadius='10px'
        btnCancel={false}
        btnConfirm={false}
        customHeight='auto'
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
        title='Tiempo de entrega'
        zIndex={getGlobalStyle('--z-index-99999')}
      >
        <div className={styles.content}>
          <Column>
            <Text className={styles.paragraph}>
              Le dice al cliente cuanto tiempo tardara en llegar su pedido, y
              así el cliente podrá decidir si desea o no realizar la compra.
            </Text>
            <Text className={styles.label}>Tiempo de entrega</Text>
            <Row className={styles.container_input}>
              <TimeInput onChange={handleDeliveryTimeChange} value={deliveryTime} />
            </Row>
          </Column>
          <Column className={styles.actions}>
            <Button
              disabled={loading || (!deliveryTime || deliveryTime === '0')}
              loading={loading}
              onClick={() => {
                if (!deliveryTime || deliveryTime === '0') {
                  return null
                }
                setDeliveryTimeOpen()
                return createDeliveryTime(deliveryTime)
              }}
              primary
            >
              Guardar
            </Button>
            <Button
              onClick={() => {
                return setDeliveryTimeOpen()
              }}
            >
              Cancelar
            </Button>
          </Column>
        </div>
      </AwesomeModal>
    </div>
  )
}

DeliveryTime.propTypes = {
  createDeliveryTime: PropTypes.func,
  deliveryTime: PropTypes.string,
  handleDeliveryTimeChange: PropTypes.func,
  isOpen: PropTypes.bool,
  loading: PropTypes.bool,
  loadingDeliveryTime: PropTypes.bool,
  setDeliveryTimeOpen: PropTypes.func
}
