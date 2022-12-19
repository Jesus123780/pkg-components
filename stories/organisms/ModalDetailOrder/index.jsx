import { IconSales } from "@/public/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CLIENT_URL_BASE } from "~/apollo/urls";
import { CardProducts } from "~/components/CartProduct";
import { Column } from "../../atoms/Column";
import { CustomLink } from "../../atoms/Link";
import { Overline } from "../../atoms/Overline";
import { ResisesColumns } from "../ResisesColumns";
import { Text } from "./../../atoms";
import { Button } from "./../../atoms/Button/index";
import { Skeleton } from "./../../molecules/Skeleton";
import {
  ActionButton,
  ContainerGrid,
  ModalWrapper,
  SectionDetailOrder
} from "./styled";

export const ModalDetailOrder = ({
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
  const { payMethodPState, pSState, pCodeRef, getAllPedidoStore } = dataModal;
  const router = useRouter();
  const stateOrder = {
    0: "Confirmado",
    2: "En Proceso",
    3: "Listo Para Entrega",
    4: "Pedido Concluido",
    5: "Rechazado",
  };
  const { yearMonthDay, hourMinutes12, longDayName } = pDatCre || {};
  const [groupProduct, setgroupProduct] = useState({
    PRODUCT: [],
  });
  useEffect(() => {
    const groupProduct = () => {};
  }, []);

  return (
    <>
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
            <Text as="h1" fontSize="24px" color="#172b4d">
              {pCodeRef}
            </Text>
            <ContainerGrid>
              {saleKey?.map((store, i) => {
                console.log(store)
                return (
                  <div key={i + 1}>
                    {saleGroup[store]?.length ?? 0}
                    <div>
                      {saleGroup[store]?.map((sale, idx) => {
                        const producto = sale?.getAllShoppingCard?.productFood || {};
                        return <div>
                           <Text size="1.5em">
                          Cantidad: {sale?.getAllShoppingCard?.cantProducts}{" "}
                        </Text>
                           <CardProducts
                          {...producto}
                          ProDescription={producto.ProDescription}
                          ProDescuento={producto.ProDescuento}
                          ProImage={producto.ProImage}
                          ProPrice={producto.ProPrice}
                          ProQuantity={producto.ProQuantity}
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
                        </div>;
                      })}
                    </div>
                  </div>
                );
              })}
            </ContainerGrid>
            <div>
              <ContainerGrid>
                {loading || getAllPedidoStore?.length <= 0 ? (
                  <Skeleton height={400} numberObject={50} />
                ) : (
                  getAllPedidoStore?.map((sale) => {
                    const producto =
                      sale?.getAllShoppingCard?.productFood || {};
                    return (
                      <div>
                        <Text size="1.5em">
                          Cantidad: {sale?.getAllShoppingCard?.cantProducts}{" "}
                        </Text>
                        <CardProducts
                          {...producto}
                          ProDescription={producto.ProDescription}
                          ProDescuento={producto.ProDescuento}
                          ProImage={producto.ProImage}
                          ProPrice={producto.ProPrice}
                          ProQuantity={producto.ProQuantity}
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
            {/* <RippleButton onClick={() => {return HandleChangeState(1)}}> Confirmar pedido</RippleButton>
        <RippleButton onClick={() => {return HandleChangeState(2)}}> Pedido en proceso</RippleButton>
        <RippleButton onClick={() => {return HandleChangeState(3)}}> Pedido en listo para entrega</RippleButton>
        <RippleButton onClick={() => {return HandleChangeState(4)}}> Pedido concluido</RippleButton>
        <RippleButton onClick={() => {return HandleChangeState(5)}}> Rechazar pedido</RippleButton> */}
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
                {stateOrder[pSState]}
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
                        return HandleChangeState(1, pCodeRef);
                      }}
                    >
                      {" "}
                      Confirmar pedido
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        return HandleChangeState(2, pCodeRef);
                      }}
                    >
                      {" "}
                      Pedido en proceso
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        return HandleChangeState(3, pCodeRef);
                      }}
                    >
                      {" "}
                      Pedido en listo para entrega
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        return HandleChangeState(4, pCodeRef);
                      }}
                    >
                      {" "}
                      Pedido concluido
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        return HandleChangeState(5, pCodeRef);
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
