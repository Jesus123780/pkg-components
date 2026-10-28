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
  payId: string
  discountPercent?: number
  discountAmount?: number
  /** Total number of line items currently in the cart. */
  productCount?: number
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
  payId = '',
  discountPercent = 0,
  discountAmount = 0,
  productCount = 0,
  handleOpenAside = () => { }
}) => {
  const hasDiscount = discountPercent > 0 || discountAmount > 0
  const resolvedClientName = (client?.clientName ?? '').trim()
  const resolvedPhone = (client?.clientNumber ?? '').trim()

  return (
    <Column className={styles['header-info']}>
      <Row>
        <Column alignItems='flex-start' justifyContent='center'>
          <Row
            alignItems='flex-start'
            className={styles['header-info_content']}
            onClick={handleOpenAside}
          >
            <div style={{ width: 'min-content', paddingTop: '2px' }}>
              <Icon
                icon='IconUser'
                size={28}
                height={28}
                width={28}
                color={getGlobalStyle('--color-icons-primary')}
              />
            </div>
            <Column alignItems='flex-start' justifyContent='center'>
              {/* Client name */}
              <Text className={styles['header-info__client-name']} title={client?.clientName}>
                {resolvedClientName !== ''
                  ? resolvedClientName
                  : 'Sin cliente'
                }
              </Text>

              {/* Phone + item count row */}
              <div className={styles['header-info__meta']}>
                {resolvedPhone !== '' && (
                  <span className={styles['header-info__meta-item']}>
                    <Icon
                      icon='IconPhone'
                      size={10}
                      color={getGlobalStyle('--color-neutral-gray-dark')}
                    />
                    {resolvedPhone}
                  </span>
                )}
                {productCount > 0 && (
                  <span className={styles['header-info__meta-item']}>
                    <Icon
                      icon='IconShopping'
                      size={10}
                      color={getGlobalStyle('--color-neutral-gray-dark')}
                    />
                    <span className={styles['header-info__meta-item--highlight']}>
                      {productCount}
                    </span>
                    {productCount === 1 ? ' producto' : ' productos'}
                  </span>
                )}
              </div>

              {/* Discount row */}
              {hasDiscount && (
                <div className={styles['header-info__discount']}>
                  {discountPercent > 0 && (
                    <span className={styles['header-info__discount-badge']}>
                      <Icon
                        icon='IconPromo'
                        size={10}
                        color={getGlobalStyle('--color-text-white')}
                      />
                      {discountPercent}%
                    </span>
                  )}
                  {discountAmount > 0 && (
                    <span className={styles['header-info__discount-amount']}>
                      -${Number(discountAmount).toLocaleString('es-CO')}
                    </span>
                  )}
                </div>
              )}
            </Column>
          </Row>
        </Column>
        <button className={styles['header-info__client-info_payment']} onClick={handleOpenAside}>
          <Icon
            icon='IconSales'
            size={30}
            height={30}
            width={30}
            color={getGlobalStyle('--color-icons-primary')}
          />
          <Column alignItems='flex-start' justifyContent='center'>
            <Text size='sm'>
              {totalProductPrice}
            </Text>
            <Text size='sm'>
              {payId}
            </Text>
          </Column>
        </button>
      </Row>
    </Column>
  )
}
