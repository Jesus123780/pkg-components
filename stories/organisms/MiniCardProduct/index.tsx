import React from "react";
import styles from "./styles.module.css";
import product from "../../../assets/images/product.png";

export const MiniCardProduct = () => {
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
          <div className={styles['wrapper-image']} >
            <img
              className={styles["product-card-image"]}
              src={product}
            />
          </div>
          
          <div className={styles["product-card-image__overlay"]}></div>
        </div>
        <div
          className={styles['product-card__price']}
          data-test-id="product-card-price"
        >
          $ 5000
        </div>
        <span
          className={styles['product-card__title']}
          title="Cerveja Brahma Duplo Malte Puro Malte 350ml"
        >
          Cerveja Brahma Duplo Malte Puro Malte 350ml
        </span>
        <span
          className={styles['product-card__description']}
          title="Produto para maiores de 18 anos"
        >
          Produto para maiores de 18 anos
        </span>
       
      </div>
    </div>
  );
};
