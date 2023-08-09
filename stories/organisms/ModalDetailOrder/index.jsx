import React, { useState, useEffect } from 'react'
import { numberFormat } from '../../../utils/index'
import { IconSales } from '../../../assets/icons'
import { Column } from '../../atoms/Column'
import { CustomLink } from '../../atoms/Link'
import { Overline } from '../../atoms/Overline'
import { AwesomeModal } from '../AwesomeModal'
import { CardProductSimple } from '../CardProductSimple'
import { ResisesColumns } from '../ResisesColumns'
import { Text } from './../../atoms'
import { Button } from './../../atoms/Button/index'
import { Skeleton } from './../../molecules/Skeleton'
import {
  ActionButton,
  ContainerGrid,
  HeaderWrapperDetail,
  ModalWrapper,
  SectionDetailOrder,
} from './styled'
import { PColor, BGColor } from '../../../assets/colors'

const CLIENT_URL_BASE = process.env.MAIN_URL_BASE

export const MemoModalDetailOrder = ({
  dataModal = {},
  dataStore,
  pDatCre,
  saleError,
  saleKey,
  saleGroup,
  openAction = false,
  disabledPrint = false,
  edit = true,
  totalProductsPrice = 0,
  loading = false,
  handleOpenActions = () => {
    return
  },
  handlePrint = () => {
    return
  },
  handleModalItem = () => {
    return
  },
  setModalItem = () => {
    return
  },
  HandleChangeState = () => {
    return
  },
  onPress = () => {
    return
  },
  onClose = () => {
    return
  },
}) => {
  const {
    payMethodPState,
    pSState,
    locationUser,
    pCodeRef,
    channel,
    change,
    getAllPedidoStore,
  } = dataModal
  const dataLocation = (locationUser && JSON.parse(locationUser)) || {}
  const { 
    cName, 
    country, 
    dName, 
    uLocationKnow
  } = dataLocation
  const stateOrder = {
    0: 'Confirmado',
    2: 'En Proceso',
    3: 'Listo Para Entrega',
    4: 'Pedido Concluido',
    5: 'Rechazado'
  }
  const { 
    yearMonthDay, 
    hourMinutes12, 
    longDayName
  } = pDatCre || {}
  const [oneProductToComment, setOneProductToComment] = useState({})
  const [openCommentModal, setOpenCommentModal] = useState(false)
  const [stateSale, setStateSale] = useState(pSState)
  const [values, setValues] = useState({})
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleComment = (product, comment) => {
    if (product) {
      setOneProductToComment(product)
      setValues({
        ...values,
        comment: comment || '',
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
  const handleChangeStateSale = (value, pCodeRef) => {
    if (stateSale !== value) {
      HandleChangeState(value, pCodeRef)
      setStateSale(value)
    }
  }
  useEffect(() => {
    setStateSale(pSState)
  }, [pSState])
  
  if (saleError) return <>Error</>
  return (
    <>
      {openCommentModal && (
        <AwesomeModal
          btnConfirm={false}
          footer={false}
          header={true}
          onCancel={() => {
            return handleComment()
          }}
          onHide={() => {
            return handleComment()
          }}
          padding='20px'
          show={openCommentModal}
          size='400px'
          title='Mira los comentarios'
          zIndex='9999'
        >
          <CardProductSimple
            {...oneProductToComment}
            comment={false}
            edit={false}
            pName={oneProductToComment.pName}
            render={null}
          />
          <textarea
            className='input-textarea'
            name='comment'
            onChange={(e) => {
              return handleChange(e)
            }}
            required
            value={values?.comment}
          />
        </AwesomeModal>
      )}
      <Overline
        show
        zIndex='9800'
        bgColor={`${BGColor}20`}
        onClick={() => {
          if (openAction) {
            handleOpenActions()
          }
          return onClose()
        }}
      />
      <ModalWrapper>
        <ResisesColumns
          backgroundColor='transparent'
          initialDividerPosition={{ __0: 80, __1: 20 }}
          lastMinWidth={'auto'}
          padding='0'
        >
          <div className='modal--section__main'>
            <Text
              margin='20px 0'
              fontWeight='300'
              fontSize='24px'
              color='#172b4d'
            >
              {pCodeRef}
            </Text>
            <div>
              <ContainerGrid>
                {loading ? (
                  <Skeleton height={400} numberObject={50} />
                ) : (
                  getAllPedidoStore?.map((sale, index) => {
                    const producto =
                      sale?.getAllShoppingCard?.productFood || {}
                    const priceTotal =
                      sale?.getAllShoppingCard?.cantProducts *
                      producto.ProPrice
                    const activeComment =
                      sale?.getAllShoppingCard?.comments?.length > 0
                    return (
                      <div key={index}>
                        <HeaderWrapperDetail
                          onClick={() => {
                            return
                          }}
                        >
                          <IconSales size={30} />
                          <div className='info-sales'>
                            <span>
                              Cantidad: {sale?.getAllShoppingCard?.cantProducts}
                            </span>
                            <span>total: {numberFormat(priceTotal)}</span>
                          </div>
                        </HeaderWrapperDetail>
                        <CardProductSimple
                          {...producto}
                          margin='20px 0 0 0'
                          ProDescription={producto.ProDescription}
                          ProDescuento={producto.ProDescuento}
                          ProImage={producto.ProImage}
                          free={!producto.ProPrice}
                          ProPrice={producto.ProPrice}
                          ProQuantity={producto.ProQuantity}
                          buttonComment={activeComment}
                          activeComment={activeComment}
                          asComment={activeComment}
                          handleComment={() => {
                            return handleComment(
                              producto,
                              sale?.getAllShoppingCard?.comments
                            )
                          }}
                          ValueDelivery={producto.ValueDelivery}
                          edit={false}
                          key={producto.pId}
                          onClick={() => {
                            handleModalItem(
                              producto.pId ?? null,
                              sale.ShoppingCard ?? null
                            )
                            return setModalItem(true)
                          }}
                          pName={producto.pName}
                          render={<IconSales size='20px' />}
                          tag={false}
                        />
                      </div>
                    )
                  })
                )}
              </ContainerGrid>
            </div>
          </div>
          <div className='modal--section__sec'>
            {edit && (
              <Column position='relative'>
                <Button
                  color={BGColor}
                  width='90%'
                  padding='5px'
                  borderRadius='2px'
                  backgroundColor={PColor}
                  onClick={handleOpenActions}
                >
                  {stateOrder[stateSale]}
                </Button>
                <Column>
                  {openAction && (
                    <ActionButton
                      onPress={() => {
                        return
                      }}
                    >
                      <div
                        className='option'
                        onClick={() => {
                          return handleChangeStateSale(0, pCodeRef)
                        }}
                      >
                        {' '}
                        Confirmar pedido
                      </div>
                      <div
                        className='option'
                        onClick={() => {
                          return handleChangeStateSale(2, pCodeRef)
                        }}
                      >
                        {' '}
                        Pedido en proceso
                      </div>
                      <div
                        className='option'
                        onClick={() => {
                          return handleChangeStateSale(3, pCodeRef)
                        }}
                      >
                        {' '}
                        Pedido en listo para entrega
                      </div>
                      <div
                        className='option'
                        onClick={() => {
                          return handleChangeStateSale(4, pCodeRef)
                        }}
                      >
                        {' '}
                        Pedido concluido
                      </div>
                      <div
                        className='option'
                        onClick={() => {
                          return handleChangeStateSale(5, pCodeRef)
                        }}
                      >
                        {' '}
                        Rechazar pedido
                      </div>
                    </ActionButton>
                  )}
                </Column>
              </Column>
            )}
            <Column>
              <SectionDetailOrder>
                <div className='header-detail'>
                  <Text fontSize='14px'>Detalles</Text>
                </div>

                <div className='header-responsible'>
                  <Text fontSize='14px'>Responsable: </Text>
                  <Text fontSize='14px'>{dataStore?.storeName}</Text>
                </div>
                <div className='header-responsible'>
                  <Text fontSize='14px'>Codigo:</Text>
                  <Text fontSize='14px'>{pCodeRef}</Text>
                </div>

                <div className='header-responsible'>
                  <Text fontSize='14px'>Ubicacion</Text>
                  <Text fontSize='14px'>{`${cName ?? ''} - ${
                    uLocationKnow ?? ''
                  } - ${country ?? ''} - ${dName ?? ''}`}</Text>
                </div>
                <div className='header-responsible'>
                  <Text fontSize='14px'>Canal: </Text>
                  <Text fontSize='14px'>
                    {channel ? 'RESTAURANTE' : 'DELIVERY-APP'}
                  </Text>
                </div>
                <div className='header-responsible'>
                  <Text fontSize='14px'>Cambio</Text>
                  <Text fontSize='14px'>$ {numberFormat(change || 0)}</Text>
                </div>
                {
                  <CustomLink
                    href={`${CLIENT_URL_BASE}delivery/${dataStore?.city?.cName?.toLocaleLowerCase()}-${dataStore?.department?.dName?.toLocaleLowerCase()}/${dataStore?.storeName
                      ?.replace(/\s/g, '-')
                      ?.toLocaleLowerCase()}/${dataStore?.idStore}`}
                  >
                    <Text margin='12px 0 0 5px' size='19px'>
                      {dataStore?.storeName ?? ''}
                    </Text>
                  </CustomLink>
                }
                <div className='header-responsible'>
                  <Text fontSize='14px'>Total</Text>
                  <Text fontSize='14px'>$ {totalProductsPrice || 0}</Text>
                </div>
                <div className='header-responsible'>
                  <Text fontSize='14px'>Metodo de pago</Text>
                  <Text fontSize='14px'>
                    {payMethodPState === 0 ? 'EFECTIVO' : 'TRANSFERENCIA'}
                  </Text>
                </div>
                <div className='header-responsible'>
                  <Text fontSize='14px'>Fecha de creacion</Text>
                  <Text fontSize='14px'>
                    {`${yearMonthDay} - ${longDayName} - ${hourMinutes12}`}
                  </Text>
                </div>
              </SectionDetailOrder>
            </Column>
            <Button
              color={BGColor}
              width='90%'
              padding='5px 0'
              borderRadius='2px'
              disabled={disabledPrint}
              backgroundColor={PColor}
              onClick={handlePrint}
            >
              Descargar factura de venta
            </Button>
          </div>
        </ResisesColumns>
      </ModalWrapper>
    </>
  )
}
export const ModalDetailOrder = React.memo(MemoModalDetailOrder)
