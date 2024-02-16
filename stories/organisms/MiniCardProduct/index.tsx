import React from "react";
import styles from "./styles.module.css";
import { MiniCardProductProps } from "./type";
import productImg from "../../../assets/images/product.png";
import { QuantityButtonFloat } from "../../molecules/QuantityButtonFloat";

export const MiniCardProduct: React.FC<MiniCardProductProps> = ({
  ProPrice,
  ProDescription = "",
  pName = "",
  withQuantity = false,
  openQuantity = false,
  ProQuantity = 0,
  onClick = () => {
    return;
  },
  ...props
}) => {
  return (
    <div className={styles.productCardWrapper}>
      <div
        className={styles["product-card-content"]}
        data-test-id="product-card-test-id"
      >
        <div
          className={styles["product-card-image__container"]}
          data-test-id="product-card-image"
        >
          <div className={styles["wrapper-image"]}>
            <img className={styles["product-card-image"]} src={productImg} />
          </div>
          {withQuantity && (
            <div className={styles["quantity_container"]}>
              <QuantityButtonFloat open={openQuantity} />
            </div>
          )}
          <div className={styles["product-card-image__overlay"]}></div>
        </div>
        <div
          className={styles["product-card__price"]}
          data-test-id="product-card-price"
        >
          {ProPrice}
        </div>
        <span className={styles["product-card__title"]} title={pName}>
          {pName}
        </span>
        <span
          className={styles["product-card__description"]}
          title={ProDescription}
        >
          {ProDescription}
        </span>
      </div>
    </div>
  );
};
