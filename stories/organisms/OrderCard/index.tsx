import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import { StatusItemOrderProcess } from './StatusItemOrderProcess'
import { CardOrder } from './styled'

const labelStatusOrder = {
  0: '',
  1: 'Aceptado',
  2: 'Pedido en proceso',
  3: 'Listo para entrega',
  4: 'Pedido concluido',
  5: 'Pedido Rechazado'
}
export interface IstoreOrder {
  pCodeRef: string
  getOneStore: {
    idStore: string
    storeName: string
    city: {
      cName: string
    }
    department: {
      dName: string
    }
  }
  pSState: number

}
interface OrderCardProps {
  storeOrder?: IstoreOrder[]
}
export const OrderCard: React.FC<OrderCardProps> = ({ storeOrder = [] }) => {
  if (!(storeOrder?.length > 0)) return <></>
  return (
    <CardOrder>
      {storeOrder?.length > 0
        ? storeOrder.map((order) => {
          const { getOneStore } = order ?? {
            getOneStore: {
              idStore: '',
              storeName: '',
              city: {
                cName: ''
              },
              department: {
                dName: ''
              }
            }
          }
          const {
            idStore,
            storeName,
            city,
            department
          } = getOneStore ?? {
            idStore: '',
            storeName: '',
            city: {
              cName: ''
            },
            department: {
              dName: ''
            }
          }
          const pCodeRef = order.pCodeRef
          return (
            <Link
              href={{
                pathname: '/proceso-de-compra/finalizar',
                query: {
                  saleId: pCodeRef,
                  idStore
                }
              }}
              key={pCodeRef}
              passHref
              shallow
            >
              <div className='card'>
                <div className='card-header'>
                  <div>
                    <h5 className='card-title_store'>
                      {storeName} {city?.cName} {department?.dName}
                    </h5>
                  </div>
                  {order.pCodeRef !== null && (
                    <div className='order-number'>
                        Ref de pedido
                      <div>
                        # {order?.pCodeRef}

                      </div>
                    </div>
                  )}
                  <div className='order-status_container'>
                    <span className='order-status'>
                      {labelStatusOrder[order.pSState]}
                    </span>
                    <div className='status-list'>
                      {[1, 2, 3, 4].map((state) => {
                        return (
                          <StatusItemOrderProcess
                            key={state}
                            pulse={
                              order.pSState === state ||
                                order.pSState >= state
                            }
                            rejected={order.pSState === 5}
                            text={
                              order.pSState === state
                                ? labelStatusOrder[order.pSState]
                                : ''
                            }
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })
        : null}
    </CardOrder>
  )
}

OrderCard.propTypes = {
  storeOrder: PropTypes.array
}
