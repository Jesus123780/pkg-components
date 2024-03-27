import React, { useState } from 'react'
import { IconSales } from '../../../assets/icons'
import { numberFormat } from '../../../utils/index'
import { Column } from '../../atoms/Column'
import { AwesomeModal } from '../AwesomeModal'
import { CardProductSimple } from '../CardProductSimple'
import { ResisesColumns } from '../ResisesColumns'
import { RippleButton, Text } from './../../atoms'
import { Button } from './../../atoms/Button/index'
import { Skeleton } from './../../molecules/Skeleton'
import {
  ContainerGrid,
  HeaderWrapperDetail,
  SectionDetailOrder
} from './styled'
import type { GetAllPedidoStore, TypeModalDetailOrder } from './type'
import type { ProductFood } from '../../pages/GenerateSales/types'
import { calculatePriceTotal } from './helpers'
import { InputHooks } from '../../molecules'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

export const MemoModalDetailOrder: React.FC<TypeModalDetailOrder> = ({
  dataModal = {},
  dataStore,
  pDatCre,
  openAction = false,
  edit = true,
  totalProductsPrice = 0,
  loading = false,
  LoadingStatusOrder = false,
  handleOpenActions = () => {},
  handleModalProductSale = () => {},
  setStateSale = (state: number | null) => {
    return state
  },
  stateSale = -1,
  handleModalItem = (pId: string, ShoppingCardId: string) => {
    return {
      pId,
      ShoppingCardId
    }
  },
  setModalItem = (boolean) => {
    return boolean
  },
  HandleChangeState = (value: number, pCodeRef?: string) => {
    return {
      value,
      pCodeRef
    }
  }
}) => {
  const {
    payMethodPState,
    pSState,
    locationUser,
    pCodeRef,
    channel,
    change,
    getAllPedidoStore
  } = dataModal
  const dataLocation = ((locationUser !== null && locationUser) && JSON.parse(locationUser)) ?? {
    cName: '',
    country: '',
    dName: '',
    uLocationKnow: ''
  }
  const {
    cName,
    country,
    dName,
    uLocationKnow
  } = dataLocation

  const stateOrder: {
    1: string
    2: string
    3: string
    4: string
    5: string
  } = {
    1: 'Confirmado',
    2: 'En Proceso',
    3: 'Listo Para Entrega',
    4: 'Pedido Concluido',
    5: 'Rechazado'
  }
  const { yearMonthDay, hourMinutes12, longDayName } = pDatCre ?? {
    yearMonthDay: '',
    hourMinutes12: '',
    longDayName: ''
  }
  const [openCommentModal, setOpenCommentModal] = useState(false)
  const [oneProductToComment, setOneProductToComment] =
    useState<ProductFood | null>(null)
  const [values, setValues] = useState({
    comment: ''
  })
  const handleChange = (
    e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleComment = (
    product: ProductFood | null,
    comment: string | null
  ): void => {
    if (product?.pId !== undefined && product?.pName !== undefined) {
      setOneProductToComment(product)
      setValues({
        ...values,
        comment: comment ?? ''
      })
    }
    setOpenCommentModal(!openCommentModal)
  }
  /**
   * Description
   * @param {any} value
   * @param {any} pCodeRef
   * @returns {any}
   **/
  const handleChangeStateSale = (value: number, pCodeRef?: string): void => {
    if (stateSale !== value) {
      HandleChangeState(value, pCodeRef)
      setStateSale(value)
    }
  }
  const options = [
    { value: 1, label: 'Confirmar pedido' },
    { value: 2, label: 'Pedido en proceso' },
    { value: 3, label: 'Pedido en listo para entrega' },
    { value: 4, label: 'Pedido concluido' },
    { value: 5, label: 'Rechazar pedido' }
  ]

  return (
    <>
      {openCommentModal && (
        <AwesomeModal
          btnConfirm={false}
          footer={false}
          header={true}
          onCancel={() => {
            return handleComment(null, null)
          }}
          onHide={() => {
            return handleComment(null, null)
          }}
          padding='20px'
          show={openCommentModal}
          size='400px'
          title='Mira los comentarios'
          zIndex='9999'
        >
          <CardProductSimple
            {...oneProductToComment}
            edit={false}
            pName={oneProductToComment?.pName ?? ''}
            render={null}
          />
          <InputHooks
            name='comment'
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              return handleChange(e)
            }}
            required
            value={values?.comment}
            typeTextarea
            minWidth='360px'
            height='200px'
          />
        </AwesomeModal>
      )}
      <AwesomeModal
        show={true}
        header={true}
        size='100%'
        footer={false}
        onCancel={handleModalProductSale}
        onHide={handleModalProductSale}
        onConfirm={handleModalProductSale}
        zIndex={getGlobalStyle('--z-index-high')}
      >
        <ResisesColumns
          backgroundColor='transparent'
          initialDividerPosition={{ __0: 80, __1: 20 }}
          lastMinWidth={'auto'}
          padding='0'
        >
          <div className='modal--section__main'>
            <Text size='md' weight='hairline'>
              {pCodeRef}
            </Text>
            <div>
              <ContainerGrid>
                {loading
                  ? (
                  <Skeleton height={400} numberObject={50} />
                    )
                  : (
                      getAllPedidoStore?.map((sale: GetAllPedidoStore, index: number) => {
                        const producto = sale?.getAllShoppingCard?.productFood ?? {}
                        const priceTotal = calculatePriceTotal(sale)
                        const activeComment = sale?.getAllShoppingCard?.comments?.length > 0
                        return (
                      <div key={index}>
                        <HeaderWrapperDetail onClick={() => {}}>
                          <IconSales size={30} />
                          <div className='info-sales'>
                            <span>
                              Cantidad: {Number(sale?.getAllShoppingCard?.cantProducts)}
                            </span>
                            <span>total: {isNaN(priceTotal) ? 0 : numberFormat(priceTotal)}</span>
                          </div>
                        </HeaderWrapperDetail>
                        <CardProductSimple
                          {...producto}
                          ProDescription={producto.ProDescription}
                          ProDescuento={Number(producto.ProDescuento)}
                          ProImage={producto.ProImage}
                          ProPrice={Number(producto.ProPrice)}
                          ProQuantity={producto.ProQuantity}
                          ValueDelivery={producto.ValueDelivery}
                          activeComment={activeComment}
                          asComment={activeComment}
                          buttonComment={activeComment}
                          edit={false}
                          free={
                            producto.ProPrice === 0 ||
                            producto.ProPrice === '0' ||
                            producto.ProPrice === null
                          }
                          handleComment={() => {
                            return handleComment(
                              producto,
                              sale?.getAllShoppingCard?.comments
                            )
                          }}
                          key={producto.pId}
                          margin='20px 0 0 0'
                          onClick={() => {
                            handleModalItem(
                              producto.pId ?? null,
                              sale.ShoppingCard ?? null
                            )
                            return setModalItem(true)
                          }}
                          pName={producto.pName}
                          tag={false}
                        />
                      </div>
                        )
                      })
                    )}
              </ContainerGrid>
            </div>
          </div>
          <div>{console.log(stateOrder[stateSale])}
            {Boolean(edit) && (
              <Column>
                <RippleButton
                  radius='0.125rem'
                  onClick={handleOpenActions}
                  padding='5px'
                  loading={LoadingStatusOrder}
                >
                  {stateOrder[stateSale as keyof typeof stateOrder] ?? 'Pedido'}
                </RippleButton>
                <Column style={{ position: 'relative' }}>
                  {openAction && (
                    <div className={styles.menu_options}>
                      {options.map((option, index) => {
                        return (
                          <button
                            className={`${styles.menu_options__option} ${stateSale === index && styles.menu_options__option_active}`}
                            key={option.value}
                            onClick={() => {
                              return handleChangeStateSale(
                                option.value,
                                pCodeRef
                              )
                            }}
                          >
                            <Text align='start' size='sm'>
                              {option.label ?? stateOrder[stateSale as keyof typeof stateOrder]}
                            </Text>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </Column>
              </Column>
            )}
            <Column>
              <SectionDetailOrder>
                <div className='header-detail'>
                  <Text size='md'>Detalles</Text>
                </div>

                <div className='header-responsible'>
                  <Column>
                    <Text size='md'>Responsable</Text>
                  </Column>
                  <Column>
                    <Text size='md'>{dataStore?.storeName}</Text>
                  </Column>
                </div>
                <div className='header-responsible'>
                  <Column>
                    <Text size='md'>Código</Text>
                  </Column>
                  <Column>
                    <Text size='md'>{pCodeRef}</Text>
                  </Column>
                </div>

                <div className='header-responsible'>
                  <Column>
                    <Text size='md'>Ubicación</Text>
                  </Column>
                  <Column>
                    <Text size='md'>
                      {`${cName ?? ''} - ${uLocationKnow ?? ''} - ${
                        country ?? ''
                      } - ${dName ?? ''}`}
                    </Text>
                  </Column>
                </div>
                <div className='header-responsible'>
                  <Column>
                    <Text size='md'>Canal</Text>
                  </Column>
                  <Column>
                    <Text size='md'>
                      {channel === 1 ? 'RESTAURANTE' : 'DELIVERY-APP'}
                    </Text>
                  </Column>
                </div>
                {change !== null && (
                  <div className='header-responsible'>
                    <Column>
                      <Text size='md'>Cambio</Text>
                    </Column>
                    <Column>
                      <Text size='md'>{numberFormat(change)}</Text>
                    </Column>
                  </div>
                )}
                <div className='header-responsible'>
                <Column>
                  <Text size='md'>Total</Text>
                </Column>
                <Column>
                  <Text size='md'>
                    {totalProductsPrice}
                  </Text>
                </Column>
                </div>
                <div className='header-responsible'>
                  <Text size='md'>Método de pago</Text>
                  <Column>
                    <Text size='md'>
                      {payMethodPState === 0 ? 'EFECTIVO' : 'TRANSFERENCIA'}
                    </Text>
                  </Column>
                </div>
                {pDatCre !== null
                  ? (
                  <div className='header-responsible'>
                    <Text size='md'>Fecha de creación</Text>
                    <Column>
                      <Text size='md'>
                        {`${yearMonthDay} - ${longDayName} - ${hourMinutes12}`}
                      </Text>
                    </Column>
                  </div>
                    )
                  : null}
              </SectionDetailOrder>
            </Column>
          </div>
        </ResisesColumns>
      </AwesomeModal>
    </>
  )
}

export const ModalDetailOrder = React.memo(MemoModalDetailOrder)
