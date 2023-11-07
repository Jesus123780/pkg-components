import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { APColor, BGColor, PColor, PLColor } from '../../../assets/colors'
import { IconArrowBottom, IconMiniCheck, IconShopping } from '../../../assets/icons'
import { numberFormat } from '../../../utils'
import { Checkbox, Column, Overline, RippleButton, Tag } from '../../atoms'
import { InputHooks, QuantityButton } from '../../molecules'
import { BtnClose, BtnCloseMobile, CardProductsModal, CardsComponent, ContainerModal, ContentInfo, DisRestaurant, Flex, GarnishChoicesHeader, HeadSticky, Header, Modal, Text } from './styled'

export const ModalProduct = ({
  dataOneProduct = {
    pId: null
  },
  dataOptional = [],
  show = false,
  comments = '',
  quantity = 1,
  disabled = true,
  loading = false,
  dataExtra = [],
  handleShowModalProduct = () => {
    return
  },
  setComments = () => {
    return
  },
  handleDecrementExtra = () => {
    return
  },
  handleIncrementExtra = () => {
    return
  },
  handleDecrease = () => {
    return
  },
  handleIncrease = () => {
    return
  },
  handleAddOptional = () => {
    return
  },
  useEvents = () => {
    return
  },
  handleAddProducts = () => {
    return
  },
  handleCountProducts = () => {
    return
  }
}) => {
  // EFFECTS
  const { ProDescription, ProDescuento, ProPrice, intoCart, getStore, pName } = dataOneProduct || {}
  /**
   *
   * @param {elem} food obtiene un producto del la list
   * @author {autor} Jesus Juvinao
   * @action Obtiene un producto de DB
   */
  // HANDLES

  useEvents({
    eventType: 'app.cart',
    callBack: ({ detail: { items } }) => {
      // handleMutate(items)
    }
  })
  const storeUrl = `/delivery/${getStore?.city?.cName?.toLocaleLowerCase()}-${getStore?.department?.dName?.toLocaleLowerCase()}/${getStore?.storeName}/${getStore?.idStore}`
  return (
    <ContainerModal showModal={show}>
      <Modal showModal={show}>
        <CardProductsModal>
          <Header>
            <BtnCloseMobile onClick={handleShowModalProduct} onMouseDown={handleShowModalProduct}>
              <IconArrowBottom color={PColor} size={20} />
            </BtnCloseMobile>
          </Header>
          <ContentInfo margin='10px 0 0 0'>
            <Image
              alt='Picture'
              blurDataURL='data:...'
              height={450}
              objectFit='contain'
              placeholder='blur'
              src={'/images/hamb.jpg'}
              width={450}
            />
          </ContentInfo>
          <div>
            <div>
              <BtnClose onMouseDown={handleShowModalProduct}>
                <IconArrowBottom color={PColor} size={20} />
              </BtnClose>
            </div>
            <ContentInfo>
              <HeadSticky>
                <Column>
                  <Text size='1.1em'>{pName}</Text>
                  <Text size='1.1em'>Cantidad: {quantity} </Text>
                </Column>
                <>{intoCart && <IconShopping color={PColor} size='25px' />}</>
              </HeadSticky>
              <Text
                color='#676464'
                description
                margin='20px 0'
                size='14px'
              >
                {ProDescription}
              </Text>
              <Flex>
                <Text
                  color={APColor}
                  margin='12px 0'
                  size='.875rem'
                >
                    $ {numberFormat(ProPrice)}
                </Text>
                <Text
                  color={PLColor}
                  margin='12px 0 0 5px'
                  size='14px'
                  style={{ textDecoration: 'line-through' }}
                >
                    $ {numberFormat(ProDescuento)}
                </Text>
              </Flex>
              <DisRestaurant>
                <Link href={storeUrl}>
                  <a>
                    <Text
                      className='dish-restaurant__header'
                      margin='12px 0'
                      size='14px'
                    >
                      {' '}
                      {getStore?.storeName}
                    </Text>
                  </a>
                </Link>
                <div className='dish-restaurant__divisor'></div>
                <label className='dish-observation-form__label' tabIndex='0'>
                    ¿Algún comentario?
                </label>
              </DisRestaurant>
              <InputHooks
                TypeTextarea
                name='comments'
                onChange={(e) => {
                  return setComments(e.target.value)
                }}
                value={comments}
              />
              {!!dataExtra?.length && (
                <GarnishChoicesHeader>
                  <div>
                    <p className='garnish-choices__title'>Adicionales</p>
                    <p className='garnish-choices__title-desc'>Escoge las opciones.</p>
                  </div>
                  <IconMiniCheck color='#009b3a' size={'15px'} />
                </GarnishChoicesHeader>
              )}
              {dataExtra?.length > 0 &&
                  dataExtra?.map((extra, index) => {
                    const contentPrice = extra.extraPrice === 0 && extra.quantity == 0
                    return (
                      <CardsComponent key={extra.exPid}>
                        <div>
                          <h3 className='title_card'>{extra.extraName}</h3>
                          <h3 className={`price ${!contentPrice ? 'price' : 'price'}`}> {!contentPrice ? `$ ${numberFormat((extra?.newExtraPrice ?? extra.extraPrice) || 0)}` : 'Gratis'}</h3>
                          {extra.exState === 1 && <Tag label='OBLIGATORIO' />}
                        </div>
                        <QuantityButton
                          border='none'
                          disabled={false}
                          handleDecrement={() => {
                            return handleDecrementExtra({ extra, index })
                          }}
                          handleIncrement={() => {
                            return handleIncrementExtra({ extra, index })
                          }}
                          padding='5px'
                          quantity={extra.quantity}
                          showNegativeButton={extra.quantity === 0}
                          style={{ display: 'flex', justifyContent: 'flex-end' }}
                          validationZero={false}
                          width='min-content'
                        />
                      </CardsComponent>
                    )
                  })}
              {dataOptional?.map((itemOptional) => {
                return (
                  <div key={itemOptional.opExPid}>
                    <GarnishChoicesHeader>
                      <div>
                        <p className='garnish-choices__title'>{itemOptional.OptionalProName}</p>
                        <p className='garnish-choices__title-desc'>Escoge hasta  {itemOptional.numbersOptionalOnly} opciones.</p>
                      </div>
                      <IconMiniCheck color={'#009b3a'} size={'15px'} />
                    </GarnishChoicesHeader>
                    {itemOptional?.ExtProductFoodsSubOptionalAll?.map((x) => {
                      return (
                        <CardsComponent key={x.opSubExPid}>
                          <div>
                            <h3 className='title_card'>{x.OptionalSubProName}</h3>
                          </div>
                          <Checkbox
                            checked={x?.check}
                            id={`subOptional_${x?.opSubExPid}`}
                            name='subOptional'
                            onChange={() => {
                              return handleAddOptional({ exOptional: x.opSubExPid, codeCategory: itemOptional?.code })
                            }}
                            type='checkbox'
                            value={x?.check}
                          />
                        </CardsComponent>
                      )
                    })}
                  </div>
                )
              })}
            </ContentInfo>
          </div>
          <div></div>
          <div className='container-modal__actions' style={{ display: 'flex' }}>
            <QuantityButton
              disabled={false}
              handleDecrement={handleDecrease}
              handleIncrement={handleIncrease}
              quantity={handleCountProducts(ProPrice, quantity)}
              style={{ margin: '0 20px 0 0', width: '60%' }}
              validationOne={quantity === 1}
            />
            <RippleButton
              color={BGColor}
              disabled={disabled && loading}
              onClick={() => {
                return handleAddProducts(dataOneProduct)
              }}
              padding='5px'
              size='12px'
            >
                Agregar
            </RippleButton>
          </div>
        </CardProductsModal>
      </Modal>
      <Overline
        bgColor='rgba(0, 0, 0, 0.322)'
        onClick={handleShowModalProduct}
        show={show}
        zIndex='99999'
      />
    </ContainerModal>
  )
}

ModalProduct.propTypes = {
  comments: PropTypes.string,
  dataExtra: PropTypes.array,
  dataOneProduct: PropTypes.object,
  dataOptional: PropTypes.array,
  disabled: PropTypes.bool,
  handleAddOptional: PropTypes.func,
  handleAddProducts: PropTypes.func,
  handleCountProducts: PropTypes.func,
  handleDecrease: PropTypes.func,
  handleDecrementExtra: PropTypes.func,
  handleIncrease: PropTypes.func,
  handleIncrementExtra: PropTypes.func,
  handleShowModalProduct: PropTypes.func,
  loading: PropTypes.bool,
  quantity: PropTypes.number,
  setComments: PropTypes.func,
  show: PropTypes.bool,
  useEvents: PropTypes.func
}
