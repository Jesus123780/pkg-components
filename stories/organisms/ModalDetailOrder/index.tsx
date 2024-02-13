import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { PColor } from '../../../assets/colors'
import { IconSales } from '../../../assets/icons'
import { numberFormat } from '../../../utils/index'
import { Column } from '../../atoms/Column'
import { CustomLink } from '../../atoms/Link'
import { Overline } from '../../atoms/Overline'
import { AwesomeModal } from '../AwesomeModal'
import { CardProductSimple } from '../CardProductSimple'
import { ResisesColumns } from '../ResisesColumns'
import { Text } from './../../atoms'
import { Button } from './../../atoms/Button/index'
import { Skeleton } from './../../molecules/Skeleton'
import { ActionButton, ContainerGrid, HeaderWrapperDetail, ModalWrapper, SectionDetailOrder } from './styled'

const CLIENT_URL_BASE = process.env.URL_BASE
export const MemoModalDetailOrder = ({
  dataModal = {},
  dataStore,
  pDatCre,
  saleError,
  saleKey,
  saleGroup,
  openAction = false,
  isClient = false,
  edit = true,
  totalProductsPrice = 0,
  loading = false,
  handleOpenActions = () => {
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
  }
}) => {
  const { payMethodPState, pSState, locationUser, pCodeRef, channel, change, getAllPedidoStore } = dataModal
  const dataLocation = (locationUser && JSON.parse(locationUser)) || {}
  const { cName, country, dName, uLocationKnow } = dataLocation
  const stateOrder = {
    1: 'Confirmado',
    2: 'En Proceso',
    3: 'Listo Para Entrega',
    4: 'Pedido Concluido',
    5: 'Rechazado'
  }
  const { yearMonthDay, hourMinutes12, longDayName } = pDatCre || {}
  const [stateSale, setStateSale] = useState(pSState)
  useEffect(() => {
    // setStateSale()
    const data = dataModal?.hasOwnProperty('pSState')
    if (data) {
      setStateSale(pSState)
    }
  }, [dataModal])

  const [openCommentModal, setOpenCommentModal] = useState(false)
  const [oneProductToComment, setOneProductToComment] = useState({})
  const [values, setValues] = useState({})
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleComment = (product, comment) => {
    if (product) {
      setOneProductToComment(product)
      setValues({
        ...values,
        comment: comment || ''
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
  const options = [
    { value: 1, label: 'Confirmar pedido' },
    { value: 2, label: 'Pedido en proceso' },
    { value: 3, label: 'Pedido en listo para entrega' },
    { value: 4, label: 'Pedido concluido' },
    { value: 5, label: 'Rechazar pedido' }
  ]

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
        bgColor='rgba(0,0,0,.4)'
        onClick={() => {
          if (openAction) {
            handleOpenActions()
          }
          return onClose()
        }}
        show
        zIndex='9800'
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
              color='#172b4d'
              fontSize='24px'
              fontWeight='300'
              margin='20px 0'
            >
              {pCodeRef}
            </Text>
            <div>
              <ContainerGrid>
                {loading ? (
                  <Skeleton height={400} numberObject={50} />
                ) : (
                  getAllPedidoStore?.map((sale, index) => {
                    const producto = sale?.getAllShoppingCard?.productFood || {}
                    const priceTotal = sale?.getAllShoppingCard?.cantProducts * sale.getAllShoppingCard.priceProduct || 0
                    const activeComment = sale?.getAllShoppingCard?.comments?.length > 0
                    return (
                      <div key={index}>
                        <HeaderWrapperDetail
                          onClick={() => {
                            return
                          }}
                        >
                          <IconSales size={30} />
                          <div className='info-sales'>
                            <span>Cantidad: {sale?.getAllShoppingCard?.cantProducts}</span>
                            <span>total: {numberFormat(priceTotal)}</span>
                          </div>
                        </HeaderWrapperDetail>
                        <CardProductSimple
                          {...producto}
                          ProDescription={producto.ProDescription}
                          ProDescuento={producto.ProDescuento}
                          ProImage={producto.ProImage}
                          ProPrice={producto.ProPrice}
                          ProQuantity={producto.ProQuantity}
                          ValueDelivery={producto.ValueDelivery}
                          activeComment={activeComment}
                          asComment={activeComment}
                          buttonComment={activeComment}
                          edit={false}
                          free={!producto.ProPrice}
                          handleComment={() => {
                            return handleComment(producto, sale?.getAllShoppingCard?.comments)
                          }}
                          key={producto.pId}
                          margin='20px 0 0 0'
                          onClick={() => {
                            handleModalItem(producto.pId ?? null, sale.ShoppingCard ?? null)
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
                  backgroundColor={PColor}
                  borderRadius='2px'
                  color='#ffffff'
                  onClick={handleOpenActions}
                  padding='5px'
                  width='90%'
                >
                  {stateOrder[stateSale]}
                </Button>
                <Column>
                  {openAction && (
                    <ActionButton>
                      {options.map((option) => {
                        return (
                          <div
                            className='option'
                            key={option.value}
                            onClick={() => {
                              return handleChangeStateSale(option.value, pCodeRef)
                            }}
                          >
                            {option.label}
                          </div>
                        )
                      })}
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
                  <Text fontSize='14px'>Responsable</Text>
                  <Text fontSize='14px'>{dataStore?.storeName}</Text>
                </div>
                <div className='header-responsible'>
                  <Text fontSize='14px'>Codigo</Text>
                  <Text fontSize='14px'>{pCodeRef}</Text>
                </div>

                <div className='header-responsible'>
                  <Text fontSize='14px'>Ubicacion</Text>
                  <Text fontSize='14px'>{`${cName ?? ''} - ${uLocationKnow ?? ''} - ${country ?? ''} - ${dName ?? ''}`}</Text>
                </div>
                <div className='header-responsible'>
                  <Text fontSize='14px'>Canal</Text>
                  <Text fontSize='14px'>{channel ? 'RESTAURANTE' : 'DELIVERY-APP'}</Text>
                </div>
                {!!change && (
                  <div className='header-responsible'>
                    <Text fontSize='14px'>Cambio</Text>
                    <Text fontSize='14px'>{numberFormat(change)}</Text>
                  </div>
                )}
                {
                  <CustomLink href={`${CLIENT_URL_BASE}/delivery/${dataStore?.city?.cName?.toLocaleLowerCase()}-${dataStore?.department?.dName?.toLocaleLowerCase()}/${dataStore?.storeName?.replace(/\s/g, '-')?.toLocaleLowerCase()}/${dataStore?.idStore}`}>
                    <Text margin='12px 0 0 5px' size='19px'>
                      {dataStore?.storeName ?? ''}
                    </Text>
                  </CustomLink>
                }
                <div className='header-responsible'>
                  <Text fontSize='14px'>Total</Text>
                  <Text fontSize='14px'>{totalProductsPrice}</Text>
                </div>
                <div className='header-responsible'>
                  <Text fontSize='14px'>Metodo de pago</Text>
                  <Text fontSize='14px'>{payMethodPState === 0 ? 'EFECTIVO' : 'TRANSFERENCIA'}</Text>
                </div>
                {pDatCre ? (
                  <div className='header-responsible'>
                    <Text fontSize='14px'>Fecha de creacion</Text>
                    <Text fontSize='14px'>{pDatCre ? `${yearMonthDay} - ${longDayName} - ${hourMinutes12}` : null}</Text>
                  </div>
                ) : null}
              </SectionDetailOrder>
            </Column>
          </div>
        </ResisesColumns>
      </ModalWrapper>
    </>
  )
}

MemoModalDetailOrder.propTypes = {
  HandleChangeState: PropTypes.func,
  dataModal: PropTypes.shape({
    change: PropTypes.any,
    channel: PropTypes.any,
    getAllPedidoStore: PropTypes.shape({
      map: PropTypes.func
    }),
    locationUser: PropTypes.func,
    pCodeRef: PropTypes.any,
    pSState: PropTypes.any,
    payMethodPState: PropTypes.number
  }),
  dataStore: PropTypes.shape({
    city: PropTypes.shape({
      cName: PropTypes.shape({
        toLocaleLowerCase: PropTypes.func
      })
    }),
    department: PropTypes.shape({
      dName: PropTypes.shape({
        toLocaleLowerCase: PropTypes.func
      })
    }),
    idStore: PropTypes.any,
    storeName: PropTypes.string
  }),
  edit: PropTypes.bool,
  handleModalItem: PropTypes.func,
  handleOpenActions: PropTypes.func,
  isClient: PropTypes.bool,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onPress: PropTypes.func,
  openAction: PropTypes.bool,
  pDatCre: PropTypes.object,
  saleError: PropTypes.any,
  saleGroup: PropTypes.any,
  saleKey: PropTypes.any,
  setModalItem: PropTypes.func,
  totalProductsPrice: PropTypes.number
}
export const ModalDetailOrder = React.memo(MemoModalDetailOrder)
