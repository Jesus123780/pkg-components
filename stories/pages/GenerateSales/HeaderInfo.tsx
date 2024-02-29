import React from 'react'
import {
  Column,
  Row,
  Icon,
  Text
} from '../../atoms'
import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'

interface HeaderInfoProps {
  client: {
    clientName: string
    ccClient: string
    ClientAddress: string
    clientNumber: string
  }
  totalProductPrice: string | number
  payMethodPState: string
  handleOpenAside: () => void
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  client = {
    clientName: '',
    ccClient: '',
    ClientAddress: '',
    clientNumber: ''
  },
  totalProductPrice = 0,
  payMethodPState = '',
  handleOpenAside = () => {}
}) => {
  return (
    <div className={styles['header-info']}>
      <Column alignItems="start" justifyContent="center">
        <Row alignItems="center" className={styles['header-info_content']} onClick={handleOpenAside}>
          <div style={{ width: 'min-content' }}>
            <Icon
              icon="IconUser"
              size={30}
              height={30}
              width={30}
              color={getGlobalStyle('--color-icons-primary')}
            />
          </div>
          <Text
            className={styles['header-info__client-name']}
            title={client?.clientName}
          >
            {client?.clientName !== null
              ? client?.clientName
              : 'No hay cliente seleccionado'}
          </Text>
        </Row>
      </Column>
      <button className={styles['header-info__client-info_payment']} onClick={handleOpenAside}>
        <Icon
          icon="IconSales"
          size={30}
          height={30}
          width={30}
          color={getGlobalStyle('--color-icons-primary')}
        />
        <Column alignItems="start" justifyContent="center">
          <Text size="sm">{totalProductPrice}</Text>
          <Text size="sm">{payMethodPState}</Text>
        </Column>
      </button>
    </div>
  )
}
