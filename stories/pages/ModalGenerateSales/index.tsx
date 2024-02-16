import PropTypes from "prop-types";
import React from "react";
import { AwesomeModal } from "../../organisms/AwesomeModal";
import styles from "./styles.module.css";
import { Button, Icon } from "../../atoms";
import { CardProductSimple } from "../../organisms";
import { Skeleton } from "../../molecules";
import { ProductFood } from "./types";
import { MiniCardProduct } from "../../organisms/MiniCardProduct";

interface ModalGenerateSalesProps {
  productsFood?: ProductFood[];
  show: boolean;
  isLoading?: boolean;
  dispatch?: React.Dispatch<any>;
}
export const ModalGenerateSales: React.FC<ModalGenerateSalesProps> = ({
  productsFood = [],
  show = false,
  isLoading = false,
  dispatch = () => {
    return;
  },
}) => {
  return (
    <AwesomeModal
      title="Crea una venta"
      show={show}
      size="large"
      header
      footer={false}
      borderRadius="0"
    >
      <div className={styles.container}>
        <div className={styles.content__products}>
          {productsFood?.map((producto) => {
            const tag = {
              tag: producto?.getOneTags?.nameTag,
            };
            return (
              <MiniCardProduct
                {...producto}
                ProDescription={producto.ProDescription}
                ProDescuento={producto.ProDescuento}
                ProImage={producto.ProImage}
                ProPrice={producto.ProPrice}
                ProQuantity={producto.ProQuantity}
                ValueDelivery={producto.ValueDelivery}
                comment={false}
                edit={false}
                key={producto.pId}
                onClick={() => {
                  return dispatch({
                    type: "ADD_TO_CART",
                    payload: producto,
                  });
                }}
                pName={producto.pName}
                render={<Icon size={20} icon="IconSales" />}
                tag={producto?.getOneTags && tag}
              />
            );
          })}
        </div>
        <div className={styles.content__action_product}>
          <Button>ver mas productos</Button>
        </div>
        <div className={styles.content__scrolling}></div>
        <div className={styles.content__action}>
          <Button>Eliminar</Button>
          <Button>Guardar</Button>
        </div>
      </div>
    </AwesomeModal>
  );
};

ModalGenerateSales.propTypes = {
  show: PropTypes.bool.isRequired,
};
