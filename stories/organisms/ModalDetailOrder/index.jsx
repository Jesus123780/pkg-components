import { useRouter } from "next/router";
import React, { useState } from "react";
import { CLIENT_URL_BASE } from "~/apollo/urls";
import { numberFormat } from "~/utils";
import { IconSales } from "../../../assets/icons";
import { Column } from "../../atoms/Column";
import { CustomLink } from "../../atoms/Link";
import { Overline } from "../../atoms/Overline";
import { AwesomeModal } from "../AwesomeModal";
import { CardProductSimple } from "../CardProductSimple";
import { ResisesColumns } from "../ResisesColumns";
import { Text } from "./../../atoms";
import { Button } from "./../../atoms/Button/index";
import { Skeleton } from "./../../molecules/Skeleton";
import {
  ActionButton,
  ContainerGrid,
  HeaderWrapperDetail,
  ModalWrapper,
  SectionDetailOrder
} from "./styled";

export const MemoModalDetailOrder = ({
  dataModal = {},
  dataStore,
  pDatCre,
  saleKey,
  saleGroup,
  openAction = false,
  totalProductsPrice = 0,
  loading = false,
  handleOpenActions = () => {
    return;
  },
  HandleChangeState = () => {
    return;
  },
  onPress = () => {
    return;
  },
  onClose = () => {
    return;
  },
}) => {
  const {
    payMethodPState,
    pSState,
    locationUser,
    pCodeRef,
    getAllPedidoStore,
  } = dataModal;
  const dataLocation = (locationUser && JSON.parse(locationUser)) || {};
  const { cName, country, dName, uLocationKnow } = dataLocation;
  const router = useRouter();
  const stateOrder = {
    1: "Confirmado",
    2: "En Proceso",
    3: "Listo Para Entrega",
    4: "Pedido Concluido",
    5: "Rechazado",
  };
  const { yearMonthDay, hourMinutes12, longDayName } = pDatCre || {};
  const [stateSale, setStateSale] = useState(pSState);
  const [openCommentModal, setOpenCommentModal] = useState(false);
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
  const handleChangeStateSale = (value, pCodeRef) => {
    HandleChangeState(value, pCodeRef);
    setStateSale(value);
  };

  return (
    <>
      {openCommentModal && (
        <AwesomeModal
          btnConfirm={false}
          footer={false}
          header={true}
          onCancel={() => {
            return handleComment();
          }}
          onHide={() => {
            return handleComment();
          }}
          padding="20px"
          show={openCommentModal}
          size="400px"
          title="Mira los comentarios"
          zIndex="9999"
        >
          <CardProductSimple
            {...oneProductToComment}
            ProDescription={oneProductToComment.ProDescription}
            ProDescuento={oneProductToComment.ProDescuento}
            ProImage={oneProductToComment.ProImage}
            ProPrice={oneProductToComment.ProPrice}
            ProQuantity={oneProductToComment.ProQuantity}
            ValueDelivery={oneProductToComment.ValueDelivery}
            comment={false}
            edit={false}
            pName={oneProductToComment.pName}
            render={null}
          />
          <textarea
            className="input-textarea"
            name="comment"
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
        zIndex="9800"
        bgColor="rgba(0,0,0,.4)"
        onClick={() => {
          return onClose();
        }}
      />
      <ModalWrapper>
        <ResisesColumns
          backgroundColor="transparent"
          padding="0"
          lastMinWidth={200}
        >
          <div className="modal--section__main">
            <Text
              margin="20px 0"
              fontWeight="300"
              fontSize="24px"
              color="#172b4d"
            >
              {pCodeRef}
            </Text>
            {/* {false && (
              <ContainerGrid>
                {saleKey?.map((store, i) => {
                  return (
                    <div key={i + 1}>
                      {saleGroup[store]?.length ?? 0}
                      <div>
                        {saleGroup[store]?.map((sale, idx) => {
                          const producto =
                            sale?.getAllShoppingCard?.productFood || {};
                          return (
                            <div>
                              <HeaderWrapperDetail
                              // onClick={() => {
                              //   return setSalesOpen(!salesOpen);
                              // }}
                              // style={style}
                              >
                                <IconSales size={30} />
                                <div className="info-sales">
                                  <span>Crear una venta</span>
                                  {true ? (
                                    <span>Cargando...</span>
                                  ) : (
                                    <span>
                                      Total de ventas hoy{" "}
                                      {sale?.getAllShoppingCard?.cantProducts}
                                    </span>
                                  )}
                                </div>
                              </HeaderWrapperDetail>
                              <Text size="1.5em">
                                Cantidad:{" "}
                                {sale?.getAllShoppingCard?.cantProducts}
                              </Text>
                              <CardProductSimple
                                {...producto}
                                ProDescription={producto.ProDescription}
                                ProDescuento={producto.ProDescuento}
                                ProImage={producto.ProImage}
                                ProPrice={producto.ProPrice}
                                ProQuantity={producto.ProQuantity}
                                ValueDelivery={producto.ValueDelivery}
                                buttonComment={true}
                                edit={false}
                                key={producto.pId}
                                onClick={() => {
                                  return router.push(
                                    `/update/products/editar/${producto.pId}`
                                  );
                                }}
                                pName={producto.pName}
                                render={<IconSales size="20px" />}
                                tag={false}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </ContainerGrid>
            )} */}
            <div>
              <ContainerGrid>
                {loading || getAllPedidoStore?.length <= 0 ? (
                  <Skeleton height={400} numberObject={50} />
                ) : (
                  getAllPedidoStore?.map((sale) => {
                    console.log("🚀 ~ file: index.jsx:230 ~ getAllPedidoStore?.map ~ sale", sale)
                    const producto =
                      sale?.getAllShoppingCard?.productFood || {};
                    const priceTotal =
                      (sale?.getAllShoppingCard?.cantProducts *
                      producto.ProPrice);
                      const activeComment = sale?.getAllShoppingCard?.comments?.length > 0
                    return (
                      <div>
                        <HeaderWrapperDetail
                        onClick={() => {
                          return;
                        }}
                        >
                          <IconSales size={30} />
                          <div className="info-sales">
                            <span>
                              Cantidad {sale?.getAllShoppingCard?.cantProducts}
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
                          handleComment={() => { return handleComment(producto, sale?.getAllShoppingCard?.comments)}}
                          ValueDelivery={producto.ValueDelivery}
                          edit={false}
                          key={producto.pId}
                          onClick={() => {
                            return router.push(
                              `/update/products/editar/${producto.pId}`
                            );
                          }}
                          pName={producto.pName}
                          render={<IconSales size="20px" />}
                          tag={false}
                        />
                      </div>
                    );
                  })
                )}
              </ContainerGrid>
            </div>
          </div>
          <div className="modal--section__sec">
            <Column position="relative">
              <Button
                color="#ffffff"
                width="90%"
                padding="5px"
                borderRadius="2px"
                backgroundColor={"#ff0000"}
                onClick={() => {
                  return handleOpenActions();
                }}
              >
                {stateOrder[stateSale]}
              </Button>
              <Column>
                {openAction && (
                  <ActionButton
                    onPress={() => {
                      return;
                    }}
                  >
                    <div
                      className="option"
                      onClick={() => {
                        return handleChangeStateSale(1, pCodeRef);
                      }}
                    >
                      {" "}
                      Confirmar pedido
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        return handleChangeStateSale(2, pCodeRef);
                      }}
                    >
                      {" "}
                      Pedido en proceso
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        return handleChangeStateSale(3, pCodeRef);
                      }}
                    >
                      {" "}
                      Pedido en listo para entrega
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        return handleChangeStateSale(4, pCodeRef);
                      }}
                    >
                      {" "}
                      Pedido concluido
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        return handleChangeStateSale(5, pCodeRef);
                      }}
                    >
                      {" "}
                      Rechazar pedido
                    </div>
                  </ActionButton>
                )}
              </Column>
            </Column>
            <Column>
              <SectionDetailOrder>
                <div className="header-detail">
                  <Text fontSize="14px">Detalles</Text>
                </div>

                <div className="header-responsible">
                  <Text fontSize="14px">Responsable</Text>
                  <Text fontSize="14px">{dataStore?.storeName}</Text>
                </div>
                <div className="header-responsible">
                  <Text fontSize="14px">Codigo</Text>
                  <Text fontSize="14px">{pCodeRef}</Text>
                </div>

                <div className="header-responsible">
                  <Text fontSize="14px">Ubicacion</Text>
                  <Text fontSize="14px">{`${cName ?? ""} - ${
                    uLocationKnow ?? ""
                  } - ${country ?? ""} - ${dName ?? ""}`}</Text>
                </div>
                <div className="header-responsible">
                  <Text fontSize="14px">Canal</Text>
                  <Text fontSize="14px">DELIVERY-APP</Text>
                </div>
                {
                  <CustomLink
                    href={`${CLIENT_URL_BASE}delivery/${dataStore?.city?.cName?.toLocaleLowerCase()}-${dataStore?.department?.dName?.toLocaleLowerCase()}/${dataStore?.storeName
                      ?.replace(/\s/g, "-")
                      ?.toLocaleLowerCase()}/${dataStore.idStore}`}
                  >
                    <a target="_blank">
                      <Text margin="12px 0 0 5px" size="19px">
                        $ {dataStore.storeName}
                      </Text>
                    </a>
                  </CustomLink>
                }
                <div className="header-responsible">
                  <Text fontSize="14px">Total</Text>
                  <Text fontSize="14px">{totalProductsPrice}</Text>
                </div>
                <div className="header-responsible">
                  <Text fontSize="14px">Metodo de pago</Text>
                  <Text fontSize="14px">
                    {payMethodPState === 0 ? "EFECTIVO" : "TRANSFERENCIA"}
                  </Text>
                </div>
                <div className="header-responsible">
                  <Text fontSize="14px">Fecha de creacion</Text>
                  <Text fontSize="14px">
                    {`${yearMonthDay} - ${longDayName} - ${hourMinutes12}`}
                  </Text>
                </div>
              </SectionDetailOrder>
            </Column>
          </div>
        </ResisesColumns>
      </ModalWrapper>
    </>
  );
};

export const ModalDetailOrder = React.memo(MemoModalDetailOrder, (prev, next) => {
  return prev.dataStore === next.dataStore
})